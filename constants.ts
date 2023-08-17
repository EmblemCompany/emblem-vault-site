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
import { abi as ERC721a } from './abi/erc721aAbi.json'
import { abi as mintVaultQuoteAbi } from './abi/mintVaultQuoteAbi.json'
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
    "chain": "xcp",
    mintable: true,
    collectionType: "ERC1155",
    loadTypes: ['select'],
    description: "This Curated Emblem Vault contains 1 Rare Pepe NFT that was minted on Bitcoin using the Counterparty protocol. Rare Pepes is a collection of 1,774 unique cards with varying designs and rarities that were created by more than 300 artists from 2016 to 2018. ",
    purchaseMethod: 'buyWithQuote',
    showBalance: false,
    price: 20000000,
    attributes: [],
    allowed: (data: any) => {
      return true
    },
    allowedName: (asset: any) => {
      let curatedItemFound = xcpJson["Rare Pepe"].filter(item => { return item.name == asset })
      return asset && curatedItemFound.length > 0
    },
    address: (addresses: any[]) => {
      return addresses.filter(item => { return item.coin === "BTC" })[0].address
    },
    addresses: (addresses: any[]) => {
      return addresses.filter(item => { return item.coin === "BTC" })
    }
  },
  {
    name: "Emblem Test",
    1: "0xdcFfa2b5cBf288932B009EBA01C8ca772ec6C993",
    5: "0xa7428f3b7752F006890E12F055b0A816F0F18CdD",
    "chain": "xcp",
    mintable: true,
    collectionType: "ERC1155",
    loadTypes: ['select'],
    description: "Created by Pepe artists Oliver Morris and Zoe Davies, the Emblem Test series of four cards—COMMON, RARE, LEGEND, and EPIC—were made to test Emblem Vault's new curated collection (ERC-1155) contracts. The cards were free and airdropped to Emblem Vault followers in December 2022",
    purchaseMethod: 'buyWithQuote',
    showBalance: false,
    price: 20000000,
    attributes: [

    ]
  },
  {
    name: "Spells of Genesis",
    1: "0xDCA91409018ea80B71d21E818f00e76072969861",
    chain: "xcp",
    mintable: false,
    collectionType: "ERC1155",
    loadTypes: ['select'],
    description: "",
    purchaseMethod: 'buyWithQuote',
    showBalance: false
  },
  {
    name: "Cursed Ordinal",
    1: "0x769Fdf030A9e176EC8B6D66EFdCB63e8fA69885c",
    chain: "cursedordinalsbtc",
    mintable: true,
    collectionType: "ERC721",
    loadTypes: ['input', 'empty'],
    description: `Cursed Ordinals are a collection of unindexed or "bugged" Ordinals not included initially in the Ord Client. \n\nWARNING: The inscription number of this Cursed Ordinal may change. Emblem Vault's dynamic vaults will update the metadata of this vault whenever a new Ord Client upgrade is posted and implemented.`,
    purchaseMethod: 'buyWithQuote',
    showBalance: true,
    balanceUrl: "https://serverless-cursed-ordinals.vercel.app/cursedordinalsbtc/balance/",
    price: 20000000,
    attributes: [
      {
        "trait_type": "Content Type",
        "value": (metadata: MetaData) => {
          return metadata.values[0].content_type
        }
      },
      {
        "trait_type": "Ordinal Number",
        "value": (metadata: MetaData) => {
          return metadata.values[0].name.includes("Cursed Ordinal") ? metadata.values[0].name.replace('Cursed Ordinal', '').trim() : false;
        }
      },
      {
        "trait_type": "Collection",
        "value": (metadata: MetaData) => {
          return metadata.values[0].name.includes("Cursed Ordinal") ? false : `All:${metadata.values[0].project}`;
        }
      },
      {
        "trait_type": "Artist",
        "value": (metadata: MetaData) => {
          let foundArtistTrait = metadata.values.length > 0 && metadata.values[0].traits ? metadata.values[0].traits.filter((item: { trait_type: string; }) => { return item.trait_type === "artist"; }) : [];
          return foundArtistTrait.length > 0 ? foundArtistTrait[0].value : false;
        }
      }
    ],
    image: (data: any) => {
      return `https://image-scaler.vercel.app/image?url=https://cursedordinals.com/content/${data.inscription_id}?size=400`
    },
    loading: () => {
      let images = [
        "https://emblem.finance/ord-loading1.png",
        "https://emblem.finance/ord-loading2.png"
      ]
      return images[Math.floor(Math.random() * images.length)] // Random image
    },
    placeholder: () => {
      let images = [
        "https://emblem.finance/ord-error1.png",
        "https://emblem.finance/ord-error2.png",
        "https://emblem.finance/ord-error3.png",
        "https://emblem.finance/ord-error4.png",
        "https://emblem.finance/ord-error5.png",
        "https://emblem.finance/ord-error6.png"
      ]
      return images[Math.floor(Math.random() * images.length)] // Random image
    },
    allowed: (data: any) => {
      return data ? data.content_type != "application/json" : false
    },
    allowedName: (asset: any) => {
      let pieces = asset.split(' ')
      return asset.includes("Cursed Ordinal") && pieces.length === 3 && Number(pieces.reverse()[0]) < 0
    },
    address: (addresses: any[]) => {
      return addresses.filter(item => { return item.coin === "TAP" })[0].address
    },
    addresses: (addresses: any[]) => {
      return addresses.filter(item => { return item.coin === "TAP" })
    }
  },
  {
    1: "0x8C3c0274c33f263F0A55d129cFC8eaa3667A9E8b",
    name: "Ethscription",    
    chain: "ethscription",
    mintable: true,
    collectionType: "ERC721",
    loadTypes: ['empty'],
    description: `Ethscriptions are on-chain digital artifacts stored on the Ethereum blockchain using transaction calldata. LFG!`,
    purchaseMethod: 'buyWithQuote',
    showBalance: true,
    balanceUrl: "https://serverless-ethscriptions.vercel.app/ethscription/balance/",
    price: 20000000,
    attributes: [
      {
        "trait_type": "Collection",
        "value": (metadata: MetaData) => {
          return metadata.values[0].project ? `${metadata.values[0].project}` : false;
        }
      },
      {
        "trait_type": "Ethscriptions",
        "value": (metadata: MetaData) => {
          let foundTrait = metadata.values && metadata.values.length > 0 && metadata.values[0].traits && metadata.values[0].traits.length > 0 && metadata.values[0].traits.filter((item: { trait_type: string; }) => { return item.trait_type == "Ethscriptions" }).length > 0 ? metadata.values[0].traits.filter((item: { trait_type: string; }) => { return item.trait_type == "Ethscriptions" })[0].value : false
          return foundTrait
        }
      }
    ],
    image: (data: any) => {
      return `https://image-scaler.vercel.app/image?url=https://serverless-ethscriptions.vercel.app/ethscription/image/mainnet/${data.transaction_hash}`
    },
    loading: () => {
      let images = [
        "https://emblem.finance/ethscriptions-loading-1.png",
        "https://emblem.finance/ethscriptions-loading-2.png",
        "https://emblem.finance/ethscriptions-loading-3.png",
      ]
      return images[Math.floor(Math.random() * images.length)] // Random image
    },
    placeholder: () => {
      let images: any[] = []
      return images[Math.floor(Math.random() * images.length)] // Random image
    },
    allowed: (data: any) => {
      return true
    },
    allowedName: (asset: any) => {
      let pieces = asset.split(' ')
      return true
    },
    address: (addresses: any[]) => {
      return addresses.filter(item => { return item.coin === "ETH" })[0].address
    },
    addresses: (addresses: any[]) => {
      return addresses.filter(item => { return item.coin === "ETH" })
    }
  },
  {
    1: "0x363D0C12eDCAF2C5962110401f651491f58C760a",
    name: "$OXBT",    
    chain: "oxbt",
    mintable: true,
    collectionType: "ERC721a",
    loadTypes: ['empty'],
    description: `$OXBT is a BRC-20 utility token used to enable artists, creators, & builders on Bitcoin.`,
    purchaseMethod: 'buyWithQuote',
    showBalance: true,
    balanceUrl: "https://serverless-brc20.vercel.app/brc20/balance/oxbt/",
    price: 20000000,
    attributes: [
    ],
    image: (data: any) => {
      return `https://emblem.pro/oxbt.png`
    },
    loading: () => {
      let images = [
        "https://emblem.finance/oxbt-loading-1.png",
      ]
      return images[Math.floor(Math.random() * images.length)] // Random image
    },
    placeholder: () => {
      let images: any[] = []
      return images[Math.floor(Math.random() * images.length)] // Random image
    },
    allowed: (data, msgCallback = null) => {
      if (data.balance == 2000) {
          msgCallback? msgCallback(""): null
          return true;
      }
      else if (data.balance != 2000 && msgCallback) {
          msgCallback? msgCallback("Load vault with exactly 2000 $OXBT"): null
      }
      return false;
  },
  allowedName: (asset, msgCallback = null) => {
      if (asset == "2000 $OXBT" || asset.includes("$OXBT")) {
          return true;
      }
      msgCallback? msgCallback("Incorrect Asset In Vault"): null
      return false;
  },
    address: (addresses: any[]) => {
      return addresses.filter(item => { return item.coin === "TAP" })[0].address
    },
    addresses: (addresses: any[]) => {
      return addresses.filter(item => { return item.coin === "TAP" })
    }
  },
  {
    1: "0x49aCD1b04702a30fb2cE8522298c299527E31913",
    name: "$ORDI",    
    chain: "ordi",
    mintable: true,
    collectionType: "ERC721a",
    loadTypes: ['empty'],
    description: `Ordi is the first brc-20, an experiment into fungibility on Bitcoin utilizing ordinal theory and inscriptions.`,
    purchaseMethod: 'buyWithQuote',
    showBalance: true,
    balanceUrl: "https://serverless-brc20.vercel.app/brc20/balance/ordi/",
    price: 20000000,
    attributes: [
    ],
    image: (data: any) => {
      return `https://emblem.pro/ordi.png`
    },
    loading: () => {
      let images = [
        "https://emblem.finance/ordi-loading-1.png",
      ]
      return images[Math.floor(Math.random() * images.length)] // Random image
    },
    placeholder: () => {
      let images: any[] = []
      return images[Math.floor(Math.random() * images.length)] // Random image
    },
    allowed: (data, msgCallback = null) => {
      if (data.balance == 200) {
          msgCallback? msgCallback(""): null
          return true;
      }
      else if (data.balance != 200 && msgCallback) {
          msgCallback? msgCallback("Load vault with exactly 200 $ORDI"): null
      }
      return false;
  },
  allowedName: (asset, msgCallback = null) => {
      if (asset == "200 $ORDI") {
          return true;
      }
      msgCallback? msgCallback("Incorrect Asset In Vault"): null
      return false;
  },
    address: (addresses: any[]) => {
      return addresses.filter(item => { return item.coin === "TAP" })[0].address
    },
    addresses: (addresses: any[]) => {
      return addresses.filter(item => { return item.coin === "TAP" })
    }
  },
  {
    1: "0x9885d3F9b3B71A1Ff69D6a8B4AC87426A60F993d",
    name: "Rinkeby",    
    chain: "rinkeby",
    mintable: false,
    collectionType: "ERC721a",
    loadTypes: ['empty'],
    description: `Vaults migrated from Rinkeby testnet.`,
    purchaseMethod: 'buyWithQuote',
    showBalance: true,
    balanceUrl: "https://serverless-brc20.vercel.app/brc20/balance/ordi/",
    price: 20000000,
    attributes: [
    ],
    image: (data: any) => {
      return `https://raw.githubusercontent.com/DecentricCorp/DecentricAssets/master/emblem/icons/App/512x512.png`
    },
    loading: () => {
      let images = [
        "https://raw.githubusercontent.com/DecentricCorp/DecentricAssets/master/emblem/icons/App/512x512.png",
      ]
      return images[Math.floor(Math.random() * images.length)] // Random image
    },
    placeholder: () => {
      let images: any[] = []
      return images[Math.floor(Math.random() * images.length)] // Random image
    },
    allowed: (data: any, msgCallback: any=null) => {        
      return Object.keys(data).length > 0
    },
    allowedName: (asset: any, msgCallback: any=null) => {
      return asset !== undefined
    },
    allowedJump: (ownership_balances: any, hops: any[] = []): boolean => {
      if (ownership_balances.status != "claimed" && ownership_balances.length > 0 && ownership_balances[0].balances) {
          let foundBalance = ownership_balances[0].balances.filter((item: { coin: string; })=>{return item.coin == "RINKEBY"})
          if (foundBalance.length > 0) {
              return true
          }
          for (const balance of ownership_balances[0].balances) {
              if (balance.balances && balance.balances.some((item: any) => item.coin === "RINKEBY")) {
                  return true;
              }
          }
      } else if (ownership_balances.status != "claimed" && ownership_balances.network && ownership_balances.network == "rinkeby") {
        return true
      }
    
      // Hops logic to check if tokenId has migrated (ownership_balances)
      // TODO: Implement the hops logic here
      // if from legacy do not check legacy claimed
      
      return false; // Return false if none of the conditions are met
    },    
    address: (addresses: any[]) => {
      return addresses[0].address
    },
    addresses: (addresses: any[]) => {
      return addresses
    }
  }
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
    137: '0x322ad0007ff961f253d3818c61d912c89752ec3e',
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
    137: '0x62C505E51800901f4B44Ff1f6eD5348c36D37E28',
    1313161554: '0xE1213fcb2a085B6d26C52f9D8fEc54f0758Fd7b1',
    5: '0x1342F91DC53B6D222614Ad1f981b5683d4653116'
  },
  claimedAbi: ClaimedABI,
  vaultHandlerV8: {
    1: "0x23859b51117dbFBcdEf5b757028B18d7759a4460",
    4: "0xF2eCdFa77C3c8Cabf913529D95081DCB2DE314ec",
    5: '0xc15235d210c1b1CdA8643a5eA37687E241B031b0',
    1337: "0xfc3A4BBfD522668342bCaDf273a94A46DCe25439",
    1313161554: '0xeDb2AC2BfD8d026E4d6C75a04548423936512135',
  },
  vaultHandlerV8Abi: VaultHandlerV8,
  clonableFactoryAbi: ClonableFactory,
  erc20Abi: ERC20,
  erc721Abi: ERC721,
  erc1155Abi: ERC1155,
  mintVaultQuote: {
    1: "0xE5dec92911c78069d727a67C85936EDDbc9B02Cf"
  },
  mintVaultQuoteAbi: mintVaultQuoteAbi,
  erc721aAbi: ERC721a,
}

