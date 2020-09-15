import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
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
} from '@chakra-ui/core'

import Loader from 'react-loader'
import { useWeb3React } from '@web3-react/core'
import React, { useState } from 'react'

export default function Create(props: any) {
  const [tabIndex, setTabIndex] = React.useState(0)
  const { account, chainId } = useWeb3React()

  const [vaultAddress, setVaultAddress] = React.useState(account || '')
  const [vaultPubPriv, setVaultPubPriv] = React.useState('Public')
  const [vaultName, setVaultName] = React.useState('')
  const [vaultDesc, setVaultDesc] = React.useState('')
  const [vaultImage, setVaultImage] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [service, setService] = React.useState('')
  const [state, setState] = React.useState({ loaded: true, private: false })

  const handlePrivateRadio = (e) => {
    console.log('Changed Private visibility', e)
  }
  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault()
    alert(
      `Vault properties: name is: ${vaultName}, description is: ${vaultDesc}, address is: ${vaultAddress}, Pub/Priv is: ${vaultPubPriv}, and image data is: ${vaultImage}`
    )
    setState({ loaded: false, private: state.private })
    fetch('https://api.emblemvault.io/mint', {
      method: 'POST',
      headers: {
        Authorization: 'Basic YWRtaW46c3VwZXJzZWNyZXQ=',
        'Content-Type': 'application/json',
        service: service,
      },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify({
        toAddress: vaultAddress,
        description: vaultDesc,
        name: vaultName,
        image: vaultImage,
        chainId: chainId,
        private: state.private,
        password: password || '',
      }),
    }).then(function (response) {
      setState({ loaded: true, private: state.private })
      location.href = location.origin + '/vaultlist'
      // console.log(response.json())
      // return response.json();
    })
  }

  function previewFile() {
    const preview = document.querySelector('img')
    const inputelement = document.querySelector('input[type=file]') as HTMLInputElement //.files[0];
    const reader = new FileReader()

    reader.addEventListener(
      'load',
      function () {
        // convert image file to base64 string
        if (preview) preview.src = reader.result?.toString() || ''
        if (preview) setVaultImage(preview.src)
      },
      false
    )

    if (inputelement.files) {
      reader.readAsDataURL(inputelement.files[0])
    }
  }

  return (
    <Loader loaded={state.loaded}>
      <Flex width="full" align="center" justifyContent="center">
        <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
          <Tabs defaultIndex={0} index={tabIndex} onChange={(index) => setTabIndex(index)}>
            <TabList>
              <Tab>Make</Tab>
              <Tab>My</Tab>
              <Tab>Vault</Tab>
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
                    <FormControl isRequired>
                      <FormLabel htmlFor="owner-address">Vault Owner Address</FormLabel>
                      <Input
                        type="text"
                        id="owner-address"
                        aria-describedby="owner-helper-text"
                        placeholder="0xdeadbeef"
                        value={vaultAddress}
                        onChange={(e) => setVaultAddress(e.target.value)}
                      />
                      <FormHelperText id="owner-helper-text">
                        What is the address of the first owner of this vault? Pro tip: When you connect a web3 wallet,
                        this will populate automagically with your address.
                      </FormHelperText>
                    </FormControl>
                  </Stack>

                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    <FormControl as="fieldset" isRequired>
                      <FormLabel as="legend">Public or Private?</FormLabel>
                      <RadioGroup
                        id="pubpriv"
                        defaultValue="Public"
                        onChange={(e) => {
                          setVaultPubPriv(e.target.value)
                          setState({ loaded: state.loaded, private: e.target.value === 'Private' })
                          console.log('Private', e.target.value === 'Private')
                        }}
                      >
                        <Radio value="Public">Public</Radio>
                        <Radio value="Private">Private</Radio>
                      </RadioGroup>
                      <FormHelperText id="email-helper-text">
                        Do you want people to be able to see the contents?
                      </FormHelperText>
                    </FormControl>
                    {state.private ? (
                      <FormControl>
                        <FormLabel as="legend">Password</FormLabel>
                        <Input
                          type="password"
                          id="owner-address"
                          onChange={(e) => setPassword(e.target.value)}
                          aria-describedby="owner-helper-text"
                        />
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
                    <FormControl isRequired>
                      <FormLabel htmlFor="vault-name">Vault Name</FormLabel>
                      <Input
                        type="text"
                        id="vault-name"
                        aria-describedby="vault-name-text"
                        value={vaultName}
                        onChange={(e) => setVaultName(e.target.value)}
                      />
                      <FormHelperText id="vault-name-text">Give it some love so you can find it later.</FormHelperText>
                    </FormControl>
                  </Stack>
                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    <FormControl isRequired>
                      <FormLabel htmlFor="vault-desc">Vault Description</FormLabel>
                      <Textarea
                        id="vault-desc"
                        size="lg"
                        aria-describedby="vault-desc-text"
                        value={vaultDesc}
                        onChange={(e) => setVaultDesc(e.target.value)}
                      />
                      <FormHelperText id="vault-desc-text">
                        Want to add some fluffy text to tell people what the point is?
                      </FormHelperText>
                    </FormControl>
                  </Stack>
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
                      <FormLabel htmlFor="vault-img">Vault Image</FormLabel>
                      <Box maxW="sm" borderWidth="1px" p={1} rounded="lg" overflow="hidden">
                        <input type="file" onChange={() => previewFile()} />
                        <br />
                        <img src="" width="200" alt="Image preview..."></img>
                      </Box>
                    </FormControl>
                  </Stack>

                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    <FormControl>
                      <FormLabel htmlFor="service">Password:</FormLabel>
                      <Input
                        type="password"
                        id="service"
                        aria-describedby="service"
                        onChange={(e) => setService(e.target.value)}
                      />
                    </FormControl>
                  </Stack>

                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                    <ButtonGroup spacing={4}>
                      <Button onClick={() => setTabIndex(1)}>Back</Button>
                      <Button onClick={handleSubmit} type="submit">
                        DO IT!
                      </Button>
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
