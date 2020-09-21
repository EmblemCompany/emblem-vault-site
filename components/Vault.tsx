import { Box, Flex, Image, Text, Stack, Button, ButtonGroup, Input, useDisclosure } from '@chakra-ui/core'

import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from 'react-loader'
import dynamic from 'next/dynamic'

import { validImage } from '../utils'
import { TransactionToast } from './TransactionToast'
import { EMBLEM_API, BURN_ADDRESS, contractAddresses } from '../constants'
import { Contract } from '@ethersproject/contracts'
import { useContract } from '../hooks'

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
  const [vaultChainId, setVaultChainId] = React.useState(1)
  const [hash, setHash] = React.useState(null)
  const [currCoin, setCurrCoin] = React.useState('')
  const [currAddr, setCurrAddr] = React.useState('')
  const [state, setState] = React.useState({ loaded: false })
  const [allowed, setAllowed] = React.useState(false)
  const [mine, setMine] = React.useState(false)
  const [claiming, setClaiming] = React.useState(false)

  const handlerContract = useContract(contractAddresses.vaultHandler[chainId], contractAddresses.vaultHandlerAbi, true)
  const emblemContract = useContract(contractAddresses.emblemVault[chainId], contractAddresses.emblemAbi, true)

  const { isOpen: isOpenAddrModal, onOpen: onOpenAddrModal, onClose: onCloseAddrModal } = useDisclosure()

  const getVault = async () => {
    const responce = await fetch(EMBLEM_API + '/meta/' + tokenId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
    })
    const jsonData = await responce.json()
    console.log(jsonData)
    setVaultName(jsonData.name)
    setVaultImage(jsonData.image)
    setVaultDesc(jsonData.description)
    setVaultValues(jsonData.values)
    setVaultDesc(jsonData.description)
    setVaultAddresses(jsonData.addresses)
    setVaultChainId(jsonData.network == 'mainnet' ? 1 : 4)
    setState({ loaded: true })
  }

  const getContractStates = async () => {
    let owner = await emblemContract.ownerOf(tokenId)
    setMine(owner === account)
    if (mine) {
      setAllowed(true)
    }
  }

  const handleApprove = async () => {
    emblemContract
      .setApprovalForAll(contractAddresses.vaultHandler[chainId], true)
      .then(({ hash }: { hash: string }) => {
        setHash(hash)
      })
  }

  const handleClaim = async () => {    
    emblemContract.transferFrom(account, BURN_ADDRESS, tokenId).then(({ hash }: { hash: string }) => {
      setClaiming(true)
      setTimeout(()=>{setHash(hash)}, 100) // Solving State race condition where transaction watcher wouldn't notice we were claiming
    })
  }

  useEffect(() => {
    getVault()
  }, [])

  useEffect(() => {
    account && chainId && vaultChainId && chainId == vaultChainId ? getContractStates() : null
  })

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
              <Box mt="1" as="h4" lineHeight="tight">
                {splitDescription(vaultDesc)}
              </Box>
            </Stack>
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Box color="gray.500" letterSpacing="wide" fontSize="sm" ml="2">
                  <Text as="h4" fontWeight="semibold">
                    Current Contents:
                  </Text>
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
                  ) : vaultValues.length ? (
                    vaultValues.map((coin) => {
                      return (
                        <Text key={coin.name} isTruncated>
                          {coin.name}: {coin.balance}
                        </Text>
                      )
                    })
                  ) : (
                    <Text>Nothing in here! Fill 'er up!</Text>
                  )}
                </Box>
              </Box>
              <Box d="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                <Stack direction="row" align="center" spacing="1rem" flexWrap="wrap" shouldWrapChildren>
                  <ButtonGroup spacing={4}>
                    {vaultAddresses.map((addr) => {
                      return (
                        <Button
                          key={addr.address}
                          onClick={() => {
                            setCurrCoin(addr.coin)
                            setCurrAddr(addr.address)
                            onOpenAddrModal()
                          }}
                        >
                          Put {addr.coin == 'ETH' ? addr.coin + '/ERC20' : addr.coin} In
                        </Button>
                      )
                    })}
                  </ButtonGroup>
                </Stack>
              </Box>
              <Box d="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                <Button
                  width="100%"
                  as="a"
                  {...{
                    href:
                      'https://' +
                      (vaultChainId == 4 ? 'rinkeby.' : '') +
                      'opensea.io/assets/' +
                      contractAddresses.emblemVault[vaultChainId] +
                      '/' +
                      tokenId,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  }}
                >
                  {mine ? 'Sell/Gift/Send' : 'Make an Offer'}
                </Button>
              </Box>
              <Box d="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                {mine ? (
                  <Button
                    width="100%"
                    onClick={() => {
                      if (allowed) {
                        handleClaim()
                      } else {
                        handleApprove()
                      }
                    }}
                  >
                    {allowed ? 'Claim' : 'Approve'}
                  </Button>
                ) : (
                  ''
                )}
              </Box>
            </Box>
          </Box>
        </Flex>
        {hash ? (
            <TransactionToast
              hash={hash}
              onComplete={() => {
                if (claiming) {
                  alert('Claim tx complete. Now ask server for keys')
                  setHash(null)
                }
              }}
            />
          ) : (
            null
          )}
      </Loader>
    </>
  )
}
