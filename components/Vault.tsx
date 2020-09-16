import { Box, Flex, Image, Text } from '@chakra-ui/core'

import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { validImage } from '../utils'

export default function Vault() {
  const { account, chainId } = useWeb3React()
  const { query, pathname, replace } = useRouter()
  const [tokenId, setTokenId] = React.useState(query.id)
  const [vaultName, setVaultName] = React.useState('')
  const [vaultDesc, setVaultDesc] = React.useState('')
  const [vaultImage, setVaultImage] = React.useState('')
  const [vaultValues, setVaultValues] = React.useState([])

  const getVault = async () => {
    // const responce = await fetch('https://api.emblemvault.io/vaults/0x5a63264914a1eCB626e32e8AD683704bA7b0621f', {
    const responce = await fetch('https://api.emblemvault.io/meta/' + tokenId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
        chainId: chainId.toString(),
      },
    })
    const jsonData = await responce.json()
    setVaultName(jsonData.name)
    setVaultImage(jsonData.image)
    setVaultDesc(jsonData.description)
    setVaultValues(jsonData.values)
    setVaultDesc(jsonData.description)
  }

  useEffect(() => {
    getVault()
  }, [])

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
        <Box mt="1" fontWeight="semibold" as="h3" lineHeight="tight" p={2} textAlign="center" textTransform="uppercase">
          {vaultName}

          <Image
            src={validImage(vaultImage) ? vaultImage : 'https://circuitsofvalue.com/public/coval-logo.png'}
            size="250px"
          />
        </Box>

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" ml="2">
              {vaultValues.length ? (
                vaultValues.map((coin) => {
                  return (
                    <Text key={coin.name}>
                      {coin.balance} {coin.name}
                    </Text>
                  )
                })
              ) : (
                <Text>Nothing in here! Fill 'er up!</Text>
              )}
            </Box>
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {vaultDesc}
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}
