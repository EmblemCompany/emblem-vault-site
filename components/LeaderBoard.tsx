import { Box, Flex, Text, Link, Image, Stack, Spinner } from '@chakra-ui/core'
import Loader from 'react-loader'
import Refreshing from './Refreshing'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { validImage } from '../utils'
import { Contract } from '@ethersproject/contracts'
import { EMBLEM_API, BURN_ADDRESS, contractAddresses } from '../constants'
import { useContract } from '../hooks'
let _totalValueLocked = 0
export default function LeaderBoard() {
  const { query } = useRouter()
  const { account, chainId } = useWeb3React()
  const [vaults, setVaults] = useState([])
  const [state, setState] = useState({ loaded: false })
  const [loadingApi, setLoadingApi] = useState(false)
  const [loadingOwners, setLoadingOwners] = useState(false)
  const [address, setAddress] = useState(query.address)
  const [owners, setOwners] = useState([])
  const [calculatedValue, setCalculatedValue] = useState(0)
  const [totalValueLocked, setTotalValueLocked] = useState(0)


  const emblemContract = useContract(contractAddresses.emblemVault[chainId], contractAddresses.emblemAbi, true)

  const getOwners = async () => {
    setState({ loaded: true })
    if (!loadingOwners) {
      setOwners([])
      setLoadingOwners(true)
    } else {
      return
    }
    let totalSupply = await (emblemContract as Contract).totalSupply()
    console.log(totalSupply)
    getTokensByIndex(Number(totalSupply.toString()), 0, () => {
      function compare(a, b) {
        if (a.value > b.value) return -1;
        if (b.value > a.value) return 1;      
        return 0;
      }
      console.log('sorted owners', owners.sort(compare))   
      setTotalValueLocked(_totalValueLocked)
      setLoadingOwners(false)
    })
  }

  const getValueForNft = async (tokenId, cb) =>{
    try {
      const response = await fetch(EMBLEM_API + '/value/' + tokenId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          service: 'evmetadata'
        },
      })
      const jsonData = await response.json()      
      return cb(jsonData.value || 0)
    } catch(err){ return cb(0)    }
  }

  async function getTokensByIndex(count, index, cb) {
    let tokenId = await (emblemContract as Contract).tokenByIndex(index)
    console.log('tokenId', tokenId.toString(), index)
    getOwner(tokenId.toString(), ()=>{
      if (count - 1 < index + 1) {
          return cb()
        } else {
          return getTokensByIndex(count, index + 1, cb)
        }
    })
  }

  async function getOwner(tokenId, cb) {
    let owner = await (emblemContract as Contract).ownerOf(tokenId)
    if (owner === '0x0000000000000000000000000000000000000000' || owner.toLowerCase() === '0x5d152dd902cc9198b97e5b6cf5fc23a8e4330180') {
      return cb()
    }
    if (owners.filter(item=>{return item.address === owner}).length < 1) {
      getValueForNft(tokenId, value=>{
        _totalValueLocked = _totalValueLocked + value
        setCalculatedValue(value)
        console.log("tokenId Value", tokenId, value)
        owners.push({address: owner, value: value, vaults: [{ tokenId: tokenId, value: value}]})
        setOwners(owners)
      })
    } else {
      getValueForNft(tokenId, value=>{
        _totalValueLocked = _totalValueLocked + value
        setCalculatedValue(value)
        console.log("tokenId Value", tokenId, value)
        owners.filter(item=>{return item.address === owner})[0].vaults.push({ address: owner, tokenId: tokenId.toString(), value: owners.filter(item=>{return item.address === owner})[0].value })
        setOwners(owners)
      })
    }
    return cb()
  }

  useEffect(() => {
    account && chainId ? getOwners() : setState({ loaded: true })
  }, [])

  return (
    <Loader loaded={state.loaded}>
      {loadingOwners ? <Refreshing /> : ''}
      <Flex width="full" align="center" justifyContent="center">
        <Stack>
          <Text>Total Value Locked: {totalValueLocked === 0 ? "Calculating..." : "$"+totalValueLocked}</Text>
          {owners.map((item) => {
            let pieces = location.pathname.split('/')
            pieces.pop()
            let url = location.origin + pieces.join('/') + '/vaultlist?address=' + item.address
            return (            
              <Link href={url} key={item.address} isExternal>Address: {item.address} Vaults: {item.vaults.length} TVL: ${item.value}</Link>
            )
          })}
        </Stack>        
      </Flex>
    </Loader>
  )
}
