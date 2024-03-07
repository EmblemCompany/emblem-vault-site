import { Box, Flex, Text, Link, Image, Stack, Spinner, useColorMode, Button, Checkbox, Tooltip, Input } from '@chakra-ui/react'
import Loader from 'react-loader'
import Refreshing from './Refreshing'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { EMBLEM_API, EMBLEM_V2_API, contractAddresses, curatedContracts } from '../constants'
import InfiniteScroll from 'react-infinite-scroll-component';
import Embed from './Embed'
import { initCuratedContracts, sdk } from '../utils'
import { getCachedVaults, saveVaultsToDatabase } from '../db'
import { useContract } from '../hooks'
import { Contract } from '@ethersproject/contracts'


export default function MyVaults() {
  const { query } = useRouter()
  // const [ townHall, setTownHall] = useState(query.townHall || false)
  const [showMigratable, setIsShowMigratable] = useState(false);
  const [showJumpable, setIsShowJumpable] = useState(false);
  const [showMintable, setIsShowMintable] = useState(false);
  const [bulk, setBulk] = useState(query.bulk == 'true')
  const [pagePosition, setPagePosition] = useState(Number(query.start) || 0)
  const [curatedType, setCuratedType] = useState('live')
  const { account, chainId, library } = useWeb3React()
  const [vaults, setVaults] = useState([])
  const [vaultsCache, setVaultsCache] = useState([])
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
  const [curatedContracts, setCuratedContracts] = useState([])
  const [selectedVaults, setSelectedVaults] = useState(new Set());
  const vaultHandlerContract = useContract(contractAddresses.vaultHandlerV8[chainId], contractAddresses.vaultHandlerV8Abi, true)
  // const [showJump, setShowHJump] = useState(query.jump == "true")
  const [dbStale, setDbStale] = useState(true)
  const [vaultNumber, setVaultNumber] = useState('')  
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
    if (vaultData.ownership && vaultData.ownership.balances && vaultData.ownership.balances.length > 0 && vaultData.ownership.category == 'erc721') {
      return vaultData.ownership.balances[0].image
    } else if (vaultData.ownership && vaultData.ownership.category == 'erc721a' && vaultData.ownership.balances && vaultData.ownership.balances.length > 0) {
      return vaultData.ownership.balances[0].image
    } else if (vaultData.ownership && vaultData.ownership.category == 'erc721a') {
      return vaultData.targetAsset.image
    }
    return vaultData.image
  }

  const contractInfo = (vaultData) => {
    if (vaultData.ownership && vaultData.ownership.category == 'erc721Legacy') {
      return "Legacy Vault"
    } else if (vaultData.targetContract && vaultData.targetContract.name) {
      return vaultData.targetContract.name
    } else {
      return "Unknown"
    }
  }

  const bulkMintSelected = () => {
    let tokenIds = Array.from(selectedVaults)
    let contracts = tokenIds.map(tokenId => vaults.find(vault => vault.tokenId === tokenId).targetContract.name);
    library.getSigner(account)
      .signMessage('Curated Bulk Minting: ' + tokenIds.sort().join(','))
      .then((signature) => {
        console.log('Signature:', signature)
        fetch(EMBLEM_V2_API + '/mint-curated-bulk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({method: 'buyWithSignedPrice', tokenIds: tokenIds, contracts: contracts, signature: signature, chainId: chainId.toString()}),
        }).then(async function (response: any){
          let data = await response.json()
          ;(vaultHandlerContract as Contract)
          .buyWithQuoteBulk(data.contractAddresses[0], 0, data.payloads.map(item=>{return item._to}), data.payloads.map(item=>{return item._tokenId}).sort(), data.nonce, data.sig, 0, data.payloads.length, {value: 0})
          .then(({ hash }: { hash: string }) => {

          })
        })
      })
  }

  // Function to handle individual vault selection toggle
  const toggleVaultSelection = (tokenId) => {
    setSelectedVaults(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(tokenId)) {
        newSelected.delete(tokenId);
      } else {
        newSelected.add(tokenId);
      }
      return newSelected;
    });
  };

  // Function to select/deselect all vaults
  const toggleSelectAll = () => {
    if (selectedVaults.size < vaults.length) {
      setSelectedVaults(new Set(vaults.map(vault => vault.tokenId)));
    } else {
      setSelectedVaults(new Set());
    }
  };

  // Function to handle vault amount selection
  const selectVaultAmount = (amount) => {
    setSelectedVaults(() => {
      const newSelected = new Set();
      const vaultsToSelect = vaults.slice(0, amount);
      vaultsToSelect.forEach(vault => {
        newSelected.add(vault.tokenId);
      });
      return newSelected;
    });
  };

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
        await saveVaultsToDatabase(jsonData);
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

  const [acct, setAcct] = useState('')
  useEffect(() => {
    if (account && acct != account) {
      setAcct(account)
      setState({ loaded: false })
      loadFromDatabase();
      if(!localStorage.getItem('offline') || localStorage.getItem('offline') === 'false') {
        getVaults();
      }
      // getVaults()
    }
  }, [account, acct])

  useEffect(() => {    
    if (dbStale) {
      setDbStale(false)
      loadFromDatabase();
    }
  }, [dbStale]);

  // Update effect for version or vaultType changes
  useEffect(() => {
    // When vaultType or version changes, clear selections
    setSelectedVaults(new Set());
  }, [version, vaultType, showMintable]);

  const loadFromDatabase = async () => {
    // setVaults([]);
    let cachedVaults: any = await getCachedVaults(vaultType == "unclaimed"? "minted": vaultType, address? address: account);
    setVaults(cachedVaults);
    setState({ loaded: true })
  }

  const showOrHideNavLink = (path: string)=> {
    return vaultType == path ? true: false
  }

  const handleNewNavigationClick = (path)=>{
    if (!address) {
      location.href = location.origin + location.pathname + "?type=" + path
    } else {
      location.href = location.origin + location.pathname + "?address=" + address + "&type=" + path
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
      initCuratedContracts().then((data)=>{
        setCuratedContracts(data)
      })
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
      {
        account && showOrHideNavLink('unclaimed') ? (
          <>
            <Button colorScheme={!showMigratable ? "gray" : "blue"} m={2} variant="ghost" onClick={async ()=>{
              setIsShowMigratable(true);
              let migratable = await sdk.generateMigrateReport(address || account, true)
              migratable = Object.keys(migratable).map(item => ({
                tokenId: item,
                info: migratable[item]
              }))
              // const migratableVaults: any = (vaultsCache.length > 0? vaultsCache: vaults).filter(vault => migratable.some(mig => mig.tokenId === vault.tokenId && mig.info.to.length > 0));
              const migratableVaults: any = (vaultsCache.length > 0 ? vaultsCache : vaults).filter(vault => {
                return (
                  migratable.some(mig => {
                    if(mig.tokenId === vault.tokenId && mig.info.to.length > 0 && vault.network == "mainnet" && mig.info.to != "Embels") {                     
                      vault.move = mig.info;
                      return true;
                    }
                    return false;
                  })                
                )                  
              });
              if (!showMigratable) {              
                vaultsCache.length == 0 ? setVaultsCache(vaults) : null
                setVaults(migratableVaults)
                setIsShowMigratable(true)
                setIsShowJumpable(false)
              } else if (migratableVaults.length > 0) {
                setVaults(vaultsCache)
                setVaultsCache([])
                setIsShowMigratable(false)
              }
            }}>
              Migrate
            </Button>
            <Button colorScheme={!showJumpable ? "gray" : "blue"} m={2} variant="ghost" onClick={async ()=>{
              setIsShowJumpable(true);
              let jumpable = await sdk.generateJumpReport(address || account, true)
              jumpable = Object.keys(jumpable).map(item => ({
                tokenId: item,
                info: jumpable[item]
              }))
              // const jumpableVaults: any = (vaultsCache.length > 0 ? vaultsCache: vaults).filter(vault => jumpable.some(mig => mig.tokenId === vault.tokenId && mig.info.to.length > 0));
              const jumpableVaults: any = (vaultsCache.length > 0 ? vaultsCache : vaults).filter(vault => {
                return (
                  jumpable.some(mig => {
                    if(mig.tokenId === vault.tokenId && mig.info.to.length > 0) {
                      vault.move = mig.info;
                      return true;
                    }
                    return false;
                  })                
                )                  
              });
              if (!showJumpable) {              
                vaultsCache.length == 0 ? setVaultsCache(vaults) : null
                setVaults(jumpableVaults)
                setIsShowJumpable(true)
                setIsShowMigratable(false)
              } else if (jumpableVaults.length > 0) {
                setVaults(vaultsCache)
                setVaultsCache([])
                setIsShowJumpable(false)
              }
            }}>
              Jump
            </Button>
          </>
        ) : null
      }
      {
        account && showOrHideNavLink('unminted') ? (
          <>
            <Button colorScheme={!showMintable ? "gray" : "blue"} m={2} variant="ghost" onClick={async ()=>{
              setIsShowMintable(true);
              let mintable = await sdk.generateMintReport(address || account, true)
              mintable = Object.keys(mintable).map(item => ({
                tokenId: item,
                info: mintable[item]
              })).map(item => ({...item, info: {...item.info, to: [item.info.to]}})); // make single mintable to, into arr
              const mintableVaults: any = (vaultsCache.length > 0 ? vaultsCache : vaults).filter(vault => {
                return (
                  mintable.some(mig => {
                    if(mig.tokenId === vault.tokenId && mig.info.to.length > 0) {
                      vault.move = mig.info;
                      return true;
                    }
                    return false;
                  })                
                )                  
              });

              if (!showMintable) {              
                vaultsCache.length == 0 ? setVaultsCache(vaults) : null
                setVaults(mintableVaults)
                setIsShowMintable(true)
                setIsShowJumpable(false)
                setIsShowMigratable(false)
              } else if (mintableVaults.length > 0) {
                setVaults(vaultsCache)
                setVaultsCache([])
                setIsShowMintable(false)
              }
            }}>
              Bulk Mint
            </Button>
          </>
        ): null
      }
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
      {showMintable && bulk ? (
        <Box pl={20}>
          <Checkbox onChange={toggleSelectAll} isChecked={selectedVaults.size === vaults.length && vaults.length > 0}>
            Select All
          </Checkbox>
          <Input
            type="number"
            id="vault-amount"
            aria-describedby="vault-amount-helper-text"
            onChange={(e) => selectVaultAmount(e.target.value)}
          />
          <Button ml={5} onClick={bulkMintSelected} isDisabled={selectedVaults.size === 0}>
            Mint {selectedVaults.size} Selected
          </Button>
        </Box>
      ): null}
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
            let url = location.origin + pieces.join('/') + '/nft'+(vaultType == 'curated' || vault.targetContract ? '2': '')+'?id=' + (isLiveCurated? (isERC721a ? vault.items[0].tokenId: vault.targetTokenId) : vault.tokenId)
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
                <Tooltip label="Bulk Coming Soon" fontSize="md">
                  <Box className="NFT newest" key={index} {...infoContainerSettings} >
                    
                      <Text fontSize={'small'} fontWeight="semibold" textAlign="left" pl={2} isTruncated={true}> Network: {vault.network == "mainnet"? "Ethereum": vault.network == "matic"? "Polygon": vault.network} </Text>
                      
                      <Text fontSize={'small'} fontWeight="semibold" textAlign="left" pl={2} isTruncated={true}> Contract: {contractInfo(vault)} </Text>
                      {
                        vault.move && (showMintable || showMigratable || showJumpable) ? (
                          
                          vault.move.to.map((to, index) => (
                            to != "Embels"?
                              <Checkbox mt={2} ml={2} size="sm" isChecked={selectedVaults.has(vault.tokenId)} onChange={() => toggleVaultSelection(vault.tokenId)}>
                                <Text fontSize={'small'} fontWeight="semibold" textAlign="left" pl={2} isTruncated={true}> {showOrHideNavLink('unminted') ? 'Mint To: ' : showJumpable? 'Jump To: ': 'Migrate To: '} {to} </Text>
                              </Checkbox>:null                         
                          ))
                        ): null}
                  
                  </Box>
                </Tooltip>
                
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
