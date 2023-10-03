import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Radio,
  Textarea,
  Button,
  ButtonGroup,
  Text,
  Divider,
  Alert,
  AlertIcon,
  useDisclosure,
  Select,
  Checkbox,
  Box
} from '@chakra-ui/react'
import {Collapse, RadioGroup} from '@chakra-ui/core'

import Loader from 'react-loader'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { TransactionToast } from './TransactionToast'
import { EMBLEM_API, contractAddresses } from '../constants'
import { Contract } from '@ethersproject/contracts'
import { useContract } from '../hooks'
import { isETHAddress } from '../utils'
import Embed from './Embed'
import gfm from 'remark-gfm'
// react-doka
// import { DokaImageEditorModal } from 'react-doka';
import transakSDK from '@transak/transak-sdk'

// doka
import {
    // editor
    locale_en_gb,
    createDefaultImageReader,
    createDefaultImageWriter,

    // plugins
    setPlugins,
    plugin_crop,
    plugin_crop_locale_en_gb,
    plugin_finetune,
    plugin_finetune_locale_en_gb,
    plugin_finetune_defaults,
    plugin_filter,
    plugin_filter_locale_en_gb,
    plugin_filter_defaults,
    plugin_annotate,
    plugin_annotate_locale_en_gb,
    markup_editor_defaults,
    markup_editor_locale_en_gb,
} from 'doka';
import ReactMarkdown from 'react-markdown'

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

const editorDefaults = {
    imageReader: createDefaultImageReader(),
    imageWriter: createDefaultImageWriter(),
    ...plugin_finetune_defaults,
    ...plugin_filter_defaults,
    ...markup_editor_defaults,
    locale: {
        ...locale_en_gb,
        ...plugin_crop_locale_en_gb,
        ...plugin_finetune_locale_en_gb,
        ...plugin_filter_locale_en_gb,
        ...plugin_annotate_locale_en_gb,
        ...markup_editor_locale_en_gb,
    },
};

let tokenId, cipherTextHash, nonce, signature = null
let mintPassword = null

