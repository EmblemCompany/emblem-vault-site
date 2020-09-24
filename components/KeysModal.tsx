import { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Stack,
  Button,
} from '@chakra-ui/core'
import copy from 'copy-to-clipboard'

export default function KeysModal({
  isOpen,
  onClose,
  mnemonic,
  privKeyBTC,
  privKeyETH,
}: {
  isOpen: boolean
  onClose: () => void
  mnemonic: string
  privKeyBTC: string
  privKeyETH: string
}): JSX.Element {
  const phrase = mnemonic
  const btcKey = privKeyBTC
  const ethKey = privKeyETH

  const [phraseCopied, setPhraseCopied] = useState(false)
  useEffect(() => {
    if (phraseCopied) {
      const timeout = setTimeout(() => {
        setPhraseCopied(false)
      }, 750)
      return (): void => {
        clearTimeout(timeout)
      }
    }
  }, [phraseCopied])

  const [BTCKeyCopied, setBTCKeyCopied] = useState(false)
  useEffect(() => {
    if (BTCKeyCopied) {
      const timeout = setTimeout(() => {
        setBTCKeyCopied(false)
      }, 750)
      return (): void => {
        clearTimeout(timeout)
      }
    }
  }, [BTCKeyCopied])

  const [ETHKeyCopied, setETHKeyCopied] = useState(false)
  useEffect(() => {
    if (ETHKeyCopied) {
      const timeout = setTimeout(() => {
        setETHKeyCopied(false)
      }, 750)
      return (): void => {
        clearTimeout(timeout)
      }
    }
  }, [ETHKeyCopied])

  function copyWithFlag(content: string, whichOne: string): void {
    copy(content)
    whichOne == 'phrase'
      ? setPhraseCopied(true)
      : whichOne == 'BTCKey'
      ? setBTCKeyCopied(true)
      : whichOne == 'ETHKey'
      ? setETHKeyCopied(true)
      : null
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text color="white">Your Vault Keys</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="column">
            <Stack direction="row">
              <Text color="white">Your mnemonic phrase (click to copy);</Text>
            </Stack>
            <Stack direction="row">
              <Button
                width="100%"
                whiteSpace="unset"
                height="unset"
                p={1}
                onClick={() => copyWithFlag(phrase, 'phrase')}
                isActive={true}
              >
                {phraseCopied ? <Text color="white">Copied!</Text> : <Text color="white">{phrase}</Text>}
              </Button>
            </Stack>

            <Stack direction="row" mt={4}>
              <Text color="white">Your BTC private key (click to copy);</Text>
            </Stack>

            <Stack direction="row" justify="space-between">
              <Button onClick={() => copyWithFlag(btcKey, 'BTCKey')}>
                {BTCKeyCopied ? (
                  <Text color="white">Copied!</Text>
                ) : (
                  <Text color="white" isTruncated>
                    {btcKey}
                  </Text>
                )}
              </Button>
            </Stack>

            <Stack direction="row" mt={4}>
              <Text color="white">Your ETH private key (click to copy);</Text>
            </Stack>

            <Stack direction="row" justify="space-between">
              <Button onClick={() => copyWithFlag(ethKey, 'ETHKey')}>
                {ETHKeyCopied ? (
                  <Text color="white">Copied!</Text>
                ) : (
                  <Text color="white" isTruncated>
                    {ethKey}
                  </Text>
                )}
              </Button>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
