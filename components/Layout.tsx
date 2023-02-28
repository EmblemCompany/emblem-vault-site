import { ReactNode, useEffect, useState } from 'react'
import BackgroundVideo from './BackgroundVideo'
import { Flex, IconButton, useDisclosure, Badge, LightMode, Stack, Box, Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Text, Link} from '@chakra-ui/core'
import { useWeb3React } from '@web3-react/core'
import dynamic from 'next/dynamic'
import { CHAIN_ID_NAMES } from '../utils'
import { useEagerConnect, useQueryParameters, useUSDETHPrice } from '../hooks'

import { useTransactions, useFirstToken, useSecondToken, useShowUSD } from '../context'
import ColorBox from './ColorBox'
import Account from './Account'
import { TransactionToast } from './TransactionToast'
import TokenBalance from './TokenBalance'
import { WETH, ChainId, Token } from '@uniswap/sdk'
import WalletConnect from './WalletConnect'
import { QueryParameters } from '../constants'
import { Coval, CovalTest, CovalTestMatic, CovalMatic, CovalxDai, CovalBSC, CovalFantom, DEFAULT_TOKENS, CovalAurora, CovalGÖRLI } from '../tokens'
import Head from 'next/head'
import transakSDK from '@transak/transak-sdk'
import { useRouter } from 'next/router'

// import Gun from 'gun';
// import 'gun/sea'
// import { GunProvider } from 'react-gun';

const Settings = dynamic(() => import('./Settings'))

