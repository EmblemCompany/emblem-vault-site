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

import {Collapse} from '@chakra-ui/core'
import Head from "next/head"
import { useWeb3React } from '@web3-react/core'
import { SetStateAction, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Refreshing from './Refreshing'
import Loader from 'react-loader'
import dynamic from 'next/dynamic'
import { Contract } from '@ethersproject/contracts'
import { TransactionToast } from './TransactionToast'
import { EMBLEM_API, contractAddresses, SIG_API, EMBLEM_V2_API, ZERO_ADDRESS, EMBLEM_V3_API } from '../constants'
import { useContract } from '../hooks'
import { CHAIN_ID_NAMES, initCuratedContracts, sdk } from '../utils'
import CryptoJS from 'crypto-js'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import Embed from './Embed'
import NFTSlideshow from './embed/NFTSlideshow'
import CoinBalance from './partials/CoinBalance'
import Attributes from './partials/Attributes';
// import { generateWallet } from '@stacks/wallet-sdk';
import FetchNodeDetails from "@toruslabs/fetch-node-details"
import TorusUtils from "@toruslabs/torus.js"
import JsonDownloadLink from './JsonDownloadLink'
import ApprovalButton from './partials/ApprovalButton'
import { deleteVaultFromDatabase } from '../db'


declare global {
  interface Window { phraseToKey: any, phrasePathToKey: any}
}

const AddrModal = dynamic(() => import('./AddrModal'))
const KeysModal = dynamic(() => import('./KeysModal'))
// const OfferModal = dynamic(() => import('./OfferModal'))

export default function Nft() {
  
 
  const { account, chainId, library } = useWeb3React()
  const { query } = useRouter()
  const [clearCache, setCache] = useState(query.cc == 't')
  // const [showMove, setShowMove] = useState(query.townHall == 'true')
  const [qualifiedCollections, setQualifiedCollections] = useState({to: []})
  const [moving, setMoving] = useState(false)
  
  const [mintPassword, setMintPassword] = useState(query.key)
  const [showOffer, setShowOffer] = useState(query.offer || false)
  const [debugMode, setDebugMode] = useState(query.debug == "true")
  const [debugFeedback, setDebugFeedback] = useState(null)
  const [framed, setFramed] = useState(query.framed || true)
  const [tokenId, setTokenId] = useState(query.id)
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
  const [accepting, setAccepting] = useState(false)
  const [approving, setApproving] = useState(false)
  const [acceptable, setAcceptable] = useState(false)
  const [transferPassword, setTransferPassword] = useState('')
  const [showTransferPassword, setShowTransferPassword] = useState(false)
  const [preTransfering, setPreTransfering] = useState(false)
  const [transfering, setTransfering] = useState(false)
  const [owner, setOwner] = useState(null)
  const [live, setLive] = useState(false)
  const [checkLive, setCheckLive] = useState(false)
  const [nonce, setNonce] = useState(null)
  const [block, setBlock] = useState(null)
  const [mintSignature, setMintSignature] = useState(null)
  const [to, setTo] = useState(null)
  const [showVerifyingSignature, setShowVerifyingSignature] = useState(false)
  const [showMakingVaultMsg, setShowMakingVaultMsg] = useState(false)
  const [minting, setMinting] = useState(false)
  const [isCrowdSale, setIsCrowdSale] = useState(false)
  const [alternateContractAddress, setAlternateContractAddress] = useState(null)
  const [targetAsset, setTargetAsset] = useState({name: '', image: '', metadata: ''})
  const [targetContract, setTargetContract] = useState({migrating: false, name: '', chain: '', 4: '', 1: '', tokenId: {}, serialNumber: {'hex':''} })
  const [move_targetAsset, setMoveTargetAsset] = useState({name: '', image: '', metadata: ''})
  const [move_targetContract, setMoveTargetContract] = useState({name: '', chain: '', 4: '', 1: '', tokenId: {}, serialNumber: {'hex':''} })
  const [isCovalApproved, setIsCovalApproved] = useState(false)
  const [approved, setApproved] = useState(false)
  const [migrateApproved, setMigrateApproved] = useState(false)
  const [decimals, setDecimals] = useState(null)
  const [allowance, setAllowance] = useState(null)
  const [balance, setBalance] = useState(null)
  const [price, setPrice] = useState(null)
  const [mineUnMinted, setMineUnMinted] = useState(false)
  const [mintLockedForever, setMintLockedForever] = useState(false)
  const [rawMetadata, setRawMetadata] = useState({})
  
  const handlerContract = useContract(contractAddresses.vaultHandler[chainId], contractAddresses.vaultHandlerAbi, true)
  const vaultHandlerContract = useContract(contractAddresses.vaultHandlerV8[chainId], contractAddresses.vaultHandlerV8Abi, true)
  let emblemContract = useContract(contractAddresses.emblemVault[chainId], contractAddresses.emblemAbi, true)
  const covalContract = useContract(contractAddresses.coval[chainId], contractAddresses.covalAbi, true)

  const { isOpen: isOpenAddrModal, onOpen: onOpenAddrModal, onClose: onCloseAddrModal } = useDisclosure()
  const { isOpen: isOpenKeysModal, onOpen: onOpenKeysModal, onClose: onCloseKeysModal } = useDisclosure()
  // const { isOpen: isOpenOfferModal, onOpen: onOpenOfferModal, onClose: onCloseOfferModal } = useDisclosure()
  const { isOpen, onToggle } = useDisclosure()
  const { isOpen: isManageAddressOpen, onToggle: onManageAddressToggle } = useDisclosure()
  const { isOpen: isAdvancedOpen, onToggle: onAdvancedToggle } = useDisclosure()

  const { colorMode } = useColorMode()

  let transak: { on: (arg0: any, arg1: { (data: any): void; (orderData: any): void }) => void; ALL_EVENTS: any; EVENTS: { TRANSAK_ORDER_SUCCESSFUL: any }; close: () => void; init: () => void }

  interface ErrorWithCode extends Error {
    code?: number
  }

  let transferImage: string;

  const getVaultContract = (address = null) =>{
    return new Contract(address || contractAddresses.emblemVault[chainId], contractAddresses.emblemAbi, library.getSigner(account).connectUnchecked())
  }

  const getCuratedContract = (address = null) =>{
    return new Contract(address, contractAddresses.erc1155Abi, library.getSigner(account).connectUnchecked())
  }  

  const checkLiveliness = (tokenId: string | string[], cb: any)=>{
    // alert(`here ${owner}, ${move_targetAsset} ${move_targetContract}`)
    fetch(EMBLEM_V2_API + '/liveliness', {
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
      return cb(data.live)
    })
    
  }

  // const lazyMint = () =>{
  //   library.getSigner(account)
  //   .signMessage('Delayed Minting: ' + tokenId)
  //   .then((signature: any) => {
  //     console.log("sig", signature)
  //     fetch(EMBLEM_API + '/lazyMint', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         service: 'evmetadata',
  //         chainid: chainId.toString()
  //       },
  //       body: JSON.stringify({tokenId: tokenId, signature: signature}),
  //     }).then(async function (response) {
  //         let data = await response.json()
  //         if (!data.error && data.data) {
  //           setMintSignature(data.data.signature)
  //           setNonce(data.data.nonce)
  //           setBlock(data.data.block)
  //           setShowVerifyingSignature(true)
  //           // setCreating(true)
  //           setTimeout(()=>{
  //             delayedMint(data.data.nonce, data.data.block, data.data.signature)
  //           }, 1500)
  //         } else {
  //           alert(data.error? data.msg: 'unknown error' )
  //         }            
  //     })
  //   })
  // }

  // const delayedMint = (nonce, block, sig) => {
  //   // setCreating(true)
  //     console.log("Delayed Minting")
  //     setShowVerifyingSignature(false)
  //     setShowMakingVaultMsg(true)
  //     setMinting(true)
  //     let cipherTextHash = vaultAddresses.filter(address=>{ return address.coin == "ETH"})[0].address
  //     console.log("--------------------------------------------------------Delayed Minting", account, tokenId, cipherTextHash, nonce, block, sig)
  //     ;(handlerContract as Contract)
  //     .buyWithSignature2(account, tokenId, cipherTextHash, nonce, block, sig)
  //     .then(({ hash }: { hash: string }) => {
  //       setTimeout(() => {
  //         setHash(hash)
  //         setShowMakingVaultMsg(false)
          
  //       }, 100) // Solving State race condition where transaction watcher wouldn't notice we were creating
  //     })
  //     .catch((error: ErrorWithCode) => {
  //         console.log("AAAAAHHHHHH", error)
  //         setShowMakingVaultMsg(false)
  //         // setMinting(false)
  //     })    
  // }

  // const fireMetaMask = () => {
  //   console.log(mintPassword)
  //   setAccepting(true)
  //   getWitness((witness)=>{
  //     // console.log(tokenId, mintPassword, witness.nonce, witness.signature, account)
  //     ;(handlerContract as Contract)
  //     .transferWithCode(tokenId, mintPassword, account, witness.nonce, witness.signature)
  //     .then(({ hash }: { hash: string }) => {
  //       setTimeout(() => {
  //         setHash(hash)          
  //         // setShowMakingVaultMsg(true)
  //       }, 100) // Solving State race condition where transaction watcher wouldn't notice we were creating
  //     })
  //     .catch((error: ErrorWithCode) => {
  //       setAccepting(false)
  //       if (error?.code !== 4001) {
  //         console.log(`tx failed.`, error)
  //       } else {
  //         // setAccepting(false)
  //         // setShowPreVaultMsg(false)
  //       }
  //     })
  //   })
    
  // }

  // const addPreTransfer = () => {
  //   console.log('transferImage', "0x"+transferImage)
  //   setPreTransfering(true)
  //   ;(handlerContract as Contract)
  //     .addPreTransfer(tokenId, "0x"+transferImage)
  //     .then(({ hash }: { hash: string }) => {
  //       // setTimeout(() => {
  //         setHash(hash)
  //         console.log("Set Pre Transfering True", preTransfering)
  //         // setShowMakingVaultMsg(true)
  //       // }, 100) // Solving State race condition where transaction watcher wouldn't notice we were creating
  //     })
  //     .catch((error: ErrorWithCode) => {
  //       if (error?.code){   
  //           console.log("Error?")       
  //           setPreTransfering(false)
  //           setShowTransferPassword(false)
  //           setTransferPassword('')
  //       } else {
  //         // setShowTransferPassword(!showTransferPassword? true : false)
  //         // setPreTransfering(false)
  //         // setShowPreVaultMsg(false)
  //       }
  //     })
  // }

  const handleApproveForall = () => {
    setApproving(true)
    ;(emblemContract as Contract)
      .setApprovalForAll(contractAddresses.vaultHandlerV8[chainId], true)
      .then(({ hash }: { hash: string }) => {
        setTimeout(() => {
          setHash(hash)
        }, 100) // Solving State race condition where transaction watcher wouldn't notice we were creating
      })
      .catch((error: ErrorWithCode) => {
        if (error?.code !== 4001) {
          console.log(`tx failed.`, error)
        } else {
          setApproving(false)
        }
      })
  }

  const approveCovalFlow = () => {
    setApproving(true)
    ;(covalContract as Contract)
      .approve(contractAddresses.vaultHandler[chainId], '100000000000000')
      .then(({ hash }: { hash: string }) => {
        setHash(hash)
      })
      .catch((error: ErrorWithCode) => {
        if (error?.code == 4001) {
          setApproving(false)
        }
      })
  }

  const deleteVault = () =>{
    library.getSigner(account)
      .signMessage('Delete: ' + tokenId)
      .then((signature: any) => {
        console.log("sig", signature)
        fetch(EMBLEM_API + '/v2/delete', {
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

  const syncAccount = () =>{
    
        let synched = localStorage.getItem(tokenId+'-v')
        if (!synched) {
          fetch(EMBLEM_API + '/sync/'+tokenId, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              service: 'evmetadata'
            }          
          }).then(async function (response){
              localStorage.setItem(tokenId+'-v', '1')
              return true
          }).catch(()=>{
            return false
          })
      }
  }

  

  const getVault = async () => {
    const response = await fetch(EMBLEM_V2_API + '/meta/' + tokenId + '?experimental=true'+(clearCache ? '&_vercel_no_cache=1' : ''), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
        cc: (clearCache ? 't' : '')
      },
    })
    const jsonData = await response.json()
    let migratable = await sdk.generateMigrateReport(account, true)
    // migratable = Object.fromEntries(Object.entries(migratable).filter(([_, value]: [string, any]) => !value.to.includes('Embels')));
    migratable = Object.keys(migratable).map(item => ({
      ...migratable[item],
      tokenId: item
    })).find(item=>item.tokenId == tokenId)
    if (migratable && migratable.to && migratable.to.length > 0) {
      jsonData.move = migratable
    }
    setRawMetadata(jsonData)
    setStates(jsonData)
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
      // setStates(jsonData)
      // !slideshowOnly? saveCache(jsonData) : null
      setLoadingApi(false)
      setInvalidVault(false)
    }
    // {
    //   !vaultPrivacy && !loadedValues ?    
    //   getAllBalancesLive([], tokenId, (v)=>{
    //     if (v) {
    //       setVaultValues(v)
    //     }        
    //   }) : null
    // }
    // { if (jsonData.targetContract) {
    //   setTimeout(() => {
    //     location.href = location.origin + '/nft2?id=' + jsonData.tokenId
    //   }, 500)
    // }}
  }

  

  const getWitness = async (cb: { (witness: any): void; (arg0: boolean): any }) => {
    const response = await fetch(EMBLEM_API + '/witness/' + tokenId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cc: 't',
        service: 'evmetadata',
        chainid: chainId.toString()
      },
    })
    const jsonData = await response.json()
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
    }
    setMintLockedForever(jsonData.mintLocked && jsonData.mintLockBlock == 0)
    setVaultName(jsonData.name)
    setVaultImage(jsonData.image)
    setOwnedImage(jsonData.ownedImage || null)
    setVaultDesc(jsonData.description)
    setVaultTotalValue(jsonData.totalValue || 0)
    jsonData.values ? setVaultValues(vaultValues.concat(jsonData.values)): null
    jsonData.attributes ? setVaultDataValues(jsonData.attributes.filter((item: { trait_type: string })=>{return item.trait_type === "key"})): null
    jsonData.attributes ? setAttributes(jsonData.attributes): null
    setVaultAddresses(jsonData.addresses)
    setVaultIPFS(jsonData.ipfs || null)
    setVaultImageIPFS(jsonData.image_ipfs || null)
    jsonData.targetAsset? setTargetAsset(jsonData.targetAsset) : null
    jsonData.targetContract? setTargetContract(jsonData.targetContract) : null
    jsonData.move_targetContract? setMoveTargetContract(jsonData.move_targetContract) : null
    jsonData.move_targetAsset? setMoveTargetAsset(jsonData.move_targetAsset) : null
    
    if (jsonData.name == "Migrated Vault" || (jsonData.targetContract && jsonData.targetContract[chainId] && !jsonData.targetContract.migrating)) {
      // setTimeout(() => {
        location.href = location.origin + '/nft2?id=' + tokenId
        return false
      // }, 500)
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
    let isPvt =
      jsonData.addresses.filter((item: { address: string | string[] }) => {
        return item.address.includes('private:')
      }).length > 0
    setVaultPrivacy(isPvt)    
    if (jsonData.sealed) {
      setSealed(true)
    } else {
      setSealed(false)
    }
    // if(jsonData.values.length == 1 && jsonData.attributes.length > 0){
    // let project = jsonData.attributes.filter(item=>{return item.value == jsonData.values[0].name})
    // if (project.length > 0) {
    //     let projectName = project[0].trait_type
    //   //   initCuratedContracts().then((data)=>{
    //   //   let _qualifiedCollection:any = data.filter(item=>{return item.name == projectName})
    //   //   if (_qualifiedCollection.length > 0) {            
    //   //       setQualifiedCollection(_qualifiedCollection[0])
    //   //   }
    //   // })
    // }
    if (jsonData.move && jsonData.move.to && jsonData.move.to.length > 0) {
      setQualifiedCollections(jsonData.move)
    }
    setState({ loaded: true })
    // }    
  }

  const getAllBalances = async (values: string | any[], tokenId: string, cb: { (values: any): any; (arg0: any): any }) => {
    // console.log(address)
    const response = await fetch(EMBLEM_V3_API + '/vault/balance/' + tokenId , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
    })
    
    const jsonData = await response.json()
    if (jsonData.values.length > 0) {      
      return cb(values.concat(jsonData.values))
    } else {
      return cb(values)
    }
  }

  const getAllBalancesLive = async (values: string | any[], tokenId: string | string[], cb: { (v: any): void; (v: any): void; (arg0: boolean): any }) => {
    if (loadedValues) {
      return cb(false)
    }
    setLoadedValues(true)
    const response = await fetch(EMBLEM_V3_API + '/vault/balance/' + tokenId + '?live=true&_vercel_no_cache=1' , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata'
      },
    })
    
    const jsonData = await response.json()
    if (jsonData.values.length > 0) {      
      return cb(values.concat(jsonData.values))
    } else {
      return cb(values)
    }
  }

  const getAllBalancesByAddress = async (values: string | any[], ethAddress: string, btcAddress: string, cb: { (values: any): void; (arg0: any): any }) => {
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

  const getSignedJWT = async (signature: any, tokenId: string | string[], cb: { (token: any): void; (arg0: any): any })=>{
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

  const addAddress = async (signature: any, tokenId: string | string[], coin: string, cb: { (result: any): void; (arg0: any): any }) => {
    var myHeaders = new Headers()
    myHeaders.append('chainId', chainId.toString())
    myHeaders.append('service', 'evmetadata')
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({ signature: signature, coin: coin })
    const response = await fetch(EMBLEM_API + '/address/' + tokenId, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
    const jsonData = await response.json()
    return cb(jsonData)
  }

  const decryptEmbed = async (signature: any, tokenId: string | string[], cb: { (result: any): void; (arg0: any): any }) => {
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
    // alert(0)
    console.log("Contract states")
    let owned = false
    let _owner: string
    try {
      if (targetContract[chainId] && !targetContract.migrating) {
        console.log("Checking owner wth targetContract")
        emblemContract = getCuratedContract(targetContract[chainId])
        _owner = await emblemContract.getOwnerOfSerial(targetContract.serialNumber)
        console.log("--------------------------- owner", _owner, approved, account, contractAddresses.vaultHandlerV8[chainId])
      } else {
        _owner  = live || targetContract.migrating? await emblemContract.ownerOf(tokenId): "0x0000000000000000000000000000000000000000"
      }
      // setDecimals(await covalContract.decimals())
      // setAllowance(
      //   await covalContract
      //     .allowance(account, contractAddresses.vaultHandler[chainId])
      //     .then((balance: { toString: () => string }) => balance.toString())
      // )
      // setBalance(await covalContract.balanceOf(account).then((balance: { toString: () => string }) => balance.toString()))
      // setPrice(await handlerContract.price().then((balance: { toString: () => string }) => balance.toString()))
      // if (Number(allowance) >= Number(price)) {
      //   setIsCovalApproved(true)
      // } else {
      //   setIsCovalApproved(false)
      // }
      finish()
    } catch(err){      
      _owner = "0x0000000000000000000000000000000000000000"
      finish()
    }

    async function finish(){
     
      // let acceptable = await handlerContract.getPreTransfer(tokenId)
      // console.log("-----", account, contractAddresses.vaultHandlerV8[chainId] ||  contractAddresses.vaultHandler[chainId])
      let isClaimApproved = await emblemContract.isApprovedForAll(account, contractAddresses.vaultHandler[chainId])
      let isMigrateApproved = contractAddresses.vaultHandlerV8[chainId]? await emblemContract.isApprovedForAll(account, contractAddresses.vaultHandlerV8[chainId]): false
      // } else {
      //   isApproved = await emblemContract.isApprovedForAll(account, contractAddresses.vaultHandler[chainId])
      // }
      setApproved(isClaimApproved)
      setMigrateApproved(isMigrateApproved)
      // setAcceptable(acceptable._from !== "0x0000000000000000000000000000000000000000")
      setOwner(_owner)
      setMine(_owner === account || (to === account && _owner === "0x0000000000000000000000000000000000000000"))
      setMineUnMinted(to === account && _owner === "0x0000000000000000000000000000000000000000")
      loadPasswordFromLocalStorage()
      if (owner && live == false && !checkLive) {
        setCheckLive(true)
        checkLiveliness(tokenId, ()=>{
    
        })
      //   if (owner === ZERO_ADDRESS && move_targetContract && move_targetContract.serialNumber) {
      //     // is moving
      //     setTimeout(() => {
      //       location.href = location.origin + '/nft2?id=' + tokenId
      //     }, 500)
      //   } else {
      //     setCheckLive(true)
      //     checkLiveliness(tokenId, ()=>{
    
      //     })
      //   }
      }
    }
    
  }

  useEffect(()=>{
    console.log("mine?", mine)
    console.log("claiming?", claiming)
    console.log("accepting?", accepting)
    console.log("acceptable", acceptable)
    console.log("qualified", qualifiedCollections)
    console.log("owner",owner)
  })

  useEffect(() => {
    if (account && chainId && vaultChainId && debugMode && owner) {
      let debugInfo = `DEBUG Report for ${tokenId}:\n\n`
      debugInfo += `Props:\n   owner: ${owner}\n   mine: ${mine}\n   created by: ${to}\n   account: ${account}\n   vaultChainId: ${vaultChainId}\n   chainId: ${chainId}\n   sealed: ${sealed}\n   approved: ${approved}\n   live: ${live}\n   mineUnMinted: ${mineUnMinted}\n   status: ${status}\n   mintLockedForever: ${mintLockedForever}\n`
      debugInfo += `Can Unlock Before Mint: ${vaultChainId === chainId && mineUnMinted && status != 'claimed' && !mintLockedForever}\n`
      debugInfo += `Can Claim: ${!(status === 'claimed') && account && vaultChainId === chainId && mine && !sealed && approved && live}\n`
      debugInfo += `Can Migrate To: ${JSON.stringify(qualifiedCollections)}\n`
      setDebugMode(false)
      setDebugFeedback(debugInfo)
      // alert(debugInfo)
    }
  }, [account, chainId, vaultChainId, debugMode, owner])

  const hasAddress = (coin: string)=>{
    console.log(coin, vaultAddresses.filter(address=>{ return address.coin == coin}).length > 0)
    return vaultAddresses.filter(address=>{ return address.coin == coin}).length > 0
  }

  const onRenew = async (name: any) => { 
    library
      .getSigner(account)
      .signMessage('Renew: ' + tokenId)
      .then((signature: any) => {
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
    
    let serialNumber: any
    if (targetContract[chainId]) {      
      emblemContract = getCuratedContract(targetContract[chainId])
      serialNumber = await emblemContract.getSerial(targetContract.tokenId, 0)
    }

    library
      .getSigner(account)
      .signMessage('Claim: ' + (targetContract[chainId]? serialNumber: tokenId))
      .then((signature: any) => {
        setState({loaded: false})
        if (mineUnMinted && status != "claimed" && !mintLockedForever) {
          setMintLockedForever(true)
        }
        getSignedJWT(signature, tokenId, (token: { token: any })=>{
          getTorusKeys(tokenId, token.token, async (keys: { privateKey: any })=>{
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
    return 'contact emblem.team if you see this error'
    // const wallet: any = await generateWallet({
    //   secretKey: phrase,
    //   password: '',
    // })
    // console.log('------ stacks account -', wallet.accounts[0])
    // const account = wallet.accounts[0];
    // address.key = account.stxPrivateKey
    // return address.key
  }

  const handleHideAsset = async (coin: { name: any; coin: any; address: any }) => {
    library
      .getSigner(account)
      .signMessage('HideAsset: ' + tokenId)
      .then((signature: any) => {
        hideAsset(tokenId, coin.coin, coin.address, coin.name, signature, ()=>{
          console.log("Done hiding coin and getting new balances")
        })
      })
  }

  function hideAsset(tokenId, coin: any, address: any, name: any, signature: any, cb: { (): void; (): any }) {
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
      getAllBalances([], tokenId, (values: SetStateAction<any[]>)=>{
        setVaultValues(values)
        return cb()
      })
    }) 
  }

  const handleAddressSign = async (coin: string) => {
    library
      .getSigner(account)
      .signMessage('Address: ' + tokenId)
      .then((signature: any) => {
        addAddress(signature, tokenId, coin, (result: any) => {
          getVault()
        })
      })
  }

  const handleOwnedEmbed = async () => {
    library
      .getSigner(account)
      .signMessage('Embed: ' + tokenId)
      .then((signature: any) => {
        decryptEmbed(signature, tokenId, (result: { ownedImage: SetStateAction<string> }) => {
          setVaultImage(result.ownedImage)
        })        
      })
  }

  const handleMove = async (index: number) => {
    setMoving(true)
    await deleteVaultFromDatabase(tokenId)
    let collectionDestinationName = qualifiedCollections.to[index]
    let collectionDestination = await sdk.fetchCuratedContractByName(collectionDestinationName)
    let filteredBalances = collectionDestination.filterNativeBalances({balances: vaultValues}, collectionDestination)
      library.getSigner(account)
      .signMessage('Move Vault: ' + tokenId)
      .then((signature: any) => {
        fetch(EMBLEM_V2_API + '/move-vault/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            service: 'evmetadata',
            chainid: chainId.toString()
          },
          body: JSON.stringify({
            "chainId": 1,
            "from": account,
            "sourceContract": {
                "1": contractAddresses.emblemVault[vaultChainId]
            },
            "targetContract":  collectionDestination,
            "targetAsset": {
                "name": filteredBalances[0]?.name || "Unknown",
            },
            "amount": 1,
            "tokenId": tokenId,
            "signature": signature
        })
        }).then(async function (response: any) {
          console.log("Got mint signature")
          let data = await response.json()
          
          if (data.sig) {
            console.log(contractAddresses.emblemVault[vaultChainId])
            console.log(contractAddresses.emblemVault[vaultChainId], collectionDestination[chainId], tokenId, data.tokenId, data.nonce, data.sig, data.serial)
            vaultHandlerContract.moveVault(contractAddresses.emblemVault[vaultChainId], collectionDestination[chainId], tokenId, data.tokenId, data.nonce, data.sig, data.serial).then(async (hash: any)=>{
              setHash(hash.hash)
              await deleteVaultFromDatabase(tokenId)
            }).catch((err: any): void =>{
              checkLiveliness(tokenId, (isLive)=>{
                alert(err.message)
                if (isLive) {
                  location.href = location.href
                } else {
                  location.href = location.origin + (isLive? '/nft?id=': '/nft2?id=') + tokenId
                }                
              })
            })
          }
        })
      }).catch(err=>{
        console.log(err)
        alert(err.message)
        setMoving(false)
      })
  }

  const handleClaim = async () => {
    if (targetContract[chainId]) {
      vaultHandlerContract.claim(targetContract[chainId], targetContract.tokenId).then(({ hash }: { hash: string }) => {
        setClaiming(true)
        setTimeout(() => {
          setHash(hash)
        }, 100) // Solving State race condition where transaction watcher wouldn't notice we were claiming
      }).catch(err=>{
        alert(err.message)
        setClaiming(false)
      })
    } else {
      handlerContract.claimOnChain(tokenId).then(({ hash }: { hash: string }) => {
        setClaiming(true)
        setTimeout(() => {
          setHash(hash)
        }, 100) // Solving State race condition where transaction watcher wouldn't notice we were claiming
      }).catch(err=>{
        alert(err.message)
        setClaiming(false)
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
    function nextFrame(pos: number) {
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
    getVault()
  }, [])

  useEffect(() => {
    (account && chainId && vaultChainId && chainId == vaultChainId) || ((query.noLayout && query.noLayout == 'true') || (query.slideshowOnly && query.slideshowOnly == 'true')) ? getContractStates() : null
  })

  function splitDescription(words: string) {
    var desc = words? words.split('\n\n\n\n'): [" "]
    return desc[0].trim()
  }

  function tryDecrypt(key: SetStateAction<string>) {
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
      getAllBalancesByAddress([], ethAddress, btcAddress, (values: SetStateAction<any[]>)=>{
        setVaultValues(values)
      })
    } catch (err) {console.log('WTF', err)}
  }

  function decryptAddresses(key: any) {
    vaultAddresses.forEach((item) => {
      if (item.address.includes('private')) {
        let cipherText = item.address.replace('private:', '')
        item.address = decrypt(cipherText, key)
      }      
    })
    return vaultAddresses
  }

  function decrypt(cipherText: any, key: any) {
    var bytes = CryptoJS.AES.decrypt(cipherText, key)
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decryptedData
  }

  function visitOpenSeaLink() {
    window.open(
      'https://' +
      (vaultChainId == 4 ? 'rinkeby.' : '') +
      'opensea.io/assets/' + 
      (vaultChainId == 137 ? 'matic/' : 'ethereum/') +
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
        {state.loaded && !invalidVault && !slideshowOnly ? (
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

                    {vaultChainId != chainId ? (                    
                    <Box style={{ color: 'white', backgroundColor: 'red', textAlign: 'center', fontWeight: 'bold' }}>
                      NOTE: Please switch to {CHAIN_ID_NAMES[vaultChainId]} to interact
                    </Box>
                    ): null}
                    
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
                    <Stack align="center" maxWidth="400px">
                      <Box mt="2" ml="4" lineHeight="tight" maxWidth="400px">
                        <Stack>
                          <Text fontSize="xs">
                          { vaultChainId == chainId ? (
                            <Link href={"./vaults?address="+owner}>
                              Owner: {owner}
                            </Link>
                          ) : null }
                          </Text>
                          <Text overflowWrap="anywhere" mt={2} as="h4" ml="4" mr="4" fontSize="xs" fontStyle="italic" className="md">
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
                            <Box display="flex" backgroundColor={colorMode == "light"? "gray.100": "gray.700"} alignItems="baseline" className="coin-balance-content">
                              <Box color="gray.500" letterSpacing="wide" fontSize="sm" ml="2">
                                <Text as="div" mt={2} fontWeight="semibold">
                                
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
                        <Box display="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                          <ButtonGroup justifyContent="space-between" spacing={6}>
                            <Stack>
                              <Text>Deposit Addresses</Text>
                              <Flex w="340px" justify="center" flexWrap="wrap">
                                {vaultAddresses && vaultAddresses.length > 0? vaultAddresses.map((addr) => {
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
                                      {addr.coin == 'ETH' ? addr.coin + '/EVM' : addr.coin == 'BTC' ? addr.coin + '/XCP/OMNI' : addr.coin == 'BCH' ? addr.coin + '/SLP': addr.coin == 'TAP'? 'TAPROOT': addr.coin}
                                    </Button>
                                  )
                                }) : null}
                              </Flex>
                            {(mine || status === 'claimed') && vaultAddresses.length < 12 ? (
                              <>
                                <button className="nft_button" onClick={()=>{onManageAddressToggle()}}>Manage Addresses</button>
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
                                    { !hasAddress('TAP') ? (
                                      <Button className="nft_button" mr={2} mt={2} onClick={()=>{ handleAddressSign('TAP') }}>Add Taproot</Button>
                                    ) : null }
                                  </Collapse>
                                </Flex>
                              </>
                            ) : null}
                            </Stack>
                          </ButtonGroup>
                        </Box>
                      ) : null}

                      
                      
                      {/* {isCovalApproved && !live ? (
                        <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                          <Box maxW="sm" borderWidth="1px" p={1} rounded="lg" overflow="hidden">
                            <Text>Creating a vault spends {price * Math.pow(10, -decimals)} Coval from your wallet</Text>
                           
                          </Box>
                        </Stack>
                      ) : null} */}

                    {/* {mine && !approved ? (<>
                      <Box display="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                        <Button
                          backgroundColor={"#02b402"}
                          color={"black !important"}
                          fontWeight={"bold !important"}
                          className="nft_button"
                          width="100%" onClick={() => {
                            return handleApproveForall()
                          }
                          }> Approve Minting</Button>
                      </Box>
                    </>) : null} */}

                    {/* {!live && mine && vaultChainId == chainId && status !== 'claimed' && !showMakingVaultMsg && approved && !isCovalApproved ? (
                      <>
                        <Button backgroundColor={"#02b402"}
                          color={"black !important"}
                          fontWeight={"bold !important"}
                          width="100%" mt={5} onClick={approveCovalFlow}>
                          Approve Spending Coval
                        </Button>
                      </>
                    ) : null} */}

                      {(showTransferPassword || mintPassword) && acceptable ? (
                          <Box>
                            <Link href={location.protocol +'//'+ location.host + '/nft?id=' + tokenId + '&key=' + (transferPassword || mintPassword)}>Copy Gift Link</Link>
                            <Text>Password: {(transferPassword || mintPassword)}</Text>
                          </Box>
                      ) : null}
                      
                      {/* {acceptable && claimedBy !== account ? (
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
                      ) : null} */}

                      {/* {!live && mine && vaultChainId == chainId && status !== 'claimed' && !showMakingVaultMsg && approved && isCovalApproved ? (
                          <>                      
                            <Button width="100%" mt={5} isDisabled={(!vaultPrivacy && vaultValues.length < 1)|| mintLockedForever} onClick={lazyMint}>{mintLockedForever? 'Mint Locked - keys accessed before mint' : !vaultPrivacy && vaultValues.length < 1? 'Please load the vault to mint': 'Mint Vault'}</Button>
                          </>
                      ) : null} */}

                      {!(status === 'claimed') && account && vaultChainId === chainId && mine && !sealed && approved && live ? (
                        <Box display="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                          <Button
                            width="100%"
                            onClick={() => {
                              handleClaim()
                            }}
                            isDisabled={claiming}
                          >
                            {claiming ? 'Claiming ...' : 'Unlock Vault (Get Private Keys)'}
                          </Button>
                        </Box>
                      ) : (vaultChainId === chainId && ((status == 'claimed' || mintLockedForever) && (claimedBy === account || mine))) ? (
                        <Box display="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                          <Button width="100%" onClick={handleSign}>
                          Get Keys
                          </Button>
                        </Box>
                      ) : null}

                    <Stack mt={5}>
                      <>
                       {mine && state.loaded? (
                        <ApprovalButton
                        handler={{address:  contractAddresses.vaultHandler[chainId], abi: contractAddresses.vaultHandlerAbi}} 
                        spending={{address: contractAddresses.emblemVault[chainId], abi: contractAddresses.emblemAbi}}
                        amount={0}
                        label = "Claim Step 1: Approve Vault Claiming"
                        watcher={setHash}
                      />
                      //   <>
                      //   {!isCovalApproved ?(
                      //   <ApprovalButton
                      //     handler={{address: contractAddresses.vaultHandler[chainId], abi: contractAddresses.vaultHandlerAbi}} 
                      //     spending={{address: contractAddresses.coval[chainId], abi: contractAddresses.covalAbi}} 
                      //     amount={1000} 
                      //     label = "Approve Spending Coval"
                      //     watcher={setHash}
                      //   />): null}
                      //   {!approved ?(
                      //   <ApprovalButton
                      //     handler={{address:  contractAddresses.vaultHandler[chainId], abi: contractAddresses.vaultHandlerAbi}} 
                      //     spending={{address: contractAddresses.emblemVault[chainId], abi: contractAddresses.emblemAbi}}
                      //     amount={0}
                      //     label = "Approve Creating / Burning Vaults"
                      //     watcher={setHash}
                      //   />): null}
                      // </>
                      ): null}
                        
                      {account && state.loaded? (
                        <>
                        <button className="nft_button" onClick={() => { onAdvancedToggle() }}>Advanced Operations</button>
                        <Flex w="100%" justify="center" flexWrap="wrap">
                          <Collapse width={"100%"} isOpen={isAdvancedOpen}>
                            {vaultChainId === chainId && mineUnMinted && status != "claimed" && !mintLockedForever ? (
                              <Box display="flex" alignItems="baseline" justifyContent="space-between" mt="4">
                                <Button width="100%" onClick={handleSign}>
                                  Get Keys (Unlocking will prevent minting)
                                </Button>
                              </Box>
                            ) : null}

                            {mine && qualifiedCollections && qualifiedCollections.to.length > 0 ? (
                              <>
                                 {!migrateApproved && contractAddresses.vaultHandlerV8[chainId] ? (<ApprovalButton
                                  handler={{address: contractAddresses.vaultHandlerV8[chainId] , abi: contractAddresses.vaultHandlerV8Abi }} 
                                  spending={{address: contractAddresses.emblemVault[chainId], abi: contractAddresses.emblemAbi}}
                                  amount={0}
                                  label = "Migrate Step 1: Approve Migration"
                                  watcher={setHash}
                                />
                                /*
                                <ApprovalButton
                                  handler={{address: contractAddresses.vaultHandlerV8[chainId] , abi: contractAddresses.vaultHandlerV8Abi }} 
                                  spending={{address: "0x0", abi: contractAddresses.erc1155Abi}}
                                  amount={0}
                                  label = "Approve Migration (part 2)"
                                  watcher={setHash}
                                /> */): null}

                                
                                { 
                                  qualifiedCollections.to.map((collection, index) => (
                                    collection != "Embels" && migrateApproved?
                                    <Box display="flex" id={index.toString()} alignItems="baseline" justifyContent="space-between" mt="4">
                                      <Button
                                        width="100%"
                                        onClick={() => {                                        
                                          handleMove(index)
                                        }}
                                        isDisabled={moving}
                                      >
                                        {moving ? 'Migrating ...' : `Migrate Vault to ${collection}`}
                                      </Button>
                                    </Box>: null
                                  ))
                                }
                                
                              </>
                            ) : null}

                            {mine || claimedBy == account ? (
                              <JsonDownloadLink data={rawMetadata} filename={`EmblemVault-${tokenId}.json`} />
                            ) : null}

                            {(!live || status == 'claimed') && to == account && vaultChainId == chainId && !showMakingVaultMsg && vaultValues.length < 1 ? (
                              <Button width="100%" mt={5} onClick={deleteVault}>Delete Vault </Button>
                            ) : null}

                            {/* {chainId && chainId != 137? (
                              <ApprovalButton
                                handler={{address:  contractAddresses.vaultHandlerV8[chainId], abi: contractAddresses.vaultHandlerV8Abi}} 
                                spending={{address: contractAddresses.emblemVault[chainId], abi: contractAddresses.emblemAbi}}
                                amount={0}
                                label = "Approve Creating / Burning Vaults"
                                watcher={setHash}
                              />
                            ): null} */}

                        
                          </Collapse>
                        </Flex>
                        </>
                      ): null}
                      </>
                    </Stack>

                    </Box>
                    {vaultIPFS ? (
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
                        { accepting ? "Accepting Your Gift Vault" : claiming ? "Claiming your Vault ..." : approving? "Handling Approval Flow ..." : transfering? "Transfering Vault ...":  minting? "Minting Vault" : "Validating transaction"}
                      </Alert>
                    ) : null}

                  </Box>
                )}
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
              if(moving) {
                setMoving(false)
                location.href = location.origin + '/nft2?id=' + tokenId ;
            } else if (claiming && !accepting && !preTransfering) {
                setHash(null)
                setStatus('claimed')
                setClaiming(false)
                setClaimedBy(account)
                location.href = location.origin + '/nft?id=' + tokenId ;
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
                location.href = location.origin + '/nft?id=' + tokenId
              } else if(transfering) {
                setTransfering(false)
                getVault()
                setHash(null)
              } else if(minting) {
                checkLiveliness(tokenId, ()=>{
                  setMinting(false)
                  setLive(true)
                  location.href = location.origin + '/nft?id=' + tokenId ;
                })
              } 
              else {
                location.href = location.origin + '/nft?id=' + tokenId
              }
            }}
          />
        ) : null}
        <Box height="40px"></Box>
      </Loader>
    </>
  )
}
