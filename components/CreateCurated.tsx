import {
  FormControl,
  FormLabel,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
  Button,
  ButtonGroup,
  Divider,
  Select,
  Image
} from '@chakra-ui/core'

import Loader from 'react-loader'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { EMBLEM_API, curatedContracts, curatedAssets } from '../constants'


let tokenId = null

export default function CreateCurated(props: any) {
  const [tabIndex, setTabIndex] = useState(0)
  const { account, chainId } = useWeb3React()
  const [vaultAddress, setVaultAddress] = useState(account || '')
  const [state, setState] = useState({ loaded: true, private: false })
  const [targetAsset, setTargetAsset] = useState({name: '', image: ''})
  const [targetContract, setTargetContract] = useState({name: '', chain: ''})
  

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
    let apiSuffix = '/v2/create-curated'
    fetch(EMBLEM_API + apiSuffix, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
      body: JSON.stringify(body),
    }).then(async function (response) {
      setState({ loaded: true, private: state.private })
      let body = await response.json()
      tokenId = body.data.tokenId
      setTimeout(() => {
        location.href = location.origin + '/nft2?id=' + tokenId
      }, 500)
    })
  }

  const [acct, setAcct] = useState('')

  useEffect(() => {
    if (account && acct != account) {
      setAcct(account)
      setVaultAddress(account)
    }
  }, [account, acct])

  return (
    <Loader loaded={state.loaded}>
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
                              let contractData:any = curatedContracts.filter(item=>{return item.name == e.target.value})[0]
                              setTargetContract(contractData)
                            }}
                          >
                            <option value="" >---Choose Project---</option>
                            {curatedContracts.map(project=>{
                              return (
                                <option value={project.name} >{project.name}</option>
                              )
                            })}
                            
                          </Select>
                          {targetContract.name ? (
                              <Select id="asset-selector" w="100%" value={targetAsset.name}
                                onChange={(e)=>{
                                  setTargetAsset(curatedAssets[targetContract.chain][targetContract.name].filter(item=>{return item.name == e.target.value})[0])
                                }}
                              >
                                <option value="" >---Choose One---</option>
                                {curatedAssets[targetContract.chain][targetContract.name] ? curatedAssets[targetContract.chain][targetContract.name].map(asset=>{
                                  return (
                                    <option value={asset.name} >{asset.name}</option>
                                  )
                                }): null}
                                
                              </Select>
                            ) : null}
                            {targetAsset.name? (
                                  <Image
                                    p={"20px"}
                                    h={"100%"}
                                    className={"d-block w-100"}
                                    src={targetAsset.image}
                                    width="250px"
                                  />
                                ): null}
                        </Stack>
                      </Box>
                    </FormControl>
                  </Stack>

                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    <ButtonGroup spacing={4}>
                      {!account ? (
                        <Button isDisabled type="submit">
                          No Wallet Connected!
                        </Button>
                      ) : (
                        <Button onClick={(e)=>{handleSubmit(e)}} type="submit">
                          Create Vault
                        </Button>
                      )}
                    </ButtonGroup>
                  </Stack>

                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Loader>
  )
}
