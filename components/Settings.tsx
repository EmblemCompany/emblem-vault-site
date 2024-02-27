import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { resolve } from 'url'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useColorMode,
  Button,
  Link,
  Switch,
  Input
} from '@chakra-ui/react'
import copy from 'copy-to-clipboard'

import { COLOR, DEFAULT_DEADLINE, DEFAULT_SLIPPAGE, QueryParameters } from '../constants'
import { useBodyKeyDown } from '../hooks'
import { useApproveMax, useDeadline, useSlippage, useFirstToken, useSecondToken } from '../context'
import { deleteDB } from '../db'
import { sdk } from '../utils'

export default function Settings({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }): JSX.Element {
  const { chainId, account } = useWeb3React()
  const { colorMode, toggleColorMode } = useColorMode()
  const { pathname } = useRouter()

  // useBodyKeyDown('d', toggleColorMode)

  const [approveMax, toggleApproveMax] = useApproveMax()
  const [deadline, setDeadline] = useDeadline()
  const [slippage, setSlippage] = useSlippage()
  const [offlineMode, setOfflineMode] = useState(localStorage.getItem('offline') == 'true')

  const [firstToken] = useFirstToken()
  const [secondToken] = useSecondToken()

  let permalink: string | null = null
  async function refreshLegacy() {
    if (account) {
      await sdk.loadWeb3()
      await sdk.refreshLegacyOwnership(window.web3, account)
    }
  }
  if (typeof chainId === 'number' && (firstToken || secondToken) && (pathname === '/buy' || pathname === '/sell')) {
    const permalinkParameters = {
      [QueryParameters.CHAIN]: chainId,
      ...(pathname === '/buy'
        ? {
            ...(firstToken ? { [QueryParameters.OUTPUT]: firstToken.address } : {}),
            ...(secondToken ? { [QueryParameters.INPUT]: secondToken.address } : {}),
          }
        : {
            ...(firstToken ? { [QueryParameters.INPUT]: firstToken.address } : {}),
            ...(secondToken ? { [QueryParameters.OUTPUT]: secondToken.address } : {}),
          }),
    }
    permalink = resolve(
      'https://emblem.finance',
      `${pathname}?${Object.entries(permalinkParameters)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    )
  }

  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false)
      }, 750)
      return (): void => {
        clearTimeout(timeout)
      }
    }
  }, [copied])
  function copyWithFlag(content: string): void {
    copy(content)
    setCopied(true)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent color={COLOR[colorMode]}>
        <ModalHeader>
          <Text>Settings (Build #2021)</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="column">
            <Stack direction="row" justify="space-between">
              <Text>Dark Mode</Text>
              <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
            </Stack>
            <Stack direction="row" justify="space-between">
              <Text>API-Key</Text>
              <Input 
                type="password"
                placeholder="API Key" 
                defaultValue={localStorage.getItem('apiKey') || ''}
                onChange={(e) => {
                  localStorage.setItem('apiKey', e.target.value);
                }}
                width="80%"
              />
            </Stack>
            <Stack direction="row" justify="space-between">
              <Link textAlign="left"isTruncated={true} onClick={async ()=>{await deleteDB(); await refreshLegacy()}} > Reset Cache </Link>
            </Stack>
            <Stack direction="row" justify="space-between">
                <Text>Offline Mode</Text>
                <Switch 
                  isChecked={offlineMode}
                  onChange={(e) => {
                    const isOffline = String(e.target.checked);
                    localStorage.setItem('offline', isOffline);
                    setOfflineMode(e.target.checked);
                  }} 
                />
            </Stack>
            {/* <Stack direction="row" justify="space-between">
              <Text>Approve Max</Text>
              <Switch isChecked={approveMax} onChange={toggleApproveMax} />
            </Stack>
            <Stack direction="row" justify="space-between">
              <Text>Deadline</Text>
              <Stack direction="column" spacing={0} alignItems="flex-end" w="50%" flexShrink={0}>
                <Slider min={60} max={60 * 60} step={60} value={deadline} onChange={setDeadline}>
                  <SliderTrack />
                  <SliderFilledTrack />
                  <SliderThumb />
                </Slider>
                <Stack direction="row" minHeight="1.5rem">
                  {deadline !== DEFAULT_DEADLINE && (
                    <Button
                      size="xs"
                      onClick={(): void => {
                        setDeadline(DEFAULT_DEADLINE)
                      }}
                    >
                      Reset
                    </Button>
                  )}
                  <Text>
                    {deadline / 60} {deadline === 60 ? 'minute' : 'minutes'}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="row" justify="space-between">
              <Text>Slippage Tolerance</Text>
              <Stack direction="column" spacing={0} alignItems="flex-end" w="50%" flexShrink={0}>
                <Slider min={0} max={100 * 4} step={10} value={slippage} onChange={setSlippage}>
                  <SliderTrack />
                  <SliderFilledTrack />
                  <SliderThumb />
                </Slider>
                <Stack direction="row" minHeight="1.5rem">
                  {slippage !== DEFAULT_SLIPPAGE && (
                    <Button
                      size="xs"
                      onClick={(): void => {
                        setSlippage(DEFAULT_SLIPPAGE)
                      }}
                    >
                      Reset
                    </Button>
                  )}
                  <Text>{(slippage / 100).toFixed(slippage === 0 ? 0 : 1)}%</Text>
                </Stack>
              </Stack>
            </Stack> */}
          </Stack>
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          {typeof permalink === 'string' && (
            <Button
              variant="link"
              isDisabled={copied}
              color="blue.500"
              width="min-content"
              onClick={(): void => {
                try {
                  // eslint-disable-next-line
                  ;(window.navigator as any).share({ title: 'Emblem Vault', url: permalink }).catch(() => {})
                } catch {
                  copyWithFlag(permalink as string)
                }
              }}
            >
              {copied ? 'Copied' : 'Share Permalink'}
            </Button>
          )}

          <Link
            href={'https://github.com/NoahZinsmeister/hypertext'}
            target="_blank"
            rel="noopener noreferrer"
            color="blue.500"
          >
            Based on Hypertext.
          </Link>

          {/* <Link
            href={`https://github.com/EmblemCompany/emblem-vault-site/tree/${process.env.COMMIT_SHA}`}
            target="_blank"
            rel="noopener noreferrer"
            color="blue.500"
          >
            {process.env.COMMIT_SHA?.slice(0, 7)}
          </Link> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