export default function Layout({ children }: { children: ReactNode}): JSX.Element {
  const { chainId, account } = useWeb3React()
  const isTestnet = typeof chainId === 'number' && chainId !== 1

  const { isOpen: isOpenSettings, onOpen: onOpenSettings, onClose: onCloseSettings } = useDisclosure()

  const [firstToken] = useFirstToken()
  const [secondToken] = useSecondToken()
  const [showUSD, setShowUSD] = useShowUSD()

  // const [gun, setGun] = useState(Gun(['https://emblem-gun.herokuapp.com/gun']))

  const [transactions] = useTransactions()

  // automatically try connecting to the injected connector on pageload
  const triedToEagerConnect = useEagerConnect()

  const queryParameters = useQueryParameters()
  const requiredChainId = queryParameters[QueryParameters.CHAIN]
  const { query } = useRouter()
  const [useLayout, setUseLayout] = useState(true)
  useEffect(() => {
    if (((query.noLayout && query.noLayout == 'true') || query.slideshowOnly && query.slideshowOnly == 'true') && useLayout) {
      setUseLayout(false)
    }
  })
  const USDETHPrice = useUSDETHPrice()

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
      widgetWidth: '450px',
      // networks: 'matic,bsc,eth,mainnet'

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

  const showOrHideNavLink = (path: string)=> {
    return location.pathname.includes(path) ? 'none': 'block'
  }

  const handleNewNavigationClick = (path)=>{
    location.href = location.origin + '/'+path
  }
  
  const handleSearchClick = ()=>{
    let pieces = location.pathname.split('/')
    pieces.pop()
    location.href = location.origin + pieces.join('/') + '/find'
  }
  
  const handleNavigationclick = () => {
    console.log(location.pathname)
    let pieces = location.pathname.split('/')
    pieces.pop()
    if (location.pathname.includes('vaultlist')) {
      location.href = location.origin + pieces.join('/') + '/create'
    } else {
      location.href = location.origin + pieces.join('/') + '/vaultlist'
    }
  }

  const handleNavigationFeaturedclick = ()=>{
    let pieces = location.pathname.split('/')
    pieces.pop()
    if (location.pathname.includes('featured')) {
      location.href = location.origin + pieces.join('/') + '/create'
    } else {
      location.href = location.origin + pieces.join('/') + '/featured'
    }
  }
  return (
    <>
      <Settings isOpen={isOpenSettings} onClose={onCloseSettings} />
      <BackgroundVideo />
      
      <ColorBox
        as={Flex}
        flexDirection="column"
        borderColor={
          Number(chainId) === 137 ? "blue.500" : 
          Number(chainId) === 1? "blue.500" : 
          Number(chainId) === 56? "orange" : 
          "orange.500"}
        borderWidth={!useLayout ? '0em' : isTestnet ? '.5rem' : '.5rem'}
        minHeight="100vh"
        maxHeight="100vh"
      >
        {useLayout? (
          <Flex justifyContent="space-between" flexShrink={0} overflowX="auto" p="1rem">
            <Stack spacing={0} direction="row">
              <IconButton m={2} icon="settings" variant="ghost" onClick={onOpenSettings} aria-label="Settings" />
              <IconButton m={2} icon="search" variant="ghost" onClick={handleSearchClick} aria-label="Search" />
              <Button display={showOrHideNavLink('create')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('create')}}>
                Create
              </Button>
              <Button display={showOrHideNavLink('createcurated')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('createcurated')}}>
                Create Curated
              </Button>
              <Button display={showOrHideNavLink('vaults')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('vaults')}}>
                My Vaults
              </Button>
              <Button display={showOrHideNavLink('featured')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('featured')}}>
                Featured
              </Button>
              <Button display={showOrHideNavLink('newest')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('newest')}}>
                Newest
              </Button>
            </Stack>
            <Account triedToEagerConnect={triedToEagerConnect} />
          </Flex>
        ): null}
        
        {useLayout? (
          <Stack
            position="absolute"
            top={0}
            right={0}
            m={isTestnet ? '1.5rem' : '1rem'}
            mt={isTestnet ? '5rem' : '4.5rem'}
            alignItems="flex-end"
            spacing="1rem"
            zIndex={2}
          >
            {typeof account !== 'string' ? (
              !triedToEagerConnect ||
              (typeof chainId === 'number'
                ? chainId !== ChainId.MAINNET
                : typeof requiredChainId === 'number' && requiredChainId !== ChainId.MAINNET) ? null : (
                <Box>
                  <WalletConnect />
                </Box>
              )
            ) : (
              // [DEFAULT_TOKENS.filter((tokenrrr) => tokenrrr.chainId == chainId)[0], firstToken, secondToken]
              [
                chainId == 1 ? Coval : 
                chainId == 5 ? CovalGÖRLI:
                chainId == 80001 ? CovalTestMatic : 
                chainId == 137 ? CovalMatic : 
                chainId == 100? CovalxDai : 
                chainId == 56 ? CovalBSC :
                chainId == 250 ? CovalFantom :
                chainId == 1313161554 ? CovalAurora:
                CovalTest,
                firstToken ? (firstToken.symbol != 'Coval' ? firstToken : null) : null,
                secondToken ? (secondToken.symbol != 'Coval' ? secondToken : null) : null,
              ]
                .filter((token) => token)
                .filter((token) => !token?.equals(WETH[token.chainId]))
                .map((token) => (
                  <Box key={token?.address}>
                    <TokenBalance token={token as Token} />
                  </Box>
                ))
            )}
          </Stack>
        ): null}

        <Flex id="shannon-container" flexGrow={1} direction="column" overflow="auto">
          {children}
          {useLayout? null : (
            <Account triedToEagerConnect={triedToEagerConnect} />
          )}
        </Flex>

        

        {useLayout? (
          <Flex minHeight="1.5rem">
            {typeof chainId === 'number' /*&& chainId !== 1*/ ? (
              <LightMode>
                {/* <Link href="/swap"> */}
                  <Badge
                    variant="solid"
                    variantColor={
                      chainId == 137 || chainId == 1 ? 'blue' : 
                      chainId == Number(56) || Number(5) ? 'orange':
                      'orange'/*isTestnet ? 'blue' : undefined*/}
                    fontSize="1rem"
                    style={{ borderTopLeftRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }} >
                    On {CHAIN_ID_NAMES[chainId].toLowerCase()} 
                    {/* (Swap to {chainId == 1 ? 'Matic' : 'Ethereum'}) */}
                  </Badge>
                {/* </Link> */}
              </LightMode>
            ):null}
          </Flex>
        ): null}

        {transactions.length > 0 && (
          <Stack
            position="absolute"
            bottom={0}
            right={0}
            m={isTestnet ? '1.5rem' : '1rem'}
            alignItems="flex-end"
            spacing="1rem"
            zIndex={2}
          >
            {transactions
              .filter((transaction) => transaction.chainId === chainId)
              .map(({ hash }) => (
                <Box key={hash}>
                  <TransactionToast hash={hash} />
                </Box>
              ))}
          </Stack>
        )}
        <Stack
          position="absolute"
          bottom={1}
          left={100}
          alignItems="center"
          align="center"
        >
          <Popover usePortal>
            <PopoverTrigger>
            <IconButton size="sm" icon="warning-2" aria-label=''/>
            </PopoverTrigger>
            <PopoverContent zIndex={4} width="5000px">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody><Text fontSize="xs">Emblem Vault is experimental. Before purchasing $COVAL or $FUEL tokens, you must ensure that the nature, complexity and risks inherent in the trading of cryptocurrency are suitable for your objectives in light of your circumstances and financial position. Emblem, Emblem Vault, $COVAL, and/or $FUEL shall be under no obligation to purchase or to broker the purchase back from you of your cryptocurrency in circumstances where there is no viable market for the purchase of the same. The products and services presented on this website may only be purchased in jurisdictions in which their marketing and distribution are authorized. Using or Creating Vaults is done at your own risk.</Text></PopoverBody>
            </PopoverContent>
          </Popover>
        </Stack>
        {useLayout? (
        <Stack
          position="absolute"
          bottom={1}
          right={1}
          p={isTestnet ? '1.5rem' : '1rem'}
          alignItems="flex-end"
          spacing="1rem"
        >
          <Button
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
        </Stack>
        ): null}
      </ColorBox>
    </>
  )
}
