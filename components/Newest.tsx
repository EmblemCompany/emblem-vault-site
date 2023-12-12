import { Box, Flex, Text, Link, Image, Stack, Spinner, useColorMode } from '@chakra-ui/react'
import Loader from 'react-loader'
import Refreshing from './Refreshing'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { EMBLEM_API, EMBLEM_V3_API } from '../constants'
import InfiniteScroll from 'react-infinite-scroll-component';
import Embed from './Embed'

export default function Newest() {
  const { query } = useRouter()
  const [pagePosition, setPagePosition] = useState(Number(query.start) || 0)
  const [reverse, setReverse] = useState(query.reverse == 'true' || false)
  const { account, chainId } = useWeb3React()
  const [vaults, setVaults] = useState([])
  const [state, setState] = useState({ loaded: false })
  const [loadingApi, setLoadingApi] = useState(false)
  const [address, setAddress] = useState(query.address)
  const [experimental, setExperimental] = useState(query.experimental)
  const { colorMode } = useColorMode()
  const [shouldFetchData, setShouldFetchData] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)
  const PAGE_SIZE = 20

  const getVaults = async () => {    
    console.log('getting vaults')
    try {
      const response = await fetch(EMBLEM_V3_API + '/newest/?start='+offset+'&size='+PAGE_SIZE+'&reverse='+reverse, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          service: 'evmetadata',
          chainId: chainId.toString(),
        },
      })
      let jsonData = await response.json()      
      setVaults(vaults.concat(jsonData.filter(item => item !== null)))
      setState({ loaded: true })
      setLoadingApi(false)
      setHasMore(false)
    } catch (error) {}
  }

  const fetchData = async() =>{
    console.log(offset, PAGE_SIZE, offset+PAGE_SIZE)
    setOffset(offset+PAGE_SIZE)
    setShouldFetchData(true)
  }

  const more = ()=>{
    if (location.href.includes('start')) {
      location.href = location.href.replace('start='+pagePosition, 'start='+(pagePosition + PAGE_SIZE))
    } else {
      location.href = location.href + '?start='+(pagePosition + PAGE_SIZE)
    }
  }

  const less = ()=>{
    if (pagePosition - PAGE_SIZE < 0) {
      setPagePosition(PAGE_SIZE)
    }
    if (location.href.includes('start')) {
      location.href = location.href.replace('start='+pagePosition, 'start='+(pagePosition - PAGE_SIZE))
    } else {
      location.href = location.href + '?start='+(pagePosition - PAGE_SIZE)
    }
  }

  const loadCache = () => {
    let vaults = JSON.parse(localStorage.getItem((address ? address : account) + '_' + chainId + '_newest')) // Load vaults from storage before updating from server!
    if (vaults) {
      setState({ loaded: true })
      setVaults(vaults)
      setLoadingApi(true)
    }
  }

  const saveCache = (vaults) => {
    localStorage.setItem((address ? address : account) + '_' + chainId + '_newest', JSON.stringify(vaults)) // Save new state for later
  }

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

  useEffect(() => {
    // console.log('here', chainId, chain, account, state)
    if (!account && !state.loaded) {      
      setState({ loaded: false })
      getVaults()
    }
  }, [chainId, chain])

  useEffect(() => {
    if (shouldFetchData) {
      setShouldFetchData(false)
      getVaults()
    } else {
    }
  }, [shouldFetchData])

  return (
    <Loader loaded={state.loaded}>
      {loadingApi ? <Refreshing /> : ''}
       
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
            console.log("vault", vault)
            let url = location.origin + pieces.join('/') + '/nft2?id=' + (vault.tokenId)
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
            return (
              <Link href={url} className="vaultLink">
                <Box className="NFT newest" key={index} {...flexSettings} onClick={redirect}>
                  <Text fontWeight="semibold" textAlign="center" mt={2} pl={2} isTruncated={true}>
                    {vault.targetAsset? vault.targetAsset.name: vault.name}
                    {!vault.private && vault.totalValue > 0 ? ': ~$' + vault.totalValue : null}
                  </Text>
                  <Stack align="center">
                    <Embed className="d-block w-100 NFT-newest-image" url={vault.targetAsset? vault.targetAsset.image: vault.image}/>
                  </Stack>
                  <Stack align="center" mt={3}>
                    {vault.status == 'claimed' ? <Text color="green.500">CLAIMED</Text> : null}
                  </Stack>
                </Box>
              </Link>
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
  )
}
