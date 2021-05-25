import { ReactNode } from 'react'
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
import { Coval, CovalTest, CovalTestMatic, CovalMatic, CovalxDai, CovalBSC, CovalFantom, DEFAULT_TOKENS } from '../tokens'
import Head from 'next/head'

const Settings = dynamic(() => import('./Settings'))

export default function Layout({ children }: { children: ReactNode}): JSX.Element {
  const { chainId, account } = useWeb3React()
  const isTestnet = typeof chainId === 'number' && chainId !== 1

  const { isOpen: isOpenSettings, onOpen: onOpenSettings, onClose: onCloseSettings } = useDisclosure()

  const [firstToken] = useFirstToken()
  const [secondToken] = useSecondToken()
  const [showUSD, setShowUSD] = useShowUSD()

  const [transactions] = useTransactions()

  // automatically try connecting to the injected connector on pageload
  const triedToEagerConnect = useEagerConnect()

  const queryParameters = useQueryParameters()
  const requiredChainId = queryParameters[QueryParameters.CHAIN]

  const USDETHPrice = useUSDETHPrice()

  const showOrHideNavLink = (path: string)=> {
    return location.pathname.includes(path) ? 'none': 'block'
  }

  const handleNewNavigationClick = (path)=>{
    location.href = location.origin + '/'+path
  }
  
  const handleSearchClick = ()=>{
    let pieces = location.pathname.split('/')
    pieces.pop()
    location.href = location.origin + pieces.join('/') + '/search'
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
        borderWidth={isTestnet ? '.5rem' : '.5rem'}
        minHeight="100vh"
        maxHeight="100vh"
      >
        <Flex justifyContent="space-between" flexShrink={0} overflowX="auto" p="1rem">
          <Stack spacing={0} direction="row">
            <IconButton m={2} icon="settings" variant="ghost" onClick={onOpenSettings} aria-label="Settings" />
            <IconButton m={2} icon="search" variant="ghost" onClick={handleSearchClick} aria-label="Search" />
            <Button display={showOrHideNavLink('create')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('create')}}>
              Create
            </Button>
            <Button display={showOrHideNavLink('vaultlist')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('vaultlist')}}>
              My Vaults
            </Button>
            <Button display={showOrHideNavLink('featured')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('featured')}}>
              Featured
            </Button>
            <Button display={showOrHideNavLink('newest')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('newest')}}>
              Newest
            </Button>
            {/* <Button m={2} variant="ghost" onClick={handleNavigationclick}>
              {' '}
              {location.pathname.includes('vaultlist') ? 'Create' : 'Wallet (Vaults)'}
            </Button>
            <Button m={2} variant="ghost" onClick={handleNavigationFeaturedclick}>
              {' '}
              {location.pathname.includes('featured') ? 'Create' : 'Featured Vaults'}
            </Button>
            <Button m={2} variant="ghost" onClick={handleNavigationFeaturedclick}>
              {' '}
              {location.pathname.includes('featured') ? 'Create' : 'Featured Vaults'}
            </Button> */}
          </Stack>
          <Account triedToEagerConnect={triedToEagerConnect} />
        </Flex>

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
              chainId == 80001 ? CovalTestMatic : 
              chainId == 137 ? CovalMatic : 
              chainId == 100? CovalxDai : 
              chainId == 56 ? CovalBSC :
              chainId == 250 ? CovalFantom :
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

        <Flex flexGrow={1} direction="column" overflow="auto">
          {children}
        </Flex>

        <Flex minHeight="1.5rem">
          {typeof chainId === 'number' /*&& chainId !== 1*/ ? (
            <LightMode>
              <Link href="/swap">
                <Badge
                  variant="solid"
                  variantColor={
                    chainId == 137 || chainId == 1 ? 'blue' : 
                    chainId == Number(56) ? 'orange':
                    'orange'/*isTestnet ? 'blue' : undefined*/}
                  fontSize="1rem"
                  style={{ borderTopLeftRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }} >
                  On {CHAIN_ID_NAMES[chainId].toLowerCase()} (click to swap networks)
                  {/* (Swap to {chainId == 1 ? 'Matic' : 'Ethereum'}) */}
                </Badge>
              </Link>
            </LightMode>
          ):null}
        </Flex>

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
          {/* <Popover usePortal>
            <PopoverTrigger>
            <IconButton size="sm" icon="warning-2" aria-label=''/>
            </PopoverTrigger>
            <PopoverContent zIndex={4} width="5000px">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody><Text fontSize="xs">Emblem Vault is experimental. Before purchasing $COVAL or $FUEL tokens, you must ensure that the nature, complexity and risks inherent in the trading of cryptocurrency are suitable for your objectives in light of your circumstances and financial position. Emblem, Emblem Vault, $COVAL, and/or $FUEL shall be under no obligation to purchase or to broker the purchase back from you of your cryptocurrency in circumstances where there is no viable market for the purchase of the same. The products and services presented on this website may only be purchased in jurisdictions in which their marketing and distribution are authorized. Using or Creating Vaults is done at your own risk.</Text></PopoverBody>
            </PopoverContent>
          </Popover> */}
        </Stack>

        <Stack
          position="absolute"
          bottom={1}
          right={1}
          p={isTestnet ? '1.5rem' : '1rem'}
          alignItems="flex-end"
          spacing="1rem"
        >
          <Button
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
            Buy Coval
          </Button>
        </Stack>
      </ColorBox>
    </>
  )
}