export default function Create(props: any) {
  // modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalResult, setModalResult] = useState('');
  const [showEditorButton, setShowEditorButton] = useState(true);

  const { isOpen, onToggle } = useDisclosure()
  const { query } = useRouter()
  const [tabIndex, setTabIndex] = useState(query.image? 2: query.to || query.title || query.description? 1: 0)
  const [batchId, setBatchId] = useState(query.batchId? query.batchId.toString(): null)
  const { account, chainId } = useWeb3React()
  const [vaultAddress, setVaultAddress] = useState(query.to || account || '')
  const [vaultPubPriv, setVaultPubPriv] = useState(query.public == 'f'? 'Private': 'Public')
  const [vaultName, setVaultName] = useState(query.title || '')
  const [vaultDesc, setVaultDesc] = useState(query.description || '')
  const [vaultImage, setVaultImage] = useState(query.image || '')
  const [ownedImage, setOwnedImage] = useState(query.ownedUrl || '')
  const [password, setPassword] = useState('')
  const [isCovalApproved, setIsCovalApproved] = useState(false)
  const [state, setState] = useState({ loaded: true, private: false })
  const [hash, setHash] = useState(null)
  const [experimental, setExperimental] = useState(true)
  const [showPreVaultMsg, setShowPreVaultMsg] = useState(false)
  const [showMakingVaultMsg, setShowMakingVaultMsg] = useState(false)
  const [decimals, setDecimals] = useState(null)
  const [allowance, setAllowance] = useState(null)
  const [balance, setBalance] = useState(null)
  const [price, setPrice] = useState(null)
  const [creating, setCreating] = useState(false)
  const [approving, setApproving] = useState(false)
  const [vaultKey, setVaultKey] = useState('')  
  const [vaultValue, setVaultValue] = useState('')
  const [vaultType, setVaultType] = useState(query.image? 'embed':"upload")
  const [showEmbed, setShowEmbed] = useState(query.image? true: false)
  const [acceptedTos, setAcceptedTos] = useState(false) // ToS
  const [showTos, setShowTos] = useState(true) // ToS

  const handlerContract = useContract(contractAddresses.vaultHandler[chainId], contractAddresses.vaultHandlerAbi, true)
  const covalContract = useContract(contractAddresses.coval[chainId], contractAddresses.covalAbi, true)

  interface ErrorWithCode extends Error {
    code?: number
  }
  
  const checkTOS = ()=>{
    let tosMemory = localStorage.getItem('tos') == 'true'
    if (!tosMemory) {
      setAcceptedTos(false)
      setShowTos(true)
    } else {
      setAcceptedTos(true)
      setShowTos(false)
    }
  }

  const handleTOSCheck = (e)=>{
    setAcceptedTos(e.target.checked)
    localStorage.setItem('tos', e.target.checked)
  }

  const checkMintDisabled = ()=>{
    return !vaultAddress ||
    !isETHAddress(vaultAddress) ||
    !vaultName ||
    vaultName.length < 3 ||
    !vaultDesc ||
    vaultDesc.length < 3 || 
    !vaultImage || !acceptedTos
  }

  const getContractStates = async () => {
    setDecimals(await covalContract.decimals())
    setAllowance(
      await covalContract
        .allowance(account, contractAddresses.vaultHandler[chainId])
        .then((balance: { toString: () => string }) => balance.toString())
    )
    setBalance(await covalContract.balanceOf(account).then((balance: { toString: () => string }) => balance.toString()))
    setPrice(await handlerContract.price().then((balance: { toString: () => string }) => balance.toString()))
    // console.log(
    //   'balance',
    //   balance,
    //   'allowance',
    //   allowance,
    //   'price',
    //   price,
    //   Number(allowance) >= Number(price),
    //   Number(balance) > Number(price)
    // )
    if (Number(allowance) >= Number(price)) {
      setIsCovalApproved(true)
    } else {
      setIsCovalApproved(false)
    }
  }

  const fireMetaMask = () => {
    console.log("fire?")
    setCreating(true)
    // console.log(vaultAddress, tokenId, cipherTextHash, nonce, signature)
    // if (chainId === 137 || chainId === 1) {
      ;(handlerContract as Contract)
      .buyWithSignature(vaultAddress, tokenId, cipherTextHash, nonce, signature)
      .then(({ hash }: { hash: string }) => {
        setTimeout(() => {
          setHash(hash)
          // setCreating(false)
          setShowMakingVaultMsg(true)
        }, 100) // Solving State race condition where transaction watcher wouldn't notice we were creating
      })
      .catch((error: ErrorWithCode) => {
        // if (error?.code !== 4001) {
          setCreating(false)
          setShowPreVaultMsg(false)
          checkLiveliness(tokenId, ()=>{
            location.href = location.origin + '/nft?id=' + tokenId
          })
        // } else {
        //   setCreating(false)
        //   setShowPreVaultMsg(false)
        // }
      })
    // } else {
    //   ;(handlerContract as Contract)
    //   .buyWithPaymentOnly(vaultAddress, tokenId, mintPassword)
    //   .then(({ hash }: { hash: string }) => {
    //     setTimeout(() => {
    //       setHash(hash)
    //       // setCreating(false)
    //       setShowMakingVaultMsg(true)
    //     }, 100) // Solving State race condition where transaction watcher wouldn't notice we were creating
    //   })
    //   .catch((error: ErrorWithCode) => {
    //     if (error?.code !== 4001) {
    //       console.log(`tx failed.`, error)
    //     } else {
    //       setCreating(false)
    //       setShowPreVaultMsg(false)
    //     }
    //   })
    // }
    
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
      console.log("Liveliness check", data)
    })
    return cb()
  }

  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault()
    // if (service !== 'kms') {
    //   return alert('incorrect password')
    // }
    setState({ loaded: false, private: state.private })
    let body: any = {
      fromAddress: account,
      toAddress: vaultAddress,
      description: vaultDesc,
      name: vaultName,
      ownedImage: ownedImage,
      image: vaultImage,
      chainId: chainId,
      private: state.private,
      password: password || '',
      values: [],
      experimental: true
    }
    if (vaultKey && vaultValue) {
      body.values.push({"key": vaultKey, value: vaultValue})
    }
    if (batchId) {
      body.batchId = batchId
    }
    console.log(JSON.stringify(body))
    let apiSuffix = '/mint3' //(chainId == 137 || chainId == 1) ? '/mint3' : '/mint'
    fetch(EMBLEM_API + apiSuffix, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(body),
    }).then(async function (response) {
      setState({ loaded: true, private: state.private })
      let body = await response.json()
      tokenId = body.data.tokenId
      // console.log(body.data.nonce, body.data.signature, body.data.cipherTextHash)
      // if (chainId === 137 || chainId == 1) {
        nonce = body.data.nonce
        signature = body.data.signature
        cipherTextHash = body.data.cipherTextHash
        // fireMetaMask()
        // alert("Minting has been disabled temporarily while we work with Opensea to solve a bug where new vaults are not showing. Mint ONLY if you don't plan on using Opensea")
        setShowPreVaultMsg(false)
        setTimeout(() => {
        checkLiveliness(tokenId, ()=>{
          location.href = location.origin + '/nft?id=' + tokenId
        })
      }, 500)
      // } else {
      //   mintPassword = body.password
      //   setHash(body.data.tx)
      //   setShowPreVaultMsg(true)
      // }
    })
  }

  function previewFile() {
    const preview = document.querySelector('#preview') as HTMLImageElement
    const inputelement = document.querySelector('input[type=file]') as HTMLInputElement //.files[0];
    const reader = new FileReader()
    if (inputelement.files[0].size > 5000000) {
      delete inputelement.files
      return alert('File too large')
    } else {
      // alert('under')
    }
    reader.addEventListener(
      'load',
      function () {
        // convert image file to base64 string
        if (preview) preview.src = reader.result?.toString() || ''
        if (preview) setVaultImage(preview.src)
        setShowEditorButton(true)
        setModalResult('')
      },
      false
    )

    if (inputelement.files) {

      
      reader.readAsDataURL(inputelement.files[0])
    }
  }

  const [acct, setAcct] = useState('')
  useEffect(() => {
    if (account && acct != account) {
      setAcct(account)
      setVaultAddress(query.to || account)
      checkTOS()
    }
  }, [account, acct])

  useEffect(() => {
    account && chainId ? getContractStates() : null
  })

  return (
    <Loader loaded={state.loaded}>
      <Flex width="full" align="center" justifyContent="center">
        <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
          <Tabs defaultIndex={0} index={tabIndex} onChange={(index) => setTabIndex(index)}>
            <TabList>
              <Tab>Make</Tab>
              <Tab>My</Tab>
              <Tab>Vault</Tab>
              {/* <Tab>EDIT</Tab> */}
            </TabList>

            <TabPanels>
              <TabPanel>
                <Stack
                  direction="column"
                  align="center"
                  spacing="2rem"
                  flexGrow={1}
                  justifyContent="center"
                  px="2rem"
                  py="2rem"
                  shouldWrapChildren
                >
                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    <FormControl isRequired isInvalid={vaultAddress && !isETHAddress(vaultAddress)}>
                      <FormLabel htmlFor="owner-address">Vault Owner Address</FormLabel>
                      <Input
                        type="text"
                        id="owner-address"
                        aria-describedby="owner-helper-text"
                        placeholder="0xdeadbeef"
                        maxLength={42}
                        value={vaultAddress}
                        onChange={(e) => setVaultAddress(e.target.value)}
                      />
                      <FormHelperText id="owner-helper-text">
                        What is the address of the first owner of this vault? Pro tip: When you connect a web3 wallet,
                        this will populate automagically with your address.
                      </FormHelperText>
                      <FormErrorMessage>Address is not a valid ETH address</FormErrorMessage>
                    </FormControl>
                  </Stack>

                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    <FormControl as="fieldset" isRequired>
                      <FormLabel>Public or Private?</FormLabel>
                      <RadioGroup
                        id="pubpriv"
                        defaultValue={vaultPubPriv}
                        onChange={(e) => {
                          setVaultPubPriv(e.target.value)
                          setState({ loaded: state.loaded, private: e.target.value === 'Private' })
                        }}
                      >
                        <Radio value="Public">Public</Radio>
                        <Radio value="Private">Private</Radio>
                      </RadioGroup>
                      <FormHelperText id="email-helper-text">
                        Do you want the contents and addresses to be password protected?
                      </FormHelperText>
                    </FormControl>
                    {state.private ? (
                      <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
                          id="vault-password"
                          onChange={(e) => setPassword(e.target.value)}
                          aria-describedby="password-helper-text"
                          autoComplete="off"
                        />
                        <FormHelperText id="password-helper-text">Used to encrypt/decrypt</FormHelperText>
                      </FormControl>
                    ) : (
                      ''
                    )}
                  </Stack>
                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    <Button onClick={() => setTabIndex(1)}>Next</Button>
                  </Stack>
                </Stack>
              </TabPanel>

              <TabPanel>
                <Stack
                  direction="column"
                  align="center"
                  spacing="2rem"
                  flexGrow={1}
                  justifyContent="center"
                  px="2rem"
                  py="2rem"
                  shouldWrapChildren
                >
                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    <FormControl isRequired isInvalid={vaultName && vaultName.length < 3 && vaultName.length > 200}>
                      <FormLabel htmlFor="vault-name">Vault Name</FormLabel>
                      <Input
                        type="text"
                        id="vault-name"
                        aria-describedby="vault-name-text"
                        minLength={3}
                        maxLength={200}
                        value={vaultName}
                        onChange={(e) => setVaultName(e.target.value)}
                        autoComplete="off"
                      />
                      <FormHelperText id="vault-name-text">Give it some love so you can find it later.</FormHelperText>
                      <FormErrorMessage>Name needs at least 3 characters. 200 is max.</FormErrorMessage>
                    </FormControl>
                  </Stack>
                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    <FormControl isRequired isInvalid={vaultDesc && vaultDesc.length < 3 && vaultDesc.length > 1024}>
                      <FormLabel htmlFor="vault-desc">Vault Description</FormLabel>
                      <Textarea
                        id="vault-desc"
                        size="lg"
                        aria-describedby="vault-desc-text"
                        minLength={3}
                        maxLength={1024}
                        value={vaultDesc}
                        onChange={(e) => setVaultDesc(e.target.value)}
                        autoComplete="off"
                      />
                      <FormHelperText id="vault-desc-text">
                        Add some fluffy text to tell people what the point is!
                      </FormHelperText>
                      <FormErrorMessage>Description needs to be at least 3 characters. 1024 is max.</FormErrorMessage>
                    </FormControl>
                  </Stack>
                  <Button onClick={onToggle}>Include Encrypted Text In Vault</Button>
                  <Collapse isOpen={isOpen}>
                    {experimental? (
                      <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                      <FormControl>
                        <FormLabel htmlFor="vault-key">Key</FormLabel>
                        <Input
                          type="text"
                          id="vault-key"
                          aria-describedby="vault-key-text"
                          maxLength={200}
                          value={vaultKey}
                          onChange={(e) => setVaultKey(e.target.value)}
                          autoComplete="off"
                        />
                        <FormHelperText id="vault-key-text">Key Name (Public)</FormHelperText>
                        <FormErrorMessage>---Some Error</FormErrorMessage>
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="vault-value">Value</FormLabel>
                        <Input
                          type="password"
                          id="vault-value"
                          aria-describedby="vault-value-text"
                          maxLength={200}
                          value={vaultValue}
                          onChange={(e) => setVaultValue(e.target.value)}
                          autoComplete="off"
                        />
                        <FormHelperText id="vault-value-text">Key Value (Encrypted)</FormHelperText>
                        <FormErrorMessage>---Some Error</FormErrorMessage>
                      </FormControl>
                    </Stack>
                    ) : null}
                  </Collapse>
                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    <ButtonGroup spacing={4}>
                      <Button onClick={() => setTabIndex(0)}>Back</Button>
                      <Button onClick={() => setTabIndex(2)}>Next</Button>
                    </ButtonGroup>
                  </Stack>
                </Stack>
              </TabPanel>

              <TabPanel>
                <Stack
                  direction="column"
                  align="center"
                  spacing="2rem"
                  flexGrow={1}
                  justifyContent="center"
                  px="2rem"
                  py="2rem"
                  shouldWrapChildren
                >
                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    <FormControl>
                      
                      <Box p={1} rounded="lg" overflow="hidden">
                        <Stack align="center" p={1}>                          
                          {
                            vaultType !== "upload" ? (
                              <>
                                <FormLabel htmlFor="vault-image-url">Embed Display URL</FormLabel>
                                <Input
                                  type="text"
                                  id="vault-image-url"
                                  aria-describedby="vault-image-url-text"
                                  minLength={3}
                                  maxLength={200}
                                  value={vaultImage}
                                  defaultValue="http://"
                                  onChange={(e) => {
                                    setVaultImage(e.target.value)
                                    setShowEmbed(true)
                                    console.log("showEmbed", showEmbed)
                                  }}
                                  autoComplete="off"
                                  w={300}
                                />
                                
                                {(query.image && query.ownedUrl) || !query.image ? (
                                  <>
                                    <FormLabel mt={3} htmlFor="owned-url">Optional URL For Vault Owner *</FormLabel>
                                    <Input
                                      type="text"
                                      id="owned-url"
                                      aria-describedby="owned-url-text"
                                      minLength={3}
                                      maxLength={200}
                                      value={ownedImage}
                                      defaultValue="http://"
                                      onChange={(e) => {
                                        setOwnedImage(e.target.value)
                                      }}
                                      autoComplete="off"
                                      w={300}
                                    />
                                  </>
                                ) : null}
                                
                              </>
                            ) : (
                              <>
                              <FormLabel htmlFor="vault-img">Vault Image</FormLabel>
                              <input type="file" onChange={() => previewFile()} />
                              <Divider />
                              </>
                            )
                          }
                          {!query.image? (
                            <>
                              <Divider />
                              <FormLabel htmlFor="type-selector">Display Type</FormLabel>
                              <Select id="type-selector" w="100%" value={vaultType}
                                onChange={(e)=>{
                                  setVaultType(e.target.value)
                                  console.log("type", vaultType)
                                }}
                              >
                                <option value="embed" >Embed (url)</option>
                                <option value="upload" >Image (upload)</option>
                              </Select>
                            </>
                          ): null}
                          
                          {
                            vaultType == "upload" ? (
                              <>
                                
                                  <img id="preview" src={modalResult} width="250" margin-top="6"></img>
                                
                                
                                {/* {modalVisible && (
                                    <DokaImageEditorModal
                                        {...editorDefaults}
                                        src={vaultImage}
                                        onLoad={(res) => console.log('load modal image', res)}
                                        onHide={() => setModalVisible(false)}
                                        onProcess={({ dest }) => {
                                          var reader = new FileReader();
                                            reader.readAsDataURL(dest); 
                                            reader.onloadend = function() {
                                                var base64data = reader.result?.toString();                
                                                setVaultImage(base64data)
                                                setModalResult(URL.createObjectURL(dest))
                                                setShowEditorButton(false)
                                            }
                                          }
                                        }
                                    />
                                )} */}
                                {/* {!!modalResult.length && (
                                    <p>
                                        <img src={modalResult} alt="" />
                                    </p>
                                )} */}
                                {showEditorButton && vaultImage? (
                                  <Button mt={2} onClick={() => setModalVisible(true)}>Edit Image</Button>
                                ):null}
                              </>
                            ) : showEmbed == true ? (
                              <>                                
                                <Embed url={vaultImage.toString()}/>
                              </>
                            ) : null
                          }


                          
                        </Stack>
                      </Box>
                    </FormControl>
                  </Stack>

                  {/* <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    <FormControl>
                      <FormLabel htmlFor="service">API password:</FormLabel>
                      <Input
                        type="password"
                        id="service"
                        aria-describedby="service"
                        onChange={(e) => setService(e.target.value)}
                        autoComplete="off"
                      />
                    </FormControl>
                  </Stack> */}

                  {/* {isCovalApproved ? (
                    <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                      <Box maxW="sm" borderWidth="1px" p={1} rounded="lg" overflow="hidden">
                        <Text>Creating a vault spends {price * Math.pow(10, -decimals)} Coval from your wallet</Text>
                      </Box>
                    </Stack>
                  ) : null} */}

                  {
                    (
                      <>
                        <Text mt={2} as="h4" ml="4" mr="4" textAlign="center" fontSize="xs" fontStyle="italic" className="md">
                          <ReactMarkdown plugins={[gfm]} children={vaultName.toString() + '\n\n'} />
                        </Text>
                        <Text mt={2} as="h4" ml="4" mr="4" fontSize="xs" fontStyle="italic" className="md">
                          <ReactMarkdown plugins={[gfm]} children={vaultDesc.toString()} />
                        </Text>
                      </>
                    )
                  }

                  {Number(balance) < Number(price) ? (
                    <Box display="flex" alignItems="baseline" justifyContent="space-between" mt="2">
                      <Button
                        width="100%"
                        // as="a"
                        // {...{
                        //   href:
                        //     location.origin +
                        //     '/buy?chain=' +
                        //     chainId +
                        //     '&output=0x3D658390460295FB963f54dC0899cfb1c30776Df&input=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
                        //   target: '_blank',
                        //   rel: 'noopener noreferrer',
                        // }}
                        onClick={()=>{location.href = "https://app.uniswap.org/#/swap?outputCurrency=0x3d658390460295fb963f54dc0899cfb1c30776df"}}
                      >
                        Buy $Coval
                      </Button>
                    </Box>
                  ) : null}

                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    <ButtonGroup spacing={4}>
                      <Button onClick={() => setTabIndex(1)}>Back</Button>
                      {!account ? (
                        <Button isDisabled type="submit">
                          No Wallet Connected!
                        </Button>
                      ) : checkMintDisabled() ?  (
                        <Button isDisabled type="submit">
                          Check Fields!
                        </Button>
                      // ) : !service ? (
                      //   <Button isDisabled type="submit">
                      //     Creation Password?
                      //   </Button>
                      ) : hash || creating || showPreVaultMsg || showMakingVaultMsg ? (
                        <Button isDisabled type="submit">
                          Making Vault ...
                        </Button>
                      ) : (
                        <Button onClick={(e)=>{handleSubmit(e)}} type="submit">
                          Create Vault
                        </Button>
                      )}
                    </ButtonGroup>
                  </Stack>
                  { showTos ? (
                    <Stack>
                      <FormLabel><Checkbox mr={5} mt={1} onClick={handleTOSCheck}/>Agree to <a href="/tos" target="_blank">Terms of Service</a></FormLabel>
                    </Stack>
                  ): (
                    <Text><a href="/tos" target="_blank">Terms of Service</a></Text>
                  )}
                </Stack>
                {showPreVaultMsg ? (
                  <Alert status="info">
                    <AlertIcon />
                    Talking to contract ...
                  </Alert>
                ) : null}
                {showMakingVaultMsg ? (
                  <Alert status="info">
                    <AlertIcon />
                    Making vault ... one moment
                  </Alert>
                ) : null}
                {approving ? (
                  <Alert status="info">
                    <AlertIcon />
                    Handling approval flow ...
                  </Alert>
                ) : null}
              </TabPanel>
              {/* <TabPanel>
                <Stack>
                <div style={{ height: '70vh', backgroundColor: 'white' }}>
                  <DokaImageEditor
                      {...editorDefaults}
                      className='doka'
                      src={'./image.jpeg'}
                      onLoad={(res: any) => console.log('load inline image', res)}
                      onProcess={({ dest }) => setInlineResult(URL.createObjectURL(dest))}
                  />
                </div>
                </Stack>
              </TabPanel> */}
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
      {hash ? (
        <TransactionToast
          hash={hash}
          onComplete={() => {
            setHash(null)
            if (!creating) {
              if (!approving) {
                fireMetaMask()
                setShowPreVaultMsg(false)
              } else {
                setApproving(false)
              }
            } else {
              setTimeout(() => {
                setShowMakingVaultMsg(false)
                checkLiveliness(tokenId, ()=>{
                  location.href = location.origin + '/nft?id=' + tokenId
                })                
              }, 500)
            }
          }}
        />
      ) : null}
    </Loader>
  )
}
