// import { Box, Flex, Text, Link, Image, Stack, Spinner, useColorMode } from '@chakra-ui/react'
import { Box, Flex, Text, Link, Image, Stack, Button, FormControl, FormLabel, Checkbox, CheckboxGroup, Radio, RadioGroup, Input, FormHelperText, useColorMode } from '@chakra-ui/react'
import {HStack, VStack } from '@chakra-ui/react'
import Loader from 'react-loader'
import Refreshing from './Refreshing'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { Component, useEffect, useState } from 'react'
import { EMBLEM_API } from '../constants'
import InfiniteScroll from 'react-infinite-scroll-component';
import Embed from './Embed'
// import Select from "react-dropdown-select";
import PropTypes from 'prop-types';
import ReactSelect, { components, createFilter } from 'react-select';

export default function Find() {
  const { query } = useRouter()
  const [pagePosition, setPagePosition] = useState(Number(query.start) || 0)
  const { account, chainId } = useWeb3React()
  const [vaults, setVaults] = useState([])
  const [state, setState] = useState({ loaded: true })
  const [loadingApi, setLoadingApi] = useState(false)
  const [address, setAddress] = useState(query.address)
  const [experimental, setExperimental] = useState(query.experimental)
  const { colorMode } = useColorMode()
  const [shouldFetchData, setShouldFetchData] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)
  const [q, setQ] = useState(query && Object.keys(query).length > 0)
  const [hideClaimed, setHideClaimed] = useState(false)
  const [hideUnminted, setHideUnminted] = useState(false)

  const [assetName, setAssetName] = useState(query.name)
  const [tempAssetName, setTempAssetName] = useState(assetName || '')

  const [coin, setCoin] = useState(query.coin)
  const [tempCoin, setTempCoin] = useState(coin || '')

  const [project, setProject] = useState(query.project)
  const [tempProject, setTempProject] = useState(project || '')

  const [projects, setProjects] = useState([])
  const [loadedProjects, setLoadedProjects] = useState(false)

  const [assets, setAssets] = useState([])
  const [loadedAssets, setLoadedAssets] = useState(false)

  const [searchType, setSearchType] = useState(query.searchType || 'filter')
  const [tempSearchType, setTempSearchType] = useState(searchType.toString())

  const [vaultName, setVaultName] = useState(query.vaultName)
  const [tempVaultName, setTempVaultName] = useState(vaultName || '')

  const [vaultDescription, setVaultDescription] = useState(query.vaultDescription)
  const [tempVaultDescription, setTempVaultDescription] = useState(vaultDescription)

  const [network, setNetwork] = useState(query.network || null)
  
  const [balanceChecks, setBalanceChecks] = useState(Object.keys(query).filter(key=>{return key !== "vaultName" && key !== "vaultDescription" && key !== "searchType"}))
  const [metadataChecks, setMetadataChecks] = useState(Object.keys(query).filter(key=>{return key !== "name" && key !== "coin" && key !== "project" && key !== "searchType"}))

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const CustomOption = ({ children, ...props }) => {
    // eslint-disable-next-line no-unused-vars
    const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    const newProps: any = { ...props, innerProps: rest };
    return (
      <components.Option 
      {...newProps}
      className="custom-option"
      >
        {children}
      </components.Option>
    );
  };
  
  CustomOption.propTypes = {
    innerProps: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
  };

  interface Item {
    label: string;
    value: string;
  }

  const PAGE_SIZE = 20

  const getProjects = async () => { 
    try {
      const response = await fetch(EMBLEM_API + '/search/projects', {
        method: 'GET',
        headers: {
          service: 'evmetadata'
        }
      })
      let jsonData = await response.json()
      let formatted = []
      jsonData.sort().forEach(item=>{
        formatted.push({
          value: item,
          label: item
        })
      })
      setProjects(formatted)
    } catch (error) {}
  }

  const getAssets = async () => { 
    try {
      const response = await fetch(EMBLEM_API + '/search/assets', {
        method: 'GET',
        headers: {
          service: 'evmetadata'
        }
      })
      let jsonData = await response.json()
      let formatted = []
      jsonData.sort().forEach(item=>{
        formatted.push({
          value: item,
          label: item
        })
      })
      setAssets(formatted)
      // console.log(formatted)
    } catch (error) {}
  }

  const getVaults = async () => {    
    let body: any = {}
    if (metadataChecks.length > 0) {
      body.metadata = {}
      metadataChecks.forEach(key => {
        if (key == "vaultDescription") {
          body.metadata["description"] = tempVaultDescription
        }
        if (key == "vaultName") {
          body.metadata["name"] = tempVaultName
        }
      })
      
    }
    if (balanceChecks.length > 0) {
      body.balance = {}
      balanceChecks.forEach(key => {
        if (key == "name") {
          body.balance["name"] = tempAssetName
        }
        if (key == "coin") {
          body.balance["coin"] = tempCoin
        }
        if (key == "project") {
          body.balance["project"] = tempProject
        }
      })
    }
    try {
      const response = await fetch(EMBLEM_API + '/find/'+tempSearchType+'?start='+offset+'&size='+PAGE_SIZE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          service: 'evmetadata'
        },
        body: JSON.stringify(body)
      })
      let jsonData = await response.json()
      console.log('------ vaults', jsonData)
      jsonData.length == 0 || jsonData.length < PAGE_SIZE ? setHasMore(false) : setHasMore(true)
      setVaults(vaults.concat(jsonData))
      setState({ loaded: true })
      setLoadingApi(false)
    } catch (error) {}
  }

  const fetchData = async() =>{
    console.log(offset, PAGE_SIZE, offset+PAGE_SIZE)
    setOffset(offset+PAGE_SIZE)
    setShouldFetchData(true)
  }  

  const [acct, setAcct] = useState('')
  useEffect(() => {
    if (q && account && acct != account) {
      setAcct(account)
      setState({ loaded: false })
      getVaults()
    }
  }, [account, acct])

  const [chain, setChain] = useState(chainId)
  useEffect(() => {
    if (q && chainId && chain != chainId) {
      setChain(chainId)
      setState({ loaded: false })
      getVaults()
    }
  }, [chainId, chain])

  useEffect(() => {
    // console.log('here', chainId, chain, account, state)
    if (q && !account && !state.loaded) {      
      setState({ loaded: false })
      getVaults()
    }
  }, [chainId, chain])

  useEffect(() => {    
    if (shouldFetchData) {
      console.log('here 1')
      setShouldFetchData(false)
      setLoadingApi(true)
      getVaults()
    } else {
      console.log('no fetch')
    }
  }, [shouldFetchData])

  useEffect(() => {
    if (q && vaults.length == 0 && !loadingApi) {
      console.log('here 2')
      setShouldFetchData(true)
      // getVaults()
    } else {
      console.log('no fetch', q, vaults)
    }
  }, [q, vaults])

  useEffect(() => {
    if (projects.length == 0 && !loadedProjects) {      
      setLoadedProjects(true)
      getProjects()
    }
  })

  useEffect(() => {
    if (assets.length == 0 && !loadedAssets) {      
      setLoadedAssets(true)
      getAssets()
    }
  })

  let blockchains = [
    {value: "POLYGON", label: "Polygon (Matic)"},
    {value: "XCP", label: "Counterparty"},
    {value: "BTC", label: "Bitcoin"},
    {value: "BCH", label: "Bitcoin Cash"},
    {value: "DGB", label: "Digibyte"},
    {value: "DOGE", label: "Dogecoin"},
    {value: "ETH", label: "Ethereum"},
    {value: "FTM", label: "Fantom"},
    {value: "LTC", label: "Litecoin"},
    {value: "NMC", label: "Namecoin"},
    {value: "OMNI", label: "Omni"},
    {value: "xDai", label: "xDai"},
    {value: "XDP", label: "Doge Party"},
    {value: "XMP", label: "Mona Party"},
    {value: "XTZ", label: "Tezos"}
  ]

    //   <option key="4" value="BCH">Bitcoin Cash</option>
    //   <option key="5" value="DGB">Digibyte</option>
    //   <option key="6" value="DOGE">Dogecoin</option>
    //   <option key="7" value="ETH">Ethereum</option>
    //   <option key="8" value="FTM">Fantom</option>
    //   <option key="9" value="LTC">Litecoin</option>
    //   <option key="10" value="NMC">Namecoin</option>
    //   <option key="12" value="xDai">xDai</option>
    //   <option key="13" value="OMNI">Omni</option>
    //   <option key="14" value="XDP">Doge Party</option>
    //   <option key="15" value="XMP">Mona Party</option>
    //   <option key="16" value="XTZ">Tezos</option>

  function addOrRemoveBalanceFilter(target) {
    if (balanceChecks.includes(target)) {
      setBalanceChecks(balanceChecks.filter(item => item !== target))
    } else {
      setBalanceChecks(balanceChecks.concat(target))
    }
    console.log('balance checks',balanceChecks)
  }

  function addOrRemoveMetadataFilter(target) {
    if (metadataChecks.includes(target)) {
      setMetadataChecks(metadataChecks.filter(item => item !== target))
    } else {
      setMetadataChecks(metadataChecks.concat(target))
    }
    console.log('metadata checks',metadataChecks)
  }

  return (
    <Loader loaded={state.loaded}>
      {loadingApi ? <Refreshing /> : ''}
      <VStack width="100%" align="center" justifyContent="center" >
        <RadioGroup onChange={(e)=>{ setTempSearchType(e.target.value) }} defaultValue={tempSearchType} value={tempSearchType}>
          <Stack spacing={4} direction="row">                
            <Radio isChecked={tempSearchType == "filter"? true : false} value="filter">Filter (AND)</Radio>
            <Radio isChecked={tempSearchType === "or"? true : false} value="or">Search (OR)</Radio>
          </Stack>
        </RadioGroup>
        <CheckboxGroup>
          <HStack>
            <Checkbox isDisabled={metadataChecks.length > 0} key="check1" isChecked={balanceChecks.includes('name')} value="name" onChange={(e)=>{addOrRemoveBalanceFilter(e.target.value)}} >Asset Name</Checkbox>
            <Checkbox isDisabled={metadataChecks.length > 0} key="check2" isChecked={balanceChecks.includes('coin')} value="coin" onChange={(e)=>{addOrRemoveBalanceFilter(e.target.value)}} >Blockchain</Checkbox>
            <Checkbox isDisabled={metadataChecks.length > 0} key="check3" isChecked={balanceChecks.includes('project')} value="project" onChange={(e)=>{addOrRemoveBalanceFilter(e.target.value)}} >Project</Checkbox>
            <Checkbox isDisabled={balanceChecks.length > 0} key="check4" isChecked={metadataChecks.includes('vaultName')} value="vaultName" onChange={(e)=>{addOrRemoveMetadataFilter(e.target.value)}} >Vault Name</Checkbox>
            <Checkbox isDisabled={balanceChecks.length > 0} key="check5" isChecked={metadataChecks.includes('vaultDescription')} value="vaultDescription" onChange={(e)=>{addOrRemoveMetadataFilter(e.target.value)}} >Vault Description</Checkbox>
            <Checkbox isChecked={hideClaimed == true} key="check6" value="hideClaimed" onChange={(e)=>{setHideClaimed(!hideClaimed)}} >Hide Claimed</Checkbox>
            <Checkbox isChecked={hideUnminted == true} key="check6" value="hideUnminted" onChange={(e)=>{setHideUnminted(!hideUnminted)}} >Hide Un-Minted</Checkbox>

          </HStack>
        </CheckboxGroup>
        {balanceChecks.map((check, index)=>{
          return (
            <VStack>
              <Text>{index == 0 ? null : (tempSearchType == "or"? "or": "and")} {check == "coin" ? "from Blockchain": check=="name" ? "within balances for the Asset Name of": "of the Project"}</Text>
              {check == "name" ? (
                // <Input value={tempAssetName} onChange={(e) => setTempAssetName(e.target.value)} ></Input>
                <ReactSelect
                  onChange={(e: any) => setTempAssetName(e.value)}
                  defaultValue={assets.filter(asset=>{return asset.value == tempAssetName})[0]}
                  components={{ Option: CustomOption }}
                  classNamePrefix="custom-select"
                  filterOption={createFilter({ ignoreAccents: false })}
                  options={assets}
                />
              ) : check == "coin" ? (                
                <ReactSelect
                  onChange={(e: any) => setTempCoin(e.value)}
                  defaultValue={blockchains.filter(asset=>{return asset.value == tempCoin})[0]}
                  components={{ Option: CustomOption }}
                  classNamePrefix="custom-select"
                  filterOption={createFilter({ ignoreAccents: false })}
                  options={blockchains}
                />
                // <Select value={tempCoin} onChange={(e)=>{setTempCoin(e.target.value)}}>
                //   <option key="1" value="POLYGON">Polygon (Matic)</option>
                //   <option key="2" value="XCP">Counterparty</option>
                //   <option key="3" value="BTC">Bitcoin</option>
                //   <option key="4" value="BCH">Bitcoin Cash</option>
                //   <option key="5" value="DGB">Digibyte</option>
                //   <option key="6" value="DOGE">Dogecoin</option>
                //   <option key="7" value="ETH">Ethereum</option>
                //   <option key="8" value="FTM">Fantom</option>
                //   <option key="9" value="LTC">Litecoin</option>
                //   <option key="10" value="NMC">Namecoin</option>
                //   <option key="11" value="OMNI">Omni</option>
                //   <option key="12" value="xDai">xDai</option>
                //   <option key="13" value="OMNI">Omni</option>
                //   <option key="14" value="XDP">Doge Party</option>
                //   <option key="15" value="XMP">Mona Party</option>
                //   <option key="16" value="XTZ">Tezos</option>
                // </Select>
              ) : check == "project" ? (
                <ReactSelect
                  onChange={(e: any) => setTempProject(e.value)}
                  defaultValue={projects.filter(asset=>{return asset.value == tempProject})[0]}
                  components={{ Option: CustomOption }}
                  classNamePrefix="custom-select"
                  filterOption={createFilter({ ignoreAccents: false })}
                  options={projects}
                />
                // <Select value={tempProject} onChange={(e)=>{setTempProject(e.target.value)}}>
                //   {projects.map((project, index)=>{
                //     return (<option key={"project-"+index} value={project}>{project}</option>)
                //   })}
                // </Select>
              ) : null}
            </VStack>
          )
        })}
        {metadataChecks.map((check, index)=>{
          return (
            <VStack>
              <Text>{index == 0 ? null : (tempSearchType == "or"? "or": "and")} {check == "vaultName" ? "within vault name": check=="vaultDescription" ? "within vault description": null}</Text>
              {check == "vaultName" ? (
                <Input value={tempVaultName} onChange={(e) => setTempVaultName(e.target.value)}></Input>
              ) : check== "vaultDescription" ? (
                <Input value={tempVaultDescription} onChange={(e) => setTempVaultDescription(e.target.value)}></Input>
              ) : null}              
            </VStack>
          )})}
          <Button
              m={2}
              isDisabled={balanceChecks.length < 1 && metadataChecks.length < 1}
              onClick={() => {
                setOffset(0)
                setState({ loaded: false })
                setVaults([])                
                setQ(true)
                let loc = location.href.split('?')[0] + '?'
                metadataChecks.forEach(key => {
                  if (key == "vaultDescription") {
                    loc = loc + key + '=' + tempVaultDescription + "&"
                  }
                  if (key == "vaultName") {
                    loc = loc + key + '=' + tempVaultName + "&"
                  }
                })
                balanceChecks.forEach(key => {
                  console.log(key)
                  if (key == "name") {
                    loc = loc + key + '=' + tempAssetName + "&"
                  }
                  if (key == "coin") {
                    loc = loc + key + '=' + tempCoin + "&"
                  }
                  if (key == "project") {
                    loc = loc + key + '=' + tempProject + "&"
                  }
                })
                if (tempSearchType) {
                  loc = loc + "searchType=" + tempSearchType + "&"
                }
                // let loc = location.href.split('?')[0]+"?q="+temp_q +  "&network=" + network
                console.log("SEARCH", loc)
                window.history.pushState('', 'Title', loc);
              }}
            >Search
          </Button>
      </VStack>
            
      {q? (
        <InfiniteScroll
          className="infinite-scroll"
          scrollableTarget="shannon-container"
          // height={200}
          dataLength={vaults.length} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          loader={<Refreshing />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b> 
            </p>
          }
        >
          <Flex w="100%" justify="center" flexWrap="wrap" mt={10}>        
            {vaults.length ? (
              vaults.map((vault, index) => {
                let pieces = location.pathname.split('/')
                pieces.pop()
                let url = location.origin + pieces.join('/') + '/nft?id=' + vault.tokenId
                const flexSettings = {
                  flex: '1',
                  minW: '200px',
                  maxW: '200px',
                  borderWidth: '1px',
                  // color: 'white',
                  mx: '6',
                  mb: '6',
                  rounded: 'lg',
                  overflow: 'hidden',
                  borderColor: vault.status == 'claimed' ? 'green !important' : '',
                  cursor: 'pointer',
                }
                const redirect = function () {
                  setLoadingApi(true)
                  location.href = url
                }
                if (hideClaimed && vault.status == 'claimed' || hideUnminted && !vault.live) {
                  return null
                } else {
                    return (
                      <Link href={url} className="vaultLink">
                        <Box className="NFT newest" key={index} {...flexSettings} onClick={redirect}>
                          <Text fontWeight="semibold" textAlign="center" mt={2} pl={2} isTruncated={true}>
                            {vault.name}
                            {!vault.private && vault.totalValue > 0 ? ': ~$' + vault.totalValue : null}
                          </Text>
                          <Stack align="center">
                            <Embed className="d-block w-100 NFT-newest-image" url={vault.image}/>
                          </Stack>
                          <Box d="flex" alignItems="baseline">
                            
                          </Box>
                          
                          <Stack align="center" mt={3}>
                            {vault.status == 'claimed' ? <Text color="green.500">CLAIMED</Text> : null}
                            <Text fontSize="xs">Id: {vault.tokenId}</Text>
                          </Stack>
                        </Box>
                      </Link>
                    )
                }
              })
              
            ) : (
              <Text>
                YOU DON'T SEEM TO HAVE ANY VAULTS.{' '}
                <Link color="#638cd8" href="../create">
                  CREATE ONE HERE!
                </Link>
              </Text>
            )}
            
          </Flex>
        </InfiniteScroll>
      ) : null}
    </Loader>
  )
}
