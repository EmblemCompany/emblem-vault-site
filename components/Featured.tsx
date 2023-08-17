import { Flex, Text, Link, Image, Stack, Spinner, useColorMode } from '@chakra-ui/react'
import {Box} from '@chakra-ui/react'
import Loader from 'react-loader'
import Refreshing from './Refreshing'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { validImage } from '../utils'
import { EMBLEM_API } from '../constants'
import CoinBalance from './partials/CoinBalance'
import Embed from './Embed'

export default function Featured() {
  const { query } = useRouter()
  const { account, chainId } = useWeb3React()
  const [vaults, setVaults] = useState([])
  const [state, setState] = useState({ loaded: false })
  const [loadingApi, setLoadingApi] = useState(false)
  const [address, setAddress] = useState(query.address)
  const [experimental, setExperimental] = useState(query.experimental)
  const { colorMode } = useColorMode()

  const getVaults = async () => {
    loadCache()
    try {
      const response = await fetch(EMBLEM_API + '/featured/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          service: 'evmetadata',
          chainId: chainId.toString(),
        },
      })
      const jsonData = await response.json()
      setState({ loaded: true })
      setVaults(jsonData)
      saveCache(jsonData)
      setLoadingApi(false)
      // console.log(jsonData)
    } catch (error) {}
  }

  const loadCache = () => {
    let vaults = JSON.parse(localStorage.getItem((address ? address : account) + '_' + chainId + '_featured')) // Load vaults from storage before updating from server!
    if (vaults) {
      setState({ loaded: true })
      setVaults(vaults)
      setLoadingApi(true)
    }
  }

  const saveCache = (vaults) => {
    localStorage.setItem((address ? address : account) + '_' + chainId + '_featured', JSON.stringify(vaults)) // Save new state for later
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

    vaults.length < 1 ? getVaults() : setState({ loaded: true })
  }, [])

  return (
    <Loader loaded={state.loaded}>
      {loadingApi ? <Refreshing /> : ''}

      <Flex w="100%" justify="center" flexWrap="wrap" mt={10}>
        {vaults.length ? (
          vaults.map((vault, index) => {
            let pieces = location.pathname.split('/')
            pieces.pop()
            let url = location.origin + pieces.join('/') + '/nft?id=' + vault.tokenId
            const flexSettings = {
              flex: '1',
              minW: '390px',
              maxW: '390px',
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
              <Box className="NFT" key={index} {...flexSettings} onClick={redirect}>
                <Text fontWeight="semibold" textAlign="center" mt={2}>
                  {vault.name}
                  {!vault.private && vault.totalValue > 0 ? ': ~$' + vault.totalValue : null}
                </Text>
                <Stack align="center">
                  <Embed url={vault.image}/>
                </Stack>
                <Box display="flex" alignItems="baseline">
                  <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="sm" ml="2">
                    {vault.private ? (
                      <>
                        <Text>Contents hidden. Click to view the vault and unlock values.</Text>
                      </>
                    ) : vault.values.length ? (
                      vault.values.map((coin, index) => {
                        if (index < 4)
                          return (
                            <Stack> 
                              <CoinBalance colorMode={colorMode} coin={coin} mine={false} onRenew={()=>{}} hideAsset={()=>{}}/>
                            </Stack>
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
                {/* <Box d="flex" alignItems="baseline">
                  <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="sm" ml="2">
                    <Text>
                      Total Computable Value: {vault.totalValue}
                    </Text>
                  </Box>
                  </Box> */}
                <Stack align="center" mt={3}>
                  {vault.status == 'claimed' ? <Text color="green.500">CLAIMED</Text> : null}
                </Stack>
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
    </Loader>
  )
}
