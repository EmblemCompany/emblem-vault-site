import { Box, Flex, Text, Link, Image, Stack, Button, FormControl, FormLabel, Input, FormHelperText, Select } from '@chakra-ui/core'
import Loader from 'react-loader'
import Refreshing from './Refreshing'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { validImage } from '../utils'
import { EMBLEM_API } from '../constants'
import { Embed } from './Embed'
import { setTimeout } from 'timers'

export default function Search() {
  const { query } = useRouter()
  const [vaults, setVaults] = useState([])
  const [state, setState] = useState({ loaded: false })
  const [loadingApi, setLoadingApi] = useState(false)
  const [q, setQ] = useState(query.q)
  const [temp_q, setTempQ] = useState(q || '')
  const [network, setNetwork] = useState(query.network || null)
  const getVaults = async () => {
    // loadCache()
    setLoadingApi(true)
    try {      
      const response = await fetch(EMBLEM_API + '/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          service: 'evmetadata'
        },
        body: JSON.stringify({q: q, network: network})
      })
      const jsonData = await response.json()
      setState({ loaded: true })
      setVaults(jsonData.records)
      // saveCache(jsonData)
      setLoadingApi(false)
      // console.log(jsonData)
    } catch (error) {}
  }

  // const loadCache = () => {
  //   let vaults = JSON.parse(localStorage.getItem((address ? address : account) + '_' + chainId + '_allvaults')) // Load vaults from storage before updating from server!
  //   if (vaults) {
  //     setState({ loaded: true })
  //     setVaults(vaults)
  //     setLoadingApi(true)
  //   }
  // }

  // const saveCache = (vaults) => {
  //   localStorage.setItem((address ? address : account) + '_' + chainId + '_allvaults', JSON.stringify(vaults)) // Save new state for later
  // }


  useEffect(() => {
    console.log(q, state, loadingApi)
    if (q && !state.loaded && !loadingApi) {
      console.log("Load Search")
      getVaults()
    }
    // if (q && !state.loaded && !loadingApi) {
    //   setState({ loaded: false })
    //   getVaults()
    // }
  })

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
                let loc = location.href.split('?')[0]+"?q="+temp_q +  "&network=" + network
                window.history.pushState(temp_q, 'Title', loc);
              }}
            >Search
            </Button>
            <Select w="45%" placeholder="All Networks" value={network}
              onChange={(e)=>{
                setNetwork(e.target.value)
                console.log(e.target.value)
              }}
            >
              <option value="matic">Matic</option>
              <option value="xdai">xDai</option>
              <option value="mainnet">Ethereum Mainnet</option>
              <option value="rinkeby">Ethereum Rinkeby</option>
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
            let pieces = location.pathname.split('/')
            pieces.pop()
            let url = location.origin + pieces.join('/') + '/nft?id=' + vault.tokenId
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
              <Box key={index} {...flexSettings} onClick={redirect}>
                <Text fontWeight="semibold" textAlign="center" mt={2}>
                  {vault.name}
                  {!vault.private ? ': ~$' + vault.totalValue : null}
                </Text>
                <Stack align="center">
                  <Embed url={vault.image}/>
                </Stack>
                <Box d="flex" alignItems="baseline">
                  <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="sm" ml="2">
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
                  </Box>
                </Box>
                <Stack align="center" mt={3}>
                  {vault.status == 'claimed' ? <Text color="green.500">CLAIMED</Text> : null}
                </Stack>
              </Box>
            )
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
    </Loader>
  )
}
