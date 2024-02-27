import {
  FormControl,
  FormLabel,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Box,
  Flex,
  Button,
  ButtonGroup,
  Divider,
  Select,
  Image,
  Input
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Loader from 'react-loader'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { EMBLEM_API, EMBLEM_V2_API, ORD_API } from '../constants'
import { Checkbox } from '@material-ui/core'
import { initCuratedContracts, sdk } from '../utils'
import DetailedCreate from './partials/DetailedCreate'
import Embed from './Embed'

let tokenId = null
let curatedAssets = {xcp:[]}
let NFT_DATA = sdk.getAllAssetMetadata()
NFT_DATA.forEach(item=>{
  item.name = item.assetName
  if (!curatedAssets.xcp[item.projectName]) {
    curatedAssets.xcp[item.projectName] = [];
  }
  if (!curatedAssets.xcp[item.projectName].includes(item)) {
    curatedAssets.xcp[item.projectName].push(item);
  }
})
console.log('NFT_DATA', NFT_DATA)
export default function CreateCurated(props: any) {
  const { query } = useRouter()
  const [tabIndex, setTabIndex] = useState(0)
  const {account, chainId } = useWeb3React()
  const [vaultAddress, setVaultAddress] = useState(account || '')
  const [state, setState] = useState({ loaded: false, private: false })
  const [targetAsset, setTargetAsset] = useState({name: '', image: '', description: '', ownedImage: ''})
  const [imageDisplayType, setImageDisplayType] = useState(query.image? 'embed':"upload")
  const [vaultPubPriv, setVaultPubPriv] = useState(query.public == 'f'? 'Private': 'Public')
  const [targetContract, setTargetContract] = useState({name: '', collectionChain: '', image:(data)=>{return ''}, allowed: (data)=>{return false}, allowedName: (data)=>{return false}, placeholder: ()=>{return ''}, loading: ()=>{return ''}, loadTypes: []})
  const [enableAllCurated, setEnableCurated] = useState(query.curated == 't')
  const [mintDisabled, setMintDisabled] = useState(true)
  const [curatedError, setCuratedError] = useState('')
  const [curatedContentType, setCuratedContentType] = useState('')
  const [checked, setChecked] = useState(false) // blank vault
  const [acceptedTos, setAcceptedTos] = useState(false) // ToS
  const [showTos, setShowTos] = useState(true) // ToS
  const [curatedContracts, setCuratedContracts] = useState([]) // curatedContracts]
  const [vaultPassword, setVaultPassword] = useState('')

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
    // console.log('disable me', !acceptedTos, mintDisabled, !acceptedTos || mintDisabled)
    return !acceptedTos || mintDisabled
  }
  
  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault()

    setState({ loaded: false, private: state.private })
    let body = {
      fromAddress: account,
      toAddress: vaultAddress,
      chainId: chainId,
      experimental: true,
      targetContract: targetContract,
      targetAsset: targetAsset,
      imageDisplayType: imageDisplayType,
      isPrivate: vaultPubPriv == 'Private',
      vaultPassword: vaultPassword,
    }
    let apiSuffix = '/create-curated'
    fetch(EMBLEM_V2_API + apiSuffix, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
      body: JSON.stringify(body),
    }).then(async function (response) {
      setState({ loaded: true, private: state.private })
      let body = await response.json()
      tokenId = body.data.tokenId || body.data.targetContract.tokenId
      setTimeout(() => {
        location.href = location.origin + '/nft2?id=' + tokenId
      }, 500)
    })
  }

  function getOrdinalRecord(num, cb){
    fetch(ORD_API + 'num/' + num, {
      method: 'GET',
    }).then(async function (response) {
      let body = await response.json()
      return cb(body.data[0])
    })    
  }

  const [acct, setAcct] = useState('')

  useEffect(() => {
    if (account && acct != account && !state.loaded && curatedContracts && curatedContracts.length > 0) {
      setAcct(account)
      setVaultAddress(account)
      checkTOS()
      setState({ loaded: true, private: state.private })
    } else if (!curatedContracts || curatedContracts.length == 0) {
      initCuratedContracts().then((data)=>{
      setCuratedContracts(data)
    })}
  })

  let typingTimer;

  function handleKeyUpNameInput(e){
    clearTimeout(typingTimer)
    console.log(e.target.value)
    typingTimer = setTimeout(() => {
      let name = `${targetContract.name} ${e.target.value}`
      if (targetContract.allowedName(name)) {
        setCuratedError('')
        getOrdinalRecord(e.target.value, (ordRecord)=>{
          setCuratedContentType(ordRecord? ordRecord.content_type: "")
          if (targetContract.allowed(ordRecord)){
            setCuratedError('')            
            setMintDisabled(false)
            setTargetAsset({name: name, image: targetContract.image(ordRecord), description: '', ownedImage: ''})
          } else {
            setCuratedContentType("")
            setCuratedError(ordRecord? `JSON/BRC-20 inscriptions not allowed`: 'Not a valid #')
            setMintDisabled(true)
            setTargetAsset({name: '', image: targetContract.placeholder(), description: '', ownedImage: ''})
          }
        })        
      } else {
        setCuratedContentType("")
        setCuratedError('Invalid format: example (-1337)')
        setMintDisabled(true)
        setTargetAsset({name: '', image: '', description: '', ownedImage: ''})
      }      
    }, 1000)
  }

  return (
    <Loader loaded={state.loaded && curatedContracts.length > 0}>
      <Flex width="full" align="center" justifyContent="center">
        <Box borderWidth="1px" rounded="lg" overflow="hidden">
          <Tabs defaultIndex={0} index={tabIndex} onChange={(index) => setTabIndex(index)}>
            <TabList>
              <Tab>Create Curated Vault</Tab>
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
                    <FormControl>
                      
                      <Box p={1} rounded="lg" overflow="hidden">
                        <Stack align="center" p={1}>
                          <Divider />
                          <FormLabel htmlFor="project-selector">Choose Curated Collection</FormLabel>
                          <Select id="project-selector" w="100%" value={targetContract.name}
                            onChange={(e)=>{
                              let contractData:any = curatedContracts.filter(item=>{return item.name == e.target.value})[0]
                              console.log('------', contractData)
                              if (chainId == 5) {
                                delete contractData["1"]
                              } else {
                                delete contractData["5"]
                              }
                              setTargetContract(contractData)
                            }}
                          >
                            <option value="" >---Choose Project---</option>
                            {state.loaded? curatedContracts.map((project, index)=>{
                              
                              return enableAllCurated || project.mintable? (
                                <option key={`select-${index}`} value={project.name} >{project.name}</option>
                              ) : null
                            }): null}
                            
                          </Select>
                          {targetContract.loadTypes.includes('select') && targetContract.name != "Embels" ? (
                              <Select id="asset-selector" w="100%" value={targetAsset.name}
                                onChange={async (e)=>{
                                  setMintDisabled(false)
                                  let targetAsset = curatedAssets[targetContract.collectionChain][targetContract.name].filter(item=>{return item.name == e.target.value})[0]
                                  let urlReport: any = await sdk.contentTypeReport(targetAsset.image)
                                  if (!urlReport.valid) {
                                    targetAsset.image = `https://xchain.io/img/cards/${targetAsset.image}`
                                  }
                                  setTargetAsset(targetAsset) 
                                }}
                              >
                                <option value="" >---Choose One---</option>
                                {curatedAssets[targetContract.collectionChain] && curatedAssets[targetContract.collectionChain][targetContract.name] ? curatedAssets[targetContract.collectionChain][targetContract.name].sort((a, b) => {if (a.name < b.name) return -1;if (a.name > b.name) return 1;return 0;}).map((asset, i)=>{
                                  return (
                                    <option key={`choose-${i}`} value={asset.name} >{asset.name}</option>
                                  )
                                }): null}
                                
                              </Select>
                            ):  null }

                            {/* { targetContract.name && (targetContract["collectionType"] == 'ERC721' || targetContract["collectionType"] == 'ERC721a') ? ( */}
                              <>
                                {targetContract.loadTypes.includes('input')? ( 
                                  <Input isDisabled={checked} onKeyUp={(e)=>{ handleKeyUpNameInput(e)}}  w="100%" placeholder={`${targetContract.name} Number (-1337)`} ></Input>
                                ): null}
                                
                                {targetContract.loadTypes.includes('empty')? ( 
                                  <Box my={3}>
                                    <Checkbox 
                                      checked={checked}
                                      onChange={(e)=>{
                                        if (e.target.checked) {
                                        setTargetAsset({name: "Loading...", image: targetContract.loading(), description: '', ownedImage: ''})
                                        setCuratedError('')
                                        setCuratedContentType('')
                                        setMintDisabled(false)
                                        setChecked(true)
                                        } else {
                                          setTargetAsset({name: '', image: '', description: '', ownedImage: ''})
                                          setMintDisabled(true)
                                          setChecked(false)
                                        }
                                      }}
                                    />
                                    Empty Vault.
                                  </Box>
                                ): null}

                                {targetContract.loadTypes.includes('detailed')? (
                                  <DetailedCreate experimental={false} overrides={query} account={account} handleSubmit={
                                    (vaultAddress, pubOrPriv, vaultName, vaultDesc, image, ownedImage, vaultKey, vaultValue, displayType, password)=>{
                                      setVaultAddress(vaultAddress)
                                      setTargetAsset({name: vaultName, image: image, description: vaultDesc, ownedImage: ownedImage})
                                      setCuratedError('')
                                      setImageDisplayType(displayType)
                                      setVaultPubPriv(pubOrPriv)
                                      setVaultPassword(password)
                                      setMintDisabled(false)
                                    }
                                  }></DetailedCreate>
                                ): null}
                                <>{curatedError}</>
                                <>{curatedContentType}</>
                              </>
                            {/* ):null} */}
                            
                            {/* {targetAsset.image? (
                                  <Image
                                    p={"20px"}
                                    h={"100%"}
                                    className={"d-block w-100"}
                                    src={curatedContentType == 'text/plain;charset=utf-8'? targetContract.placeholder() : targetAsset.image}
                                    width="250px !important"
                                  />
                                ): null} */}
                                {targetAsset.name? (
                                  <Text>Name: {targetAsset.name}</Text>
                                ):null}
                                {targetAsset.description? (
                                  <Text>Description: {targetAsset.description}</Text>
                                ):null}
                                {targetAsset.image? (
                                  <Embed url={curatedContentType == 'text/plain;charset=utf-8'? targetContract.placeholder() : targetAsset.image.toString()}/>
                                ): null}
                        </Stack>
                      </Box>
                    </FormControl>
                  </Stack>
                  {/* <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    {targetAsset.name? (
                      <Text>Confirm: {targetAsset.name.toString()}</Text>
                    ): null}
                    
                  </Stack> */}
                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    
                    <ButtonGroup spacing={4}>
                      {!account ? (
                        <Button isDisabled type="submit">
                          No Wallet Connected!
                        </Button>
                      ) : (
                        <Button
                        isDisabled={checkMintDisabled()}
                          onClick={(e)=>{                            
                            handleSubmit(e)
                          }} 
                          type="submit">
                          Create {targetContract.name.toString()} Vault
                        </Button>
                      )}
                    </ButtonGroup>
                    
                  </Stack>
                  { showTos ? (
                    <Stack>
                      <FormLabel><Checkbox onClick={handleTOSCheck}/>Agree to <a href="/tos" target="_blank">Terms of Service</a></FormLabel>
                    </Stack>
                  ): (
                    <Text><a href="/tos" target="_blank">Terms of Service</a></Text>
                  )}
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Loader>
  )
}
