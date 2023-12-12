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
import { useState } from 'react';
import { EMBLEM_V2_API } from '../../constants';
import { isETHAddress } from '../../utils';
import Embed from '../Embed';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'

function DetailedCreate({ experimental = false, overrides = {}, account = '', handleSubmit }: { experimental:boolean, overrides: { to?: string, public?: string, title?: string, description?: string, image?: string, ownedUrl?: string, tabIndex?: number }, account: string, handleSubmit: any }) {
  const { isOpen, onToggle } = useDisclosure()
  const [vaultAddress, setVaultAddress] = useState(overrides.to || account || '')
  const [vaultPubPriv, setVaultPubPriv] = useState("Public")//overrides.public == 'f'? 'Private': 'Public')
  const [vaultName, setVaultName] = useState(overrides.title || '')
  const [vaultDesc, setVaultDesc] = useState(overrides.description || '')
  const [vaultImage, setVaultImage] = useState(overrides.image || '')
  const [ownedImage, setOwnedImage] = useState(overrides.ownedUrl || '')
  const [tabIndex, setTabIndex] = useState(overrides.tabIndex || overrides.image ? 2 : overrides.to || overrides.title || overrides.description ? 1 : 0)
  const [password, setPassword] = useState('')
  const [state, setState] = useState({ loaded: true, private: false })
  const [vaultKey, setVaultKey] = useState('')
  const [vaultValue, setVaultValue] = useState('')
  const [vaultType, setVaultType] = useState("embed")//overrides.image? 'embed':"upload")
  const [showEmbed, setShowEmbed] = useState(overrides.image? true: false)
  const [modalResult, setModalResult] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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
        setModalResult('')
      },
      false
    )

    if (inputelement.files) {

      
      reader.readAsDataURL(inputelement.files[0])
    }
  }

  return (
    <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
          <Tabs defaultIndex={0} index={tabIndex} onChange={(index) => setTabIndex(index)}>
            <TabList>
              {/* <Tab>Make</Tab> */}
              <Tab>Step 1</Tab>
              <Tab>Step 2</Tab>
              {/* <Tab>EDIT</Tab> */}
            </TabList>

            <TabPanels>
              {/* <TabPanel>
                <Stack
                  direction="column"
                  align="center"
                  spacing="2rem"
                  flexGrow={1}
                  justifyContent="center"
                  px="2rem"
                  py="2rem"
                  shouldWrapChildren
                  style={{ overflowWrap: 'break-word' }}
                >
                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    <FormControl isRequired isInvalid={vaultAddress && !isETHAddress(vaultAddress)}>
                      <FormLabel htmlFor="owner-address">Vault Owner Address</FormLabel>
                      <Input
                        type="text"
                        id="owner-address"
                        aria-describedby="owner-helper-text"
                        placeholder="0xdeadbeef"
                        maxLength={2}
                        value={vaultAddress}
                        onChange={(e) => setVaultAddress(e.target.value)}
                        size="xs"
                      />
                      <FormHelperText id="owner-helper-text">
                        What is the address of the first owner of this vault? Pro tip: When you connect a web3 wallet,
                        this will populate automagically with your address.
                      </FormHelperText>
                      <FormErrorMessage>Address is not a valid ETH address</FormErrorMessage>
                    </FormControl>
                  </Stack>

                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren={true}>
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
              </TabPanel> */}

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
                  {/* <Button onClick={onToggle}>Include Encrypted Text In Vault</Button>
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
                  </Collapse> */}
                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    <ButtonGroup spacing={4}>
                      <Button onClick={() => setTabIndex(0)}>Back</Button>
                      <Button onClick={() => setTabIndex(1)}>Next</Button>
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
                                <FormLabel htmlFor="vault-image-url">Vault Image or Embed URL</FormLabel>
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
                                
                                {/* {(overrides.image && overrides.ownedUrl) || !overrides.image ? (
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
                                ) : null} */}
                                
                              </>
                            ) : (
                              <>
                              <FormLabel htmlFor="vault-img">Vault Image</FormLabel>
                              <input type="file" onChange={() => previewFile()} />
                              <Divider />
                              </>
                            )
                          }
                          {/* {!overrides.image? (
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
                          ): null} */}
                          
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
                                {/* {showEditorButton && vaultImage? (
                                  <Button mt={2} onClick={() => setModalVisible(true)}>Edit Image</Button>
                                ):null} */}
                              </>
                            ) : showEmbed == true ? (
                              <>                                
                                {/* <Embed url={vaultImage.toString()}/> */}
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

                  {/* {
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
                  } */}

                  {/* {Number(balance) < Number(price) ? (
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
                  ) : null} */}

                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    <ButtonGroup spacing={4}>
                      <Button onClick={() => setTabIndex(0)}>
                        Back
                      </Button>                      
                      <Button isDisabled={!vaultDesc || !vaultImage || !vaultName} onClick={()=>{
                        handleSubmit(vaultAddress, vaultPubPriv, vaultName, vaultDesc, vaultImage, ownedImage, vaultKey, vaultValue, vaultType, password)
                        }} type="submit">
                        Preview Vault
                      </Button>
                    </ButtonGroup>
                  </Stack>
                  {/* { showTos ? (
                    <Stack>
                      <FormLabel><Checkbox mr={5} mt={1} onClick={handleTOSCheck}/>Agree to <a href="/tos" target="_blank">Terms of Service</a></FormLabel>
                    </Stack>
                  ): (
                    <Text><a href="/tos" target="_blank">Terms of Service</a></Text>
                  )} */}
                </Stack>
                {/* {showPreVaultMsg ? (
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
                ) : null} */}
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
  );
}

export default DetailedCreate;
