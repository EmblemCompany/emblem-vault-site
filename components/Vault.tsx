import { Box, Flex, Image, Text, Stack, Button, ButtonGroup, Input, useDisclosure, Spinner } from '@chakra-ui/core'

import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Refreshing from './Refreshing'
import Loader from 'react-loader'
import dynamic from 'next/dynamic'
import { validImage } from '../utils'
import { TransactionToast } from './TransactionToast'
import { EMBLEM_API, BURN_ADDRESS, contractAddresses } from '../constants'
import { useContract } from '../hooks'
import Tilt from 'react-tilt'

const AddrModal = dynamic(() => import('./AddrModal'))
const KeysModal = dynamic(() => import('./KeysModal'))

export default function Vault() {
  const { account, chainId, library } = useWeb3React()
  const { query, pathname, replace } = useRouter()
  const [tokenId, setTokenId] = useState(query.id)
  const [experimental, setExperimental] = useState(query.experimental)
  const [vaultName, setVaultName] = useState('')
  const [vaultDesc, setVaultDesc] = useState('')
  const [vaultImage, setVaultImage] = useState('')
  const [vaultValues, setVaultValues] = useState([])
  const [vaultAddresses, setVaultAddresses] = useState([])
  const [vaultPrivacy, setVaultPrivacy] = useState(false)
  const [vaultChainId, setVaultChainId] = useState(null)
  const [hash, setHash] = useState(null)
  const [currCoin, setCurrCoin] = useState('')
  const [currAddr, setCurrAddr] = useState('')
  const [state, setState] = useState({ loaded: false })
  const [allowed, setAllowed] = useState(false)
  const [mine, setMine] = useState(false)
  const [claiming, setClaiming] = useState(false)
  const [status, setStatus] = useState('claimed')
  const [claimedBy, setClaimedBy] = useState(null)
  const [mnemonic, setMnemonic] = useState('')
  const [privKeyBTC, setPrivKeyBTC] = useState('')
  const [privKeyETH, setPrivKeyETH] = useState('')
  const [loadingApi, setLoadingApi] = useState(false)
  const [decryptedEffect, setDecryptedEffect] = useState('')

  const emblemContract = useContract(contractAddresses.emblemVault[chainId], contractAddresses.emblemAbi, true)

  const { isOpen: isOpenAddrModal, onOpen: onOpenAddrModal, onClose: onCloseAddrModal } = useDisclosure()
  const { isOpen: isOpenKeysModal, onOpen: onOpenKeysModal, onClose: onCloseKeysModal } = useDisclosure()

  const getVault = async () => {
    loadCache()
    const responce = await fetch(EMBLEM_API + '/meta/' + tokenId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
    })
    const jsonData = await responce.json()
    console.log(jsonData)
    setStates(jsonData)
    saveCache(jsonData)
    setLoadingApi(false)
  }

  const setStates = (jsonData) => {
    setVaultName(jsonData.name)
    setVaultImage(jsonData.image)
    setVaultDesc(jsonData.description)
    setVaultValues(jsonData.values)
    setVaultDesc(jsonData.description)
    setVaultAddresses(jsonData.addresses)
    setVaultChainId(jsonData.network == 'mainnet' ? 1 : 4)
    setStatus(jsonData.status)
    if (status === 'claimed') {
      setClaimedBy(jsonData.claimedBy)
    }
    setState({ loaded: true })
    let isPvt =
      jsonData.addresses.filter((item) => {
        return item.address.includes('private:')
      }).length > 0
    console.log('pvt', isPvt)
    setVaultPrivacy(isPvt)
  }

  const loadCache = () => {
    let vault = JSON.parse(localStorage.getItem(account + '_' + chainId + '_' + tokenId + '_vault')) // Load vaults from storage before updating from server!
    if (vault) {
      setState({ loaded: true })
      setStates(vault)
      setLoadingApi(true)
    }
  }

  const saveCache = (vault) => {
    localStorage.setItem(account + '_' + chainId + '_' + tokenId + '_vault', JSON.stringify(vault)) // Save new state for later
  }

  const getKeys = async (signature, tokenId, cb) => {
    var myHeaders = new Headers()
    myHeaders.append('chainId', chainId.toString())
    myHeaders.append('service', 'evmetadata')
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({ signature: signature })
    const responce = await fetch(EMBLEM_API + '/verify/' + tokenId, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
    const jsonData = await responce.json()
    return cb(jsonData)
  }

  const getContractStates = async () => {
    let owner = await emblemContract.ownerOf(tokenId)
    setMine(owner === account)
    if (mine) {
      setAllowed(true)
    }
    console.log('status', status, 'claimedBy', claimedBy)
  }

  const handleApprove = async () => {
    emblemContract
      .setApprovalForAll(contractAddresses.vaultHandler[chainId], true)
      .then(({ hash }: { hash: string }) => {
        setHash(hash)
      })
  }

  const handleSign = async () => {
    // library. .personal.sign(library.toHex("Claim:358746"),library.eth.defaultAccount, (err,res) => console.log(err,res))
    library
      .getSigner(account)
      .signMessage('Claim: ' + tokenId)
      .then((signature) => {
        getKeys(signature, tokenId, (result) => {
          // alert('Mnemonic: ' + result.decrypted.phrase)
          setMnemonic(result.decrypted.phrase)
          setPrivKeyBTC('BTC KEY')
          setPrivKeyETH('ETH KEY')
          onOpenKeysModal()
          console.log(result.decrypted)
        })
      })
  }

  const handleClaim = async () => {
    emblemContract.transferFrom(account, BURN_ADDRESS, tokenId).then(({ hash }: { hash: string }) => {
      setClaiming(true)
      setTimeout(() => {
        setHash(hash)
        handleSign()
        onOpenKeysModal()
      }, 100) // Solving State race condition where transaction watcher wouldn't notice we were claiming
    })
  }

  const startDecryptEffect = async () => {
    var theLetters = 'abcdefghijklmnopqrstuvwxyz' //You can customize what letters it will cycle through
    var ctnt = 'Decrypting' // Your text goes here
    var speed = 5 // ms per frame
    var increment = 8 // frames per step. Must be >2

    var clen = ctnt.length
    var si = 0
    var stri = 0
    var block = ''
    var fixed = ''
    ;(function rustle(i) {
      setTimeout(function () {
        if (--i) {
          rustle(i)
        }
        nextFrame(i)
        si = si + 1
      }, speed)
    })(clen * increment + 1)
    function nextFrame(pos) {
      for (var i = 0; i < clen - stri; i++) {
        //Random number
        var num = Math.floor(theLetters.length * Math.random())
        //Get random letter
        var letter = theLetters.charAt(num)
        block = block + letter
      }
      if (si == increment - 1) {
        stri++
      }
      if (si == increment) {
        // Add a letter;
        // every speed*10 ms
        fixed = fixed + ctnt.charAt(stri - 1)
        si = 0
      }
      // $("#output").html(fixed + block);
      setDecryptedEffect(fixed + block)
      block = ''
    }
  }

  useEffect(() => {
    getVault()
  }, [])

  useEffect(() => {
    console.log('Account chainid = ' + chainId + ' and vaultchainid = ' + vaultChainId)
    account && chainId && vaultChainId && chainId == vaultChainId ? getContractStates() : null
  })

  function splitDescription(words) {
    var desc = words.split('\n\n\n\n')
    return desc[0].trim()
  }

  function tryDecrypt(pass) {
    startDecryptEffect()
    console.log(pass)
  }

  return (
    <>
      <AddrModal isOpen={isOpenAddrModal} onClose={onCloseAddrModal} addrCoin={currCoin} addrAddr={currAddr} />

      <KeysModal
        isOpen={isOpenKeysModal}
        onClose={onCloseKeysModal}
        mnemonic={mnemonic}
        privKeyBTC={privKeyBTC}
        privKeyETH={privKeyETH}
      />

      <Loader loaded={state.loaded}>
        {loadingApi ? <Refreshing /> : ''}
        <Tilt className="Tilt" options={{ max: experimental ? 19 : 0, scale: 1 }}>
          <Flex width="full" align="center" justifyContent="center">
            <Box
              maxW="sm"
              borderWidth="1px"
              borderColor={vaultChainId != chainId ? 'orange.500' : status == 'claimed' ? 'green.500' : null}
              rounded="lg"
              overflow="hidden"
              alignItems="center"
              mt={15}
              minW={390}
            >
              {vaultChainId != chainId ? (
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h3"
                  lineHeight="tight"
                  p={2}
                  textAlign="center"
                  textTransform="uppercase"
                  alignItems="center"
                  color="orange.500"
                >
                  BEWARE: Vault is on a different network than you are.
                </Box>
              ) : null}
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
                  width="250px"
                />
              </Stack>
              <Stack align="center">
                <Box mt="1" ml="4" lineHeight="tight">
                  <Text as="h4" ml="4" mr="4">
                    {splitDescription(vaultDesc)}
                  </Text>
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
                        <Text pb={2} color={decryptedEffect ? 'green.500' : null}>
                          {decryptedEffect ? decryptedEffect : 'Contents hidden. Enter password to unlock.'}
                        </Text>
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
                {!vaultPrivacy ? (
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
                ) : null}
                {status === 'claimed' && claimedBy === account ? (
                  <Box d="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                    <Button width="100%" onClick={handleSign}>
                      Get Keys
                    </Button>
                  </Box>
                ) : (
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
                )}
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
        </Tilt>
        {hash ? (
          <TransactionToast
            hash={hash}
            onComplete={() => {
              if (claiming) {
                setHash(null)
              }
            }}
          />
        ) : null}
      </Loader>
    </>
  )
}
