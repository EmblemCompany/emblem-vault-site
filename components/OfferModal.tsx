import React, { useEffect, useMemo, useState } from 'react'
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
  Select,
  Input,
  Image,
  Box,
  Collapse,
  useDisclosure,
  Link,
  
} from '@chakra-ui/core'
import {
  // Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  AccordionButton,
} from "@chakra-ui/core"
// import { Accordion } from 'react-bootstrap';
// import copy from 'copy-to-clipboard'
import QRCode from 'qrcode.react'
import { COLOR, contractAddresses } from '../constants'
import { useWeb3React } from '@web3-react/core'
import { ExplorerTXType, formatEtherscanLink, NETWORK_SHORTNAMES } from '../utils'
// import { useContract } from '../hooks'
import { useTokenBalance, useTokenAllowance, useETHBalance } from '../data'
import { Contract, ContractInterface } from '@ethersproject/contracts'
import { HStack } from '@chakra-ui/core'
import { TransactionToast } from './TransactionToast'
import { addTokenToWallet } from '../public/web3'
import Embed from './Embed'
import Accordion from 'react-bootstrap/esm/Accordion'
import { Card } from 'react-bootstrap'
export const EMBLEM_API = 'https://api.emblemvault.io'
import { EXPLORER_PREFIXES } from '../utils'

