// import { toast, ToastContainer } from 'react-nextjs-toast'
import {
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
  useColorMode,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  HStack,
  Box
} from '@chakra-ui/react'

import { BigNumber } from '@ethersproject/bignumber'
import {Collapse} from '@chakra-ui/core'
import Head from "next/head"
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Refreshing from './Refreshing'
import Loader from 'react-loader'
import dynamic from 'next/dynamic'
import { Contract } from '@ethersproject/contracts'
import { TransactionToast } from './TransactionToast'
import { EMBLEM_API, contractAddresses, SIG_API, EMBLEM_V2_API, curatedContracts } from '../constants'
import { useContract } from '../hooks'
import { CHAIN_ID_NAMES, fromContractValue, initCuratedContracts, toContractValue } from '../utils'
import CryptoJS from 'crypto-js'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import Embed from './Embed'

import CoinBalance from './partials/CoinBalance'
import Attributes from './partials/Attributes';
// import { generateWallet } from '@stacks/wallet-sdk';
import FetchNodeDetails from "@toruslabs/fetch-node-details"
import TorusUtils from "@toruslabs/torus.js"
import JsonDownloadLink from './JsonDownloadLink'
import ApprovalButton from './partials/ApprovalButton'
import { parseEther } from '@ethersproject/units'
import { stat } from 'fs'
import { getCachedVault, saveVaultToDatabase } from '../db'

const API_VERSION = '/v2'

declare global {
  interface Window { phraseToKey: any, phrasePathToKey: any }
}

const AddrModal = dynamic(() => import('./AddrModal'))
const KeysModal = dynamic(() => import('./KeysModal'))
// const OfferModal = dynamic(() => import('./OfferModal'))

