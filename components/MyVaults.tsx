import { Box, Flex, Text, Link, Image, Stack, Spinner, useColorMode, Button } from '@chakra-ui/react'
import Loader from 'react-loader'
import Refreshing from './Refreshing'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { EMBLEM_API, curatedContracts } from '../constants'
import InfiniteScroll from 'react-infinite-scroll-component';
import Embed from './Embed'

export default function MyVaults() {
  const { query } = useRouter()
  const [pagePosition, setPagePosition] = useState(Number(query.start) || 0)
  const [curatedType, setCuratedType] = useState('live')
  const { account, chainId } = useWeb3React()
  const [vaults, setVaults] = useState([])
  const [liveVaults, setLiveVaults] = useState([])
  const [unMintedVaults, setUnMintedVaults] = useState([])
  const [claimedVaults, setClaimedVaults] = useState([])
  const [state, setState] = useState({ loaded: false })
  const [loadingApi, setLoadingApi] = useState(false)
  const [address, setAddress] = useState(query.address)
  const [vaultType, setVaultType] = useState(query.type || "unclaimed")
  const [experimental, setExperimental] = useState(query.experimental)
  const {colorMode } = useColorMode()
  const [shouldFetchData, setShouldFetchData] = useState(false)
  const [version, setVersion] = useState(query.version != null)
  const [hasMore, setHasMore] = useState(version? true: false)
  const [offset, setOffset] = useState(0)
  const [liveCollections, setLiveCollections] = useState([])
  const [unMintedCollections, setUnMintedCollections] = useState([])
  const [claimedCollections, setClaimedCollections] = useState([])
  const [showJump, setShowHJump] = useState(query.jump == "true")
  
  const PAGE_SIZE = 20

  const isAllowedJump = (vaultData) => {
    // console.log('here', vaultData)
    let found =  curatedContracts.some(contract => 
      contract.allowedJump && contract.allowedJump(vaultData.ownership, [])
    );
    // console.log('-------', found)
    return found
  }

  const selectVaultImage = (vaultData) => {
    // curatedType == 'live' && vaultType == 'curated'? vault.items[0].image : vault.image
    if (vaultData.ownership && vaultData.ownership.balances && vaultData.ownership.balances.length > 0 && vaultData.ownership.category == 'erc721') {
      return vaultData.ownership.balances[0].image
    } else if (vaultData.ownership && vaultData.ownership.category == 'erc721a' && vaultData.ownership.balances && vaultData.ownership.balances.length > 0) {
      return vaultData.ownership.balances[0].image
    } else if (vaultData.ownership && vaultData.ownership.category == 'erc721a') {
      return vaultData.targetAsset.image
    }
    return vaultData.image
  }

  const allowedJumpContracts = (vaultData) => {
    let foundContracts = curatedContracts.filter(contract => 
      contract.allowedJump && contract.allowedJump(vaultData.ownership, [])
    );
    return foundContracts;
  }

  const contractInfo = (vaultData) => {
    if (vaultData.ownership && vaultData.ownership.category == 'erc721Legacy') {
      return "Legacy Vault"
    } else {
      return vaultData.targetContract.name
    }
  }

  const getVaults = async () => {
    try {
      const response = await fetch('https://metadata.emblemvault.io' + `/${version || vaultType == "curated"? 'v1-':''}myvaults/`+(address ? address : account)+'?start='+offset+'&size='+PAGE_SIZE, { //+'&_vercel_no_cache=1'
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          '_vercel_no_cache':'1',
          service: 'evmetadata',
          chainId: chainId.toString(),
          vaultType: vaultType.toString()
        },
      })
      let jsonData = await response.json()
      if (vaultType.toString() != 'curated') {
        setVaults(vaults.concat(jsonData))
        setState({ loaded: true })
        setLoadingApi(false)
        console.log("Records received", jsonData.length)
      } else if (vaultType.toString() == 'curated'){
        setLiveVaults(groupItemsByTargetTokenId(jsonData.live))
        setUnMintedVaults(jsonData.unMinted)
        setClaimedVaults(jsonData.claimed)
        setVaults(groupItemsByTargetTokenId(jsonData.live))
        setState({ loaded: true })
        setLoadingApi(false)
        setHasMore(false)
        setLiveCollections(Array.from(new Set(jsonData.live.map(item=>{return item.targetContract.name}))))
        setUnMintedCollections(Array.from(new Set(jsonData.unMinted.map(item=>{return item.targetContract.name}))))
        setClaimedCollections(Array.from(new Set(jsonData.claimed.map(item=>{return item.targetContract.name}))))
      } else if (jsonData.length < PAGE_SIZE) {
        setHasMore(false)
      }
    } catch (error) {}
  }

  const fetchData = async() =>{
    console.log(offset, PAGE_SIZE, offset+PAGE_SIZE)
    setOffset(offset+PAGE_SIZE)
    setShouldFetchData(true)
  }

  function groupItemsByTargetTokenId(data) {
    // const data = JSON.parse(jsonData);
    const itemsMap = new Map();
  
    // Iterate through the data and group items by targetTokenId
    for (const item of data) {
      const targetTokenId = item.targetTokenId;
      if (itemsMap.has(targetTokenId)) {
        itemsMap.get(targetTokenId).push(item);
      } else {
        itemsMap.set(targetTokenId, [item]);
      }
    }
  
    // Convert the itemsMap to an array of objects
    const items = Array.from(itemsMap.entries()).map(([targetTokenId, items]) => {
      return {
        targetTokenId: targetTokenId,
        items: items
      };
    });
  
    return items;
  }

  // const more = ()=>{
  //   if (location.href.includes('start')) {
  //     location.href = location.href.replace('start='+pagePosition, 'start='+(pagePosition + PAGE_SIZE))
  //   } else {
  //     location.href = location.href + '?start='+(pagePosition + PAGE_SIZE)
  //   }
  //   // setPagePosition(pagePosition + PAGE_SIZE)
  //   // getVaults()
  // }

  // const less = ()=>{
  //   if (pagePosition - PAGE_SIZE < 0) {
  //     setPagePosition(PAGE_SIZE)
  //   }
  //   if (location.href.includes('start')) {
  //     location.href = location.href.replace('start='+pagePosition, 'start='+(pagePosition - PAGE_SIZE))
  //   } else {
  //     location.href = location.href + '?start='+(pagePosition - PAGE_SIZE)
  //   }
  //   // setPagePosition(pagePosition + 3)
  //   // getVaults()
  // }

  // const loadCache = () => {
  //   let vaults = JSON.parse(localStorage.getItem((address ? address : account) + '_' + chainId + '_newest')) // Load vaults from storage before updating from server!
  //   if (vaults) {
  //     setState({ loaded: true })
  //     setVaults(vaults)
  //     setLoadingApi(true)
  //   }
  // }

  // const saveCache = (vaults) => {
  //   localStorage.setItem((address ? address : account) + '_' + chainId + '_newest', JSON.stringify(vaults)) // Save new state for later
  // }

  const [acct, setAcct] = useState('')
  useEffect(() => {
    if (account && acct != account) {
      setAcct(account)
      setState({ loaded: false })
      getVaults()
    }
  }, [account, acct])

  const [chain, setChain] = useState(chainId)
  useEffect(() => {
    if (chainId && chain != chainId) {
      setChain(chainId)
      setState({ loaded: false })
      getVaults()
    }
  }, [chainId, chain])

  const showOrHideNavLink = (path: string)=> {
    return vaultType == path ? true: false
  }

  const handleNewNavigationClick = (path)=>{
    if (!address) {
      location.href = location.origin + location.pathname + "?type=" + path + (showJump? '&jump=true': '')
    } else {
      location.href = location.origin + location.pathname + "?address=" + address + "&type=" + path + (showJump? '&jump=true': '')
    }
  }

  const handleNftsNavigationClick = ()=>{
    if (!address) {
      location.href = location.origin + '/nfts'
    } else {
      location.href = location.origin + '/nfts' + "?address=" + address
    }
  }

  useEffect(() => {
    if (shouldFetchData) {
      setShouldFetchData(false)
      getVaults()
    } else {
    }
  }, [shouldFetchData])

  return (
    <>
    <Stack pl="10" spacing={0} direction="row">
      {/* <Button isDisabled={showOrHideNavLink('curated')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('curated')}}>
          Curated
      </Button> */}
      <Button isDisabled={showOrHideNavLink('unclaimed')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('unclaimed')}}>
          Locked
      </Button>
      <Button isDisabled={showOrHideNavLink('claimed')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('claimed')}}>
          Unlocked
      </Button>
      <Button isDisabled={showOrHideNavLink('unminted')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('unminted')}}>
          Not Minted
      </Button>
      {/* <Button isDisabled={showOrHideNavLink('created')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('created')}}>
          Created by me
      </Button>
      <Button isDisabled={false} m={2} variant="ghost" onClick={()=>{handleNftsNavigationClick()}}>
          Other NFT's
      </Button> */}
    </Stack>
    {showOrHideNavLink('curated')? (
      <>
        <Stack pl="8.7rem" spacing={0} direction="row">
          {liveVaults.length? (
            <Button isDisabled={curatedType=='live'} m={2} variant="ghost" onClick={()=>{setVaults(liveVaults); setCuratedType('live')}}>
              Unclaimed (curated) {liveVaults.length}
            </Button>
          ): null}
          {claimedVaults.length? (
            <Button isDisabled={curatedType=='claimed'} m={2} variant="ghost" onClick={()=>{setVaults(claimedVaults); setCuratedType('claimed')}}>
              Claimed (curated) {claimedVaults.length}
            </Button>
          ): null}
          {unMintedVaults.length? (
            <Button isDisabled={curatedType=='unminted'} m={2} variant="ghost" onClick={()=>{setVaults(unMintedVaults); setCuratedType('unminted')}}>
              Not Minted (curated) {unMintedVaults.length}
            </Button>
          ): null}
          
        </Stack>
          <Stack pl="12.7rem" spacing={0} direction="row">
            {liveCollections.length && curatedType == 'live' ? (
              liveCollections.map((name, index) => {
                return (
                  <Button isDisabled={true} key={index} m={2} variant="ghost">{name}</Button>
                )
              })
            ) : null}
            {claimedCollections.length && curatedType == 'claimed' ? (
              claimedCollections.map((name, index) => {
                return (
                  <Button isDisabled={true} key={index} m={2} variant="ghost">{name}</Button>
                )
              })
            ) : null}
            {unMintedCollections.length && curatedType == 'unminted' ? (
              unMintedCollections.map((name, index) => {
                return (
                  <Button isDisabled={true} key={index} m={2} variant="ghost">{name}</Button>
                )
              })
            ) : null}
          </Stack>
      </>
    ): null}
    <Loader loaded={state.loaded}>
      {loadingApi ? <Refreshing /> : ''}
        
        <InfiniteScroll                
          className="infinite-scroll"
          scrollableTarget="shannon-container"
          // height={200}
          dataLength={vaults.length} //This is important field to render the next data
          next={!showOrHideNavLink('curated')? fetchData: ()=>{}}
          hasMore={hasMore}
          loader={<Refreshing />}
          endMessage={
            <></>
            // <p style={{ textAlign: 'center' }}>
            //   <b>No more vaults to load.</b> 
            // </p>
          }
        >
      <Flex w="100%" justify="center" flexWrap="wrap" mt={10}>        
        {vaults.length ? (
          vaults.map((vault, index) => {
            let pieces = location.pathname.split('/')
            pieces.pop()
            let isERC721a = vault.items && vault.items[0].targetContract && vault.items[0].targetContract.collectionType == 'ERC721a'? true : false
            let isLiveCurated = curatedType == 'live' && vaultType == 'curated'
            let url = location.origin + pieces.join('/') + '/nft'+(vaultType == 'curated' || vault.targetContract ? '2': '')+'?id=' + (isLiveCurated? (isERC721a ? vault.items[0].tokenId: vault.targetTokenId) : vault.tokenId) + '&cc=t'
            const vaultContainerSettings = {
              flex: '1',
              minW: '200px',
              maxW: '200px',
              minH: '250px',
              maxH: '250px',
              borderWidth: '1px',
              // color: 'white',
              mx: '6',
              mb: '6',
              rounded: 'lg',
              overflow: 'hidden',
              borderColor: vault.network == 'matic' ? '#7145db !important' : vault.network == 'rinkeby'? '#ed6d20 !important': '#627eea !important',
              cursor: 'pointer',
            }
            let infoContainerSettings = {
              borderColor : '',
              flex: '1',
              minW: '200px',
              maxW: '200px',
              borderWidth: '1px',
              // color: 'white',
              mx: '6',
              mb: '6',
              rounded: 'lg',
              overflow: 'hidden'
            }
            const redirect = function () {
              setLoadingApi(true)
              location.href = url
            }
            return (
              <Box>
                <Link href={url} className="vaultLink">
                  <Box className="NFT newest" key={index} {...vaultContainerSettings} onClick={redirect}>
                    <Text fontWeight="semibold" textAlign="center" mt={2} pl={2} isTruncated={true}>                    
                      {curatedType == 'live' && vaultType == 'curated' ? vault.items[0].name: vault.name}
                      {!vault.private && vault.totalValue > 0 ? ': ~$' + vault.totalValue : null}
                      
                    </Text>
                    <Stack align="center">
                      <Embed className="d-block NFT-image-v3" url={selectVaultImage(vault)}/>                    
                      {curatedType == 'live' && vaultType == 'curated' && vault.items.length > 1 ? (<Text>{' you own '+ vault.items.length}</Text>) : null}
                    </Stack>
                    <Stack align="center" mt={3}>
                      {curatedType == 'live' && vaultType == 'curated' && vault.items.length > 1 ? ' you own '+ vault.items.length : null}
                    </Stack>
                  </Box>                
                </Link>
                
                  <Box className="NFT newest" key={index} {...infoContainerSettings} >
                  <Text fontSize={'small'} fontWeight="semibold" textAlign="left" pl={2} isTruncated={true}> Network: {vault.network} </Text>
                  <Text fontSize={'small'} fontWeight="semibold" textAlign="left" pl={2} isTruncated={true}> Contract: {contractInfo(vault)} </Text>
                  {allowedJumpContracts(vault).length > 0 && showJump ? (
                    <>                      
                      {allowedJumpContracts(vault).map((contract, index) => {
                        return (
                          <Link fontSize={'x-small'} textAlign="left" pl={2}> Circuit jump to: {contract.name} Collection</Link>
                        )
                      })}
                    </>
                  ) : null}
                  
                </Box>
                
                
              </Box>
            )
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
    </Loader>
    </>
  )
}
