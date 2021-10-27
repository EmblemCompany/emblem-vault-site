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
  Tooltip,
  Collapse,
  FormControl,
  FormLabel,
  useColorMode,
  IconButton
} from '@chakra-ui/core'

import {HStack, VStack, Circle } from '@chakra-ui/react'
import TorusSdk from "@toruslabs/torus-direct-web-sdk";
import Head from "next/head"
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Refreshing from './Refreshing'
import Loader from 'react-loader'
import dynamic from 'next/dynamic'
import { isETHAddress, validImage } from '../utils'
import { Contract } from '@ethersproject/contracts'
import { TransactionToast } from './TransactionToast'
import { EMBLEM_API, BURN_ADDRESS, ZERO_ADDRESS, contractAddresses } from '../constants'
import { useContract } from '../hooks'
import Tilt from 'react-tilt'
import { CHAIN_ID_NAMES } from '../utils'
import CryptoJS from 'crypto-js'
import { addTokenToWallet, addMany } from '../public/web3'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import Embed from './Embed'
import NFTSlideshow from './embed/NFTSlideshow'
import CoinBalance from './partials/CoinBalance'
import { chakra } from '@chakra-ui/system'
import transakSDK from '@transak/transak-sdk'
declare global {
  interface Window { phraseToKey: any, phrasePathToKey: any }
}

const AddrModal = dynamic(() => import('./AddrModal'))
const KeysModal = dynamic(() => import('./KeysModal'))
const OfferModal = dynamic(() => import('./OfferModal'))

