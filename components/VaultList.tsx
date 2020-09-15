import { Box, Flex, Grid, Text, Link, Image, SimpleGrid } from '@chakra-ui/core'
import Loader from 'react-loader'
import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'

export default function VaultList() {
  const { account, chainId } = useWeb3React()
  const [vaults, setVaults] = React.useState([])
  const [state, setState] = React.useState({ loaded: false })

  const validImage = function (data) {
    if (data.includes('http')) {
      return true
    } else {
      return false
    }
  }
  const getVaults = async () => {
    // const responce = await fetch('https://api.emblemvault.io/vaults/0x5a63264914a1eCB626e32e8AD683704bA7b0621f', {
    const responce = await fetch('https://api.emblemvault.io/vaults/' + account, {
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
    getVaults()
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
                <Text fontWeight="semibold" textAlign="center">
                  {vault.name}
                </Text>
                <Image
                  src={validImage(vault.image) ? vault.image : 'https://circuitsofvalue.com/public/coval-logo.png'}
                  p={2}
                />
                {vault.values.length ? (
                  vault.values.map((coin) => {
                    return (
                      <Text key={coin.name}>
                        {coin.balance} {coin.name}
                      </Text>
                    )
                  })
                ) : (
                  <Text as="h2" textAlign="center" w="100%" p={0}>
                    Nothing in here! Fill 'er up!
                  </Text>
                )}
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
