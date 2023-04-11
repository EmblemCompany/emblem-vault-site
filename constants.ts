import { JSBI } from '@uniswap/sdk'
import { abi as HandlerABI } from './abi/handler.json'
import { abi as SalesABI } from './abi/sales.json'
import { abi as CovalABI } from './abi/coval.json'
import { abi as EmblemABI } from './abi/emblem.json'
import { abi as NftradeABI } from './abi/nftrade.json'
import { abi as ClaimedABI } from './abi/claimed.json'
import { abi as VaultHandlerV8 } from './abi/VaultHandlerV8.json'
import { abi as ClonableFactory } from './abi/ClonableFactory.json'
import { abi as ERC20 } from './abi/ConfigurableERC20Upgradable.json'
import { abi as ERC721 } from './abi/EmblemVault.json'
import { abi as ERC1155 } from './abi/ERC1155Upgradable.json'
import xcpJson from './curated/xcp.json'

export const BG = { light: 'gray.50', dark: 'gray.900' }
export const COLOR = { light: 'black', dark: 'white' }

export const isIPFS = process.env.IPFS === 'true'
export const isServerSide = typeof window === 'undefined'
const { API_OVERLOAD } = process.env;

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

export const curatedContracts = [
  {
    name: "Rare Pepe",
    1: "0x7E6027a6A84fC1F6Db6782c523EFe62c923e46ff",
    "chain": "xcp"
  },
  {
    name: "Emblem Test",
    1: "0xdcFfa2b5cBf288932B009EBA01C8ca772ec6C993",
    "chain": "xcp"
  },
  {
    name: "Spells of Genesis",
    1: "0xDCA91409018ea80B71d21E818f00e76072969861",
    chain: "xcp"
  },
]
export const curatedAssets = {
  xcp: xcpJson
}
export const contractAddresses = {
  salesFactory: {
    1: '0xfb51bcd2644c20d87e17106c27355732fd485e4e'
  },
  salesAbi: SalesABI,
  vaultHandler: {
    // 1: '0x1ec6b294902d42fee964d29fa962e5976e71e67d',
    1: '0xD0C7304156AF0a4be17352D8ce214222Ec66E8ba',
    4: '0x63B1EB00de17Faf64b33649A5b7592543B010127',
    5: '0x0349E72c3BFc6232B12FD546a9f9CD1851dD5bDD',
    80001: '0x5434ba8b4A37755Cb3867C9fde39342C0D382857',
    137: '0xedb9e7d618dddc081bd56014ea3842c67628b015',
    100: '0x6e02D718C08b9EBd971B4788fF30308cC997E2Ef',
    56: '0x34761221dBC6bE70A4f88E2077765dB8F14A1007',
    250: '0x27B08ADcA39a684961e2cD289f0bEA893eDF0772',
    1337: '0xe70AbBc99D8eB32124BF022196c493DB4fBc50FD',
    1313161554: '0x793F3cF97c57798732f3AA36416CaC742223aB20',
  },
  vaultHandlerAbi: HandlerABI,
  emblemVault: {
    1: '0x82c7a8f707110f5fbb16184a5933e9f78a34c6ab',
    4: '0xe70AbBc99D8eB32124BF022196c493DB4fBc50FD',
    80001: '0x8b8407c6184f1f0Fd1082e83d6A3b8349cAcEd12',
    137: '0x8b8407c6184f1f0Fd1082e83d6A3b8349cAcEd12',
    100: '0x9058d1A5Fdba852403D5b080abAF31D1379EF653',
    56: '0x9523022eb4B465Db3e3037d83e4910E3cFF1bD49',
    250: '0x5434ba8b4A37755Cb3867C9fde39342C0D382857',
    1337: '0xe70AbBc99D8eB32124BF022196c493DB4fBc50FD',
    1313161554: '0x14509fCc07892E80eD6BE4cf171407d206A92164',
  },
  emblemAbi: EmblemABI,
  coval: {
    1: '0x3d658390460295fb963f54dc0899cfb1c30776df',
    4: '0x44c1a9d7D1F932B4c2811A70eDfFDD6Ae2EB60e6',
    5: '0x44aA2ae6a29A1434942EB88cB2eD0Fd1De30de83',
    80001: '0x5cCa9D75DF2dFC117855adD4DD45727dee5287EC',
    137: '0x4597c8A59Ab28B36840B82B3A674994A279593D0',
    100: '0x8b8407c6184f1f0Fd1082e83d6A3b8349cAcEd12',
    56: '0xd15CeE1DEaFBad6C0B3Fd7489677Cc102B141464',
    250: '0x8b8407c6184f1f0Fd1082e83d6A3b8349cAcEd12',
    1337: '0xe70AbBc99D8eB32124BF022196c493DB4fBc50FD',
    1313161554: '0x584039B84b1d36653DAb76DC1246D07b08218706'
  },
  covalAbi: CovalABI,
  nftrade: {
    137: '0x88f5Cc3624247477bE5f691648A7D1B2631965B9'
  },
  nftradeAbi: NftradeABI,
  claimed: {
    1: '0xb8D6eB76dABea5b238e999B3145775E54412B2D2',
    1313161554: '0xE1213fcb2a085B6d26C52f9D8fEc54f0758Fd7b1',
    5: '0x1342F91DC53B6D222614Ad1f981b5683d4653116'
  },
  claimedAbi: ClaimedABI,
  vaultHandlerV8: {
    1: "0xF314Fa957255AD6Ba189A641e6086C81385040fb",
    4: "0xF2eCdFa77C3c8Cabf913529D95081DCB2DE314ec",
    5: '0xc15235d210c1b1CdA8643a5eA37687E241B031b0',
    1337: "0xfc3A4BBfD522668342bCaDf273a94A46DCe25439",
    1313161554: '0xeDb2AC2BfD8d026E4d6C75a04548423936512135',
  },
  vaultHandlerV8Abi: VaultHandlerV8,
  clonableFactoryAbi: ClonableFactory,
  erc20Abi: ERC20,
  erc721Abi: ERC721,
  erc1155Abi: ERC1155
}

export const BURN_ADDRESS = '0x5D152dd902CC9198B97E5b6Cf5fc23a8e4330180'
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"
export const EMBLEM_API = API_OVERLOAD? API_OVERLOAD : 'https://api2.emblemvault.io' //'http://localhost:3001' // 
export const SIG_API = 'https://tor-us-signer-coval.vercel.app' //'http://localhost:3002' //

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
