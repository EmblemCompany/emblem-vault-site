import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
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
  useColorMode,
  Button,
  Image,
} from '@chakra-ui/core'
import copy from 'copy-to-clipboard'
import QRCode from 'qrcode.react'

export default function AddrModal({
  isOpen,
  onClose,
  addrCoin,
  addrAddr,
}: {
  isOpen: boolean
  onClose: () => void
  addrCoin: string
  addrAddr: string
}): JSX.Element {
  const address = addrAddr
  const coin = addrCoin
  let permalink: string | null = null

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
      <ModalContent>
        <ModalHeader>
          <Text color="white">Send Stuff Here</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="column">
            <Stack direction="row" align="center" justify="center">
              <QRCode value={address} size="175" />
            </Stack>

            <Stack direction="row" justify="space-between" mt="6">
              <Text color="white">{coin} address (click to copy)</Text>
            </Stack>
            <Stack direction="row" justify="space-between">
              <Button onClick={() => copyWithFlag(address)}>
                {copied ? <Text color="white">Copied!</Text> : <Text color="white">{address}</Text>}
              </Button>
            </Stack>
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
