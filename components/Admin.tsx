import { Box, Flex, Text, Link, Image, Stack, Button, BoxProps, Input, Select, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/core'
import Loader from 'react-loader'
import Refreshing from './Refreshing'
import { useRouter } from 'next/router'
import { TransactionToast } from './TransactionToast'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import {HStack, VStack, Circle, Divider } from '@chakra-ui/react'
import { EMBLEM_API, BURN_ADDRESS, ZERO_ADDRESS, contractAddresses } from '../constants'
import { useContract } from '../hooks'
import { EXPLORER_PREFIXES } from '../utils'

import { Contract } from '@ethersproject/contracts'

export default function Admin() {
  const { query } = useRouter()
  const { account, chainId, library } = useWeb3React()
  const [state, setState] = useState({ loaded: true })
  const [loadingApi, setLoadingApi] = useState(true)
  const [refreshing, setRefreshing] = useState(true)
  const [stats, setStats] = useState([])
  const [address, setAddress] = useState(query.address || null)
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [shouldFetchData, setShouldFetchData] = useState(address? true: false)
  const [hasMore, setHasMore] = useState(true)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [hash, setHash] = useState(null)
  const [factories, setFactories] = useState([])
  const [clones, setClones] = useState([])

  const handlerContract = useContract(contractAddresses.vaultHandlerV8[chainId], contractAddresses.vaultHandlerV8Abi, true)

  interface ErrorWithCode extends Error {
    code?: number
  }

  // useEffect(() => {
  //   if (state.loaded == false && !loadingApi && address) {
  //     setLoadingApi(false)
  //     // getPnL()
  //   }
  // }, [])

  // useEffect(() => {
  //   if (shouldFetchData && address) {
  //     console.log("Should load api after setting consts", offset)
  //     setShouldFetchData(false)
  //     // getPnL()
  //   } else {
  //     console.log("wtf")
  //   }
  // }, [shouldFetchData, offset])

  // const fetchDataForLazyLoad = async () =>{    
  //   console.log('setting new offset to', offset+limit)
  //   setOffset(offset+limit)
  //   setShouldFetchData(true)
  // }

    useEffect(() => {
      if (loadingApi && refreshing) {
        setLoadingApi(false)
        // alert(0)
        GetContracts()
      }
    })

  const StartRefresh = async()=>{
    setRefreshing(true)
    setLoadingApi(true)
  }

  async function createClone(cloneType) {
    let factory = factories.filter(factory=>{ return factory.type == cloneType})[0]
    let factoryContract = getFactoryContract(factory.address)
    factoryContract.createClone(account).then(({ hash }: { hash: string }) => {
      console.log("hash", hash)
      setHash(hash)
    })
  }

  async function GetContracts() {
    getClones()
    let factories = await handlerContract.getAllRegisteredContractsOfType(8)
    let factoryInfo = await getFactoryInto(factories, 0, [])
    setFactories(factoryInfo)
    setRefreshing(false)
    setState({loaded: true})
  }

  async function getFactoryInto(factories, index, values) {
    let factory = factories[index]
    let factoryContract = getFactoryContract(factory)
    let factoryType = await factoryContract.factoryType()
    let factoryClones = await factoryContract.getClones()
    let factoryOwner = await factoryContract.owner()
    let detailedClones = await getCloneInto(factoryClones, 0, factoryType, [])
    
    values.push({type: factoryType, address: factory, clones: detailedClones, owner: factoryOwner})

    if (index+1 == factories.length) {
      return values
    } else {
      return getFactoryInto(factories, index +1, values)
    }
  }

  async function getClones() {
    let erc1155 = await handlerContract.getAllRegisteredContractsOfType(1)
    console.log("---------", erc1155, erc1155.length)
    erc1155 = await getCloneInto(erc1155, 0, "ERC1155", [])
    let erc721 = await handlerContract.getAllRegisteredContractsOfType(2)
    erc721 = await getCloneInto(erc721, 0, "ERC721", [])
    let erc20 = await handlerContract.getAllRegisteredContractsOfType(4)
    erc20 = await getCloneInto(erc20, 0, "ERC20", [])
    setClones(erc1155.concat(erc721).concat(erc20))
  }

  async function getCloneInto(_clones, index, cloneType, values) {
    if (_clones.length == 0) return values
    let clone = _clones[index]
    let cloneContract = getCloneContract(clone, cloneType)
    let cloneOwner = await cloneContract.owner()
    let cloneName = await cloneContract.name()
    let decimals = cloneType == "ERC20"?  await cloneContract.decimals() : 0
    let cloneBalance = cloneType == "ERC20"?  calculateBalance((await cloneContract.balanceOf(account)).toNumber(), decimals) : cloneType == "ERC1155" ? await getERC1155TokenBalance(cloneContract, account) : 0
    let serializable = cloneType != "ERC1155"? false : await cloneContract.isSerialized()
    values.push({address: clone, owner: cloneOwner, name: cloneName, type: cloneType, balance: cloneBalance, decimals: decimals, serializable: serializable})

    if (index+1 == _clones.length) {
      return values
    } else {
      return getCloneInto(_clones, index +1, cloneType, values)
    }
  }

  async function getERC1155TokenBalance(contract, address) {
    let ids = await contract.getTokenIds()
    let myIds = ids.length > 0 ? getMyBalanceByIds(ids, 0, contract, address, []) : []

  async function getMyBalanceByIds(tokenIds, index, contract, address, values) {
      let id = tokenIds[index]
      let tokenBalance = await contract.balanceOf(address, id.toNumber())
      if (tokenBalance.toNumber() > 0) {
        // alert(id.toNumber())
        // alert(tokenBalance.toNumber())
      }
      if (index+1 == tokenIds.length) {
        return values
      } else {
        return getMyBalanceByIds(tokenIds, index +1, contract, address, values)
      }
    }
    console.log("ids", ids)
    return ids.length
  }

  async function toggleSerializable(address) {
    let cloneContract = getCloneContract(address, "ERC1155")
    cloneContract.toggleSerialization().then(({ hash }: { hash: string }) => {
      setHash(hash)
    })
  }

  function getCloneContract(address, cloneType) {
    let abi
    switch(cloneType) {
      case "ERC20":
        abi = contractAddresses.erc20Abi
        break;
      case "ERC721":
        abi = contractAddresses.erc721Abi
        break;
      case "ERC1155":
        abi = contractAddresses.erc1155Abi
        break;
    }
    return new Contract(address, abi, library.getSigner(account).connectUnchecked())
  }

  function getFactoryContract(address) {
    return new Contract(address, contractAddresses.clonableFactoryAbi, library.getSigner(account).connectUnchecked())
  }

  function calculateBalance(balance: number, decimals: string) {
    return balance / Math.pow(10, parseInt(decimals))
  }

  return (
    <Loader loaded={state.loaded}>
      {refreshing ? <Refreshing /> : ''}

      <Flex w="100%" justify="center" mt={10}>
        <Stack align="center" w={"100%"}>
        
        <Button onClick={StartRefresh}>Refresh Data</Button>

        {/* {factories.length > 0? (
          factories.map((factory, index)=>{
            return (
              <VStack key={"factory-"+index} p={2} >
                <Box w="100%" min-width="40px">     
                  <Text w="100%">{factory.owner == account? "Owned": null} {factory.type} Factory: {factory.address}</Text>
                  {factory.clones.map( (clone, index)=>{
                      return (
                        <>
                          <Text key={clone.address} ml={12}>{clone.owner == account? "Owned": null} {factory.type} : {clone.address} </Text>
                          <Divider orientation="horizontal" />
                          <Text key={clone.name + index} ml={12}>Name: {clone.name || "Not Named"}</Text>
                        </>
                      )
                    }
                  )}
                  <Divider orientation="horizontal" />
                </Box>
              </VStack>
            )
          })
        ) : null}  */}
        
        { clones.length > 0? (
          clones.map((clone, index)=>{
            return (
              <VStack key={"factory-"+index} p={2} >
                <Box w="100%" min-width="40px">
                  <Text key={"address-" + clone.address} ml={12}>{clone.owner == account? "Owned": null} {clone.type}: 
                    <Link target={"_blank"} href={location.protocol + "//" + EXPLORER_PREFIXES[chainId] + "/address/"+clone.address+"#readContract"}> {clone.address}</Link>
                  </Text>
                  <Divider orientation="horizontal" />
                  <Text key={"name-" + clone.name + index} ml={12}>Name: {clone.name || "Not Named"}</Text>
                  
                  <Divider orientation="horizontal" />
                  <Text key={"balance-" + clone.balance + index} ml={12}>Balance: {clone.balance}</Text>
                  <Divider orientation="horizontal" />
                  <Text key={"ser-"+index} ml={12}> Serializable: {clone.serializable.toString() || "Not Serializable"} 
                    {clone.type =="ERC1155"?(<Button m={3} onClick={()=>{toggleSerializable(clone.address)}}>Toggle</Button>):null}
                  </Text>
                  <Divider orientation="horizontal" />
                  <HStack>
                    <Input placeholder={"TokenId"}></Input>
                    <Input placeholder={"Amount"}></Input>
                    <Button>Mint</Button>
                  </HStack>

                </Box>
              </VStack>
            )
          })
        ) : null } 
        { hash? (
          <TransactionToast
          hash={hash}
          onComplete={() => {
            setHash(null)
            StartRefresh()          
          }}
        />
        ) : null}
        (
          <VStack p={2} >
            <Box w="100%" min-width="40px">
              <Button w={300} m={2} onClick={()=>{createClone("ERC20")}}>Create ERC20</Button>
              <Divider orientation="horizontal" />
              <Button w={300} m={2} onClick={()=>{createClone("ERC721")}}>Create ERC721</Button>
              <Divider orientation="horizontal" />
              <Button w={300} m={2} onClick={()=>{createClone("ERC1155")}}>Create ERC1155</Button>
            </Box>
          </VStack>
        )
        
        
       </Stack>
      </Flex>
     
    </Loader>
  )
}
