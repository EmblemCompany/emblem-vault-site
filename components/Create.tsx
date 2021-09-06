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
  Box,
  Flex,
  RadioGroup,
  Radio,
  Textarea,
  Button,
  ButtonGroup,
  Text,
  Divider,
  Alert,
  AlertIcon,
  Collapse,
  useDisclosure,
  Select
} from '@chakra-ui/core'

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
// react-doka
import { DokaImageEditor, DokaImageEditorModal, DokaImageEditorOverlay } from 'react-doka';
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
    plugin_crop_defaults,
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

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

const editorDefaults = {
    imageReader: createDefaultImageReader(),
    imageWriter: createDefaultImageWriter(),
    ...plugin_crop_defaults,
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
  const [tabIndex, setTabIndex] = useState(0)
  const { account, chainId } = useWeb3React()
  const [vaultAddress, setVaultAddress] = useState(account || '')
  const [vaultPubPriv, setVaultPubPriv] = useState('Public')
  const [vaultName, setVaultName] = useState('')
  const [vaultDesc, setVaultDesc] = useState('')
  const [vaultImage, setVaultImage] = useState('')
  const [ownedImage, setOwnedImage] = useState('')
  const [password, setPassword] = useState('')
  // const [service, setService] = useState('')
  const [isCovalApproved, setIsCovalApproved] = useState(false)
  const [state, setState] = useState({ loaded: true, private: false })
  const [hash, setHash] = useState(null)
  // const [cipherTextHash, setCipherTextHash] = useState(null)
  // const [tokenId, setTokenId] = useState(null)
  // const [mintPassword, setMintPassword] = useState(null)
  // const [nonce, setNonce] = useState(null)
  // const [signature, setSignature] = useState(null)
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
  const [vaultType, setVaultType] = useState("image")
  const [showEmbed, setShowEmbed] = useState(false)
  

  const handlerContract = useContract(contractAddresses.vaultHandler[chainId], contractAddresses.vaultHandlerAbi, true)
  const covalContract = useContract(contractAddresses.coval[chainId], contractAddresses.covalAbi, true)

  interface ErrorWithCode extends Error {
    code?: number
  }

  let transak
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
    let body = {
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
        fireMetaMask()
        setShowPreVaultMsg(false)
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
      setVaultAddress(account)
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
                        defaultValue="Public"
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
                                <hr/>
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
                            ) : (
                              <>
                              <FormLabel htmlFor="vault-img">Vault Image</FormLabel>
                              <input type="file" onChange={() => previewFile()} />
                              <Divider />
                              </>
                            )
                          }
                          <Divider />
                          <FormLabel htmlFor="type-selector">Display Type</FormLabel>
                          <Select id="type-selector" w="45%" value={vaultType}
                            onChange={(e)=>{
                              setVaultType(e.target.value)
                              console.log("type", vaultType)
                            }}
                          >
                            <option value="embed" >Embed (url)</option>
                            <option value="upload" >Image (upload)</option>
                            {/* <option value="embed" >Embed (url)</option>
                            <option value="video" >Video (url)</option> */}
                          </Select>
                          {
                            vaultType == "upload" ? (
                              <>
                                
                                  <img id="preview" src={modalResult} width="250" margin-top="6"></img>
                                
                                
                                {modalVisible && (
                                    <DokaImageEditorModal
                                        {...editorDefaults}
                                        className='doka'
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
                                )}
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
                                <Embed url={vaultImage}/>
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

                  {isCovalApproved ? (
                    <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                      <Box maxW="sm" borderWidth="1px" p={1} rounded="lg" overflow="hidden">
                        <Text>Creating a vault spends {price * Math.pow(10, -decimals)} Coval from your wallet</Text>
                      </Box>
                    </Stack>
                  ) : null}

                  {Number(balance) < Number(price) ? (
                    <Box d="flex" alignItems="baseline" justifyContent="space-between" mt="2">
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
                        onClick={()=>{initializeTransak(vaultAddress, 'COVAL')}}
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
                      ) : !vaultAddress ||
                        !isETHAddress(vaultAddress) ||
                        !vaultName ||
                        vaultName.length < 3 ||
                        !vaultDesc ||
                        vaultDesc.length < 3 || 
                        !vaultImage ? (
                        <Button isDisabled type="submit">
                          Check Fields!
                        </Button>
                      // ) : !service ? (
                      //   <Button isDisabled type="submit">
                      //     Creation Password?
                      //   </Button>
                      ) : !isCovalApproved && !approving ? (
                        <Button onClick={approveCovalFlow} type="submit">
                          Approve Coval
                        </Button>
                      ) : !isCovalApproved && approving ? (
                        <Button isDisabled type="submit">
                          Approving ...
                        </Button>
                      ) : Number(balance) < Number(price) ? (
                        <Button isDisabled type="submit">
                          Insufficient Balance
                        </Button>
                      ) : hash || creating || showPreVaultMsg || showMakingVaultMsg ? (
                        <Button isDisabled type="submit">
                          Making Vault ...
                        </Button>
                      ) : (
                        <Button onClick={handleSubmit} type="submit">
                          DO IT!
                        </Button>
                      )}
                    </ButtonGroup>
                  </Stack>
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