export default function OfferModal({
  isOpen,
  onClose,
  tokenId,
  mine,
}: {
  isOpen: boolean
  onClose: () => void
  tokenId
  mine: boolean
}): JSX.Element {
//   const address = addrAddr
//   const coin = addrCoin

  const { colorMode } = useColorMode()
  const { account, chainId, library } = useWeb3React()
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [offeringToken, setOfferingToken] = useState({address:'', balance: 0, tokenType:'', name: '', symbol: ''})
  const [tokenBalances, setTokenBalances] = useState([])
  const [offeringTokenBalance, setOfferingTokenBalance] = useState(0)
  const [acct, setAcct] = useState('')
  const [decimals, setDecimals] = useState(0)
  const [allowance, setAllowance] = useState(0)
  const [approvedForAll, setApprovedForAll] = useState(false)
  const [offerAmount, setOfferAmount] = useState(0)
  const [offerTokenId, setOfferTokenId] = useState(0)
  const [offers, setOffers] = useState([])
  const [myOffers, setMyOffers] = useState([])
  const [hash, setHash] = useState(null)
  const [selectedNFTs, setSelectedNFTs] = useState([])
  const [makeOfferPrice, setMakeOfferPrice] = useState(0)
  const [payToMakeOffer, setPayToMakeOffer] = useState(false)
  const [acceptOfferPrice, setAcceptOfferPrice] = useState(0)
  const [payToAcceptOffer, setPayToAcceptOffer] = useState(false)
  const [paymentToken, setPaymentToken] = useState(null)
  const [paymentDecimals, setPaymentDecimals] = useState(0)
  const { isOpen: isDetailOpen, onToggle: onDetailToggle } = useDisclosure()
  const [takePercentageOfERC20, setTakePercentageOfERC20] = useState(false)
  const [percentageOfERC20, setPercentageOfERC20] = useState(0)
  // const [offeringTokenId, setOfferingTokenId] = useState()
  
  const getMetadata = async function(uri, cb){
    // alert(0)
    uri = uri.replace('http://104.154.252.216','https://api.emblemvault.io')
    let responce
    try {
        responce = await fetch(uri, {
        method: 'GET',
        headers: {
          // redirect:'follow'
        },
      })
      let jsonData = await responce.json()
      return cb(jsonData)
    } catch(err){
      // alert(0)
      return cb(false)
    }
  }

  const getErc20Contract = (address) =>{
    console.log("contract", address)
    return useContract(address, contractAddresses.covalAbi, true)
  }

  const getVaultContract = (address = null) =>{
    return useContract(address || contractAddresses.emblemVault[chainId], contractAddresses.emblemAbi, true)
  }

  const getTradeContract = ()=>{
    return useContract(contractAddresses.nftrade[chainId], contractAddresses.nftradeAbi, true)
  }

  const useContract = (address?: string, ABI?: ContractInterface, withSigner = false): Contract | undefined => {
    return new Contract(address, ABI, withSigner ? library.getSigner(account).connectUnchecked() : library)
  }

  useEffect(() => {
    if (account && acct != account) {
      setAcct(account)
      setLoaded(false)
    }
  }, [account, acct])
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

  useEffect(() => {
      if (!loaded && !loading) {
        setLoading(true)
        getBalances(account, async balances =>{
            setTokenBalances(balances)
            getOfferContractInfo()
            setLoaded(true)
            setLoading(false)            
        })

      }
  })

  const handleApprove = async(address, _decimals = decimals)=>{
    let contract = getErc20Contract(address)
    console.log('decimals', decimals)
    await contract.approve(contractAddresses.nftrade[chainId], (offeringTokenBalance * Math.pow(10, +_decimals))).then(({ hash }: { hash: string }) => {
        setHash(hash)
      })
  }

  const handleApproveForAll = async(address = null)=>{
    let contract = getVaultContract(address)
    await contract.setApprovalForAll(contractAddresses.nftrade[chainId], true).then(({ hash }: { hash: string }) => {
        setHash(hash)
      })
  }
  const getApprovedForAll = async(address = null)=>{
    let contract = getVaultContract(address)
    let approved = await contract.isApprovedForAll(account, contractAddresses.nftrade[chainId])
    // console.log('---approved', approved)
    setApprovedForAll(approved)
  }

  const getNFTContractInfo = async(address)=>{
    let contract = getVaultContract(address)
    let count = await contract.balanceOf(account)
    // console.log('--------------- NFT Info', account, 'owns', count.toNumber())
    let nftCollection = []
    getSingleNFT(0, ()=>{
      // console.log("GOT ALL NFTs", nftCollection)
      setSelectedNFTs(nftCollection)
    })
    async function getSingleNFT(index, cb) {
        let nftInfo =  await contract.tokenOfOwnerByIndex(account, index)
        nftCollection.push(nftInfo.toNumber())
        if (index +1 >= count) {
          return cb()
      } else {
          return getSingleNFT(index +1, cb)
      }
    }
  }

  const makeOffer = async()=>{
    let contract = getTradeContract()
    // console.log(offeringToken.address, offerTokenId, contractAddresses.emblemVault[chainId], tokenId, offerAmount* Math.pow(10, +decimals))
    await contract.addOffer(offeringToken.address, offerTokenId, contractAddresses.emblemVault[chainId], tokenId, offerAmount* Math.pow(10, +decimals)).then(({ hash }: { hash: string }) => {
        setHash(hash)
      })
  }

  const withdrawOffer = async(index)=>{
    let contract = getTradeContract()
    // console.log(offeringToken.address, offerTokenId, contractAddresses.emblemVault[chainId], tokenId, offerAmount* Math.pow(10, +decimals))
    await contract.withdrawOffer(contractAddresses.emblemVault[chainId], tokenId, index).then(({ hash }: { hash: string }) => {
        setHash(hash)
      })
  }

  const rejectOffer = async(index)=>{
    let contract = getTradeContract()
    // console.log(offeringToken.address, offerTokenId, contractAddresses.emblemVault[chainId], tokenId, offerAmount* Math.pow(10, +decimals))
    await contract.rejectOffer(contractAddresses.emblemVault[chainId], tokenId, index).then(({ hash }: { hash: string }) => {
      setHash(hash)
    })
  }

  const acceptOffer = async(index)=>{
    let contract = getTradeContract()
    // console.log(offeringToken.address, offerTokenId, contractAddresses.emblemVault[chainId], tokenId, offerAmount* Math.pow(10, +decimals))
    await contract.acceptOffer(contractAddresses.emblemVault[chainId], tokenId, index).then(({ hash }: { hash: string }) => {
        setHash(hash)
      })
  }

  const getTokenContractInfo = async (address)=>{
    let contract = getErc20Contract(address)
    // console.log(contract)
    let _dec = await contract.decimals()
    setDecimals(_dec)
    setAllowance(
        await contract
        .allowance(account, contractAddresses.nftrade[chainId])
        .then(balance=>(balance * Math.pow(10, -_dec)).toString())
    )
    setOfferingTokenBalance(
        await contract
        .balanceOf(account)
        .then(balance=>(balance * Math.pow(10, -_dec)).toString())
    )
  }

  const getOfferContractInfo = async ()=>{
    let contract = getTradeContract()
    let _paymentToken = await contract.paymentAddress()
    setPaymentToken(_paymentToken)
    await getTokenContractInfo(_paymentToken)
    let offerCount = (await contract.getOfferCount(contractAddresses.emblemVault[chainId], tokenId)).toNumber()
    let _payToMakeOffer = await contract.payToMakeOffer()
    setPayToMakeOffer(_payToMakeOffer)
    let _makeOfferPrice = (await contract.makeOfferPrice()).toNumber()
    setMakeOfferPrice(_makeOfferPrice)
    let _payToAcceptOffer = await contract.payToAcceptOffer()
    setPayToAcceptOffer(_payToAcceptOffer)
    let _acceptOfferPrice = (await contract.acceptOfferPrice()).toNumber()
    setAcceptOfferPrice(_acceptOfferPrice)
    let tokenContract = getErc20Contract(_paymentToken)
    let _takePercentageOfERC20 = await contract.takePercentageOfERC20()
    setTakePercentageOfERC20(_takePercentageOfERC20)
    let _percentageOfERC20 = (await contract.percentageFee()).toNumber()
    setPercentageOfERC20(_percentageOfERC20)
    console.log('-----%', _takePercentageOfERC20, _percentageOfERC20)
    console.log('dec',await tokenContract.decimals())
    setPaymentDecimals(await tokenContract.decimals())
    console.log('_paymentToken', _paymentToken)
    getApprovedForAll()
  
    console.log('--------- payment ---------', _payToMakeOffer, _makeOfferPrice, _payToAcceptOffer, _acceptOfferPrice, _paymentToken, allowance)
    
    console.log('------ offer count ------', offerCount)
    
    // let offers = []
    // let myOffers = []
    if (offerCount > 0) {
        getSingleOffer(0, [], [], (offers, myOffers)=>{
            setOffers(offers)
            setMyOffers(myOffers)
            console.log('offers', offers, myOffers)
        })
    }
    async function getSingleOffer(index, offers, myOffers, cb) {
        let _offer = await contract.getOffer(contractAddresses.emblemVault[chainId], tokenId, index)
        console.log('-------', _offer)
        if (_offer.token !== "0x0000000000000000000000000000000000000000") {
            let offer: any = {tokenId: _offer.tokenId.toNumber(), _from: _offer._from, token: _offer.token, amount: _offer.amount}
            let tokenContract = getErc20Contract(offer.token)
            
            let tokenName = await tokenContract.name()
            console.log('----- name ----', tokenName)
            offer.name = tokenName
            offer.index = index            
            offer.address = offer.token
            console.log('----- offer tokenid ----', _offer.tokenId.toNumber())
            if (_offer.tokenId.toNumber() == 0) {
              let tokenDecimals = await tokenContract.decimals()
              let tokenSymbol = await tokenContract.symbol()
              offer.symbol = tokenSymbol
              offer.decimals = tokenDecimals
              offer.amount = offer.amount.toNumber() * Math.pow(10,-tokenDecimals)
              offers.push(offer)
              if (offer._from == account) {
                myOffers.push(offer)
              }
              finished()
            } else {
              let nftContract = getVaultContract(offer.token)
              let tokenMetadata= await nftContract.tokenURI(offer.tokenId)
              tokenMetadata = tokenMetadata.replace('ipfs://', 'https://gateway.ipfs.io/')
              console.log('---------URI---------', tokenMetadata)
              getMetadata(tokenMetadata, (metadata)=>{
                console.log('metadata', metadata)
                offer.metadata = metadata
                offer.amount = _offer.amount.toNumber()
                offer.tokenId = _offer.tokenId.toNumber()
                offers.push(offer)
                if (offer._from == account) {
                  myOffers.push(offer)
                }
                finished()
              })
            }
        } else {
          console.log('----- wtf -----')
          finished()
        }      
        function finished() {
          if (index +1 >= offerCount) {
            return cb(offers, myOffers)
          } else {
              return getSingleOffer(index +1, offers, myOffers, cb)
          }
        }
        
    }
    // console.log(offerCount)
  }

  const getBalances = async (address, cb) => {
    if (mine) return cb([])
    const responce = await fetch(EMBLEM_API + '/'+NETWORK_SHORTNAMES[chainId]+'/balance/' + address, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
    })
    const jsonData = await responce.json()
    return cb(jsonData.values)
  }

  function copyWithFlag(content: string): void {
    // copy(content)
    setCopied(true)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent color={COLOR[colorMode]}>
        <ModalHeader>
          <Text>{!mine? ('Make'): null} Offer{mine? ('s'): null} for: {tokenId}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            {!mine? (
                <Stack direction="column">
                    <Stack mt="6">
                    <Text>Choose your Offer Token</Text>
                  {/* <Text>{account} network: {NETWORK_SHORTNAMES[chainId]}</Text> */}
                    <Select w="100%" value={offeringToken.address}
                        onChange={(e) => {
                            if (e.target.value !== '0') {
                                let token = tokenBalances.filter((item)=>{return item.address == e.target.value})[0]
                                console.log(token)
                                setOfferingToken(token)
                                setOfferTokenId(0)
                                token.tokenType =="ERC-20" ? getTokenContractInfo(token.address) : getNFTContractInfo(token.address)
                                console.log(tokenBalances.filter((item)=>{return item.address == e.target.value})[0])
                                console.log(e.target.value)
                            }
                        }}
                    >
                        <option value="0" >Choose a Token</option>
                        {tokenBalances.map((coin, index) => {
                            if (coin.tokenType !== 'native')
                            return (
                            <option value={coin.address}>{coin.name}</option>
                            )
                        })}
                    </Select>
                    {offeringToken.balance > 0 && offeringToken.tokenType=="ERC-20" && allowance > 0 ? (
                        <>
                            <Text>Max: {Number(offeringTokenBalance) > Number(allowance) ? allowance: offeringTokenBalance} </Text>    
                            <Input onChange={(e) => setOfferAmount(e.target.value)}></Input>
                        </>
                    ) : null}
                                  
                </Stack>
                    <Stack direction="row" justify="center">
                    {offeringToken.tokenType =='ERC-20' ? (
                        offeringTokenBalance > 0 && allowance == 0 ? (
                            <Button onClick={()=>{handleApprove(offeringToken.address)}}>Approve offer of {offeringToken.name}</Button>
                        ) : offeringToken && offeringTokenBalance == 0 ? (
                            <Text>Insufficient Balance</Text>
                        ) : (
                            <Button onClick={()=>{makeOffer()}}>Make Offer</Button>
                        )
                    ) : (
                      selectedNFTs.length > 0 ? (
                        <Select
                        width="100%"
                        onChange={(e) => {
                          if (e.target.value !== '0') {
                              // console.log("Picked TokenID: ", e.target.value, offeringToken)
                              setOfferTokenId(Number(e.target.value))
                              getApprovedForAll(offeringToken.address)
                          }
                        }}>
                          <option key={-1} value="0">Select TokenId</option>
                          {selectedNFTs.map((tokenId, index) => {
                            return (
                            <option key={index} value={tokenId}>{tokenId}</option>
                            )
                        })}
                        </Select>
                        
                      ) : null
                    )}
                    {offeringToken.name && offeringToken.tokenType !="ERC-20" && !approvedForAll && offerTokenId != 0? (
                      <Button width="100%" onClick={()=>{handleApproveForAll(offeringToken.address)}}>Approve {offeringToken.name}</Button>
                    ): offeringToken.name && offeringToken.tokenType !="ERC-20" && approvedForAll? (
                      <Button onClick={()=>{makeOffer()}}>Make Offer</Button>
                    ): null}                    
                  {/* <Button onClick={() => copyWithFlag('address')}>
                    {copied ? <Text>Copied!</Text> : <Text isTruncated>{'address'}</Text>}
                  </Button> */}
                </Stack>
                {payToMakeOffer ? (
                      <Text> Cost: {acceptOfferPrice * Math.pow(10, -paymentDecimals)} $Coval to make offers</Text>
                ) : null}
                {
                  takePercentageOfERC20 && offeringToken.tokenType =="ERC-20" && offerAmount? (
                    <>
                      <Text>Fee: {percentageOfERC20}%  ({offerAmount * (percentageOfERC20 /100)} {offeringToken.symbol})</Text>
                      
                    </>
                  ) : null
                }
                    
                    <Stack maxHeight = "200px" overflow="scroll">
                      { myOffers.length > 0 ? (
                        <Text as='h2'>My Offers</Text>
                      ) : null }                        
                        {payToMakeOffer && offeringTokenBalance > 0 && allowance * Math.pow(10, +paymentDecimals) < makeOfferPrice ? (
                            <>
                              {/* <Text>Cost: {makeOfferPrice * Math.pow(10, -paymentDecimals)} $Coval to make offers</Text> */}
                              <Button onClick={()=>{handleApprove(paymentToken, paymentDecimals)}}>Approve spending </Button>
                            </>
                          ) : offeringToken && offeringTokenBalance < makeOfferPrice * Math.pow(10, -paymentDecimals)  ? (
                              <Text>Insufficient Balance</Text>
                          ) : null}
                        { myOffers.map((offer, index) => {
                              return (
                                <Box borderRadius="0.25rem" borderWidth={1} p={2} mb={2}>
                                {/* <Card key={index}> */}
                                  {/* <Card.Header color="black"> */}
                                    {/* <Accordion.Toggle as={Button} eventKey="1" color="darkslategray"> */}

                                    {/* <Text color="black">{offer.name} {offer.amount > 0 ? offer.amount: offer.tokenId}</Text> */}
                                    <Text fontSize="bold" color={colorMode=="dark"? "lightgreen": "forestgreen"} >{offer.amount > 0 ? offer.amount : null}
                                      <Link ml={3} color={colorMode=="dark"? "white": "black"} href={formatEtherscanLink(ExplorerTXType.Token, [chainId as number, offer.token])} isExternal>
                                        {offer.name}
                                      </Link>
                                    {offer.amount < 1 ? ' ['+offer.tokenId+']': null}
                                    </Text>
                                    {/* </Accordion.Toggle> */}
                                  {/* </Card.Header> */}
                                  {/* <Accordion.Collapse eventKey="1"> */}
                                    {/* <Card.Body> */}
                                      <Button onClick={() =>{withdrawOffer(offer.index)}} m={2}>Withdraw Offer</Button>
                                        {offer.metadata? (                                            
                                          <Box >
                                            <Embed className="" url={offer.metadata.image.replace('ipfs://','https://gateway.ipfs.io/')}/>
                                          </Box>
                                      ) : null}
                                    {/* </Card.Body> */}
                                  {/* </Accordion.Collapse> */}
                                {/* </Card> */}
                                </Box>
                              )
                        })}
                        
                    </Stack>
                </Stack>
            ) : null}

            {mine? (
                <Box>
                  {!approvedForAll ? (
                    <Button onClick={()=>{handleApproveForAll()}}>Allow accepting of Offers</Button>
                  ) : null}
                
                  <Stack direction="column" maxHeight = "200px" overflow="scroll">
                   
                    {/* {offers.length > 0 ? (<Text>Offers</Text>) : null } */}
                        
                        {payToAcceptOffer && offeringTokenBalance > 0 && allowance  * Math.pow(10, +paymentDecimals) < acceptOfferPrice ? (
                            <>
                              <Text>Cost: {acceptOfferPrice * Math.pow(10, -paymentDecimals)} $Coval to accept offers</Text>
                              <Button onClick={()=>{handleApprove(paymentToken, paymentDecimals)}}>Approve spending </Button>
                            </>
                          ) : offeringToken && offeringTokenBalance < acceptOfferPrice * Math.pow(10, -paymentDecimals)  ? (
                              <Text>Insufficient Balance</Text>
                          ) : null}
                          
                        { offers.map((offer, index) => {
                              return (
                                <Box borderRadius="0.25rem" borderWidth={1} p={2} mb={2}>
                                    <Text fontSize="bold" color={colorMode=="dark"? "lightgreen": "forestgreen"} >{offer.amount > 0 ? offer.amount : null}
                                      <Link ml={3} color={colorMode=="dark"? "white": "black"} href={formatEtherscanLink(ExplorerTXType.Token, [chainId as number, offer.token])} isExternal>
                                        {offer.name}
                                      </Link>
                                    {offer.amount < 1 ? '['+offer.tokenId+']': null}
                                    </Text>

                                    <Text color={colorMode=="dark" ? "#baaa94": "gray"} fontSize="xs">
                                      From: 
                                      <Link ml={3} color={colorMode=="dark"? "white": "darkgray"} href={formatEtherscanLink(ExplorerTXType.Account, [chainId as number, offer._from])} isExternal>
                                      {offer._from}
                                      </Link>
                                    </Text>
                                    
                                    <Button onClick={() =>{rejectOffer(offer.index)}} m={2}>Reject Offer</Button>
                                      {approvedForAll ? (
                                          <Button onClick={() =>{acceptOffer(offer.index)}} m={2}>Accept Offer</Button>
                                      ) : null} 
                                        {offer.metadata? (                                            
                                          <Box >
                                            <Embed className="" url={offer.metadata.image.replace('ipfs://','https://gateway.ipfs.io/')}/>
                                          </Box>
                                      ) : null}
                                </Box>
                              )
                              
                        })}
                </Stack>
                </Box>
            ) : null }
          {hash ? (
          <TransactionToast
                hash={hash}
                onComplete={() => {
                    setHash(null)
                    setLoaded(false)
                }}
            />
          ) : null }
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
