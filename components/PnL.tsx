import { Box, Flex, Text, Link, Image, Stack, Button, BoxProps, Input, Select, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import Loader from 'react-loader'
import Refreshing from './Refreshing'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import {HStack, VStack, Circle, Divider } from '@chakra-ui/react'

export default function PnL() {
  const { query } = useRouter()
  const { account, chainId } = useWeb3React()
  const [state, setState] = useState({ loaded: true })
  const [loadingApi, setLoadingApi] = useState(false)
  const [stats, setStats] = useState([])
  const [address, setAddress] = useState(query.address || null)
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [shouldFetchData, setShouldFetchData] = useState(address? true: false)
  const [hasMore, setHasMore] = useState(true)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  interface ErrorWithCode extends Error {
    code?: number
  }

  useEffect(() => {
    if (state.loaded == false && !loadingApi && address) {
      setLoadingApi(false)
      getPnL()
    }
  }, [])

  useEffect(() => {
    if (shouldFetchData && address) {
      console.log("Should load api after setting consts", offset)
      setShouldFetchData(false)
      getPnL()
    } else {
      console.log("wtf")
    }
  }, [shouldFetchData, offset])

  const fetchData = async() =>{    
    console.log('setting new offset to', offset+limit)
    setOffset(offset+limit)
    setShouldFetchData(true)
  }

  const getPnL = async() =>{
    setButtonDisabled(true)
    console.log("getting logs")
    fetch('https://api.emblemvault.io/s:osautomate/offer/'+address+'?limit='+limit+'&offset='+offset, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async function (response) {
      setLoadingApi(false)
      // setState({ loaded: true })
      let jsonData = await response.json()
      setStats(stats.concat(jsonData.intelligences))
      setButtonDisabled(false)
      console.log(jsonData)
      if (jsonData.intelligences.length == 0) {
        setHasMore(false)
      }
    })
  }

  return (
    <Loader loaded={state.loaded}>
      {loadingApi ? <Refreshing /> : ''}

      <Flex w="100%" justify="center" mt={10}>
        <Stack align="center" w={"100%"}>
          <HStack w={"20%"} mt={2}>
            <Input placeholder="Address: 0x..." w={"100%"} onChange={(e)=>{ setAddress(e.target.value) }} value={address}></Input>
            <Button isDisabled={buttonDisabled} onClick={()=>{ setShouldFetchData(true); setStats([])}} >Generate</Button>
          </HStack>
          {buttonDisabled? <Refreshing /> : ''}
          
          {stats.length > 0? (
            <>
              {/* <Text>Total Offers in USD: ${stats.offers.toFixed(2)}</Text>
              <Text>Total Number of offers: ${stats.offerCount.toFixed(2)}</Text> */}
              <InfiniteScroll                
                className="infinite-scroll"
                scrollableTarget="shannon-container"
                // height={200}
                dataLength={stats.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={<Refreshing />}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b> 
                  </p>
                }
              >
                {stats.map((item, index)=>{
                  return (
                    <>
                    <Stack direction="row" h="35px" p={2}>
                      <Divider orientation="vertical" />
                    </Stack>
                      <HStack key={"container-"+index} p={2} m={5} border-width={1} >
                        <Box className="coin-image-container" m={2} min-width="40px">
                          { item.image ? (
                            <Image width="50px" src={item.image}></Image>
                          ) : (
                            <Circle size="40px" bg="gray" color="white" isTruncated>
                              {item.collection[0]}
                            </Circle>
                          ) }
                        </Box>
                        <VStack p="10px" w="100%">
                          <HStack w="100%">
                            <Text float="left" pb={2} width="100%" fontWeight="bold" isTruncated={true}>
                              {item.collection} : {item.name? item.name : '#'+item.tokenId}
                            </Text>
                          </HStack>
                          <HStack w="100%" pt={5}  spacing="4px" className = "coin-display-row">
                            <Text position="relative" fontSize="xs" width="15%" color="gray">
                              Purchased for {item.totalCost} Ξ
                            </Text>                           
                            <Text width="25%" fontSize="xs" right="40px">
                              {item.offerAmount > 0 ? ('Best Offer: ' + item.offerAmount.toFixed(4) + ' Ξ') : 'No Offers'}
                            </Text>                            
                            <Text width="25%" fontSize="xs" right="40px">
                              {item.forSale ? ('For Sale: ' + item.salePrice + ' Ξ') : 'Not for sale' }
                            </Text>
                            <Text width="15%" text-align="center" fontSize="xs" right="40px">
                              Floor: {item.floor} Ξ
                            </Text>
                          </HStack>
                          <HStack w="100%" pt={5} spacing="4px" className = "coin-display-row">
                            <Text position="relative" fontSize="xs" width="15%" color="gray">
                             
                            </Text>                           
                            <Text width="25%" fontSize="xs" right="40px">
                              {item.offerPnL ? ('Offer / Cost △ : ' + (item.offerPnL || 0).toFixed(4) + ' Ξ') : '' }
                            </Text>
                            <Text width="25%" fontSize="xs" right="40px">
                              {item.forSale ? ('If Sold Profit: ' + item.salePnL.toFixed(4) + ' Ξ') : '' }
                            </Text>
                            <Text width="15%" fontSize="xs" right="40px">
                              
                            </Text>
                            <Text width="15%" fontSize="xs" right="40px">
                              
                            </Text>
                          </HStack>
                          <HStack w="100%" pt={5}  spacing="4px" className = "coin-display-row">
                            <Text position="relative" fontSize="xs" width="15%" color="gray">
                             
                            </Text>                           
                            <Text width="25%" fontSize="xs" right="40px">
                              {item.offerVsFloor ? ('Offer / Floor △: ' + item.offerVsFloor.toFixed(4) + ' Ξ') : '' }
                            </Text>
                            <Text width="25%" fontSize="xs" right="40px">
                              {item.forSale ? ('Sale / Floor △: ' + item.saleVsFloor.toFixed(4) + ' Ξ') : '' }
                            </Text>
                            <Text width="15%" fontSize="xs" right="40px">
                              
                            </Text>
                            <Text width="15%" fontSize="xs" right="40px">
                              
                            </Text>
                          </HStack>
                        </VStack> 
                                               
                      </HStack>
                      
                    </>
                  )
                })}
              </InfiniteScroll>
            </>
          ) : null }
        </Stack>
      </Flex>
     
    </Loader>
  )
}
