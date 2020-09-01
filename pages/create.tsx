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
  Button
} from "@chakra-ui/core";

import { useWeb3React } from '@web3-react/core'
import React from "react";
import {useDropzone} from 'react-dropzone';


export default function Create() {

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/jpeg, image/png'
  });

  const [tabIndex, setTabIndex] = React.useState(0)
  const { account } = useWeb3React()

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" >
        <Tabs defaultIndex={0} index={tabIndex} onChange={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Yo</Tab>
            <Tab>What</Tab>
            <Tab>Up</Tab>
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
                      defaultValue={account || ''}
                      placeholder="0xdeadbeef"
                      />
                    <FormHelperText id="owner-helper-text">
                      What is the address of the first owner of this vault? Pro tip: When you connect a web3 wallet, this will populate automagically with your address.
                    </FormHelperText>
                  </FormControl>
                </Stack>

                <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                  <FormControl as="fieldset" isRequired>
                    <FormLabel as="legend">Public or Private?</FormLabel>
                    <RadioGroup defaultValue="Public">
                      <Radio value="Public">Public</Radio>
                      <Radio value="Private">Private</Radio>
                    </RadioGroup>
                    <FormHelperText id="email-helper-text">
                      Do you want people to be able to see the contents?
                    </FormHelperText>
                  </FormControl>
                </Stack>
                <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                  <Button onClick={() => setTabIndex(1)} >Next</Button>
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
                    <Input type="text" id="vault-name" aria-describedby="vault-name-text" />
                    <FormHelperText id="vault-name-text">
                      Give it some love so you can find it later.
                    </FormHelperText>
                  </FormControl>
                </Stack>
                <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                  <FormControl isRequired>
                    <FormLabel htmlFor="vault-desc">Vault Description</FormLabel>
                    <Textarea id="vault-desc" size="lg" aria-describedby="vault-desc-text" />
                    <FormHelperText id="vault-desc-text">
                      Want to add some fluffy text to tell people what the point is?
                    </FormHelperText>
                  </FormControl>
                </Stack>
                <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
                  <Button onClick={() => setTabIndex(2)} >Next</Button>
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
                <div {...getRootProps({className: "dropzone"})}>
        <input {...getInputProps()} />
        {isDragAccept && (<p>All files will be accepted</p>)}
          {isDragReject && (<p>Some files will be rejected</p>)}
          {!isDragActive && (<p>Drop some files here ...</p>)}
      </div>
                </Stack>
                </Stack>
                </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  )
}