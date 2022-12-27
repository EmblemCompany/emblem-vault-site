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
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels
} from '@chakra-ui/core'

import {HStack, VStack, Circle } from '@chakra-ui/react'
// import TorusSdk from "@toruslabs/torus-direct-web-sdk";
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
import Attributes from './partials/Attributes';
import { getStxAddress, generateWallet } from '@stacks/wallet-sdk';
import FetchNodeDetails from "@toruslabs/fetch-node-details"
import TorusUtils from "@toruslabs/torus.js"


declare global {
  interface Window { phraseToKey: any, phrasePathToKey: any}
}

const AddrModal = dynamic(() => import('./AddrModal'))
const KeysModal = dynamic(() => import('./KeysModal'))
const OfferModal = dynamic(() => import('./OfferModal'))

export default function Nft() {
  
 
  const { account, chainId, library } = useWeb3React()
  const { query } = useRouter()
  const [clearCache, setCache] = useState(query.cc == 't')
  const [approved, setApproved] = useState(false)
  const [useOldMint, setUseOldMint] = useState(query.useOldMint)
  const [mintPassword, setMintPassword] = useState(query.key)
  const [showOffer, setShowOffer] = useState(query.offer || false)
  const [framed, setFramed] = useState(query.framed || true)
  const [tokenId, setTokenId] = useState(query.id)
  const [experimental, setExperimental] = useState(query.experimental)
  const [noLayout, setNoLayout] = useState(query.noLayout)
  const [slideshowOnly, setSlideshowOnly] = useState(query.slideshowOnly || false)
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
  const [attributes, setAttributes] = useState([])
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
  const [sealed, setSealed] = useState(false)
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
  // const [torus, setTorus] = useState(initTorus())
  const [live, setLive] = useState(false)
  const [nonce, setNonce] = useState(null)
  const [mintSignature, setMintSignature] = useState(null)
  const [to, setTo] = useState(null)
  const [showVerifyingSignature, setShowVerifyingSignature] = useState(false)
  const [showMakingVaultMsg, setShowMakingVaultMsg] = useState(false)
  const [minting, setMinting] = useState(false)
  const [isCrowdSale, setIsCrowdSale] = useState(false)
  const [alternateContractAddress, setAlternateContractAddress] = useState(null)
  const [targetAsset, setTargetAsset] = useState({name: '', image: '', metadata: ''})
  const [targetContract, setTargetContract] = useState({name: '', chain: '', 4: '', 1: '', tokenId: {}, serialNumber: {'hex':''} })
  // const [transferImage, setTransferImage] = useState('')
  
  const handlerContract = useContract(contractAddresses.vaultHandler[chainId], contractAddresses.vaultHandlerAbi, true)
  const vaultHandlerContract = useContract(contractAddresses.vaultHandlerV8[chainId], contractAddresses.vaultHandlerV8Abi, true)
  let emblemContract = useContract(contractAddresses.emblemVault[chainId], contractAddresses.emblemAbi, true)

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

  // async function initTorus() {
  //   let _torus = new TorusSdk({
  //     baseUrl: `${window.location.origin}/serviceworker`,
  //     enableLogging: true,
  //     network: "testnet", // details for test net
  //   });
  //   await _torus.init({skipSw: true, skipInit: true, skipPrefetch: true})
  //   console.log("Initialized Torus")
  //   return _torus
  // }

  const getVaultContract = (address = null) =>{
    //return useContract(address || contractAddresses.emblemVault[chainId], contractAddresses.emblemAbi, true)
    return new Contract(address || contractAddresses.emblemVault[chainId], contractAddresses.emblemAbi, library.getSigner(account).connectUnchecked())
  }

  const getCuratedContract = (address = null) =>{
    return new Contract(address, contractAddresses.erc1155Abi, library.getSigner(account).connectUnchecked())
  }

  const initializeTransak = (address?: string, coin? : string)=>{
    transak = new transakSDK({
      apiKey: 'e8bed1bd-6844-4eb1-973a-7a11a48fafab',  // Your API Key
      environment: 'PRODUCTION', // STAGING/PRODUCTION
      defaultCryptoCurrency: coin || 'ETH',
      walletAddress: address || '', // Your customer's wallet address
      themeColor: '000000', // App theme color
      fiatCurrency: 'USD', // INR/GBP
      // fiatAmount: 350,
      email: '', // Your customer's email address
      redirectURL: '',
      // paymentMethod: 'neft_bank_transfer',
      hostURL: window.location.origin,
      widgetHeight: '550px',
      widgetWidth: '450px'
    });
  
    // To get all the events
    transak.on(transak.ALL_EVENTS, (data) => {
      console.log(data)
    });
  
    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      console.log(orderData);
      transak.close();
    });
  
    transak.init()
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
      setLive(data.live)
      console.log("Liveliness check", data)
    })
    return cb()
  }

  const transferVault = () => {
    setTransfering(true)
    ;(emblemContract as Contract).transferFrom(account, transferToAddress, tokenId)
    .then(({ hash }: { hash: string }) => {
      setHash(hash)
    })
    .catch((error: ErrorWithCode) => {})
  }

  const lazyMint = () =>{
    library.getSigner(account)
    .signMessage('Delayed Minting: ' + tokenId)
    .then((signature) => {
      console.log("sig", signature)
      fetch(EMBLEM_API + '/lazyMint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          service: 'evmetadata',
          chainid: chainId.toString()
        },
        body: JSON.stringify({tokenId: tokenId, signature: signature}),
      }).then(async function (response) {
            let data = await response.json()
            console.log("data", data.data)
            setMintSignature(data.data.signature)
            setNonce(data.data.nonce)
            setShowVerifyingSignature(true)
            // setCreating(true)
            setTimeout(()=>{
              delayedMint()
            }, 500)
      })
    })
  }

  const delayedMint = () => {
    // setCreating(true)
      console.log("Delayed Minting")
      setShowVerifyingSignature(false)
      setShowMakingVaultMsg(true)
      setMinting(true)
      let cipherTextHash = vaultAddresses.filter(address=>{ return address.coin == "ETH"})[0].address
      console.log("--------------------------------------------------------Delayed Minting", account, tokenId, cipherTextHash, nonce, mintSignature)
      ;(handlerContract as Contract)
      .buyWithSignature(account, tokenId, cipherTextHash, nonce, mintSignature)
      .then(({ hash }: { hash: string }) => {
        setTimeout(() => {
          setHash(hash)
          setShowMakingVaultMsg(false)
          
        }, 100) // Solving State race condition where transaction watcher wouldn't notice we were creating
      })
      .catch((error: ErrorWithCode) => {
          console.log("AAAAAHHHHHH", error.code)
          setShowMakingVaultMsg(false)
          // setMinting(false)
      })    
  }

  const fireMetaMask = () => {
    console.log(mintPassword)
    setAccepting(true)
    getWitness(witness=>{
      // console.log(tokenId, mintPassword, witness.nonce, witness.signature, account)
      ;(handlerContract as Contract)
      .transferWithCode(tokenId, mintPassword, account, witness.nonce, witness.signature)
      .then(({ hash }: { hash: string }) => {
        setTimeout(() => {
          setHash(hash)          
          // setShowMakingVaultMsg(true)
        }, 100) // Solving State race condition where transaction watcher wouldn't notice we were creating
      })
      .catch((error: ErrorWithCode) => {
        setAccepting(false)
        if (error?.code !== 4001) {
          console.log(`tx failed.`, error)
        } else {
          // setAccepting(false)
          // setShowPreVaultMsg(false)
        }
      })
    })
    
  }

  const addPreTransfer = () => {
    console.log('transferImage', "0x"+transferImage)
    setPreTransfering(true)
    ;(handlerContract as Contract)
      .addPreTransfer(tokenId, "0x"+transferImage)
      .then(({ hash }: { hash: string }) => {
        // setTimeout(() => {
          setHash(hash)
          console.log("Set Pre Transfering True", preTransfering)
          // setShowMakingVaultMsg(true)
        // }, 100) // Solving State race condition where transaction watcher wouldn't notice we were creating
      })
      .catch((error: ErrorWithCode) => {
        if (error?.code){   
            console.log("Error?")       
            setPreTransfering(false)
            setShowTransferPassword(false)
            setTransferPassword('')
        } else {
          // setShowTransferPassword(!showTransferPassword? true : false)
          // setPreTransfering(false)
          // setShowPreVaultMsg(false)
        }
      })
  }

  const handleApproveForall = () => {
    setApproving(true)
    ;(emblemContract as Contract)
      .setApprovalForAll(contractAddresses.vaultHandler[chainId], true)
      .then(({ hash }: { hash: string }) => {
        setTimeout(() => {
          setHash(hash)          
          // setShowMakingVaultMsg(true)
        }, 100) // Solving State race condition where transaction watcher wouldn't notice we were creating
      })
      .catch((error: ErrorWithCode) => {
        if (error?.code !== 4001) {
          console.log(`tx failed.`, error)
        } else {
          setApproving(false)
          // setShowPreVaultMsg(false)
        }
      })
  }

  const deleteVault = () =>{
    library.getSigner(account)
      .signMessage('Delete: ' + tokenId)
      .then((signature) => {
        console.log("sig", signature)
        fetch(EMBLEM_API + '/v2/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            service: 'evmetadata'
          },
          body: JSON.stringify({tokenId: tokenId, signature: signature, chainId: chainId.toString()}),
        }).then(async function (response){
          let data = await response.json()
          location.href = location.href.split("/")[0] + "/vaults"
        })
      })
  }

  const getVault = async () => {
    console.log('getvault')
    // !slideshowOnly ? loadCache() : null
    // console.log("---------",EMBLEM_API + '/meta/' + tokenId + '?experimental=true')
    const responce = await fetch(EMBLEM_API + '/meta/' + tokenId + '?experimental=true'+(clearCache ? '&_vercel_no_cache=1' : ''), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
        cc: (clearCache ? 't' : '')
      },
    })
    const jsonData = await responce.json()
    // console.log('vault response was ', jsonData)
    if (jsonData.image_ipfs) {
      // getIPFSImage(jsonData.image_ipfs)
    }
    if (jsonData.collectionAddress){
      setIsCrowdSale(true)
      setAlternateContractAddress(jsonData.collectionAddress)
    }
    if (!jsonData.name) {
      setState({ loaded: true })
      setInvalidVault(true)
    } else {
      setStates(jsonData)
      // !slideshowOnly? saveCache(jsonData) : null
      setLoadingApi(false)
      setInvalidVault(false)
    }
    {
      !vaultPrivacy && !loadedValues ?    
      getAllBalancesLive([], tokenId, (v)=>{
        if (v) {
          setVaultValues(v)
        }        
      }) : null
    }
    { if (jsonData.targetContract) {
      setTimeout(() => {
        location.href = location.origin + '/nft2?id=' + jsonData.targetContract.tokenId
      }, 500)
    }}
  }

  const getWitness = async (cb) => {
    const responce = await fetch(EMBLEM_API + '/witness/' + tokenId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cc: 't',
        service: 'evmetadata',
        chainid: chainId.toString()
      },
    })
    const jsonData = await responce.json()
    // console.log('vault response was ', jsonData)
    if (jsonData.signature) {
      console.log('witness', jsonData)
      return cb(jsonData)
    } else {
      return cb(false)
    }
  }

  const setStates = (jsonData) => {
    framed && jsonData.image && !jsonData.image.includes('framed=') && !jsonData.image.includes('http') ? jsonData.image = jsonData.image + "&framed="+framed : null
    if (jsonData.ciphertextV2) {
      setVaultCiphertextV2(jsonData.ciphertextV2)
      console.log("ciphertextV2", jsonData.ciphertextV2)
    }
    setVaultName(jsonData.name)
    setVaultImage(jsonData.image)
    setOwnedImage(jsonData.ownedImage || null)
    setVaultDesc(jsonData.description)
    setVaultTotalValue(jsonData.totalValue || 0)
    jsonData.values ? setVaultValues(vaultValues.concat(jsonData.values)): null
    jsonData.attributes ? setVaultDataValues(jsonData.attributes.filter(item=>{return item.trait_type === "key"})): null
    jsonData.attributes ? setAttributes(jsonData.attributes): null
    setVaultAddresses(jsonData.addresses)
    setVaultIPFS(jsonData.ipfs || null)
    setVaultImageIPFS(jsonData.image_ipfs || null)
    jsonData.targetAsset? setTargetAsset(jsonData.targetAsset) : null
    jsonData.targetContract? setTargetContract(jsonData.targetContract) : null
    if (jsonData.targetContract){
      setTimeout(() => {
        location.href = location.origin + '/nft2?id=' + jsonData.targetContract.tokenId
      }, 500)
    }
    if (jsonData.live == false) {
      checkLiveliness(jsonData.tokenId, ()=>{

      })
    }
    setLive(jsonData.live == false ? false : true)
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
      jsonData.network == "bitcoin" ? 0 : 
      jsonData.network == "aurora" ? 1313161554 : 
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
    if (jsonData.sealed) {
      setSealed(true)
    } else {
      setSealed(false)
    }
  }

  // const getEthBalances = async (address, cb) => {
  //   const responce = await fetch(EMBLEM_API + '/eth/balance/' + address, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       service: 'evmetadata',
  //     },
  //   })
  //   const jsonData = await responce.json()
  //   // console.log(Number(vaultTotalValue), Number(jsonData.totalValue))
  //   setVaultTotalValue(Number(vaultTotalValue) + Number(jsonData.totalValue))
  //   // console.log('get eth balances', jsonData.values)
  //   return cb(jsonData.values)
  // }

  // const getBtcBalance = async (values, address, cb) => {
  //   const responce = await fetch(EMBLEM_API + '/btc/balance/' + address, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       service: 'evmetadata',
  //     },
  //   })
  //   const jsonData = await responce.json()
  //   // setVaultValues(values.concat(jsonData.values))
  //   return cb(values.concat(jsonData.values))
  // }

  // const getNftBalance = async (values, address, cb) => {
  //   // console.log(address)
  //   const responce = await fetch(EMBLEM_API + '/eth/nft/' + address, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       service: 'evmetadata',
  //     },
  //   })
  //   const jsonData = await responce.json()
  //   if (jsonData.length > 0) {
  //     // console.log("Fuckling NFT", jsonData, values.concat(jsonData))
  //     return cb(values.concat(jsonData))
  //   } else {
  //     return cb(values)
  //   }
  // }

  const getAllBalances = async (values, tokenId, cb) => {
    // console.log(address)
    const responce = await fetch(EMBLEM_API + '/vault/balance/' + tokenId , {
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

  const getAllBalancesLive = async (values, tokenId, cb) => {
    // setVaultValues([])
    // console.log(address)
    if (loadedValues) {
      return cb(false)
    }
    setLoadedValues(true)
    const responce = await fetch(EMBLEM_API + '/vault/balance/' + tokenId + '?live=true' , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata'
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
    console.log('cache')
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

  // const getKeys = async (signature, tokenId, cb) => {
  //   var myHeaders = new Headers()
  //   myHeaders.append('chainId', chainId.toString())
  //   myHeaders.append('service', 'evmetadata')
  //   myHeaders.append('Content-Type', 'application/json')

  //   var raw = JSON.stringify({ signature: signature })
  //   const responce = await fetch(EMBLEM_API + '/claim/' + tokenId, {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow',
  //   })
  //   const jsonData = await responce.json()
  //   // console.log('getKeys response is ', jsonData)
  //   return cb(jsonData)
  // }

  const getSignedJWT = async (signature, tokenId, cb)=>{
    var myHeaders = new Headers()
    myHeaders.append('chainid', chainId.toString())
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({ signature: signature, tokenId: tokenId })
    const responce = await fetch('https://tor-us-signer-coval.vercel.app/sign', {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
    const jsonData = await responce.json()
    return cb(jsonData)
  }

  // const getRemoteKey = async (tokenId, token, cb)=> {   
  //   let error = false
  //   let keys = await (await torus).getTorusKey(
  //       "tor-us-signer-vercel", 
  //       tokenId,
  //       { verifier_id: tokenId }, 
  //       token, 
  //     ).catch(err=>{
  //       error = err.message
  //     })
  //     if (error) {
  //       console.log("error", error)
  //       return cb(false)
  //     } else {
  //       return cb(keys)
  //     }
  // }

  async function getTorusKeys( verifierId, idToken, cb) {
    const fetchNodeDetails = new FetchNodeDetails({ network: "https://solemn-restless-diagram.ropsten.discover.quiknode.pro/37fca8f14d3a42d9ec00f50a3f6adc404d5e2a04/", proxyAddress: "0x6258c9d6c12ed3edda59a1a6527e469517744aa7" });
    const torusUtils = new TorusUtils({ enableOneKey: true, network: "testnet" });
    const { torusNodeEndpoints, torusIndexes } = await fetchNodeDetails.getNodeDetails({ verifier: 'tor-us-signer-vercel', verifierId });
    const { privKey } = await torusUtils.retrieveShares(torusNodeEndpoints, torusIndexes, 'tor-us-signer-vercel', { verifier_id: verifierId }, idToken);
    return cb({privateKey: privKey});
  }

  const addAddress = async (signature, tokenId, coin, cb) => {
    var myHeaders = new Headers()
    myHeaders.append('chainId', chainId.toString())
    myHeaders.append('service', 'evmetadata')
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({ signature: signature, coin: coin })
    const responce = await fetch(EMBLEM_API + '/address/' + tokenId, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
    const jsonData = await responce.json()
    return cb(jsonData)
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
    console.log("Contract states")
    let owned = false
    let _owner
    try {
      if (targetContract[chainId]) {
        console.log("Checking owner wth targetContract")
        emblemContract = getCuratedContract(targetContract[chainId])
        _owner = await emblemContract.getOwnerOfSerial(targetContract.serialNumber)
        console.log("--------------------------- owner", _owner, approved, account, contractAddresses.vaultHandlerV8[chainId])
      } else {
        _owner  = await emblemContract.ownerOf(tokenId)
      }
      finish()
    } catch(err){
      _owner = "0x0000000000000000000000000000000000000000"
      finish()
    }

    async function finish(){
      let acceptable = await handlerContract.getPreTransfer(tokenId)
      let isApproved
      if (targetContract[chainId]) {
        isApproved = await emblemContract.isApprovedForAll(account, contractAddresses.vaultHandlerV8[chainId])
      } else {
        isApproved = await emblemContract.isApprovedForAll(account, contractAddresses.vaultHandler[chainId])
      }
      setApproved(isApproved)
      setAcceptable(acceptable._from !== "0x0000000000000000000000000000000000000000")
      setOwner(_owner)
      setMine(_owner === account)
      loadPasswordFromLocalStorage()
    }
    
  }

  useEffect(()=>{
    console.log("mine?", mine)
    console.log("claiming?", claiming)
    console.log("accepting?", accepting)
    console.log("acceptable", acceptable)
  })

  const hasAddress = (coin)=>{
    console.log(coin, vaultAddresses.filter(address=>{ return address.coin == coin}).length > 0)
    return vaultAddresses.filter(address=>{ return address.coin == coin}).length > 0
  }

  const onRenew = async (name) => { 
    library
      .getSigner(account)
      .signMessage('Renew: ' + tokenId)
      .then((signature) => {
        let address = vaultAddresses.filter(address=>{ return address.coin == 'NMC'})[0].address
        console.log('signature', signature, name)
        fetch(EMBLEM_API + '/nmc/renew/' + address, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            service: 'evmetadata',
            chainid: chainId.toString()
          },
          body: JSON.stringify({
                "tokenId": tokenId,
                "signature": signature,
                "name": name
              })
        }).then(async function (response) {
          let data = await response.json()
          console.log("Requested Renew", data)
          
        })
      })
  }
  
  const handleSign = async () => {
    let serialNumber
    if (targetContract[chainId]) {      
      emblemContract = getCuratedContract(targetContract[chainId])
      serialNumber = await emblemContract.getSerial(targetContract.tokenId, 0)
    }

    library
      .getSigner(account)
      .signMessage('Claim: ' + (targetContract[chainId]? serialNumber: tokenId))
      .then((signature) => {
        getSignedJWT(signature, tokenId, (token)=>{
          getTorusKeys(tokenId, token.token, (keys)=>{
            var bytes = CryptoJS.AES.decrypt(vaultCiphertextV2, keys.privateKey)
            let payload = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) 
            setKeyValues(payload.values)
            setMnemonic(payload.phrase)
            vaultAddresses.forEach(async address=>{
              if (address.coin == 'STX') {
                address.key = await getSTXKey(address, payload.phrase)
              } else {
                address.key = window.phrasePathToKey(payload.phrase, address.path)
              }
              if (address.coin == 'BTC') setPrivKeyBTC(address.key)
              if (address.coin == 'ETH') setPrivKeyETH(address.key)
            })
            // setKeyValues(vaultAddresses)
            onOpenKeysModal()
          })          
        })
      // }
    })
  }

  const getSTXKey = async (address: any, phrase: string)=>{
    const wallet: any = await generateWallet({
      secretKey: phrase,
      password: '',
    })
    console.log('------ stacks account -', wallet.accounts[0])
    const account = wallet.accounts[0];
    address.key = account.stxPrivateKey
    return address.key
  }

  const handleHideAsset = async (coin) => {
    library
      .getSigner(account)
      .signMessage('HideAsset: ' + tokenId)
      .then((signature) => {

        console.log("----------------------------------------------------------------", signature)
        console.log(coin.name, coin.coin, coin.address)
        hideAsset(tokenId, coin.coin, coin.address, coin.name, signature, ()=>{
          console.log("Done hiding coin and getting new balances")
        })
      })
  }

  function hideAsset(tokenId, coin, address, name, signature, cb) {
    fetch(EMBLEM_API + '/hide/'+tokenId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
        chainid: chainId.toString()
      },
      body: JSON.stringify({
        "coin": coin? coin: null,
        "address": address? address: null,
        "name": name? name: null,
        "signature": signature? signature: null
      })
    }).then(async function (response) {
      let data = await response.json()
      console.log("-------", data)
      getAllBalances([], tokenId, (values)=>{
        setVaultValues(values)
        return cb()
      })
    }) 
  }

  const handleAddressSign = async (coin: string) => {
    library
      .getSigner(account)
      .signMessage('Address: ' + tokenId)
      .then((signature) => {
        addAddress(signature, tokenId, coin, (result) => {
          getVault()
        })
      })
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

  const handleClaim = async () => {
    if (targetContract[chainId]) {
      // emblemContract = getCuratedContract(targetContract[chainId])
      // let tokenId = await emblemContract.getTokenIdForSerialNumber(targetContract.serialNumber)
      vaultHandlerContract.claim(targetContract[chainId], targetContract.tokenId).then(({ hash }: { hash: string }) => {
        setClaiming(true)
        setTimeout(() => {
          setHash(hash)
        }, 100) // Solving State race condition where transaction watcher wouldn't notice we were claiming
      })
    } else {
      emblemContract.burn(tokenId).then(({ hash }: { hash: string }) => {
        setClaiming(true)
        setTimeout(() => {
          setHash(hash)
        }, 100) // Solving State race condition where transaction watcher wouldn't notice we were claiming
      })
    }
  }

  const pingClaimLogs = (cb)=>{
    fetch(EMBLEM_API + '/web3/selfClaimLogs?chainId='+chainId.toString()+'_vercel_no_cache=1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
        cc: 't'
      }
    }).then(async function (response) {
      let data = await response.json()
      console.log("Log check", data)
      return cb()
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
    console.log('----')
    getVault()
  }, [])

  useEffect(() => {
    (account && chainId && vaultChainId && chainId == vaultChainId) || ((query.noLayout && query.noLayout == 'true') || (query.slideshowOnly && query.slideshowOnly == 'true')) ? getContractStates() : null
  })

  function splitDescription(words) {
    var desc = words? words.split('\n\n\n\n'): [" "]
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
      // getEthBalances(
      //   vaultAddresses.filter((item) => {
      //     return item.coin === 'ETH'
      //   })[0].address,
      //   (values) => {
      //     getBtcBalance(
      //       values,
      //       vaultAddresses.filter((item) => {
      //         return item.coin === 'BTC'
      //       })[0].address,
      //       (_values) => {
      //         // console.log("Have fucking values", values)
      //         getNftBalance(
      //           _values,
      //           vaultAddresses.filter((item) => {
      //             return item.coin === 'ETH'
      //           })[0].address,
      //           (__values) => {
      //             setVaultValues(__values.concat(vaultValues))
      //           }
      //         )
      //       }
      //     )
      //   }
      // )
    } catch (err) {console.log('WTF', err)}
  }

  function getAddresses() {
    console.log("Getting Addresses")
    return vaultAddresses
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

  function visitOpenSeaLink() {
    window.open(
      'https://' +
      (vaultChainId == 4 ? 'rinkeby.' : '') +
      'opensea.io/assets/' + 
      (vaultChainId == 137 ? 'matic/' : '') +
      (alternateContractAddress? alternateContractAddress : contractAddresses.emblemVault[vaultChainId]) +
      '/' +
      tokenId 
    , '_blank')
  }

  function visitLooksRareLink() {
    window.open(
      'https://' +
      (vaultChainId == 4 ? 'rinkeby.' : '') +
      'looksrare.org/collections/' + 
      (vaultChainId == 137 ? 'matic/' : '') +
      (alternateContractAddress? alternateContractAddress : contractAddresses.emblemVault[vaultChainId]) +
      '/' +
      tokenId 
    , '_blank')
  }

  { alternateContractAddress?
    emblemContract = getVaultContract(alternateContractAddress? alternateContractAddress: null)
  : null}
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
              if (localStorage.getItem("darkMode") == 'false') {
                localStorage.setItem("darkMode","true"); location.href = location.href
              }
              `,
            }}
          />
      </Head>
      <AddrModal isOpen={isOpenAddrModal} onClose={onCloseAddrModal} addrCoin={currCoin} addrAddr={currAddr} />

      <KeysModal
        isOpen={isOpenKeysModal}
        onClose={onCloseKeysModal}
        mnemonic={mnemonic}
        privKeyBTC={privKeyBTC}
        privKeyETH={privKeyETH}
        privValues={privValues}
        addresses={vaultAddresses}
      />
      {showOffer ? (
        <OfferModal
          isOpen={isOpenOfferModal}
          onClose={onCloseOfferModal}
          tokenId={tokenId}
          mine={mine}
        />
      ) : null}
      

      {/* <Loader loaded={state.loaded}> */}
        <Box height="40px"></Box>
        {loadingApi ? <Refreshing /> : ''}
        {!invalidVault && !slideshowOnly ? (
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
                {/* {isCrowdSale ? (
                  <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h3"
                  lineHeight="tight"
                  p={2}
                  textAlign="center"
                  textTransform="uppercase"
                  alignItems="center"
                  color="red.500"
                >
                  Part of a crowdsale, sealed for 1 week.
                </Box>
                ) : null} */}
                
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
                        <Link href={"./vaults?address="+owner}>
                          Owner: {owner}
                        </Link>
                      ) : null }
                      </Text>
                      <Text mt={2} as="h4" ml="4" mr="4" fontSize="xs" fontStyle="italic" className="md">
                        <ReactMarkdown plugins={[gfm]} children={splitDescription(vaultDesc)} />
                      </Text>
                      
                    </Stack>                    
                  </Box>                    
                </Stack>
                <Box p="6">
                <Tabs isFitted variant='enclosed'>
                  <TabList mb='1em'>
                    <Tab>Balances</Tab>
                    <Tab>Attributes</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
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
                                    <CoinBalance colorMode={colorMode} coin={coin} mine={(status === 'claimed' && claimedBy === account) || mine} onRenew={onRenew} hideAsset={handleHideAsset}/>
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
                  </TabPanel>
                    <TabPanel>
                      <Attributes colorMode={colorMode} attributes={attributes}/>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                  
                  {!vaultPrivacy ? (
                    <Box d="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                      <ButtonGroup justifyContent="space-between" spacing={6}>
                        <Stack>
                          <Text>Deposit Addresses</Text>
                          <Flex w="340px" justify="center" flexWrap="wrap">
                            {vaultAddresses.map((addr) => {
                              return (
                                <Button
                                  className="address_nft_button"
                                  
                                  ml={2}
                                  mt={2}
                                  font-weight="100 !important"
                                  key={addr.address}
                                  onClick={() => {
                                    setCurrCoin(addr.coin)
                                    setCurrAddr(addr.address)
                                    onOpenAddrModal()
                                  }}
                                >
                                  {addr.coin == 'ETH' ? addr.coin + '/EVM' : addr.coin == 'BTC' ? addr.coin + '/XCP/OMNI' : addr.coin == 'BCH' ? addr.coin + '/SLP': addr.coin}
                                </Button>
                              )
                            })}
                        </Flex>
                        {(mine || status === 'claimed') && vaultAddresses.length < 11 ? (
                          <>
                            <button className="nft_button" onClick={()=>{
                              onManageAddressToggle()
                            }}>Manage Addresses</button>
                            <Flex w="340px" justify="center" flexWrap="wrap">
                              <Collapse isOpen={isManageAddressOpen}>
                                { !hasAddress('DOGE') ? (
                                  <Button className="nft_button" mr={2} mt={2} onClick={()=>{ handleAddressSign('DOGE') }}>Add DOGE</Button>
                                ) : null }
                                { !hasAddress('DGB') ? (
                                  <Button className="nft_button" mr={2} mt={2} onClick={()=>{ handleAddressSign('DGB') }}>Add Digibyte</Button>
                                ) : null }
                                { !hasAddress('NMC') ? (
                                  <Button className="nft_button" mr={2} mt={2} onClick={()=>{ handleAddressSign('NMC') }}>Add Namecoin</Button>
                                ) : null }
                                { !hasAddress('LTC') ? (
                                  <Button className="nft_button" mr={2} mt={2} onClick={()=>{ handleAddressSign('LTC') }}>Add Litecoin</Button>
                                ) : null }
                                { !hasAddress('MONA') ? (
                                  <Button className="nft_button" mr={2} mt={2} onClick={()=>{ handleAddressSign('MONA') }}>Add Mona</Button>
                                ) : null }
                                { !hasAddress('TEZOS') ? (
                                  <Button className="nft_button" mr={2} mt={2} onClick={()=>{ handleAddressSign('TEZOS') }}>Add Tezos</Button>
                                ) : null }
                                { !hasAddress('SOLANA') ? (
                                  <Button className="nft_button" mr={2} mt={2} onClick={()=>{ handleAddressSign('SOLANA') }}>Add Solana</Button>
                                ) : null }
                                { !hasAddress('STX') ? (
                                  <Button className="nft_button" mr={2} mt={2} onClick={()=>{ handleAddressSign('STX') }}>Add Stacks</Button>
                                ) : null }
                              </Collapse>
                            </Flex>
                          </>
                        ) : null}
                        </Stack>
                      </ButtonGroup>
                    </Box>
                  ) : null}

                  {!(status === 'claimed') && live && (vaultChainId === 1 || vaultChainId === 4 || vaultChainId === 137 )? (
                    <Box d="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                      {/* <Stack d="flex" width="100%"> */}
                        <Button
                          className="nft_button"
                          width="50%"
                          m={5}
                          onClick={() => {visitOpenSeaLink()}}
                        >
                          Opensea
                        </Button>
                        <Button
                          className="nft_button"
                          width="50%"
                          m={5}
                          onClick={() => {visitLooksRareLink()}}
                        >
                          LooksRare
                        </Button>
                        {showOffer? (
                          <Button className="" onClick={() => { onOpenOfferModal() }}>{mine? ('My Offers') : ('Make an Offer')} (NFT²NFT)</Button>
                        ) : null}
                        
                      {/* </Stack> */}
                    </Box>
                  ) : null}
                  {!(status === 'claimed') && mine && !acceptable?  (
                    <>
                     <Box d="flex" alignItems="baseline" justifyContent="space-between" mt="4" width="100%">
                        <Stack direction="column" align="center" width="100%">
                          <Button className="nft_button" width="100%" onClick={onToggle}>Transfer Vault</Button>
                          <Collapse isOpen={isOpen}>
                            <Box d="flex" alignItems="baseline" justifyContent="space-between" mt="2" width="100%">
                            <FormLabel htmlFor="owner-address">Address</FormLabel>
                              <Input
                                mt={1}
                                type="text"
                                id="transferAddress"
                                value={transferToAddress || ''}
                                onChange={(e) => {                              
                                  console.log("Transfer to", e.target.value)
                                  setTransferToAddress(e.target.value)
                                }}
                                autoComplete="off"
                              />
                            </Box>
                            <Box d="flex" alignItems="baseline" justifyContent="space-between" mt="2" width="100%">
                              <Button isDisabled={!isETHAddress(transferToAddress)} onClick={()=>{
                                onToggle()
                                transferVault()
                              }}>Transfer Now</Button> 
                            </Box>
                          </Collapse>
                        </Stack>
                      </Box>
                    </>
                  ):null }
                  {mine && !acceptable ? (<>
                    <Box d="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                      <Button 
                        className="nft_button"
                        width="100%" onClick={() => {
                        if (!approved) {
                          return handleApproveForall()
                        } else {
                          let key = CryptoJS.lib.WordArray.random(128/8).toString()
                          let sha = CryptoJS.SHA256(key).toString()
                          console.log('plain', key)
                          console.log('sha', sha)
                          setTransferPassword(key)
                          transferImage = sha                          
                          setTimeout(()=>{
                            addPreTransfer()
                          }, 500)
                        }                                             
                      }
                    }> {approved ? "Get Link (Send Vault Via Link)" : "Approve Gifting" } </Button>
                    </Box>
                  </>) : null }
                  {(showTransferPassword || mintPassword) && acceptable ? (
                      <Box>
                        <Link href={location.protocol +'//'+ location.host + '/nft?id=' + tokenId + '&key=' + (transferPassword || mintPassword)}>Copy Gift Link</Link>
                        <Text>Password: {(transferPassword || mintPassword)}</Text>
                      </Box>
                      ) : null}
                  {acceptable && claimedBy !== account ? (
                  <>
                      <Button mt={2} width="100%" onClick={()=>{fireMetaMask()}}>Accept</Button>
                      <Input
                        mt={2}
                        type="password"
                        id="mintPassword"
                        minLength={3}
                        maxLength={200}
                        value={mintPassword || ''}
                        onChange={(e) => {
                          console.log('grrr', e.target.value, mintPassword)
                          setMintPassword(e.target.value)}
                        }
                        autoComplete="off"
                      />
                  </>
                    ) : null}
                  {!(status === 'claimed') && account && vaultChainId === chainId && mine && !sealed ? (
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
                    // || !live && nonce && mintSignature && vaultCiphertextV2 && to == account
                  ) : (status === 'claimed' && claimedBy === account && vaultChainId === chainId)  ? (
                    <Box d="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                      <Button width="100%" onClick={handleSign}>
                        Get Keys
                      </Button>
                    </Box>
                  ) : null}
                  {!live && to == account && vaultChainId == chainId && status !== 'claimed' && !showMakingVaultMsg ? (
                    <>
                      {useOldMint == "true"? (
                        <Button width="100%" mt={5} onClick={delayedMint}>Mint Me v1</Button>
                      ) : (
                        <Button width="100%" mt={5} onClick={lazyMint}>Mint Vault </Button>
                      )}
                    </>
                ) : null}
                {(!live || status == 'claimed') && to == account && vaultChainId == chainId && !showMakingVaultMsg && vaultValues.length < 1 ? (
                  <Button width="100%" mt={5} onClick={deleteVault}>Delete Vault </Button>
                ) : null}
                {showVerifyingSignature ? (
                  <Button isDisabled type="submit">
                    Verifying Signature ...
                  </Button>
                ) : null}
                {showMakingVaultMsg ? (
                  <Button isDisabled type="submit">
                    Minting Vault ...
                  </Button>
                ) : null}
                </Box>
                {vaultIPFS ? (
                  <Stack>
                    <HStack align="center">
                      <Link target='new' mb={2} ml={35} href={'https://gateway.ipfs.io/ipfs/'+vaultIPFS} isExternal>View Metadata on IPFS </Link>
                      {vaultImageIPFS? (
                        <Link mb={2} href={'https://gateway.ipfs.io/ipfs/'+vaultImageIPFS} isExternal>View Image on IPFS </Link>
                      ) : null}                      
                    </HStack> 
                  </Stack>
                ) : null }
                {sealed ? (
                    <Box d="flex" mb={2} ml={35} alignItems="baseline" justifyContent="space-between" mt="4">
                      <Text>*This vault is sealed forever.</Text>
                    </Box>
                  ) : null}
                <Stack direction="column" align="center">
                  {status == 'claimed' ? <Text color="green.500">CLAIMED</Text> : null}
                </Stack>
                {hash ? (
                  <Alert status="info">
                    <AlertIcon />
                    { accepting ? "Accepting Your Gift Vault" : claiming ? "Claiming your Vault ..." : approving? "Handling Approval Flow ..." : transfering? "Transfering Vault ...":  minting? "Minting Vault" : "Generating Gift Link ..."}
                  </Alert>
                ) : null}
              </Box>
            </Flex>
        ) : vaultValues.length > 0 && slideshowOnly? (
          <Stack className="NFT-content" align="center">
            { vaultValues.length && vaultValues.filter(item=> {return item.type == "nft"}).length > 0 ? (
                <NFTSlideshow name={vaultName} image={vaultValues[0].image} items={vaultValues.filter(value=>{return value.image !== vaultValues[0].image}).map(value=>{return {image: value.image, description: value.description, name: value.name, type: value.type}})} properties = {{'duration': 3000, canSwipe: false}}/>
              ) : (
                <Embed className="d-block w-100 NFT-image" url={vaultImage}/>
              )
            }
          </Stack>
        ) : invalidVault ? (
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
        ): null}
        {hash ? (
          <TransactionToast
            hash={hash}
            onComplete={() => {
              if (claiming && !accepting && !preTransfering) {
                setHash(null)
                setStatus('claimed')
                setClaiming(false)
                setClaimedBy(account)
                pingClaimLogs(()=>{
                  location.href = location.origin + '/nft?id=' + tokenId + '&cc=t';
                })
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
      {/* </Loader> */}
    </>
  )
}