export const BURN_ADDRESS = '0x5D152dd902CC9198B97E5b6Cf5fc23a8e4330180'
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"
export const EMBLEM_API = API_OVERLOAD? API_OVERLOAD : 'https://api2.emblemvault.io' //'http://localhost:3001' // 
export const EMBLEM_V2_API =  'https://v2.emblemvault.io' // 'http://localhost:3001' //
export const SIG_API = 'https://tor-us-signer-coval.vercel.app' //'http://localhost:3002' //
export const ORD_API = 'https://api-ord.emblemvault.io/bitcoin/'

export enum QueryParameters {
  INPUT = 'input',
  OUTPUT = 'output',
  CHAIN = 'chain',
}

interface MetaData {
  collection_name?: string;
  animation_url?: any;
  _id?: any;
  name?: any;
  ipfs?: any;
  tokenId?: any;
  description?: any;
  image?: any;
  image_ipfs?: any;
  ownedImage?: any;
  addresses?: any;
  network?: any;
  attributes?: any[];
  values?: any;
  totalValue?: number;
  private?: boolean;
  external_url?: string;
  status?: string;
  claimedBy?: string;
  youtube_url?: string;
  ciphertextV2?: string;
  live?: boolean;
  nonce?: number;
  signature?: string;
  to?: string,
  is_dynamic?: boolean,
  platform?: string,
  curation_status?: string,
  origDescription?: string,
  sealed?: boolean,
  collectionAddress?: string,
  targetAsset?: any,
  targetContract?: any,
  mintLocked?: boolean,
  mintLockBlock?: number,
  curatedIds?: any,
  ownedBy?: string,
  fraud?: boolean,
  batchId?: number;
  batch_index?: number;
  success?: boolean,
  coverImage?: string,
  move_targetContract?: any,
  move_targetAsset?: any,
  project?: any,
  background_color?: string,
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