export default function Simulator() {
  const { account, chainId, library } = useWeb3React()
  const { query } = useRouter()
  const [approved, setApproved] = useState(false)
  const [mintPassword, setMintPassword] = useState(query.key)
  const [showOffer, setShowOffer] = useState(query.offer || false)
  const [framed, setFramed] = useState(query.framed || true)
  const [tokenId, setTokenId] = useState('266157498622821')
  const [nmcAddress, setNmcAddress] = useState(query.nmc || false)
  const [ethAddress, setEthAddress] = useState(query.eth || false)
  const [btcAddress, setBtcAddress] = useState(query.btc || false)
  const [overRideComplete, setOverRideComplete] = useState(false)
  const [experimental, setExperimental] = useState(query.experimental)
  const [vaultName, setVaultName] = useState('')
  const [vaultIPFS, setVaultIPFS] = useState('')
  const [vaultImageIPFS, setVaultImageIPFS] = useState('')
  const [vaultCiphertextV2, setVaultCiphertextV2] = useState('')
  const [vaultDesc, setVaultDesc] = useState('')
  const [vaultImage, setVaultImage] = useState('')
  const [ownedImage, setOwnedImage] = useState('')
  const [vaultValues, setVaultValues] = useState([])
  const [loadedValues, setLoadedValues] = useState(false)
  const [vaultDataValues, setVaultDataValues] = useState([])
  const [vaultAddresses, setVaultAddresses] = useState([])
  const [vaultPrivacy, setVaultPrivacy] = useState(false)
  const [vaultTotalValue, setVaultTotalValue] = useState(0)
  const [vaultChainId, setVaultChainId] = useState(null)
  const [vaultChain, setVaultChain] = useState(null)
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
  const [approving, setApproving] = useState(false)
  const [acceptable, setAcceptable] = useState(false)
  const [transferPassword, setTransferPassword] = useState('')
  const [showTransferPassword, setShowTransferPassword] = useState(false)
  const [preTransfering, setPreTransfering] = useState(false)
  const [transferToAddress, setTransferToAddress] = useState(null)
  const [transfering, setTransfering] = useState(false)
  const [owner, setOwner] = useState(null)
  const [torus, setTorus] = useState(initTorus())
  const [live, setLive] = useState(false)
  const [nonce, setNonce] = useState(null)
  const [mintSignature, setMintSignature] = useState(null)
  const [to, setTo] = useState(null)
  const [showMakingVaultMsg, setShowMakingVaultMsg] = useState(false)
  const [minting, setMinting] = useState(false)
  // const [transferImage, setTransferImage] = useState('')

  const handlerContract = useContract(contractAddresses.vaultHandler[chainId], contractAddresses.vaultHandlerAbi, true)
  const emblemContract = useContract(contractAddresses.emblemVault[chainId], contractAddresses.emblemAbi, true)

  const { isOpen: isOpenAddrModal, onOpen: onOpenAddrModal, onClose: onCloseAddrModal } = useDisclosure()
  const { isOpen: isOpenKeysModal, onOpen: onOpenKeysModal, onClose: onCloseKeysModal } = useDisclosure()
  const { isOpen: isOpenOfferModal, onOpen: onOpenOfferModal, onClose: onCloseOfferModal } = useDisclosure()
  const { isOpen, onToggle } = useDisclosure()
  const { isOpen: isManageAddressOpen, onToggle: onManageAddressToggle } = useDisclosure()

  const { colorMode } = useColorMode()

  let transak

  interface ErrorWithCode extends Error {
    code?: number
  }

  let transferImage;

  async function initTorus() {
    let _torus = new TorusSdk({
      baseUrl: `${window.location.origin}/serviceworker`,
      enableLogging: true,
      network: "testnet", // details for test net
    });
    await _torus.init({skipSw: true, skipInit: true, skipPrefetch: true})
    console.log("Initialized Torus")
    return _torus
  }  

  const checkLiveliness = (tokenId, cb)=>{
    fetch(EMBLEM_API + '/liveliness', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
        chainid: chainId.toString()
      },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify({tokenId: tokenId}),
    }).then(async function (response) {
      let data = await response.json()
      // setLive(data.live)
      console.log("Liveliness check", data)
    })
    return cb()
  }  

  
  const getVault = async () => {
    loadCache()
    const responce = await fetch(EMBLEM_API + '/meta/' + tokenId + '?experimental=true', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
    })
    const jsonData = await responce.json()
    // console.log('vault response was ', jsonData)
    if (jsonData.image_ipfs) {
      getIPFSImage(jsonData.image_ipfs)
    }
    if (!jsonData.name) {
      setState({ loaded: true })
      setInvalidVault(true)
    } else {
      setStates(jsonData)
      saveCache(jsonData)
      setLoadingApi(false)
      setInvalidVault(false)
    }
    {
      !vaultPrivacy && !loadedValues && vaultAddresses.length > 0 ?    
      getAllBalancesLive([], tokenId, (v)=>{
        if (v) {
          setVaultValues(v)
        }        
      }) : null
    }
  }

  const getIPFSImage = async function(hash){
    // alert(0)
    const responce = await fetch('https://gateway.ipfs.io/ipfs/'+hash, {
      method: 'GET',
      headers: {
        // redirect:'follow'
      },
    })
    let jsonData = await responce.text()
    // setVaultImage(jsonData) 
    const preview = document.querySelector('img.d-block') as HTMLImageElement 
    preview.src = jsonData
    console.log(jsonData)  
  }  

  const setStates = (jsonData) => {
    framed && !jsonData.image.includes('framed=') && !jsonData.image.includes('http') ? jsonData.image = jsonData.image + "&framed="+framed : null
    if (jsonData.ciphertextV2) {
      setVaultCiphertextV2(jsonData.ciphertextV2)
      console.log("ciphertextV2", jsonData.ciphertextV2)
    }
    setVaultName(jsonData.name)
    setVaultImage(jsonData.image)
    setOwnedImage(jsonData.ownedImage || null)
    setVaultDesc(jsonData.description)
    setVaultTotalValue(jsonData.totalValue || 0)
    setVaultValues(vaultValues.concat(jsonData.values))
    setVaultDataValues(jsonData.attributes.filter(item=>{return item.trait_type === "key"}))
    setVaultAddresses(jsonData.addresses)
    setVaultIPFS(jsonData.ipfs || null)
    setVaultImageIPFS(jsonData.image_ipfs || null)
    // if (jsonData.live == false) {
    //   checkLiveliness(jsonData.tokenId, ()=>{

    //   })
    // }
    // setLive(jsonData.live == false ? false : true)
    setNonce(jsonData.nonce)
    setMintSignature(jsonData.signature)
    setTo(jsonData.to)
    setVaultChain(jsonData.network)
    setVaultChainId(
      jsonData.network == 'mainnet' ? 1 : 
      jsonData.network == "rinkeby" ? 4 : 
      jsonData.network == "mumbai" ? 80001 : 
      jsonData.network == "matic" ? 137 : 
      jsonData.network == "xdai" ? 100 : 
      jsonData.network == "bsc" ? 56 : 
      jsonData.network == "fantom" ? 250 : 
      97
    )
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
  }

  

  const getAllBalancesLive = async (values, tokenId, cb) => {
    setVaultValues([])
    // console.log(address)
    if (loadedValues) {
      return cb(false)
    }
    setLoadedValues(true)
    
    let _ethAddress = ethAddress || vaultAddresses.filter(address=>{ return address.coin == 'ETH'})[0].address
    let _btcAddress = btcAddress || vaultAddresses.filter(address=>{ return address.coin == 'BTC'})[0].address
    let _nmcAddress = nmcAddress || vaultAddresses.filter(address=>{ return address.coin == 'NMC'})[0].address
    const responce = await fetch(EMBLEM_API + '/vault/balance/' + _ethAddress + '/' + _btcAddress + '/' + _nmcAddress , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
    })
    
    const jsonData = await responce.json()
    console.log('responce', responce, jsonData)
    if (jsonData.balances.length > 0) {      
      return cb(values.concat(jsonData.balances))
    } else {
      return cb(values)
    }
  }

  const getAllBalancesByAddress = async (values, ethAddress, btcAddress, cb) => {
    // console.log(address)
    const responce = await fetch(EMBLEM_API + '/vault/balance/' + ethAddress + '/' + btcAddress, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
    })
    
    const jsonData = await responce.json()
    console.log('responce', responce, jsonData)
    if (jsonData.balances.length > 0) {      
      return cb(values.concat(jsonData.balances))
    } else {
      return cb(values)
    }
  }

  const saveCache = (vault) => {
    localStorage.setItem(account + '_' + chainId + '_' + tokenId + '_vault', JSON.stringify(vault)) // Save new state for later
  }

  const loadCache = () => {
    let vault = JSON.parse(localStorage.getItem(account + '_' + chainId + '_' + tokenId + '_vault')) // Load vaults from storage before updating from server!
    if (vault) {
      setState({ loaded: true })
      setStates(vault)
      setLoadingApi(true)
    }
  }

  const savePasswordToLocalStorage = () => {
    localStorage.setItem(account + '_' + chainId + '_' + tokenId + '_mintPassword', transferPassword) // Save new state for later
  }

  const loadPasswordFromLocalStorage = () => {
    let storedPw = localStorage.getItem(account + '_' + chainId + '_' + tokenId + '_mintPassword')
    storedPw && acceptable ? setMintPassword(storedPw) : null //setMintPassword(null)
  }

  const decryptEmbed = async (signature, tokenId, cb) => {
    var myHeaders = new Headers()
    myHeaders.append('chainId', chainId.toString())
    myHeaders.append('service', 'evmetadata')
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({ signature: signature })
    const responce = await fetch(EMBLEM_API + '/embed/' + tokenId, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
    const jsonData = await responce.json()
    return cb(jsonData)
  }

  const getContractStates = async () => {
    let owned = false
    let _owner
    try {
      _owner  = await emblemContract.ownerOf(tokenId)
      finish()
    } catch(err){
      _owner = "0x0000000000000000000000000000000000000000"
      finish()
    }

    async function finish(){
      let acceptable = await handlerContract.getPreTransfer(tokenId)
      let isApproved = await emblemContract.isApprovedForAll(account, contractAddresses.vaultHandler[chainId])
      setApproved(isApproved)
      setAcceptable(acceptable._from !== "0x0000000000000000000000000000000000000000")
      setOwner(_owner)
      setMine(_owner === account)
      loadPasswordFromLocalStorage()
    }
    
  }

  const handleOwnedEmbed = async () => {
    library
      .getSigner(account)
      .signMessage('Embed: ' + tokenId)
      .then((signature) => {
        decryptEmbed(signature, tokenId, (result) => {
          setVaultImage(result.ownedImage)
        })        
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

  useEffect(()=>{
    if (!overRideComplete && vaultAddresses.length > 0) {
      console.log("Overriding")
      getAllBalancesLive([], '', (v)=>{
        if (v) {
          setVaultValues(v)
        }        
      })
      setOverRideComplete(true)
    }
    
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
    console.log(vaultAddresses)
    let ciphertext = vaultAddresses[0].address.replace('private:', '')
    try {
      var bytes = CryptoJS.AES.decrypt(ciphertext, key)
      JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      setVaultPrivacy(false)
      setDecryptPassword(key)
      setVaultAddresses(decryptAddresses(key))
      let ethAddress = vaultAddresses.filter((item) => {return item.coin === 'ETH'})[0].address
      let btcAddress = vaultAddresses.filter((item) => {return item.coin === 'BTC'})[0].address
      console.log("SUCCESS", vaultAddresses)
      getAllBalancesByAddress([], ethAddress, btcAddress, (values)=>{
        setVaultValues(values)
      })
    } catch (err) {console.log('WTF', err)}
  }

  function decryptAddresses(key) {
    vaultAddresses.forEach((item) => {
      if (item.address.includes('private')) {
        let cipherText = item.address.replace('private:', '')
        item.address = decrypt(cipherText, key)
      }      
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
        <script
            dangerouslySetInnerHTML={{
              __html: `
              // $(".NFT").tilt({    
              //     maxTilt: 3
              // });
              $(".NFT").trigger('mouseenter');
              $(".NFT").trigger('mouseclick'), '.NFT';
              `,
            }}
          />
      </Head>
      <AddrModal isOpen={isOpenAddrModal} onClose={onCloseAddrModal} addrCoin={currCoin} addrAddr={currAddr} />

      <Loader loaded={state.loaded}>
        <Box height="40px"></Box>
        {loadingApi ? <Refreshing /> : ''}
        {!invalidVault ? (          
            <Flex width="full" align="center" justifyContent="center">
              <Box
                className="NFT" 
                maxW="sm"
                borderWidth="1px"
                borderColor={vaultChainId != chainId ? 'orange.500' : status == 'claimed' ? 'green.500' : null}
                rounded="lg"
                overflow="hidden"
                alignItems="center"
                minW={390}
              >
                
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h3"
                  lineHeight="tight"
                  p={2}
                  textAlign="center"
                  textTransform="uppercase"
                  alignItems="center"
                  color="blue.500"
                >
                  Vault Network: {CHAIN_ID_NAMES[vaultChainId]}
                </Box>
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h3"
                  lineHeight="tight"
                  p={2}
                  textAlign="center"
                  // textTransform="uppercase"
                  alignItems="center"
                >
                  {vaultName}
                  {!vaultPrivacy && vaultTotalValue > 0 ? ': ~$' + vaultTotalValue.toLocaleString() : null}
                </Box>
                <Stack className="NFT-content" align="center">
                  { vaultValues.length && vaultValues.filter(item=> {return item.type == "nft"}).length > 0 ? (
                      <NFTSlideshow name={vaultName} image={vaultImage} items={vaultValues.map(value=>{return {image: value.image, description: value.description, name: value.name, type: value.type}})} properties = {{'duration': 3000, canSwipe: false}}/>
                    ) : (
                      <Embed className="d-block w-100 NFT-image" url={vaultImage}/>
                    )
                  }
                  {mine && ownedImage ? (
                    <Button onClick={() => {handleOwnedEmbed()}}>(OWNED) Show Full Embed</Button>
                  ): null}
                </Stack>
                <Stack align="center">
                  <Box mt="2" ml="4" lineHeight="tight">
                    <Stack>
                      <Text fontSize="xs">
                      { vaultChainId == chainId ? (
                        <Link href={"./vaultlist?address="+owner}>
                          Owner: {owner}
                        </Link>
                      ) : null }
                      </Text>
                      <Text mt={2} as="h4" ml="4" mr="4" fontSize="xs" fontStyle="italic" >
                        <ReactMarkdown plugins={[gfm]} children={splitDescription(vaultDesc)} />
                      </Text>
                      
                    </Stack>                    
                  </Box>                    
                </Stack>
                <Box p="6">
                  {vaultPrivacy ? (
                    <Box mb={5}>
                      <Text pb={2} color={decryptedEffect ? 'green.500' : null}>
                        {decryptedEffect ? decryptedEffect : 'Contents hidden. Enter password to unlock.'}
                      </Text>
                      <Input
                        type="password"
                        id="vault-password"
                        onChange={(e) => tryDecrypt(e.target.value)}
                        aria-describedby="password-helper-text"
                      />
                    </Box>
                  ) : (
                    <Box d="flex" backgroundColor={colorMode == "light"? "gray.100": "gray.700"} alignItems="baseline" className="coin-balance-content">
                      <Box color="gray.500" letterSpacing="wide" fontSize="sm" ml="2">
                        <Text as="h4" mt={2} fontWeight="semibold">
                        
                          Current Contents:  <button
                          onClick={() =>{
                            getAllBalancesLive([], tokenId, (v)=>{
                              setLoadedValues(false)
                              setVaultValues(v)
                            })
                          }}
                        > [Refresh Balances]</button>
                        </Text>
                        <Text as="p" color={colorMode=="dark"? "lightgreen": "forestgreen"}>${Number(vaultTotalValue.toFixed(4)).toLocaleString()}</Text>
                        { vaultValues.length ? (
                          vaultValues.map((coin) => {
                            return (  
                              <Stack> 
                                <CoinBalance colorMode={colorMode} coin={coin} mine={false} onRenew={()=>{}}/>  
                              </Stack>
                            )
                          })
                        ) : (<Refreshing /> ) } 
                        { vaultDataValues.length ? (
                          vaultDataValues.map((data) => {
                            return (
                              <Text>Data: {data.attribute_key}</Text>
                            )                        
                          })
                        ) : !vaultDataValues.length && !vaultValues.length ? (
                          <Text>Nothing in here! Fill 'er up!</Text>
                        ) : null}
                      </Box>
                    </Box>
                  )}   
                </Box>
                
              </Box>
            </Flex>
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
              if (claiming && !accepting && !preTransfering) {
                setHash(null)
                setStatus('claimed')
                setClaiming(false)
                setClaimedBy(account)
                // handleSign()
              } else if (preTransfering) {
                savePasswordToLocalStorage()
                setShowTransferPassword(true)
                setPreTransfering(false)
                setHash(null)                
              } else if(accepting) {
                setAccepting(false)                
                getVault()
                setHash(null)
              } else if(approving) {
                setApproving(false)
                getVault()
                setHash(null)
              } else if(transfering) {
                setTransfering(false)
                getVault()
                setHash(null)
              } else if(minting) {
                checkLiveliness(tokenId, ()=>{
                  setMinting(false)
                  setLive(true)
                  // setShowMakingVaultMsg(false)
                  // location.href = location.origin + '/nft?id=' + tokenId
                })
              } else {
                console.log('minting', minting) 
                console.log('claiming', claiming) 
                console.log('accepting', accepting) 
                console.log('preTransfering', preTransfering)
                console.log('approving', approving)
                console.log("Unknown state")
              }
            }}
          />
        ) : null}
        <Box height="40px"></Box>
      </Loader>
    </>
  )
}
