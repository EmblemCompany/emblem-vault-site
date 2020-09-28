import React, { useEffect, useState } from 'react'
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
  Button,
  useColorMode,
} from '@chakra-ui/core'
import copy from 'copy-to-clipboard'
import QRCode from 'qrcode.react'
import { COLOR } from '../constants'

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

  const { colorMode } = useColorMode()

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
          <Text>Send Stuff Here</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="column">
            <Stack direction="row" align="center" justify="center">
              <QRCode value={address} onClick={() => copyWithFlag(address)} />
            </Stack>

            <Stack direction="row" justify="center" mt="6">
              <Text>{coin} address (click to copy)</Text>
            </Stack>
            <Stack direction="row" justify="center">
              <Button onClick={() => copyWithFlag(address)}>
                {copied ? <Text>Copied!</Text> : <Text isTruncated>{address}</Text>}
              </Button>
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
