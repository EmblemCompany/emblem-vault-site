import { Box, Flex, Text, Link, Image, Stack, Spinner } from '@chakra-ui/core'
import Loader from 'react-loader'
import Refreshing from './Refreshing'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { validImage } from '../utils'
import { EMBLEM_API } from '../constants'

export default function VaultList() {
  const { query } = useRouter()
  const { account, chainId } = useWeb3React()
  const [vaults, setVaults] = useState([])
  const [state, setState] = useState({ loaded: false })
  const [loadingApi, setLoadingApi] = useState(false)
  const [address, setAddress] = useState(query.address)

  const getVaults = async () => {
    loadCache()
    const response = await fetch(EMBLEM_API + '/vaults/' + (address ? address : account), {
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
  }

  const loadCache = () => {
    let vaults = JSON.parse(localStorage.getItem((address ? address : account) + '_' + chainId + '_vaults')) // Load vaults from storage before updating from server!
    if (vaults) {
      setState({ loaded: true })
      setVaults(vaults)
      setLoadingApi(true)
    }
  }

  const saveCache = (vaults) => {
    localStorage.setItem((address ? address : account) + '_' + chainId + '_vaults', JSON.stringify(vaults)) // Save new state for later
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
    account && chainId ? getVaults() : setState({ loaded: true })
  }, [])

  return (
    <Loader loaded={state.loaded}>
      {loadingApi ? <Refreshing /> : ''}

      <Flex w="100%" justify="center" flexWrap="wrap" mt={10}>
        {vaults.length ? (
          vaults.map((vault, index) => {
            let pieces = location.pathname.split('/')
            pieces.pop()
            let url = location.origin + pieces.join('/') + '/vault?id=' + vault.tokenId
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
            }
            const redirect = function () {
              location.href = url
            }
            return (
              <Box key={index} {...flexSettings} onClick={redirect}>
                <Text fontWeight="semibold" textAlign="center" mt={2}>
                  {vault.name}: ${vault.totalValue}
                </Text>
                <Stack align="center">
                  <Image
                    src={validImage(vault.image) ? vault.image : 'https://circuitsofvalue.com/public/coval-logo.png'}
                    p={2}
                    width="250px"
                  />
                </Stack>
                <Box d="flex" alignItems="baseline">
                  <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="sm" ml="2">
                    {vault.isPrivate ? (
                      <>
                        <Text>Contents hidden. Click to view the vault and unlock values.</Text>
                      </>
                    ) : vault.values.length ? (
                      vault.values.map((coin) => {
                        return (
                          <Text key={coin.name} isTruncated>
                            {coin.name}: {coin.balance}
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
