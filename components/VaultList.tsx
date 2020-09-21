import { Box, Flex, Grid, Text, Link, Image, SimpleGrid, Stack } from '@chakra-ui/core'
import Loader from 'react-loader'
import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { validImage } from '../utils'
import { EMBLEM_API } from '../constants'

export default function VaultList() {
  const { account, chainId } = useWeb3React()
  const [vaults, setVaults] = React.useState([])
  const [state, setState] = React.useState({ loaded: false })

  const getVaults = async () => {
    const responce = await fetch(EMBLEM_API + '/vaults/' + account, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
        chainId: chainId.toString(),
      },
    })
    const jsonData = await responce.json()
    setState({ loaded: true })
    setVaults(jsonData)
  }

  useEffect(() => {
    account && chainId ? getVaults() : setState({ loaded: true })
  }, [])

  return (
    <Loader loaded={state.loaded}>
      <Flex w="100%" justify="center" flexWrap="wrap">
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
            }
            const redirect = function () {
              location.href = url
            }
            return (
              <Box key={index} {...flexSettings} onClick={redirect}>
                <Text fontWeight="semibold" textAlign="center" mt={2}>
                  {vault.name}
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
