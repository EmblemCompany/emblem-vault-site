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
  useColorMode,
} from '@chakra-ui/react'
import copy from 'copy-to-clipboard'
import { COLOR } from '../constants'
// import { address } from 'bitcoinjs-lib'
interface DataValues {
  key: string
  value: string
}
export default function KeysModal({
  isOpen,
  onClose,
  mnemonic,
  privKeyBTC,
  privKeyETH,
  privValues,
  addresses
}: {
  isOpen: boolean
  onClose: () => void
  mnemonic: string
  privKeyBTC: string
  privKeyETH: string
  privValues: Array<object>
  addresses: any
}): JSX.Element {
  const phrase = mnemonic
  const btcKey = privKeyBTC
  const ethKey = privKeyETH
  const values = privValues
  const { colorMode } = useColorMode()

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

  const [BCHKeyCopied, setBCHKeyCopied] = useState(false)
  useEffect(() => {
    if (BCHKeyCopied) {
      const timeout = setTimeout(() => {
        setBCHKeyCopied(false)
      }, 750)
      return (): void => {
        clearTimeout(timeout)
      }
    }
  }, [BCHKeyCopied])

  const [valueCopied, setValueCopied] = useState(false)
  useEffect(() => {
    if (valueCopied) {
      const timeout = setTimeout(() => {
        setValueCopied(false)
      }, 750)
      return (): void => {
        clearTimeout(timeout)
      }
    }
  }, [valueCopied])

  function copyWithFlag(content: string, whichOne: string): void {
    copy(content)
    whichOne == 'phrase'
      ? setPhraseCopied(true)
      : whichOne == 'BTCKey'
      ? setBTCKeyCopied(true)
      : whichOne == 'ETHKey'
      ? setETHKeyCopied(true)
      : whichOne == 'BCHKey'
      ? setBCHKeyCopied(true)
      : whichOne == 'values'
      ? setValueCopied(true)
      : null
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent color={COLOR[colorMode]}>
        <ModalHeader>
          <Text>Your Vault Keys</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="column" mb={10}>
            <Stack direction="row">
              <Text>Your mnemonic phrase (click to copy):</Text>
            </Stack>
            <Stack direction="row">
              <Button
                width="100%"
                whiteSpace="unset"
                height="unset"
                p={2}
                onClick={() => copyWithFlag(phrase, 'phrase')}
                isActive={true}
              >
                {phraseCopied ? <Text>Copied!</Text> : <Text>{phrase}</Text>}
              </Button>
            </Stack>
            
            {privValues && privValues.length > 0 ? (
            <>
              <Stack direction="row" mt={4}>
              
                <Text>Your Values (click to copy): </Text>
              </Stack>
              {privValues.map((item: DataValues, index) => {
                return (
                  <Stack direction="row" key={index} justify="space-between">
                    <Text isTruncated>{item.key}</Text>
                    <Button whiteSpace="unset" height="unset" p={2} onClick={() => copyWithFlag(item.value, 'values')}>
                      {valueCopied ? <Text>Copied!</Text> : <Text isTruncated>{item.value}</Text>}
                    </Button>
                  </Stack>
                )
              })}
              
            </> 
            ) : null}

            
            {addresses && addresses.length > 0 ? addresses.map((item: any, index) => {
              // if (item.coin == "BCH")
              if (item.coin !== "TEZOS")
              return (
                <>
                  <Stack direction="row" mt={4}>
                    <Text>Your {item.coin} private key (click to copy):</Text>
                  </Stack>

                  <Stack direction="row" justify="space-between">
                    <Button whiteSpace="unset" height="unset" p={2} onClick={() => copyWithFlag(item.key, 'BCHKey')}>
                      {BCHKeyCopied ? <Text>Copied!</Text> : <Text isTruncated>{item.key}</Text>}
                    </Button>
                  </Stack>
                </>
              )
            }): null}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
