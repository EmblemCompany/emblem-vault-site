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
  Divider
} from '@chakra-ui/core'

import Loader from 'react-loader'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { TransactionToast } from './TransactionToast'
import { EMBLEM_API, contractAddresses } from '../constants'
import { Notify } from './Notify'
import { Contract } from '@ethersproject/contracts'
import { useContract } from '../hooks'
import { isETHAddress } from '../utils'

export default function Create(props: any) {
  const [tabIndex, setTabIndex] = useState(0)
  const { account, chainId } = useWeb3React()

  const [vaultAddress, setVaultAddress] = useState(account || '')
  const [vaultPubPriv, setVaultPubPriv] = useState('Public')
  const [vaultName, setVaultName] = useState('')
  const [vaultDesc, setVaultDesc] = useState('')
  const [vaultImage, setVaultImage] = useState('')
  const [password, setPassword] = useState('')
  const [service, setService] = useState('')
  const [isCovalApproved, setIsCovalApproved] = useState(false)
  const [state, setState] = useState({ loaded: true, private: false })
  const [hash, setHash] = useState(null)
  const [tokenId, setTokenId] = useState(null)
  const [mintPassword, setMintPassword] = useState(null)
  const [showPreVaultMsg, setShowPreVaultMsg] = useState(false)
  const [showMakingVaultMsg, setShowMakingVaultMsg] = useState(false)
  const [decimals, setDecimals] = useState(null)
  const [allowance, setAllowance] = useState(null)
  const [balance, setBalance] = useState(null)
  const [price, setPrice] = useState(null)
  const [creating, setCreating] = useState(false)

  const handlerContract = useContract(contractAddresses.vaultHandler[chainId], contractAddresses.vaultHandlerAbi, true)
  const covalContract = useContract(contractAddresses.coval[chainId], contractAddresses.covalAbi, true)

  interface ErrorWithCode extends Error {
    code?: number
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
    console.log(
      'balance',
      balance,
      'allowance',
      allowance,
      'price',
      price,
      Number(allowance) >= Number(price),
      Number(balance) > Number(price)
    )
    if (Number(allowance) >= Number(price)) {
      setIsCovalApproved(true)
    } else {
      setIsCovalApproved(false)
    }
  }

  const fireMetaMask = () => {
    setCreating(true)
    ;(handlerContract as Contract)
      .buyWithPaymentOnly(vaultAddress, tokenId, mintPassword)
      .then(({ hash }: { hash: string }) => {
        setTimeout(() => {
          setHash(hash)
          setShowMakingVaultMsg(true)
        }, 100) // Solving State race condition where transaction watcher wouldn't notice we were creating
      })
      .catch((error: ErrorWithCode) => {
        if (error?.code !== 4001) {
          console.log(`tx failed.`, error)
        }
      })
  }

  const approveCovalFlow = () => {
    ;(covalContract as Contract)
      .approve(contractAddresses.vaultHandler[chainId], '100000000000000')
      .then(({ hash }: { hash: string }) => {
        setHash(hash)
      })
  }

  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault()
    if (service !== 'kms') {
      return alert('incorrect password')
    }
    setState({ loaded: false, private: state.private })
    fetch(EMBLEM_API + '/mint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        service: 'evmetadata',
      },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify({
        fromAddress: account,
        toAddress: vaultAddress,
        description: vaultDesc,
        name: vaultName,
        image: vaultImage,
        chainId: chainId,
        private: state.private,
        password: password || '',
      }),
    }).then(async function (response) {
      setState({ loaded: true, private: state.private })
      let body = await response.json()
      setHash(body.data.tx)
      setTokenId(body.data.tokenId)
      setMintPassword(body.password)
      setShowPreVaultMsg(true)
    })
  }

  function previewFile() {
    const preview = document.querySelector('#preview') as HTMLImageElement
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
                      <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
                          id="vault-password"
                          onChange={(e) => setPassword(e.target.value)}
                          aria-describedby="password-helper-text"
                          autoComplete="off"
                        />
                        <FormHelperText id="password-helper-text">
                          This password will be used to encrypt and decrypt the contents of this vault
                        </FormHelperText>
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
                      <Box p={1} rounded="lg" overflow="hidden">
                        <Stack align="center" p={1}>
                        <input type="file" onChange={() => previewFile()} />
                        <Divider />
                        <img id="preview" src="" width="250" margin-top="6"></img>
                        </Stack>
                      </Box>
                    </FormControl>
                  </Stack>

                  <Stack direction="row" align="flex-start" spacing="0rem" flexWrap="wrap" shouldWrapChildren>
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
                  </Stack>

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
                        as="a"
                        {...{
                          href:
                            location.origin +
                            '/buy?chain=' +
                            chainId +
                            '&output=0x3D658390460295FB963f54dC0899cfb1c30776Df&input=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        }}
                      >
                        Buy coval
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
                        vaultDesc.length < 3 ? (
                        <Button isDisabled type="submit">
                          Check Fields!
                        </Button>
                      ) : !service ? (
                        <Button isDisabled type="submit">
                          Creation Password?
                        </Button>
                      ) : !isCovalApproved ? (
                        <Button onClick={approveCovalFlow} type="submit">
                          Approve Coval
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
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
      {showPreVaultMsg || showMakingVaultMsg || hash ? (
        <Stack direction="column" align="left" shouldWrapChildren>
          {showPreVaultMsg ? (
            <Notify
              color="green"
              message="Asking the blockchain if it is willing to create your vault ..."
              onClose={() => {
                setShowPreVaultMsg(false)
              }}
            />
          ) : null}
          {showMakingVaultMsg ? (
            <Notify
              color="green"
              message="Chaining blocks together to create your vault ..."
              onClose={() => {
                setShowMakingVaultMsg(false)
              }}
            />
          ) : null}
          {hash ? (
            <TransactionToast
              hash={hash}
              onComplete={() => {
                setHash(null)
                if (!creating) {
                  fireMetaMask()
                  setShowPreVaultMsg(false)
                } else {
                  setShowMakingVaultMsg(false)
                  location.href = location.origin + '/vault?id=' + tokenId
                }
              }}
            />
          ) : null}
        </Stack>
      ) : null}
    </Loader>
  )
}
