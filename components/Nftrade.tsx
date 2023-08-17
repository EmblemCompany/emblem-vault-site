import { Box, Flex, Text, Link, Image, Stack, Button, FormControl, FormLabel, Input, FormHelperText, Select } from '@chakra-ui/react'
import Loader from 'react-loader'

import Refreshing from './Refreshing'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { validImage } from '../utils'
import { Embed } from './Embed'
import { setTimeout } from 'timers'
import { useContract } from '../hooks'
import { Contract } from '@ethersproject/contracts'
import { EMBLEM_API, BURN_ADDRESS, contractAddresses } from '../constants'
import { TransactionToast } from './TransactionToast'


export default function NFTrade() {
  const { account, chainId, library } = useWeb3React()
  const { query } = useRouter()
  const [vaults, setVaults] = useState([])
  const [myVaults, setMyVaults] = useState([])
  const [myVaultsLoaded, setMyVaultsLoaded] = useState(false)
  const [collectionsLoaded, setCollectionsLoaded] = useState(false)
  const [state, setState] = useState({ loaded: false })
  const [loadingApi, setLoadingApi] = useState(false)
  const [hash, setHash] = useState(null)
  const [q, setQ] = useState(query.q)
  const [temp_q, setTempQ] = useState(q || '')
  const [network, setNetwork] = useState(query.network || null)
  const [address, setAddress] = useState(query.address)
  const [experimental, setExperimental] = useState(query.experimental)
  const [offeringTokenId, setOfferingTokenId] = useState(null)
  const [offeringTokenAllowed, setOfferingTokenAllowed] = useState(null)
  const [acceptingOfferingIndex, setAcceptingOfferIndex] = useState(null)
  const [acceptingTokenAllowed, setAcceptingTokenAllowed] = useState(null)
  const [acceptingTokenId, setAcceptingTokenId] = useState(null)
  const [collection, setCollection] = useState(query.collection || null)
  const [collections, setCollections] = useState([])
  

  const emblemContract = useContract(contractAddresses.emblemVault[chainId], contractAddresses.emblemAbi, true)
  const nftradeContract = useContract(contractAddresses.nftrade[chainId], contractAddresses.nftradeAbi, true)
  
  const getVaults = async () => {    
    setLoadingApi(true)
    try {      
      const response = await fetch(EMBLEM_API + '/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          service: 'evmetadata'
        },
        body: JSON.stringify({q: q, network: network == "null"? null : network, external: true, collections: [collection] })
      })
      let jsonData = await response.json()
      jsonData = jsonData.records
      setState({ loaded: true })
      if (jsonData.length > 0) {
          jsonData.forEach(async (data, index)=>{
          if (data && data.network === "matic" && chainId == 137) {
            let owner = await checkOwner(data.tokenId)
            let offerCount = await getOfferCount(data.tokenId)
            let mine = owner === account        
            let offers = await getOffers(offerCount, data.tokenId)
            if (offers.length < offerCount) {
              offerCount = offers.length
            }
            jsonData[index].offers = offers        
            jsonData[index].mine = mine
            jsonData[index].offerCount = offerCount
          }
          if (!data) {
            delete jsonData[index]
          }
          
          if (index +1 === jsonData.length) {
            setVaults(jsonData)
            setLoadingApi(false)
          }
        })        
      } else {
        setVaults(jsonData)
        setLoadingApi(false)
      }
      
    } catch (error) {}
  }

  const getMyVaults = async () => {
    console.log("Getting My Vaults")
    setMyVaultsLoaded(true)
    try {
      const response = await fetch(EMBLEM_API + '/vaults/' + (address ? address : account) + (experimental? '?experimental=true' : ''), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          service: 'evmetadata',
          chainId: chainId.toString(),
        },
      })
      const jsonData = await response.json()
      setMyVaults(jsonData)
      // console.log(jsonData)
    } catch (error) {}
  }

  const getCollections = async () => {
    console.log("Getting Collections")
    setCollectionsLoaded(true)
    try {
      const response = await fetch(EMBLEM_API + '/opensea/collections/'  , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          service: 'evmetadata'
        },
      })
      const jsonData = await response.json()
      setCollections(jsonData)
      // console.log(jsonData)
    } catch (error) {}
  }



  useEffect(() => {
    // console.log(q, state, loadingApi)
    nftradeStuff()
    if (q && !state.loaded && !loadingApi) {
      console.log("Load Search")
      getVaults()
    }
  })

  async function nftradeStuff() {
    !myVaultsLoaded ? await getMyVaults() : null
    !collectionsLoaded ? await getCollections() : null
    
    // let _owner  = await nftradeContract.ownerOf(tokenId)
  }

  async function getOfferCount(tokenId) {
    let offerCount  = await nftradeContract.getOfferCount(contractAddresses.emblemVault[chainId], tokenId)
    return Number(offerCount)
  }

  async function getOffers(count, tokenId) {
    let offers = []
    for (let i = 0; i < count; i++) {
      let offer  = await nftradeContract.getOffer(contractAddresses.emblemVault[chainId], tokenId, i)
      // debugger
      if (offer.nft !== "0x0000000000000000000000000000000000000000") {
        offers.push(offer)
      }
    }
    console.log('offers', offers)
    return offers
  }

  async function checkOfferingAllowance(tokenId) {
    let allowed  = await emblemContract.getApproved(tokenId)
    setOfferingTokenAllowed(allowed != "0x0000000000000000000000000000000000000000")
  }

  async function checkAcceptingAllowance(tokenId) {
    let allowed  = await emblemContract.getApproved(tokenId)    
    setAcceptingTokenAllowed(allowed != "0x0000000000000000000000000000000000000000")
  }

  async function checkOwner(tokenId) {
    //debugger
    console.log("checking owner for", tokenId)
    let owner  = await emblemContract.ownerOf(tokenId).catch(()=>{})
    return owner
  }

  const approveOffer = (tokenId) => {
    // debugger
    console.log("checking offer for", tokenId)
    ;(emblemContract as Contract)
      .approve(contractAddresses.nftrade[chainId], (tokenId && typeof tokenId === "string" ? tokenId: offeringTokenId))
      .then(({ hash }: { hash: string }) => {
        setHash(hash)
      })
      // .catch((error: ErrorWithCode) => {
      //   if (error?.code == 4001) {
      //     setApproving(false)
      //   }
      // })
  }

  const makeOffer = (tokenId) => {
    ;(nftradeContract as Contract)
      .addOffer(contractAddresses.emblemVault[chainId], offeringTokenId, contractAddresses.emblemVault[chainId], tokenId)
      .then(({ hash }: { hash: string }) => {
        setHash(hash)
      })
      // .catch((error: ErrorWithCode) => {
      //   if (error?.code == 4001) {
      //     setApproving(false)
      //   }
      // })
  }

  const acceptOffer = () => {    
    ;(nftradeContract as Contract)
      .acceptOffer(contractAddresses.emblemVault[chainId], acceptingTokenId, Number(acceptingOfferingIndex))
      .then(({ hash }: { hash: string }) => {
        setHash(hash)
      })
      // .catch((error: ErrorWithCode) => {
      //   if (error?.code == 4001) {
      //     setApproving(false)
      //   }
      // })
  }

  const rejectOffer = () => {    
    ;(nftradeContract as Contract)
      .rejectOffer(contractAddresses.emblemVault[chainId], acceptingTokenId, Number(acceptingOfferingIndex))
      .then(({ hash }: { hash: string }) => {
        setHash(hash)
      })
      // .catch((error: ErrorWithCode) => {
      //   if (error?.code == 4001) {
      //     setApproving(false)
      //   }
      // })
  }

  return (
    <Loader loaded={state.loaded || !q}>
      {loadingApi ? <Refreshing /> : ''}
      <Flex width="full" align="center" justifyContent="center" >
        <FormControl isRequired>
          <Flex width="full" align="center" justifyContent="center" flexWrap="wrap">
            <Input
              type="text"
              id="search-query"
              width='45%'
              aria-describedby="search-query-helper-text"
              placeholder="0xdeadbeef"
              maxLength={42}
              value={temp_q}
              onChange={(e) =>
                setTempQ(e.target.value)
              }
            />
            <Button
              m={2}
              onClick={() => {
                setState({ loaded: false })
                setQ(temp_q)
                let loc = location.href.split('?')[0]+"?q="+temp_q +  "&network=" + network + "&collection=" + collection
                window.history.pushState(temp_q, 'Title', loc);
              }}
            >Search
            </Button>
            <Select w="45%" placeholder="All Networks" value={network || ''}
              onChange={(e)=>{
                setNetwork(e.target.value)
                console.log(e.target.value)
              }}
            >
              <option value="matic">Matic</option>
              <option value="mainnet">Ethereum Mainnet</option>
              <option value="rinkeby">Ethereum Rinkeby</option>
            </Select>
            <Select ml={2} w="45%" placeholder="All Collections" value={collection || ''}
              onChange={(e)=>{
                setCollection(e.target.value)
                console.log(e.target.value)
              }}
            >
              {collections? (
                collections.map((collection, index) => {
                  return <option key={collection.slug} value={collection.slug}>{collection.name}</option>
                })
              ): null}
            </Select>
          </Flex>
          
          <FormHelperText id="search-query-helper-text">
            Search for Emblem Vaults by: Name, Description, Type, Contents
        </FormHelperText>
        </FormControl>
      </Flex>
      <Flex w="100%" justify="center" flexWrap="wrap" mt={10}>
        {vaults.length ? (
          vaults.map((vault, index) => {
            if (vault.name && vault.image) {
              let pieces = location.pathname.split('/')
              pieces.pop()
              // let url = location.origin + pieces.join('/') + '/nft?id=' + vault.tokenId
              let url = vault.external_url
              const flexSettings = {
                flex: '1',
                minW: '300px',
                maxW: '300px',
                borderWidth: '1px',
                color: 'white',
                mx: '6',
                mb: '6',
                rounded: 'lg',
                overflow: 'hidden',
                borderColor: vault.status == 'claimed' ? 'green !important' : '',
                cursor: 'pointer',
              }
              const redirect = function () {
                location.href = url
              }
              return (
                <Stack key={"stack_"+index}>
                  <Box key={index} {...flexSettings}>
                    <Text fontWeight="semibold" textAlign="center" mt={2}>
                      {vault.name}
                      {!vault.private && vault.totalValue? ': ~$' + vault.totalValue : (vault.contract && vault.contract.name) ? " : " + vault.contract.name : null}
                    </Text>
                    <Stack align="center">
                      <Embed url={vault.image}/>
                    </Stack>
                    <Box d="flex" alignItems="baseline">
                      <Stack>
                        <Box onClick={redirect} width="100%" color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="sm" ml="2">
                        {vault.private ? (
                          <>
                            <Text>Contents hidden. Click to view the vault and unlock values.</Text>
                          </>
                        ) : vault.values.length ? (
                          vault.values.map((coin, index) => {
                            if (index < 4)
                              return (
                                <Text key={coin.name} isTruncated>
                                  {coin.name}: {coin.balance}
                                </Text>
                              )
                            else if (index == 4)
                              return (
                                <Text fontWeight="bold" mt={2}>
                                  ... Click to see the rest ...
                                </Text>
                              )
                          })
                        ) : (
                              <Text>
                                Nothing in here! <br />
                            Click to fill 'er up!
                              </Text>
                            )}
                            
                            <Text>Offers: {vault.offerCount}</Text>
                      </Box>                      
                      {/* <Box key={"offer_"+index} {...flexSettings} minW="250px" >
                        {!vault.mine ? (
                        <Select p={2} m={2} w="84%%" placeholder="Offer NFT" 
                            onChange={(e)=>{
                              let tokenId = e.target.value
                              // console.log(e.target.value)
                              setOfferingTokenId(tokenId)
                              checkOfferingAllowance(tokenId)
                            }}
                          >
                            {myVaults.map((vault, index) => {
                              return (
                                <option key={index} value={vault.tokenId}>{vault.name}</option>
                              )
                            })}
                          </Select> ) : (
                            <Select p={2} m={2} w="34%" placeholder="Offers" 
                            onChange={(e)=>{
                              let index = e.target.value
                              console.log(e.target.value)
                              setAcceptingOfferIndex(index)
                              setAcceptingTokenId(vault.tokenId)
                              checkAcceptingAllowance(vault.tokenId)
                            }}
                          >
                            {vault.offers.map((offer, index) => {
                              return (
                                <option key={index} value={index}>{Number(offer.tokenId)}</option>
                              )
                            })}
                          </Select>
                          )}
                          {offeringTokenId && !vault.mine ? (
                            offeringTokenAllowed ? (
                              <Button m={2} onClick={()=>{makeOffer(vault.tokenId)}}>Make Offer</Button>) : (<Button m={2}  w="94%" onClick={approveOffer}>Approve</Button>
                            )
                        ) : null }
                        {acceptingOfferingIndex && vault.mine ? (
                            acceptingTokenAllowed ? (
                              <Button m={2} w="94%" onClick={()=>{acceptOffer()}}>Accept Offer</Button>) : (<Button m={2} onClick={() => {approveOffer(vault.tokenId)}}>Approve</Button>
                            )
                        ) : null }
                        {acceptingOfferingIndex && vault.mine ? (                    
                              <Button m={2} w="94%" onClick={()=>{rejectOffer()}}>Reject Offer</Button>) : null }
                      </Box> */}
                      </Stack>
                    </Box>
                    <Stack align="center" mt={3}>
                      {vault.status == 'claimed' ? <Text color="green.500">CLAIMED</Text> : null}
                    </Stack>
                        
                  </Box>
                  
                </Stack>
                
              )}
          })
          ) : (
          <Text>
            Search Resulted in 0 Vaults.{' '}
            <Link color="#638cd8" href="../create">
              CREATE ONE HERE!
            </Link>
          </Text>
        )}
      </Flex>
      {hash ? (
      <TransactionToast
          hash={hash}
          onComplete={() => {
            setHash(null)
          }}
        />
      ): null }
    </Loader>
  )
}
