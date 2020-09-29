import { JSBI } from '@uniswap/sdk'
import { abi as HandlerABI } from './abi/handler.json'
import { abi as CovalABI } from './abi/coval.json'
import { abi as EmblemABI } from './abi/emblem.json'

export const BG = { light: 'gray.50', dark: 'gray.900' }
export const COLOR = { light: 'black', dark: 'white' }

export const isIPFS = process.env.IPFS === 'true'
export const isServerSide = typeof window === 'undefined'

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export const DEFAULT_APPROVE_MAX = true
export const DEFAULT_DEADLINE = 60 * 20
export const DEFAULT_SLIPPAGE = 50

export const GAS_LIMIT_WHEN_MOCKING = 500000

// https://uniswap.org/docs/v2/smart-contracts/router02/
export const ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
// https://github.com/NoahZinsmeister/permit-and-call
export const PERMIT_AND_CALL_ADDRESS = '0xe334094985bB046B95550793EA577F8DC4e6112B'
export const ZERO = JSBI.BigInt(0)
export const MAX_UINT256 = JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

export const contractAddresses = {
  vaultHandler: {
    1: '0x26C40CE48EE3fc0B2d3C07eA7a64479F3B34F428',
    4: '0xb03D438771478e22a177df6595b287b2D20f7c52',
    80001: '0x5434ba8b4A37755Cb3867C9fde39342C0D382857',
  },
  vaultHandlerAbi: HandlerABI,
  emblemVault: {
    1: '0x82c7a8f707110f5fbb16184a5933e9f78a34c6ab',
    4: '0xe70AbBc99D8eB32124BF022196c493DB4fBc50FD',
    80001: '0x8b8407c6184f1f0Fd1082e83d6A3b8349cAcEd12',
  },
  emblemAbi: EmblemABI,
  coval: {
    1: '0x3d658390460295fb963f54dc0899cfb1c30776df',
    4: '0x44c1a9d7d1f932b4c2811a70edffdd6ae2eb60e6',
    80001: '0x5cCa9D75DF2dFC117855adD4DD45727dee5287EC',
  },
  covalAbi: CovalABI,
}

export const BURN_ADDRESS = '0x5D152dd902CC9198B97E5b6Cf5fc23a8e4330180'

export const EMBLEM_API = 'https://api.emblemvault.io'

export enum QueryParameters {
  INPUT = 'input',
  OUTPUT = 'output',
  CHAIN = 'chain',
}

export const ERC20_BYTES32 = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
]
