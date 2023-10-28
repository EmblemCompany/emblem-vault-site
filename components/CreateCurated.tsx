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
import { EMBLEM_API, curatedAssets, EMBLEM_V2_API, ORD_API } from '../constants'
import { Checkbox } from '@material-ui/core'
import { newCuratedContracts } from '../utils'

let tokenId = null

export default function CreateCurated(props: any) {
  const { query } = useRouter()
  const [tabIndex, setTabIndex] = useState(0)
  const {account, chainId } = useWeb3React()
  const [vaultAddress, setVaultAddress] = useState(account || '')
  const [state, setState] = useState({ loaded: false, private: false })
  const [targetAsset, setTargetAsset] = useState({name: '', image: ''})
  const [targetContract, setTargetContract] = useState({name: '', collectionChain: '', image:(data)=>{return ''}, allowed: (data)=>{return false}, allowedName: (data)=>{return false}, placeholder: ()=>{return ''}, loading: ()=>{return ''}, loadTypes: []})
  const [enableAllCurated, setEnableCurated] = useState(query.curated == 't')
  const [mintDisabled, setMintDisabled] = useState(true)
  const [curatedError, setCuratedError] = useState('')
  const [curatedContentType, setCuratedContentType] = useState('')
  const [checked, setChecked] = useState(false) // blank vault
  const [acceptedTos, setAcceptedTos] = useState(false) // ToS
  const [showTos, setShowTos] = useState(true) // ToS
  const [curatedContracts, setCuratedContracts] = useState(newCuratedContracts) // curatedContracts

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
      targetAsset: targetAsset
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

  // useEffect(() => {
  //   if(newCuratedContracts && newCuratedContracts.length > 0) {
  //     setState({ loaded: true, private: state.private })
  //   } else {console.log('hook 1')}
  // })

  useEffect(() => {
    if (account && acct != account && !state.loaded && newCuratedContracts.length > 0) {
      setAcct(account)
      setVaultAddress(account)
      checkTOS()
      setState({ loaded: true, private: state.private })
      setCuratedContracts(curatedContracts)
    } //else {console.log('hook ')}
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
            setTargetAsset({name: name, image: targetContract.image(ordRecord)})
          } else {
            setCuratedContentType("")
            setCuratedError(ordRecord? `JSON/BRC-20 inscriptions not allowed`: 'Not a valid #')
            setMintDisabled(true)
            setTargetAsset({name: '', image: targetContract.placeholder()})
          }
        })        
      } else {
        setCuratedContentType("")
        setCuratedError('Invalid format: example (-1337)')
        setMintDisabled(true)
        setTargetAsset({name: '', image: ''})
      }      
    }, 1000)
  }

  return (
    <Loader loaded={state.loaded && curatedContracts.length > 0}>
      <Flex width="full" align="center" justifyContent="center">
        <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
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
                              let contractData:any = newCuratedContracts.filter(item=>{return item.name == e.target.value})[0]
                              console.log('------', contractData)
                              setTargetContract(contractData)
                            }}
                          >
                            <option value="" >---Choose Project---</option>
                            {state.loaded? curatedContracts.map(project=>{
                              
                              return enableAllCurated || project.mintable? (
                                <option value={project.name} >{project.name}</option>
                              ) : null
                            }): null}
                            
                          </Select>
                          {targetContract.name && targetContract["collectionType"] !== 'ERC721' && targetContract["collectionType"] !== 'ERC721a' ? (
                              <Select id="asset-selector" w="100%" value={targetAsset.name}
                                onChange={(e)=>{
                                  setMintDisabled(false)
                                  setTargetAsset(curatedAssets[targetContract.collectionChain][targetContract.name].filter(item=>{return item.name == e.target.value})[0])
                                }}
                              >
                                <option value="" >---Choose One---</option>
                                {curatedAssets[targetContract.collectionChain][targetContract.name] ? curatedAssets[targetContract.collectionChain][targetContract.name].sort((a, b) => {if (a.name < b.name) return -1;if (a.name > b.name) return 1;return 0;}).map(asset=>{
                                  return (
                                    <option value={asset.name} >{asset.name}</option>
                                  )
                                }): null}
                                
                              </Select>
                            ) : targetContract.name && (targetContract["collectionType"] == 'ERC721' || targetContract["collectionType"] == 'ERC721a') ? (
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
                                        setTargetAsset({name: "Loading...", image: targetContract.loading()})
                                        setCuratedError('')
                                        setCuratedContentType('')
                                        setMintDisabled(false)
                                        setChecked(true)
                                        } else {
                                          setTargetAsset({name: '', image: ''})
                                          setMintDisabled(true)
                                          setChecked(false)
                                        }
                                      }}
                                    />
                                    Empty Vault.
                                  </Box>
                                ): null}
                                <>{curatedError}</>
                                <>{curatedContentType}</>
                              </>
                            ):null}
                            
                            {targetAsset.image? (
                                  <Image
                                    p={"20px"}
                                    h={"100%"}
                                    className={"d-block w-100"}
                                    src={curatedContentType == 'text/plain;charset=utf-8'? targetContract.placeholder() : targetAsset.image}
                                    width="250px !important"
                                  />
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
