import {
  Box,
  Flex,
  Image,
  Text,
  Stack,
  Button,
  ButtonGroup,
  Input,
  Link,
  Alert,
  AlertIcon,
  useDisclosure,
} from '@chakra-ui/core'

import Head from "next/head"
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Refreshing from './Refreshing'
import Loader from 'react-loader'
import dynamic from 'next/dynamic'
import { validImage } from '../utils'
import { Contract } from '@ethersproject/contracts'
import { TransactionToast } from './TransactionToast'
import { EMBLEM_API, BURN_ADDRESS, contractAddresses } from '../constants'
import { useContract } from '../hooks'
import Tilt from 'react-tilt'
import CryptoJS from 'crypto-js'

const AddrModal = dynamic(() => import('./AddrModal'))
const KeysModal = dynamic(() => import('./KeysModal'))

export default function Nft() {
  const { account, chainId, library } = useWeb3React()
  const { query } = useRouter()
  const [approved, setApproved] = useState(false)
  const [mintPassword, setMintPassword] = useState(query.key)
  const [tokenId, setTokenId] = useState(query.id)
  const [experimental, setExperimental] = useState(query.experimental)
  const [vaultName, setVaultName] = useState('')
  const [vaultDesc, setVaultDesc] = useState('')
  const [vaultImage, setVaultImage] = useState('')
  const [vaultValues, setVaultValues] = useState([])
  const [vaultDataValues, setVaultDataValues] = useState([])
  const [vaultAddresses, setVaultAddresses] = useState([])
  const [vaultPrivacy, setVaultPrivacy] = useState(false)
  const [vaultTotalValue, setVaultTotalValue] = useState(0)
  const [vaultChainId, setVaultChainId] = useState(null)
  const [hash, setHash] = useState(null)
  const [currCoin, setCurrCoin] = useState('')
  const [currAddr, setCurrAddr] = useState('')
  const [state, setState] = useState({ loaded: false })
  const [mine, setMine] = useState(false)
  const [claiming, setClaiming] = useState(false)
  const [status, setStatus] = useState('claimed')
  const [claimedBy, setClaimedBy] = useState(null)
  const [mnemonic, setMnemonic] = useState('')
  const [privKeyBTC, setPrivKeyBTC] = useState('')
  const [privKeyETH, setPrivKeyETH] = useState('')
  const [privValues, setKeyValues] = useState([])
  const [loadingApi, setLoadingApi] = useState(false)
  const [decryptedEffect, setDecryptedEffect] = useState('')
  const [decryptedEffectRunning, setDecryptedEffectRunning] = useState(false)
  const [decryptPassword, setDecryptPassword] = useState('')
  const [invalidVault, setInvalidVault] = useState(false)
  const [hasCheckedNft, setHasCheckedNft] = useState(false)
  const [accepting, setAccepting] = useState(false)
  const [acceptable, setAcceptable] = useState(false)
  const [transferPassword, setTransferPassword] = useState('')
  const [showTransferPassword, setShowTransferPassword] = useState(false)
  const [preTransfering, setPreTransfering] = useState(false)
  // const [transferImage, setTransferImage] = useState('')

  const handlerContract = useContract(contractAddresses.vaultHandler[chainId], contractAddresses.vaultHandlerAbi, true)
  const emblemContract = useContract(contractAddresses.emblemVault[chainId], contractAddresses.emblemAbi, true)

  const { isOpen: isOpenAddrModal, onOpen: onOpenAddrModal, onClose: onCloseAddrModal } = useDisclosure()
  const { isOpen: isOpenKeysModal, onOpen: onOpenKeysModal, onClose: onCloseKeysModal } = useDisclosure()

  interface ErrorWithCode extends Error {
    code?: number
  }

  let transferImage;

  const fireMetaMask = () => {
    ;(handlerContract as Contract)
      .transferWithCode(tokenId, mintPassword)
      .then(({ hash }: { hash: string }) => {
        setTimeout(() => {
          setHash(hash)
          setAccepting(true)
          // setShowMakingVaultMsg(true)
        }, 100) // Solving State race condition where transaction watcher wouldn't notice we were creating
      })
      .catch((error: ErrorWithCode) => {
        if (error?.code !== 4001) {
          console.log(`tx failed.`, error)
        } else {
          setAccepting(false)
          // setShowPreVaultMsg(false)
        }
      })
  }

  const addPreTransfer = () => {
    console.log('transferImage', "0x"+transferImage)
    ;(handlerContract as Contract)
      .addPreTransfer(tokenId, "0x"+transferImage)
      .then(({ hash }: { hash: string }) => {
        setTimeout(() => {
          setHash(hash)
          setPreTransfering(true)
          // setShowMakingVaultMsg(true)
        }, 100) // Solving State race condition where transaction watcher wouldn't notice we were creating
      })
      .catch((error: ErrorWithCode) => {
        if (error?.code !== 4001) {
          console.log(`tx failed.`, error)
        } else {
          setPreTransfering(false)
          // setShowPreVaultMsg(false)
        }
      })
  }

  const handleApproveForall = () => {
    ;(emblemContract as Contract)
      .setApprovalForAll(contractAddresses.vaultHandler[chainId], true)
      .then(({ hash }: { hash: string }) => {
        setTimeout(() => {
          setHash(hash)
          setPreTransfering(true)
          // setShowMakingVaultMsg(true)
        }, 100) // Solving State race condition where transaction watcher wouldn't notice we were creating
      })
      .catch((error: ErrorWithCode) => {
        if (error?.code !== 4001) {
          console.log(`tx failed.`, error)
        } else {
          setPreTransfering(false)
          // setShowPreVaultMsg(false)
        }
      })
  }

  // 

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
    // console.log('vault response was ', jsonData)
    if (!jsonData.name) {
      setState({ loaded: true })
      setInvalidVault(true)
    } else {
      setStates(jsonData)
      saveCache(jsonData)
      setLoadingApi(false)
      setInvalidVault(false)
    }
  }

  const setStates = (jsonData) => {
    setVaultName(jsonData.name)
    setVaultImage(jsonData.image)
    setVaultDesc(jsonData.description)
    setVaultTotalValue(jsonData.totalValue || 0)
    setVaultValues(vaultValues.concat(jsonData.values))
    setVaultDataValues(jsonData.attributes.filter(item=>{return item.trait_type === "key"}))
    setVaultDesc(jsonData.description)
    setVaultAddresses(jsonData.addresses)
    setVaultChainId(jsonData.network == 'mainnet' ? 1 : jsonData.network == "rinkeby" ? 4 : jsonData.network == "mumbai" ? 80001 : jsonData.network == "matic" ? 137: 97)
    setStatus(jsonData.status)
    if (status === 'claimed') {
      setClaimedBy(jsonData.claimedBy)
    }
    // console.log('inside getstates. mine is ', mine)
    setState({ loaded: true })
    let isPvt =
      jsonData.addresses.filter((item) => {
        return item.address.includes('private:')
      }).length > 0
    setVaultPrivacy(isPvt)
    setTimeout(() => {
      !isPvt ?
      getNftBalance(
        jsonData.values,
        jsonData.addresses.filter((item) => {
          return item.coin === 'ETH'
        })[0].address,
        (_values) => {
          // console.log("Have new values", _values)
          setVaultValues(_values)
        }
      ) : null
    }, 5)
  }

  const loadCache = () => {
    let vault = JSON.parse(localStorage.getItem(account + '_' + chainId + '_' + tokenId + '_vault')) // Load vaults from storage before updating from server!
    if (vault) {
      setState({ loaded: true })
      setStates(vault)
      setLoadingApi(true)
    }
  }

  const getEthBalances = async (address, cb) => {
    const responce = await fetch(EMBLEM_API + '/eth/balance/' + address, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
    })
    const jsonData = await responce.json()
    // console.log(Number(vaultTotalValue), Number(jsonData.totalValue))
    setVaultTotalValue(Number(vaultTotalValue) + Number(jsonData.totalValue))
    // console.log('get eth balances', jsonData.values)
    return cb(jsonData.values)
  }

  const getBtcBalance = async (values, address, cb) => {
    const responce = await fetch(EMBLEM_API + '/btc/balance/' + address, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
    })
    const jsonData = await responce.json()
    // setVaultValues(values.concat(jsonData.values))
    return cb(values.concat(jsonData.values))
  }

  const getNftBalance = async (values, address, cb) => {
    // console.log(address)
    const responce = await fetch(EMBLEM_API + '/eth/nft/' + address, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
    })
    const jsonData = await responce.json()
    if (jsonData.length > 0) {
      // console.log("Fuckling NFT", jsonData, values.concat(jsonData))
      return cb(values.concat(jsonData))
    } else {
      return cb(values)
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
    // console.log('getKeys response is ', jsonData)
    return cb(jsonData)
  }

  const getContractStates = async () => {
    let owned = false
    try {
      let owner  = await emblemContract.ownerOf(tokenId)
      let acceptable = await handlerContract.getPreTransfer(tokenId)
      let isApproved = await emblemContract.isApprovedForAll(account, contractAddresses.vaultHandler[chainId])
      setApproved(isApproved)
      setAcceptable(acceptable._from !== "0x0000000000000000000000000000000000000000")
      console.log("owned", owner === account)
      console.log(owner, account)
      console.log("approved", isApproved)
      // console.log("check approved for all", account, contractAddresses.vaultHandler[chainId])
      setMine(owner === account)
    } catch(err){}
    
  }

  useEffect(()=>{
    console.log("mine?", mine)
    console.log("claiming?", claiming)
    console.log("accepting?", accepting)
  })

  const handleSign = async () => {
    // library. .personal.sign(library.toHex("Claim:358746"),library.eth.defaultAccount, (err,res) => console.log(err,res))
    library
      .getSigner(account)
      .signMessage('Claim: ' + tokenId)
      .then((signature) => {
        getKeys(signature, tokenId, (result) => {
          // console.log('HandleSign response is ' + result)
          setMnemonic(result.decrypted.phrase)
          setPrivKeyBTC(
            result.decrypted.keys.filter((key) => {
              return key.coin === 'btc'
            })[0].privkey
          )
          setPrivKeyETH(
            result.decrypted.keys.filter((key) => {
              return key.coin === 'eth'
            })[0].privkey
          )
          setKeyValues(result.decrypted.values)
          onOpenKeysModal()
        })
      })
  }

  const handleClaim = async () => {
    emblemContract.transferFrom(account, BURN_ADDRESS, tokenId).then(({ hash }: { hash: string }) => {
      setClaiming(true)
      setTimeout(() => {
        setHash(hash)
      }, 100) // Solving State race condition where transaction watcher wouldn't notice we were claiming
    })
  }

  const startDecryptEffect = async () => {
    if (decryptedEffectRunning) {
      return
    }
    setDecryptedEffectRunning(true)
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
        } else {
          setDecryptedEffectRunning(false)
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
    // console.log('Account chainid = ' + chainId + ' and vaultchainid = ' + vaultChainId)
    account && chainId && vaultChainId && chainId == vaultChainId ? getContractStates() : null
    // console.log('in the usefeect that clls getcontractstates')
  })

  function splitDescription(words) {
    var desc = words.split('\n\n\n\n')
    return desc[0].trim()
  }

  function tryDecrypt(key) {
    if (decryptPassword) {
      key = decryptPassword
    }
    startDecryptEffect()
    let ciphertext = vaultAddresses[0].address.replace('private:', '')
    try {
      var bytes = CryptoJS.AES.decrypt(ciphertext, key)
      JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      setVaultPrivacy(false)
      setDecryptPassword(key)
      setVaultAddresses(decryptAddresses(key))
      getEthBalances(
        vaultAddresses.filter((item) => {
          return item.coin === 'ETH'
        })[0].address,
        (values) => {
          getBtcBalance(
            values,
            vaultAddresses.filter((item) => {
              return item.coin === 'BTC'
            })[0].address,
            (_values) => {
              // console.log("Have fucking values", values)
              getNftBalance(
                _values,
                vaultAddresses.filter((item) => {
                  return item.coin === 'ETH'
                })[0].address,
                (__values) => {
                  setVaultValues(__values.concat(vaultValues))
                }
              )
            }
          )
        }
      )
    } catch (err) {}
  }

  function decryptAddresses(key) {
    vaultAddresses.forEach((item) => {
      let cipherText = item.address.replace('private:', '')
      item.address = decrypt(cipherText, key)
    })
    return vaultAddresses
  }

  function decrypt(cipherText, key) {
    var bytes = CryptoJS.AES.decrypt(cipherText, key)
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decryptedData
  }

  return (
    <>
       <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Emblem.Finance" />
        <meta name="twitter:title" content={vaultName} />
        <meta name="twitter:description" content={splitDescription(vaultDesc)} />
        <meta name="twitter:image" content={vaultImage} />
      </Head>
      <AddrModal isOpen={isOpenAddrModal} onClose={onCloseAddrModal} addrCoin={currCoin} addrAddr={currAddr} />

      <KeysModal
        isOpen={isOpenKeysModal}
        onClose={onCloseKeysModal}
        mnemonic={mnemonic}
        privKeyBTC={privKeyBTC}
        privKeyETH={privKeyETH}
        privValues={privValues}
      />

      <Loader loaded={state.loaded}>
        {loadingApi ? <Refreshing /> : ''}
        {!invalidVault ? (
          <Tilt className="Tilt" options={{ max: experimental ? 19 : 0, scale: 1 }}>
            <Flex width="full" align="center" justifyContent="center">
              <Box
                maxW="sm"
                borderWidth="1px"
                borderColor={vaultChainId != chainId ? 'orange.500' : status == 'claimed' ? 'green.500' : null}
                rounded="lg"
                overflow="hidden"
                alignItems="center"
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
                  {!vaultPrivacy ? ': ~$' + vaultTotalValue : null}
                </Box>
                <Stack align="center">
                  <Image
                    src={validImage(vaultImage) ? vaultImage : 'https://circuitsofvalue.com/public/coval-logo.png'}
                    width="250px"
                  />
                </Stack>
                <Stack align="center">
                  <Box mt="2" ml="4" lineHeight="tight">
                    <Text mt={2} as="h4" ml="4" mr="4" fontSize="xs" fontStyle="italic" >
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
                              <Image width={10} src={coin.image}/>
                              {coin.name} :{' '}
                              {coin.balance ? (
                                coin.balance
                              ) : coin.type == 'nft' ? (
                                <Link href={coin.external_url} isExternal>
                                  View NFT
                                </Link>
                              ) : null}
                            </Text>
                          )
                        })
                      ) : null } 
                      { vaultDataValues.length ? (
                        vaultDataValues.map((data) => {
                          return (
                            <Text>Data: {data.attribute_key}</Text>
                          )                        
                        })
                      ) : (
                        <Text>Nothing in here! Fill 'er up!</Text>
                      )}
                    </Box>
                  </Box>
                  {!vaultPrivacy ? (
                    <Box d="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                      <ButtonGroup justifyContent="space-between" spacing={6}>
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
                    </Box>
                  ) : null}

                  {!(status === 'claimed') && !mintPassword ? (
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
                        {mine ? 'Sell/Gift/Send (Opensea)' : 'Make an Offer (Opensea)'}
                      </Button>
                    </Box>
                  ) : null}
                  {mine && !acceptable ? (<>
                    <Box d="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                      <Button width="100%" onClick={() => {
                        if (!approved) {
                          return handleApproveForall()
                        } else {
                          let key = CryptoJS.lib.WordArray.random(128/8).toString()
                          let sha = CryptoJS.SHA256(key).toString()
                          console.log('plain', key)
                          console.log('sha', sha)
                          setTransferPassword(key)
                          transferImage = sha
                          setShowTransferPassword(!showTransferPassword? true : false)
                          setTimeout(()=>{
                            addPreTransfer()
                          }, 500)
                        }                                             
                      }
                    }> {approved ? "Get Link (Send Vault Via Link)" : "Approve Gifting" } </Button>
                    </Box>
                      {showTransferPassword ? (<Box><Link href={location.protocol +'//'+ location.host + '/nft?id=' + tokenId + '&key=' + transferPassword}>Copy Me</Link></Box>) : null}
                  </>) : null }
                  {acceptable && claimedBy !== account ? (
                  <>                    
                      <Button mt={2} width="100%" onClick={()=>{fireMetaMask()}}>Accept</Button>
                      <Input
                        mt={2}
                        type="password"
                        id="mintPassword"
                        minLength={3}
                        maxLength={200}
                        value={mintPassword}
                        onChange={(e) => setMintPassword(e.target.value)}
                        autoComplete="off"
                      />
                  </>
                    ) : null}

                  {!(status === 'claimed') && account && vaultChainId === chainId && mine ? (
                    <Box d="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                      <Button
                        width="100%"
                        onClick={() => {
                          handleClaim()
                        }}
                        isDisabled={claiming}
                      >
                        {claiming ? 'Claiming ...' : 'Claim (Crack Open Vault)'}
                      </Button>
                    </Box>
                  ) : status === 'claimed' && claimedBy === account && vaultChainId === chainId ? (
                    <Box d="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                      <Button width="100%" onClick={handleSign}>
                        Get Keys
                      </Button>
                    </Box>
                  ) : null}
                </Box>
                <Stack direction="column" align="center">
                  {status == 'claimed' ? <Text color="green.500">CLAIMED</Text> : null}
                </Stack>
                {hash ? (
                  <Alert status="info">
                    <AlertIcon />
                    { accepting ? "Accepting your vault" : "Claiming your vault ..."}
                  </Alert>
                ) : null}
              </Box>
            </Flex>
          </Tilt>
        ) : (
          <Stack align="center">
            <Image
              width="md"
              src="https://starwarsblog.starwars.com/wp-content/uploads/2017/06/25-star-wars-quotes-obi-wan-kenobi-identification-tall.jpg"
            ></Image>
            <Text>
              THESE ARE NOT THE VAULTS YOU ARE LOOKING FOR{' '}
              <Link color="#638cd8" href="../create">
                CREATE ONE HERE!
              </Link>
            </Text>
          </Stack>
        )}
        {hash ? (
          <TransactionToast
            hash={hash}
            onComplete={() => {
              // location.href = location.origin + '/vault?id=' + tokenId
              if (claiming && !accepting && !preTransfering) {
                setHash(null)
                setStatus('claimed')
                setClaiming(false)
                setClaimedBy(account)
                handleSign()
              } else if (preTransfering) {
                setHash(null)
              }
            }}
          />
        ) : null}
      </Loader>
    </>
  )
}