export default function Nft2() {
  
  const { account, chainId, library } = useWeb3React()
  const { query } = useRouter()
  const [isCuratedMaster, setIsCuratedMaster] = useState(false)
  const [decimals, setDecimals] = useState(null)
  const [allowance, setAllowance] = useState(null)
  const [balance, setBalance] = useState(null)
  const [ownedCuratedBalance, setOwnedCuratedBalance] = useState(0)
  const [price, setPrice] = useState(null)
  const [isCovalApproved, setIsCovalApproved] = useState(false)
  const [approved, setApproved] = useState(false)
  const [mintPassword, setMintPassword] = useState(query.key)
  const [debugMode, setDebugMode] = useState(query.debug == "true")
  const [debugFeedback, setDebugFeedback] = useState(null)
  const [showOffer, setShowOffer] = useState(query.offer || false)
  const [framed, setFramed] = useState(query.framed || true)
  const [tokenId, setTokenId] = useState(query.id)
  const [internalTokenId, setInternalTokenId] = useState()
  const [slideshowOnly, setSlideshowOnly] = useState(query.slideshowOnly || false)
  const [enableLegacy, setEnableLegacy] = useState(query.legacy || false)
  const [vaultName, setVaultName] = useState('')
  const [vaultIPFS, setVaultIPFS] = useState('')
  const [vaultImageIPFS, setVaultImageIPFS] = useState('')
  const [vaultCiphertextV2, setVaultCiphertextV2] = useState('')
  const [vaultDesc, setVaultDesc] = useState('')
  const [vaultImage, setVaultImage] = useState('')
  const [vaultEmbed, setVaultEmbed] = useState('')
  const [ownedImage, setOwnedImage] = useState('')
  const [vaultValues, setVaultValues] = useState([])
  const [backingValues, setBackingValues] = useState([])
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
  const [mineUnMinted, setMineUnMinted] = useState(false)
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
  const [offlineError, setOfflineError] = useState(false)
  const [accepting, setAccepting] = useState(false)
  const [approving, setApproving] = useState(false)
  const [acceptable, setAcceptable] = useState(false)
  const [transferPassword, setTransferPassword] = useState('')
  const [showTransferPassword, setShowTransferPassword] = useState(false)
  const [preTransfering, setPreTransfering] = useState(false)
  const [transfering, setTransfering] = useState(false)
  const [owner, setOwner] = useState(null)
  // const [torus, setTorus] = useState(initTorus())
  const [live, setLive] = useState(false)
  const [nonce, setNonce] = useState(null)
  const [mintSignature, setMintSignature] = useState(null)
  const [to, setTo] = useState(null)
  const [showMakingVaultMsg, setShowMakingVaultMsg] = useState(false)
  const [minting, setMinting] = useState(false)
  const [isCrowdSale, setIsCrowdSale] = useState(false)
  const [alternateContractAddress, setAlternateContractAddress] = useState(null)
  const [targetAsset, setTargetAsset] = useState({name: '', image: '', metadata: ''})
  const [targetContract, setTargetContract] = useState({collectionType: ''})
  const [canCuratedMint, setCanCuratedMint] = useState(false)
  const [move_targetAsset, setMoveTargetAsset] = useState({name: '', image: '', metadata: ''})
  const [move_targetContract, setMoveTargetContract] = useState({name: '', chain: '', 4: '', 1: '', tokenId: {}, serialNumber: {'hex':''} })
  const [mintLockedForever, setMintLockedForever] = useState(false)
  const [rawMetadata, setRawMetadata] = useState({})
  const [curatedMintingParameters, setCuratedMintingParameters] = useState({})
  const [curatedContract, setCuratedContract] = useState(null)
  const vaultHandlerContract = useContract(contractAddresses.vaultHandlerV8[chainId], contractAddresses.vaultHandlerV8Abi, true)
  const quoteContract = useContract(contractAddresses.mintVaultQuote[chainId], contractAddresses.mintVaultQuoteAbi, true)
  let emblemContract = useContract(contractAddresses.emblemVault[chainId], contractAddresses.emblemAbi, true)
  let covalContract = useContract(contractAddresses.coval[chainId], contractAddresses.covalAbi, true)
  const { isOpen: isOpenAddrModal, onOpen: onOpenAddrModal, onClose: onCloseAddrModal } = useDisclosure()
  const { isOpen: isOpenKeysModal, onOpen: onOpenKeysModal, onClose: onCloseKeysModal } = useDisclosure()
  // const { isOpen: isOpenOfferModal, onOpen: onOpenOfferModal, onClose: onCloseOfferModal } = useDisclosure()  
  const { isOpen: isAdvancedOpen, onToggle: onAdvancedToggle } = useDisclosure()
  const { colorMode } = useColorMode()
  const [vaultMsg, setVaultMsg] = useState('') 
  const [dbStale, setDbStale] = useState(true)

  interface ErrorWithCode extends Error {
    code?: number
  }

  const getVaultContract = (address = null) =>{
    return new Contract(address || contractAddresses.emblemVault[chainId], contractAddresses.emblemAbi, library.getSigner(account).connectUnchecked())
  }

  const getCuratedContract = (address = null) =>{
      let curatedContract: any = targetContract
      return new Contract(address, curatedContract.collectionType == 'ERC1155'? contractAddresses.erc1155Abi:  curatedContract.collectionType == 'ERC721a'? contractAddresses.erc721aAbi: contractAddresses.erc721Abi, library.getSigner(account).connectUnchecked())
  }

  const checkLiveliness = (tokenId, targetContract, cb)=>{
    console.log("check liveliness next", targetContract )
    let endpoint = (targetContract && targetContract.name)  ? EMBLEM_V2_API + '/liveliness-curated' : EMBLEM_API + '/liveliness'
    fetch(endpoint, {
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
      //setTimeout(()=>{location.href = location.origin + '/nft2?id=' + tokenId}, 500)
    })
    return cb(false)
  }

  const deleteVault = () =>{
    library.getSigner(account)
      .signMessage('Delete: ' + tokenId)
      .then((signature) => {
        console.log("sig", signature)
        fetch(EMBLEM_API + API_VERSION + '/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            service: 'evmetadata'
          },
          body: JSON.stringify({tokenId: tokenId, signature: signature, chainId: chainId.toString()}),
        }).then(async function () {
          location.href = location.href.split("/")[0] + "/vaults"
        })
      })
  }

  function chooseMintPath() {
    let curatedContract: any = targetContract
    if (curatedContract.purchaseMethod && curatedContract.purchaseMethod == 'buyWithQuote'){
      return lazyMintCuratedWithEth()
    } else {
      return lazyMintCurated()
    }
  }

  const lazyMintCurated = () =>{
    setState({ loaded: false })
    library.getSigner(account)
      .signMessage('Curated Minting: ' + tokenId)
      .then((signature) => {
        console.log("sig", signature)
        fetch(EMBLEM_V2_API + '/mint-curated', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            service: 'evmetadata'
          },
          body: JSON.stringify({method: 'buyWithSignedPrice', tokenId: tokenId, signature: signature, chainId: chainId.toString()}),
        }).then(async function (response){
          let data = await response.json()
          setCuratedMintingParameters(data)
          ;(vaultHandlerContract as Contract)
            .buyWithSignedPrice(data._nftAddress, data._payment, data._price, data._to, data._tokenId, data._nonce, data._signature, data.serialNumber, 1)
            .then(({ hash }: { hash: string }) => {
              setTimeout(() => {
                setHash(hash)
                setState({ loaded: true })
                setShowMakingVaultMsg(true)
                setMinting(true)
              }, 100) // Solving State race condition where transaction watcher wouldn't notice we were creating
            })
            .catch((error: ErrorWithCode) => {
              // toast.notify( "Sup" )
              console.log('ERROR', error)
              setShowMakingVaultMsg(false)
              setMinting(false)
              setState({ loaded: true })
            })          
        })
      }).catch((error: ErrorWithCode) => {
        console.log('ERROR', error)
          setShowMakingVaultMsg(false)
          setMinting(false)
          setState({ loaded: true })
      })
  }
  
  const lazyMintCuratedWithEth = () =>{
    setState({ loaded: false })
    library.getSigner(account)
      .signMessage(`Curated Minting: ${tokenId.toString()}`)
      .then((signature) => {
        fetch(EMBLEM_V2_API + '/mint-curated', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            service: 'evmetadata'
          },
          body: JSON.stringify({method: 'buyWithQuote', tokenId: tokenId, signature: signature, chainId: chainId.toString()}),
        }).then(async function (response){
          let data = await response.json()
          if (data.err && data.msg) {
            alert(data.msg)
            setState({loaded: true})
          } else {
            setCuratedMintingParameters(data)
            // alert(data._price)
            ;(quoteContract as Contract)
              .quoteExternalPrice(account, data._price/1000000).then((ethPrice)=>{
                let ethToSend = ethPrice.mul(BigNumber.from(10).pow(6))
                console.log("--------   ------", data._nftAddress, data._price, data._to, data._tokenId, data._nonce, data._signature, data.serialNumber, 1, {value: ethToSend})
                ;(vaultHandlerContract as Contract)
                  .buyWithQuote(data._nftAddress, data._price, data._to, data._tokenId, data._nonce, data._signature, data.serialNumber, 1, {value: ethToSend})
                  .then(({ hash }: { hash: string }) => {
                    setTimeout(() => {
                      setHash(hash)
                      setState({ loaded: true })
                      setShowMakingVaultMsg(true)
                      setMinting(true)
                    }, 100) // Solving State race condition where transaction watcher wouldn't notice we were creating
                  })
                  .catch((error: ErrorWithCode) => {
                    console.log('ERROR', error)
                      setShowMakingVaultMsg(false)
                      setMinting(false)
                      setState({ loaded: true })
                  })  
            })
          }
        })
      }).catch((error: ErrorWithCode) => {
        console.log('ERROR', error)
          setShowMakingVaultMsg(false)
          setMinting(false)
          setState({ loaded: true })
      })
  }

  const getAllBalances = async (values, tokenId, cb) => {
    const response = await fetch(EMBLEM_API + '/vault/balance/' + tokenId , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
    })
    
    const jsonData = await response.json()
    console.log('response', response, jsonData)
    if (jsonData.balances.length > 0) {
      return cb(jsonData.balances)
    } else {
      return cb(values)
    }
  }

  const getVault = async () => {
    console.log('getvault')
    const response = await fetch(EMBLEM_V2_API + '/meta/' + tokenId + '?experimental=true', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
    })
    const jsonData = await response.json()
    setRawMetadata(jsonData)
    setOfflineError(false)
    await saveVaultToDatabase(jsonData)    
    setStates(jsonData)
    setLoadingApi(false)
    setInvalidVault(false)
    
  }

  const setStates = (jsonData) => {   
    if (jsonData.collectionAddress){
      setIsCrowdSale(true)
      setAlternateContractAddress(jsonData.collectionAddress)
    }

    
    if (!jsonData.targetAsset && !jsonData.move_targetAsset && !enableLegacy) {
      location.href = location.origin + '/nft?id=' + tokenId
    }
    // framed && jsonData.image && !jsonData.image.includes('framed=') && !jsonData.image.includes('http') ? jsonData.image = jsonData.image + "&framed="+framed : null
    if (jsonData.ciphertextV2) {
      setVaultCiphertextV2(jsonData.ciphertextV2)
    }
    setMintLockedForever(jsonData.mintLocked && jsonData.mintLockBlock == 0)
    setVaultName(jsonData.name)
    setVaultImage(jsonData.image)
    jsonData.animation_url? setVaultEmbed(jsonData.animation_url): null
    setOwnedImage(jsonData.ownedImage || null)
    setVaultDesc(jsonData.description)
    setVaultTotalValue(jsonData.totalValue || 0)
    jsonData.values ? setVaultValues(vaultValues.concat(jsonData.values)): null
    jsonData.attributes ? setVaultDataValues(jsonData.attributes.filter(item=>{return item.trait_type === "key"})): null
    jsonData.attributes ? setAttributes(jsonData.attributes): null
    setVaultAddresses(jsonData.addresses)
    setVaultIPFS(jsonData.ipfs || null)
    setVaultImageIPFS(jsonData.image_ipfs || null)
    jsonData.targetContract && jsonData.targetContract.tokenId == tokenId && jsonData.targetContract.serialNumber? setIsCuratedMaster(true): null
    jsonData.targetAsset? setTargetAsset(jsonData.targetAsset) : null
    if (jsonData.targetContract) {
      initCuratedContracts().then((data)=>{
        let contract: any = data.find(contract=>{return contract[chainId] == jsonData.targetContract[chainId]})
        contract.tokenId = jsonData.targetContract.tokenId
        contract.serialNumber = jsonData.targetContract.serialNumber
        jsonData.targetContract? setTargetContract(contract) : null
      })      
    }
    
    jsonData.move_targetAsset? setMoveTargetAsset(jsonData.move_targetAsset) : null
    jsonData.move_targetContract? setMoveTargetContract(jsonData.move_targetContract) : null
 
    setLive(jsonData.live == false ? false : true)
    setInternalTokenId(jsonData.tokenId)
    setNonce(jsonData.nonce)
    setMintSignature(jsonData.signature)
    setTo(jsonData.to)
    setVaultChain(jsonData.network)
    setVaultChainId(
      jsonData.network == 'mainnet' ? 1 : 
      jsonData.network == "rinkeby" ? 4 : 
      jsonData.network == "goerli" ? 5 : 
      jsonData.network == "mumbai" ? 80001 : 
      jsonData.network == "matic" ? 137 : 
      jsonData.network == "xdai" ? 100 : 
      jsonData.network == "bsc" ? 56 : 
      jsonData.network == "fantom" ? 250 : 
      jsonData.network == "bitcoin" ? 0 : 
      jsonData.network == "aurora" ? 1313161554 : 
      97
    )
    if (!jsonData.live) {
      console.log("check liveliness start")
      checkLiveliness(tokenId, jsonData.targetContract || jsonData.move_targetContract, (isLive)=>{
        setLive(isLive)        
      })
    }
    setStatus(jsonData.status)
    if (status === 'claimed') {
      setClaimedBy(jsonData.claimedBy)
    }
    
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

  const getAllBackingVaults = async (values, tokenId, cb) => {
    if (loadedValues) {
      return cb(false)
    }
    setLoadedValues(true)
    const response = await fetch(EMBLEM_V2_API + '/allBackingIdsForTokenId/' + tokenId , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    
    const jsonData = await response.json()
    console.log('response', response, jsonData)
      return cb(jsonData)
  }

  const getAllBalancesLive = async (values, tokenId, cb) => {
    if (loadedValues) {
      return cb(false)
    }
    setLoadedValues(true)
    const response = await fetch(EMBLEM_API + '/vault/balance/' + tokenId + '?live=true' , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
    })
    
    const jsonData = await response.json()
    console.log('response', response, jsonData)
      return cb(jsonData.balances)
  }

  const getAllBalancesByAddress = async (values, ethAddress, btcAddress, cb) => {
    const response = await fetch(EMBLEM_API + '/vault/balance/' + ethAddress + '/' + btcAddress, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
    })
    
    const jsonData = await response.json()
    console.log('response', response, jsonData)
    if (jsonData.balances.length > 0) {      
      return cb(values.concat(jsonData.balances))
    } else {
      return cb(values)
    }
  }

  const savePasswordToLocalStorage = () => {
    localStorage.setItem(account + '_' + chainId + '_' + tokenId + '_mintPassword', transferPassword) // Save new state for later
  }

  const loadPasswordFromLocalStorage = () => {
    let storedPw = localStorage.getItem(account + '_' + chainId + '_' + tokenId + '_mintPassword')
    storedPw && acceptable ? setMintPassword(storedPw) : null //setMintPassword(null)
  }

  const getSignedJWT = async (signature, tokenId, cb)=>{
    var myHeaders = new Headers()
    myHeaders.append('chainid', chainId.toString())
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({ signature: signature, tokenId: tokenId })
    const response = await fetch(SIG_API+'/sign', {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
    const jsonData = await response.json()
    return cb(jsonData)
  }

  async function getTorusKeys( verifierId, idToken, cb) {
    const fetchNodeDetails = new FetchNodeDetails({ network: "mainnet" });
    const torusUtils = new TorusUtils({ enableOneKey: true, network: "mainnet" });

    const { torusNodeEndpoints, torusIndexes } = await fetchNodeDetails.getNodeDetails({ verifier: 'tor-us-signer-vercel', verifierId });
    const { privKey } = await torusUtils.retrieveShares(torusNodeEndpoints, torusIndexes, 'tor-us-signer-vercel', { verifier_id: verifierId }, idToken);
    return cb({privateKey: privKey});
  }

  const decryptEmbed = async (signature, tokenId, cb) => {
    var myHeaders = new Headers()
    myHeaders.append('chainId', chainId.toString())
    myHeaders.append('service', 'evmetadata')
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({ signature: signature })
    const response = await fetch(EMBLEM_API + '/embed/' + tokenId, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
    const jsonData = await response.json()
    return cb(jsonData)
  }

  const getContractStates = async () => {
    
    let _owner
    try {
      
      if (targetContract[chainId]) {
        let allowedContracts: any = targetContract
        if (allowedContracts.allowedName && allowedContracts.allowed && vaultValues && vaultValues.length > 0){
          let allowed = allowedContracts.allowedName(vaultValues[0].name, allowedContracts, targetAsset, setVaultMsg) && allowedContracts.allowed(vaultValues, allowedContracts, setVaultMsg)
          setCanCuratedMint(allowed)
        } else {
          setCanCuratedMint(false)
        }
        
        emblemContract = getCuratedContract(targetContract[chainId])
        setDecimals(await covalContract.decimals())
        setPrice(250 * Math.pow(10, decimals))
        setAllowance(
          await covalContract
            .allowance(account, contractAddresses.vaultHandlerV8[chainId])
            .then((balance: { toString: () => string }) => balance.toString())
        )
        setBalance(await covalContract.balanceOf(account).then((balance: { toString: () => string }) => balance.toString()))
        
        if (Number(allowance) >= Number(price)) {
          setIsCovalApproved(true)
        } else {
          setIsCovalApproved(false)
        }
        if (allowedContracts.name) {
          if (allowedContracts.collectionType == 'ERC1155') {
            
            let balanceOf = await emblemContract.balanceOf(account, allowedContracts.tokenId).then((balance: { toString: () => string }) => balance.toString())
            
            _owner = Number(balanceOf) > 0 ? account : "0x0000000000000000000000000000000000000000"            
            if (Number(balanceOf) > 0) {
              setOwnedCuratedBalance(balanceOf)
            }
          } else {
            setOwnedCuratedBalance(1)            
            _owner  = await emblemContract.ownerOf(allowedContracts.collectionType == 'ERC721a' ? allowedContracts.tokenId :tokenId)
            // alert(_owner)
          }
        } else {
          _owner = "0x0000000000000000000000000000000000000000"
        }
      } else {
        _owner  = await emblemContract.ownerOf(tokenId)
      }
      
      finish()
    } catch(err){
      _owner = "0x0000000000000000000000000000000000000000"
      finish()
    }

    async function finish(){
      
      let isApproved
      // if (targetContract[chainId]) {
      //   isApproved = await emblemContract.isApprovedForAll(account, contractAddresses.vaultHandlerV8[chainId])
      //   setApproved(isApproved)
      // } else {
      //   isApproved = await emblemContract.isApprovedForAll(account, contractAddresses.vaultHandler[chainId])
      //   setApproved(isApproved)
      // }
      // if (targetContract.collectionType == 'ERC721a'){
        setApproved(true)
      // }
      setOwner(_owner)
      setMine(_owner === account || (to === account && _owner === "0x0000000000000000000000000000000000000000"))
      setMineUnMinted(to === account && _owner === "0x0000000000000000000000000000000000000000")
      loadPasswordFromLocalStorage()
    }
    
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
      let allowedContracts: any = targetContract
      emblemContract = getCuratedContract(targetContract[chainId])
      serialNumber = allowedContracts.collectionType == 'ERC1155' ? allowedContracts.serialNumber : allowedContracts.collectionType == 'ERC721a' ? tokenId: allowedContracts.tokenId     
    }

    library
      .getSigner(account)
      .signMessage('Claim: ' + (targetContract[chainId]? serialNumber: tokenId))
      .then((signature) => {
        setState({loaded: false})
        if (mineUnMinted && status != "claimed" && !mintLockedForever) {
          setMintLockedForever(true)
        }
        getSignedJWT(signature, tokenId, (token)=>{
          getTorusKeys(tokenId, token.token, (keys)=>{
            try {
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
            } catch(err){
              alert(err)
              setState({loaded: true})
            }
            setState({loaded: true})
            onOpenKeysModal()
          })          
        })
    })
  }

  const getSTXKey = async (address: any, phrase: string)=>{
    // const wallet: any = await generateWallet({
    //   secretKey: phrase,
    //   password: '',
    // })
    // console.log('------ stacks account -', wallet.accounts[0])
    // const account = wallet.accounts[0];
    // address.key = account.stxPrivateKey
    // return address.key
    return 'contact emblem with this error'
  }

  const handleHideAsset = async (coin) => {
    library
      .getSigner(account)
      .signMessage('HideAsset: ' + tokenId)
      .then((signature) => {
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
    let allowedContracts: any = targetContract
    if (allowedContracts[chainId]) {
      // alert(vaultHandlerContract.address)
      vaultHandlerContract.claim(targetContract[chainId], allowedContracts.collectionType == 'ERC721a'? tokenId: allowedContracts.tokenId).then(({ hash }: { hash: string }) => {
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
        var num = Math.floor(theLetters.length * Math.random())
        var letter = theLetters.charAt(num)
        block = block + letter
      }
      if (si == increment - 1) {
        stri++
      }
      if (si == increment) {
        fixed = fixed + ctnt.charAt(stri - 1)
        si = 0
      }
      setDecryptedEffect(fixed + block)
      block = ''
    }
  }

  useEffect(() => {
    let allowedContract: any = targetContract
    if (!vaultPrivacy && !loadedValues && state.loaded && allowedContract.showBalance && !live) {
      getAllBalancesLive([], tokenId, (v)=>{
        if (v) {
          setVaultValues(v)
        }        
      })
    } else if (!vaultPrivacy && !loadedValues && state.loaded && allowedContract.collectionType == "ERC1155" && live && isCuratedMaster) {
      console.log("Not balance check, but instead backing vaults")
      getAllBackingVaults([], tokenId, (vaults)=>{
        setBackingValues(vaults)
        console.log("backing vault info", vaults)
      })
    }
  })

  useEffect(() => {
    if((!localStorage.getItem('offline') || localStorage.getItem('offline') === 'false') && account) {
      getVault()
    }
  }, [])

  useEffect(() => {    
    if (dbStale) {
      setDbStale(false)
      loadFromDatabase();
    }
  }, [dbStale]);

  useEffect(() => {
    (account && chainId && vaultChainId && chainId == vaultChainId) || ((query.noLayout && query.noLayout == 'true') || (query.slideshowOnly && query.slideshowOnly == 'true')) ? getContractStates() : null
  })

  useEffect(() => {
    if (account && chainId && vaultChainId && debugMode && owner) {
      let debugInfo = `DEBUG Report for ${tokenId}:\n\n`
      debugInfo += `Props:\n   owner: ${owner}\n   mine: ${mine}\n   created by: ${to}\n   account: ${account}\n   vaultChainId: ${vaultChainId}\n   chainId: ${chainId}\n   sealed: ${sealed}\n   approved: ${approved}\n   live: ${live}\n   mineUnMinted: ${mineUnMinted}\n   status: ${status}\n   mintLockedForever: ${mintLockedForever}\n`
      debugInfo += `Can Unlock Before Mint: ${vaultChainId === chainId && mineUnMinted && status != 'claimed' && !mintLockedForever}\n`
      debugInfo += `Can Curated Mint: ${canCuratedMint}\n`
      setDebugMode(false)
      setDebugFeedback(debugInfo)
      // alert(debugInfo)
    }
  }, [account, chainId, vaultChainId, debugMode, owner])

  const loadFromDatabase = async () => {
    // setVaults([]);
    let jsonData: any = await getCachedVault(tokenId);
    if (jsonData && jsonData.addresses && jsonData.addresses.length > 0) {
      setRawMetadata(jsonData)
      setStates(jsonData)
      setLoadingApi(false)
      setInvalidVault(false)
      setState({ loaded: true })
    } else {
      if(localStorage.getItem('offline') === 'true') {
        setOfflineError(true)
      }
      // setState({ loaded: true })
    }
  }



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
      getAllBalancesByAddress([], ethAddress, btcAddress, (values)=>{
        setVaultValues(values)
      })
    } catch (err) {console.log('err', err)}
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
    let allowedContract: any = targetContract
    window.open(
      'https://' +
      (vaultChainId == 4 ? 'rinkeby.' : vaultChainId == 5 ? 'testnets.': '') +
      'opensea.io/assets/' + 
      (vaultChainId == 137 ? 'matic/' : vaultChainId == 5 ? 'goerli/': 'ethereum/') +
      (alternateContractAddress? alternateContractAddress : targetContract[chainId]? targetContract[chainId]: contractAddresses.emblemVault[vaultChainId]) +
      '/' +
      (targetContract? allowedContract.tokenId: tokenId)
    , '_blank')
  }

  function visitLooksRareLink() {
    let allowedContract: any = targetContract
    window.open(
      'https://' +
      (vaultChainId == 4 ? 'rinkeby.' :vaultChainId == 5 ? 'goerli.' : '') +
      'looksrare.org/collections/' + 
      (vaultChainId == 137 ? 'matic/' : '') +
      (alternateContractAddress? alternateContractAddress : targetContract? targetContract[chainId]: contractAddresses.emblemVault[vaultChainId]) +
      '/' +
      (targetContract? allowedContract.tokenId: tokenId) 
    , '_blank')
  }

  function visitArcadeLink() {
    window.open(
      `https://app.arcade.xyz/terms/asset/${targetContract[vaultChainId]? targetContract[vaultChainId]: contractAddresses.emblemVault[vaultChainId]}/${tokenId}` , '_blank')
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
      {/* {showOffer ? (
        <OfferModal
          isOpen={isOpenOfferModal}
          onClose={onCloseOfferModal}
          tokenId={tokenId}
          mine={mine}
        />
      ) : null} */}
      

      <Loader loaded={state.loaded}>
        <Box height="40px"></Box>
        {loadingApi ? <Refreshing /> : ''}
        {!invalidVault && !slideshowOnly && !offlineError ? (
            <Flex width="full" align="center" justifyContent="center">
              {debugFeedback? (
                  <Box as="pre" style={{ color: 'white', opacity: 1 }}>{debugFeedback}</Box>
                ): (
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
                      <Embed className="d-block NFT-image-v3" url={vaultEmbed || vaultImage}/>
                      {mine && ownedImage ? (
                        <Button onClick={() => {handleOwnedEmbed()}}>(OWNED) Show Full Embed</Button>
                      ): null}
                    </Stack>
                    <Stack align="center">
                      <Box mt="2" ml="4" lineHeight="tight">
                        <Stack>                    
                        { mine && vaultChainId == chainId ? (
                            <Text fontSize="xs">
                            
                              <Link href={"./vaults?address="+owner}>
                                Owner: {owner}
                              </Link>
                            
                            </Text>
                        ) : null }
                          <Text mt={2} as="h4" ml="4" mr="4" fontSize="xs" fontStyle="italic" className="md">
                            <ReactMarkdown plugins={[gfm]} children={splitDescription(vaultDesc)} />
                          </Text>
                          
                        </Stack>                    
                      </Box>                    
                    </Stack>
                    <Box p="6">
                    {(!isCuratedMaster) || (curatedContract && curatedContract.showBalance) ? (
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
                                <Box display="flex" backgroundColor={colorMode == "light"? "gray.100": "gray.700"} alignItems="baseline" className="coin-balance-content">
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
                                            <CoinBalance colorMode={colorMode} coin={coin} mine={(status === 'claimed' && claimedBy === account) || mine} onRenew={onRenew} hideAsset={targetAsset.name? false: handleHideAsset}/>
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
                    ) : null}
                    {(isCuratedMaster) && backingValues.length > 0 ? (
                        <Tabs isFitted variant='enclosed'>
                          <TabList mb='1em'>
                            <Tab>Backing Vaults</Tab>
                            <Tab>Offers</Tab>
                          </TabList>
                          <TabPanels>                        
                            <TabPanel>
                              <Text fontSize={'.8em'} >This vault is backed by {backingValues.length} {targetAsset.name} </Text>
                              {backingValues.map(backing=>{
                                return (
                                  <HStack width={'100%'}>
                                    <Text color={backing.owner == account? "green":""} fontSize={'small'} width={'60%'} >{ backing.owner == account? 'My': '' } Vault: <Link href={backing.internalVault} target="_blank">{backing.tokenId}</Link></Text>
                                    <Text fontSize={'small'} float={'right'} width={'30%'} ><Link href={backing.explorer} target="_blank">Explorer</Link></Text>
                                  </HStack>                              
                                )
                              })}
                              </TabPanel>
                            </TabPanels>
                        </Tabs>
                    ) : null}
                    {!live && mine ? (
                      <Text className='warning' color={"red"} fontSize="s">{vaultMsg}</Text>
                    ) : null}
                      {(!isCuratedMaster && !vaultPrivacy && !live) || (curatedContract && curatedContract.showBalance)? (
                        <Box display="flex" alignItems="baseline" justifyContent="space-between" mt="4">
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
                                    {addr.coin == 'ETH' ? addr.coin + '' : addr.coin == 'BTC' ? addr.coin + '/XCP/OMNI' : addr.coin == 'BCH' ? addr.coin + '/SLP' : addr.coin}
                                  </Button>
                                )
                              })}
                            </Flex>
                          </Stack>
                        </ButtonGroup>
                        </Box>
                      ) : null}
                      {(!(status === 'claimed') && live && (vaultChainId === 1 || vaultChainId === 137 ))? (
                        <Box display="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                          {/* <Stack d="flex" width="100%"> */}
                            <Button
                              className="nft_button"
                              width={mine && vaultChainId == 1? "33%" : vaultChainId == 137? "100%": "50%"}
                              m={2.5}
                              mb={5}
                              onClick={() => {visitOpenSeaLink()}}>
                                Opensea
                            </Button>

                            { vaultChainId == 1 ?(
                              <Button
                                className="nft_button"
                                width="50%"
                                m={5}
                                onClick={() => {visitLooksRareLink()}}
                              >
                                LooksRare
                              </Button>
                              ) : null}

                            { mine && vaultChainId == 1? (
                              <Button
                              className="nft_button"
                              width="33%"
                              m={2.5}
                              mb={5}
                              onClick={() => {visitArcadeLink()}}
                            >
                              Arcade
                            </Button>
                            ): null}    

                            {/* {showOffer? (
                              <Button className="" onClick={() => { onOpenOfferModal() }}>{mine? ('My Offers') : ('Make an Offer')} (NFT²NFT)</Button>
                            ) : null}                         */}
                        </Box>
                      ) : null}

                      {/* {mine ? (
                        <ApprovalButton
                          handler={{address: targetContract[chainId]? contractAddresses.vaultHandlerV8[chainId] : contractAddresses.vaultHandler[chainId], abi: targetContract[chainId]? contractAddresses.vaultHandlerV8Abi : contractAddresses.vaultHandlerAbi}} 
                          spending={{address: targetContract[chainId]? targetContract[chainId] : contractAddresses.emblemVault[chainId], abi: targetContract[chainId]? contractAddresses.erc1155Abi: contractAddresses.emblemAbi}}
                          amount={0}
                          label = "Approve Creating / Burning Vaults"
                          watcher={setHash}
                        />
                      ): null} */}
                      

                      {!live && !approving && mine && vaultChainId == chainId && status !== 'claimed' && !showMakingVaultMsg ? (
                          <>
                            {                          
                              targetContract[vaultChainId] ? (
                              <Button width="100%" mt={5} onClick={chooseMintPath} isDisabled = {!canCuratedMint || mintLockedForever}>{mintLockedForever? 'Mint Locked - keys accessed before mint': !canCuratedMint? 'Please load vault to mint':' Mint Vault'} </Button>
                            ) : null}
                          </>
                      ) : null}
                      
                      {live && !(status === 'claimed') && account && vaultChainId === chainId && mine && !sealed && approved ? (
                        <Box display="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                          <Button
                            width="100%"
                            onClick={() => {
                              handleClaim()
                            }}
                            isDisabled={claiming}
                          >
                            {claiming ? 'Claiming ...' : `Unlock Vault (Get Private Keys)`}
                          </Button>
                        </Box>
                      ) : (vaultChainId === chainId && ((status == 'claimed' || mintLockedForever) && (claimedBy === account || mine))) ? (
                        <Box display="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                          <Button width="100%" onClick={handleSign}>
                          Get Keys
                          </Button>
                        </Box>
                      ) : null}
                    {!isCuratedMaster || mine? (
                      <Stack mt={5}>
                      <>                
                        <button className="nft_button" onClick={() => { onAdvancedToggle() }}>Advanced Operations</button>
                        <Flex w="100%" justify="center" flexWrap="wrap">
                          <Collapse width={"100%"} isOpen={isAdvancedOpen}>
                            {(vaultChainId === chainId && mineUnMinted && status != 'claimed' && !mintLockedForever ) ? (
                              <Box display="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                                <Button width="100%" onClick={handleSign}>
                                Get Keys (Unlocking will prevent minting)
                                </Button>
                              </Box>
                            ) : null}

                            {mine || claimedBy == account ? (
                              <JsonDownloadLink data={rawMetadata} filename={`EmblemVault-${tokenId}.json`} />
                            ) : null}

                            {(!live || status == 'claimed') && to == account && vaultChainId == chainId && !showMakingVaultMsg && vaultValues.length < 1 ? (
                              <Button width="100%" mt={5} onClick={deleteVault}>Delete Vault </Button>
                            ) : null}

                          </Collapse>
                        </Flex>
                      </>
                    </Stack>  
                    ):null}
                                  
                    
                    </Box>
                    {!isCuratedMaster && vaultIPFS ? (
                        <HStack align="center">
                          <Link target='new' mb={2} ml={35} href={'https://gateway.ipfs.io/ipfs/'+vaultIPFS} isExternal>View Metadata on IPFS </Link>
                          {vaultImageIPFS? (
                            <Link mb={2} href={'https://gateway.ipfs.io/ipfs/'+vaultImageIPFS} isExternal>View Image on IPFS </Link>
                          ) : null}                      
                        </HStack> 
                    ) : null }

                    {sealed ? (
                        <Box display="flex" mb={2} ml={35} alignItems="baseline" justifyContent="space-between" mt="4">
                          <Text>*This vault is sealed forever.</Text>
                        </Box>
                      ) : null}

                    <Stack direction="column" align="center">
                      {status == 'claimed' ? <Text color="green.500">CLAIMED</Text> : null}
                    </Stack>

                    {hash ? (
                      <Alert status="info">
                        <AlertIcon />
                        { accepting ? "Accepting Your Gift Vault" : claiming ? "Claiming your Vault ..." : approving? "Handling Approval Flow ..." : transfering? "Transfering Vault ...":  minting? "Minting Vault" : "Waiting for Transaction ..."}
                      </Alert>
                    ) : null}

                  </Box>
                )}
              
            </Flex>
        ) : invalidVault ? (
          <Stack align="center">            
            <Text>
              THESE ARE NOT THE VAULTS YOU ARE LOOKING FOR{' '}
              <Link color="#638cd8" href="../create">
                CREATE ONE HERE!
              </Link>
            </Text>
          </Stack>
        ): offlineError? (
          <Stack align="center"> 
            <Text>
              You are offline and this vault is not cached
            </Text>
          </Stack>
        ): null}
        {/* <ToastContainer /> */}
        {hash ? (
          <TransactionToast
            hash={hash}
            onComplete={() => {
              if (claiming && !accepting && !preTransfering) {
                setHash(null)
                setStatus('claimed')
                setClaiming(false)
                setClaimedBy(account)
                let myCuratedRecord = backingValues.length > 0 ? backingValues.find(item=>{return item.owner == account}): {tokenId : (internalTokenId || tokenId)}
                location.href = location.origin + '/nft2?id=' + (myCuratedRecord.tokenId)
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
              } else if(minting || showMakingVaultMsg) {
                  setMinting(false)
                  setHash(null)
                  setShowMakingVaultMsg(false)
                  location.href = location.origin + '/nft2?id=' + (internalTokenId || tokenId)
              } else {     
                location.href = location.origin + '/nft2?id=' + (internalTokenId || tokenId) 
              }
            }}
          />
        ) : null}
        <Box height="40px"></Box>
      </Loader>
    </>
  )
}
