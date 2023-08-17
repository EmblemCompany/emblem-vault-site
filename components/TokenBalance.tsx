import { Suspense } from 'react'
import { Button, Text, IconButton, useColorMode } from '@chakra-ui/react'
import { useWeb3React} from '@web3-react/core'
import { addTokenToWallet } from '../public/web3'
import { Token, TokenAmount } from '@uniswap/sdk'
import { formatEtherscanLink, ExplorerTXType } from '../utils'
import { BG } from '../constants'
import { useTokenBalance } from '../data'
import TokenLogo from './TokenLogo'
import ErrorBoundary from './ErrorBoundary'
import { useShowUSD } from '../context'
import { useUSDTokenPrice } from '../hooks'

function Balance({ token }: { token: Token }): JSX.Element {
  const { colorMode } = useColorMode()
  const { account} = useWeb3React()
  const { data } = useTokenBalance(token, account, true)
  const [showUSD] = useShowUSD()
  const USDTokenPrice = useUSDTokenPrice(token)

  return (
    <Button
      as="a"
      rightIcon="external-link"
      variant="outline"
      backgroundColor={BG[colorMode]}
      onClick={() => {
        let tokenInfo = JSON.parse(JSON.stringify(token))
        tokenInfo.image ="https://raw.githubusercontent.com/EmblemCompany/Coval-Site/master/public/coval-logo.png"// "https://circuitsofvalue.com/public/coval-logo.png"
        addTokenToWallet(tokenInfo)
      }}
      {...{
        //href: formatEtherscanLink(ExplorerTXType.TokenBalance, [token, account as string]),
        target: '_blank',
        rel: 'noopener noreferrer',
      }}
    >
      <TokenLogo token={token} size="1.5rem" />
      <Text ml="0.5rem">
        {showUSD && USDTokenPrice
          ? `$${(data as TokenAmount).multiply(USDTokenPrice).toFixed(2, { groupSeparator: ',' })}`
          : (data as TokenAmount).toSignificant(6, { groupSeparator: ',' })}
      </Text>
    </Button>
  )  
}



export default function TokenBalance({ token }: { token: Token }): JSX.Element {
  const { colorMode } = useColorMode()
  return (
    <ErrorBoundary
      fallback={
        <IconButton
          variant="outline"
          backgroundColor={BG[colorMode]}
          icon="warning"
          aria-label="Failed"
          isDisabled
          cursor="default !important"
          _hover={{}}
          _active={{}}
        />
      }
    >
      <Suspense
        fallback={
          <Button
            variant="outline"
            backgroundColor={BG[colorMode]}
            isLoading
            cursor="default !important"
            _hover={{}}
            _active={{}}
          >
            {null}
          </Button>
        }
      >
        <Balance token={token} />
      </Suspense>
    </ErrorBoundary>
  )
}
