import { Box, Flex, Image, Text, Stack, Button, ButtonGroup, Input, useDisclosure } from '@chakra-ui/core'

import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from 'react-loader'
import dynamic from 'next/dynamic'

import { validImage } from '../utils'
import { EMBLEM_API } from '../constants'

const AddrModal = dynamic(() => import('./AddrModal'))

export default function Vault() {
  const { account, chainId } = useWeb3React()
  const { query, pathname, replace } = useRouter()
  const [tokenId, setTokenId] = React.useState(query.id)
  const [vaultName, setVaultName] = React.useState('')
  const [vaultDesc, setVaultDesc] = React.useState('')
  const [vaultImage, setVaultImage] = React.useState('')
  const [vaultValues, setVaultValues] = React.useState([])
  const [vaultAddresses, setVaultAddresses] = React.useState([])
  const [vaultPrivacy, setVaultPrivacy] = React.useState(false)
  const [currCoin, setCurrCoin] = React.useState('')
  const [currAddr, setCurrAddr] = React.useState('')
  const [state, setState] = React.useState({ loaded: false })

  const { isOpen: isOpenAddrModal, onOpen: onOpenAddrModal, onClose: onCloseAddrModal } = useDisclosure()

  const getVault = async () => {
    const responce = await fetch(EMBLEM_API + '/meta/' + tokenId, {
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
    setVaultAddresses(jsonData.addresses)
    // setVaultPrivacy(jsonData.isPrivate)
    setVaultPrivacy(true)
    setState({ loaded: true })
  }

  useEffect(() => {
    getVault()
  }, [])

  function splitDescription(words) {
    var desc = words.split('Emblem Vault Basic')
    return desc[0].trim()
  }

  function tryDecrypt(pass) {
    console.log(pass)
  }

  return (
    <>
      <AddrModal isOpen={isOpenAddrModal} onClose={onCloseAddrModal} addrCoin={currCoin} addrAddr={currAddr} />

      <Loader loaded={state.loaded}>
        <Flex width="full" align="center" justifyContent="center">
          <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" alignItems="center">
            <Box
              mt="1"
              fontWeight="semibold"
              as="h3"
              lineHeight="tight"
              p={2}
              textAlign="center"
              textTransform="uppercase"
              alignItems="center"
            >
              {vaultName}
            </Box>
            <Stack align="center">
              <Image
                src={validImage(vaultImage) ? vaultImage : 'https://circuitsofvalue.com/public/coval-logo.png'}
                size="250px"
              />
            </Stack>
            <Stack align="center">
              <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                {splitDescription(vaultDesc)}
              </Box>
            </Stack>
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="sm" ml="2">
                  <h4>Current Contents:</h4>
                  {vaultPrivacy ? (
                    <>
                      <Text>Contents hidden. Enter password to unlock.</Text>
                      <Input
                          type="password"
                          id="vault-password"
                          onChange={(e) => tryDecrypt(e.target.value)}
                          aria-describedby="password-helper-text"
                        />
                    </>
                  ): (
                    vaultValues.length ? (
                      vaultValues.map((coin) => {
                        return (
                          <Text key={coin.name}>
                            {coin.balance} {coin.name}
                          </Text>
                        )
                      })
                      ) : (
                        <Text>Nothing in here! Fill 'er up!</Text>
                      )
                    )
                  }
                </Box>
              </Box>
              <Box d="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                <Stack direction="row" align="center" spacing="1rem" flexWrap="wrap" shouldWrapChildren>
                  <ButtonGroup spacing={4}>
                    {vaultAddresses.map((addr) => {
                      return (
                        // <Button key={addr.address} onClick={() => openAddrModal(addr.coin, addr.address)}>
                        <Button
                          key={addr.address}
                          onClick={() => {
                            setCurrCoin(addr.coin)
                            setCurrAddr(addr.address)
                            onOpenAddrModal()
                          }}
                        >
                          Put {addr.coin} In
                        </Button>
                      )
                    })}
                  </ButtonGroup>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Loader>
    </>
  )
}
