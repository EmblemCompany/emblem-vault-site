import { JSBI, Fraction, Percent, Price, Token, WETH, ChainId } from '@uniswap/sdk'
import { UrlObject } from 'url'
import { isAddress, toWei, fromWei } from 'web3-utils'

import { isIPFS } from './constants'

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function shortenHex(hex: string, length = 4): string {
  return `${hex.substring(0, length + 2)}…${hex.substring(hex.length - length)}`
}

export const CHAIN_ID_NAMES: { [key: number]: string } = {
  0: 'Bitcoin',
  1: 'Ethereum Mainnet',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Görli',
  42: 'Kovan',
  80001: 'Mumbai',
  137: 'Polygon',
  97: 'bnbsc',
  100: 'xDai',
  56: 'Binance Smart Chain',
  250: 'Fantom',
  1313161554: 'Aurora'
}

export const INFURA_PREFIXES: { [key: number]: string } = {
  0: 'bitcoin',
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  5: 'goerli',
  42: 'kovan',
  80001: 'mumbai',
  137: 'matic',
  97: 'bnbsc',
  100: 'xdai',
  56: 'bsc',
  250: 'fantom',
  1313161554: 'aurora'
}

export enum ExplorerTXType {
  Account,
  TokenBalance,
  Transaction,
  Token
}

export const EXPLORER_PREFIXES: { [key: number]: string } = {
  1: 'etherscan.io',
  3: 'ropsten.etherscan.io',
  4: 'rinkeby.etherscan.io',
  5: 'goerli.',
  42: 'kovan.',
  80001: 'mumbai-explorer.matic.today',
  137: 'polygonscan.com',
  97: 'bnbsc',
  100: 'blockscout.com/xdai/mainnet',
  56: 'bscscan.com',
  250: 'ftmscan.com',
  1313161554: 'aurorascan.dev'
}

export const NETWORK_SHORTNAMES: { [key: number]: string } = {
  1: 'eth',
  3: 'ropsten',
  4: 'rinkeby',
  5: 'goerli',
  42: 'kovan',
  80001: 'mumbai',
  137: 'matic',
  97: 'bsctest',
  100: 'xdai',
  56: 'bsc',
  250: 'fantom',
  1313161554: 'aurora'
}

interface ExplorerTypeData {
  [ExplorerTXType.Account]: [number, string]
  [ExplorerTXType.TokenBalance]: [Token, string]
  [ExplorerTXType.Transaction]: [number, string]
  [ExplorerTXType.Token]: [number, string]
}

export function formatEtherscanLink(type: ExplorerTXType, data: ExplorerTypeData[ExplorerTXType]): string {
  switch (type) {
    case ExplorerTXType.Account: {
      const [chainId, address] = data as ExplorerTypeData[ExplorerTXType.Account]
      return `https://${EXPLORER_PREFIXES[chainId]}/address/${address}`
    }
    case ExplorerTXType.TokenBalance: {
      const [token, address] = data as ExplorerTypeData[ExplorerTXType.TokenBalance]
      return `https://${EXPLORER_PREFIXES[token.chainId]}/token/${token.address}?a=${address}`
    }
    case ExplorerTXType.Transaction: {
      const [chainId, hash] = data as ExplorerTypeData[ExplorerTXType.Transaction]
      return `https://${EXPLORER_PREFIXES[chainId]}/tx/${hash}`
    }
    case ExplorerTXType.Token: {
      const [chainId, hash] = data as ExplorerTypeData[ExplorerTXType.Transaction]
      return `https://${EXPLORER_PREFIXES[chainId]}/token/${hash}`
    }
  }
}

const SAI = new Token(ChainId.MAINNET, '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359', 18)
export function getTokenDisplayValue(token: Token): string {
  return token.equals(WETH[token.chainId]) ? 'ETH' : token.equals(SAI) ? 'SAI' : token.symbol ?? 'UNKNOWN'
}

export function getPercentChange(referenceRate: Price, newRate: Price, flipOrder = false): Percent {
  // calculate (referenceRate - newRate) / referenceRate or (newRate - referenceRate) / referenceRate
  const difference = new Fraction(
    flipOrder
      ? JSBI.subtract(
          JSBI.multiply(newRate.adjusted.numerator, referenceRate.adjusted.denominator),
          JSBI.multiply(referenceRate.adjusted.numerator, newRate.adjusted.denominator)
        )
      : JSBI.subtract(
          JSBI.multiply(referenceRate.adjusted.numerator, newRate.adjusted.denominator),
          JSBI.multiply(newRate.adjusted.numerator, referenceRate.adjusted.denominator)
        ),
    JSBI.multiply(referenceRate.adjusted.denominator, newRate.adjusted.denominator)
  )
  const percentChange = difference.multiply(referenceRate.adjusted.invert())
  return new Percent(percentChange.numerator, percentChange.denominator)
}

export function modifyUrlObjectForIPFS(
  url: string | UrlObject
): {
  href: UrlObject
  as: UrlObject
} {
  const parsedUrl = typeof url === 'string' ? { pathname: url } : url
  const { pathname, ...rest } = parsedUrl
  const modifiedPathname = pathname === '/' ? './' : `.${pathname}${isIPFS ? '.html' : ''}`

  return {
    href: parsedUrl,
    as: {
      ...rest,
      pathname: modifiedPathname,
    },
  }
}

export function validImage(data) {
  if (data && (data.includes('http') || data.includes('data:image'))) {
    return true
  } else {
    return false
  }
}

export function isETHAddress(address) {
  return isAddress(address)
}

export function toContractValue(amount, decimal) {
  return toWei(amount, decimal)
}

export function fromContractValue(amount, decimal) : number {
  return Number(fromWei(amount, decimal))
}
