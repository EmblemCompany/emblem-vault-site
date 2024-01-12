import { JSBI, Fraction, Percent, Price, Token, WETH, ChainId } from '@uniswap/sdk'
import { UrlObject } from 'url'
import { isAddress, toWei, fromWei } from 'web3-utils'

import { EMBLEM_V2_API, isIPFS } from './constants'
import xcpJson from './curated/xcp.json'
let NFT_DATA = {}
Object.keys(xcpJson).forEach(item=>{xcpJson[item].forEach(i=>{i.projectName = item; NFT_DATA[i.name] = i})}) // convert json to match server

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


export let newCuratedContracts = [] //: any[]

export async function initCuratedContracts() {
  newCuratedContracts = await setupCuratedTemplates()
  return newCuratedContracts
}

async function setupCuratedTemplates() {
  let records = await getCuratedCollectionDataFromDB()
  return records.map((record: any) => {
      let template: any = generateTemplate(record);
      Object.keys(template).forEach(key => {
          if (key != 'id' && key != 'created_at' && key != 'contracts' && key != 'imageHandler' && key != 'placeholderImages' && key != 'loadingImages' )
          record[key] = template[key];
      });
      return record;
  });
}

function generateTemplate(record: any) {
  let addressChain = record.addressChain
  let attributes = generateAttributeTemplate(record)
  let imageMethods = generateImageTemplate(record)
  let recordName = record.name
  let balanceQty = record.balanceQty
  let template: any = {
      attributes,
      allowed: (data: any[], _this: any, msgCallback: any = null) => {
          let allowed = false
          if (recordName == "Cursed Ordinal") {
              allowed = data ? data[0].content_type != "application/json" : false
          } else if(recordName == "Ethscription") {
              allowed = data? true: false
          } else if(recordName == "$OXBT" || recordName == "$ORDI") {
              if (data[0].balance == balanceQty) {
                  msgCallback ? msgCallback("") : null
                  allowed = true
              } else if (data[0].balance != balanceQty && msgCallback) {
                  msgCallback ? msgCallback(`Load vault with exactly ${balanceQty} ${recordName}`) : null
                  allowed = false
              }
          } else if (recordName == "Counterparty") {
            let facts = [
              { eval: record.nativeAssets.includes(data[0]?.coin), msg: `Vaults should only contain assets native to ${recordName}` },
              { eval: data.length == 1, msg: `Vaults should only contain a single item` }
            ]
            allowed = evaluateFacts(allowed, facts, msgCallback)
          } else if (recordName == "Stamps") {
            allowed = record.nativeAssets.includes(data[0].coin) && (recordName.toLowerCase() == data[0].project.toLowerCase() || data[0].project.toLowerCase() == "stampunks")
          } else if (recordName == "EmblemOpen") {
            allowed = data? true: false
          } else if (recordName == "Bells") {
            allowed = data[0].name == "Bel" && data[0].balance > 0 && Number.isInteger(data[0].balance)
          } else if (recordName == "Namecoin") {
            allowed = data && record.nativeAssets.includes(data[0].coin) ? true: false
          } else { // XCP
            allowed = data[0].project == _this.name && data[0].balance == 1;
          }
          return allowed
      },
      allowedName: (asset: any, msgCallback: any = null) => {
          let allowedName = false
          if (recordName == "Cursed Ordinal") {
              let pieces = asset.split(' ')
              allowedName = asset.includes(recordName) && pieces.length === 3 && Number(pieces.reverse()[0]) < 0
          } else if(recordName == "Ethscription") {
              if (asset) {
                  allowedName = true
              }
          } else if(recordName == "$OXBT" || recordName == "$ORDI") {
              if (asset == `${balanceQty} ${recordName}`) {
                  allowedName = true
              } else {
                  msgCallback ? msgCallback("Incorrect Asset Or Qty In Vault") : null
                  allowedName = false
              }
          } else if (recordName == "Counterparty") {
            allowedName = asset? true: false
          } else if (recordName == "Stamps") {
            allowedName = asset && asset.toLowerCase().includes("stamp")? true: false
          } else if (recordName == "EmblemOpen") {
            allowedName = asset? true: false
          } else if (recordName == "Bells") {
            allowedName = asset ? true : false
          } else if (recordName == "Namecoin") {
            allowedName = asset ? true : false
          } else { // XCP
            let curatedItemFound = NFT_DATA[asset];
            allowedName = asset && curatedItemFound ? true : false;
          }
          
          return allowedName
      },
      allowedJump: (ownership_balances: any, _this: any): boolean => {
          let hasAnyBalance = ownership_balances && ownership_balances.status != "claimed"
          let allowedJump = false
          if (hasAnyBalance && recordName != "Rinkeby") {
              let filteredBalances = _this.filterNativeBalances(ownership_balances, _this)
              // single
              if (filteredBalances.length == 1) {
                  allowedJump = _this.allowed(filteredBalances[0], _this)
              } else {
                  allowedJump = false
              }
          }
          return allowedJump
      },
      allowedNetwork: (fromNetwork: any, toNetwork: any, msgCallback: any = null) => {
          return fromNetwork == toNetwork // don't allow cross chain
      },
      filterNativeBalances: (balance: any, _this: any): any => {
          let filtered =  balance.balances.filter((item: { name: any; }) => !_this.nativeAssets.includes(item.name));
          return filtered
      },
      address: (addresses: any[]) => {
          return addresses.filter(item => { return item.coin === addressChain })[0].address
      },
      addresses: (addresses: any[], _this: any) => {
          return _this.nativeAssets.includes("*")? addresses: addresses.filter(item=> { return item.coin === addressChain})
      },
      balanceExplorer(address: string) {
          return `https://xchain.io/address/${address}`
      },
      generateName: (balance: any, _this: any, msgCallback: any) => {
          let name = balance&& balance.length > 0 && _this.filterNativeBalances? _this.filterNativeBalances({balances: balance}, _this)[0].name: ()=>{msgCallback("No Minting Asset Found (Loading...)"); return false}
          return name
      }
  }
  Object.keys(record.contracts).forEach(key => {
      template[key] = record.contracts[key]
  })
  Object.keys(imageMethods).forEach(key => {
      template[key] = imageMethods[key]
  })
  return template

  function evaluateFacts(allowed: boolean, facts: { eval: any; msg: string }[], msgCallback: any) {
    let reasons = []
    allowed = facts.every(fact => {
      if (!fact.eval) {
        reasons.push(fact.msg)
      }
      return fact.eval
    })
    if (reasons.length > 0 && msgCallback) {
      msgCallback(reasons.join(' '))
    }
    return allowed
  }
}

function generateAttributeTemplate(record: any) {
  let template: any = []
  if (record.name == "Rare Pepe" || 
      record.name == "Fake Rares" || 
      record.name == "Dank Rares" || 
      record.name == "Fake Commons" || 
      record.name == "Age of Rust" || 
      record.name == "Age of Chains" || 
      record.name == "Bitcorn Crops" || 
      record.name == "Bitgirls" || 
      record.name == "Force of Will" || 
      record.name == "Memorychain" || 
      record.name == "Oasis Mining" || 
      record.name == "Sarutobi Island" || 
      record.name == "Spells of Genesis"
  ) {
      template = [
          {
              "trait_type": "Series",
              "value": (metadata: any) => {
                  return pad(NFT_DATA[metadata.targetAsset.name].series, 2).toString()
              }
          },
          {
              "trait_type": "Card",
              "value": (metadata: any) => {
                  return pad(NFT_DATA[metadata.targetAsset.name].order, 2).toString()
              }
          },
          {
              "trait_type": "Total Supply",
              "value": (metadata: any) => {
                  return pad(NFT_DATA[metadata.targetAsset.name].remaining || NFT_DATA[metadata.targetAsset.name].raw.supply, 2).toString()
              }
          },
          {
              "trait_type": "Artist",
              "value": (metadata: any) => {
                  return pad(NFT_DATA[metadata.targetAsset.name].raw.artist.name, 2).toString();
              }
          }
      ]
      if (record.name == "Rare Pepe") {
          template.push({
              "trait_type": "Year",
              "value": (metadata: any) => {
                  return (
                      NFT_DATA[metadata.targetAsset.name].series < 10 ? '2016' :
                          NFT_DATA[metadata.targetAsset.name].series > 9 &&
                              NFT_DATA[metadata.targetAsset.name].series < 31 ? '2017' :
                              '2018'
                  )
              }
          })
      }
  } else if (record.name == "Cursed Ordinal") {
      template = [
          {
              "trait_type": "Content Type",
              "value": (metadata: any) => {
                  return metadata.values[0].content_type
              }
          },
          {
              "trait_type": "Ordinal Number",
              "value": (metadata: any) => {
                  return metadata.values[0].name.includes("Cursed Ordinal") ? metadata.values[0].name.replace('Cursed Ordinal', '').trim() : false;
              }
          },
          {
              "trait_type": "Collection",
              "value": (metadata: any) => {
                  return metadata.values[0].name.includes("Cursed Ordinal") ? false : `All:${metadata.values[0].project}`;
              }
          },
          {
              "trait_type": "Artist",
              "value": (metadata: any) => {
                  let foundArtistTrait = metadata.values.length > 0 && metadata.values[0].traits ? metadata.values[0].traits.filter((item: { trait_type: string; }) => { return item.trait_type === "artist"; }) : [];
                  return foundArtistTrait.length > 0 ? foundArtistTrait[0].value : false;
              }
          }
      ]
  } else if (record.name == "Ethscription") {
      template = [
          {
              "trait_type": "Collection",
              "value": (metadata: any) => {
                  return metadata.values[0].project ? `${metadata.values[0].project}` : false;
              }
          },
          {
              "trait_type": "Ethscriptions",
              "value": (metadata: any) => {
                  let foundTrait = metadata.values && metadata.values.length > 0 && metadata.values[0].traits && metadata.values[0].traits.length > 0 && metadata.values[0].traits.filter((item: { trait_type: string; }) => { return item.trait_type == "Ethscriptions" }).length > 0 ? metadata.values[0].traits.filter((item: { trait_type: string; }) => { return item.trait_type == "Ethscriptions" })[0].value : false
                  return foundTrait
              }
          }
      ]
  }
  return template
}

function generateImageTemplate(record: any) {
  let template: any = {}
  if (record.imageHandler) {
      template.image = (data: any) => {
          return `${record.image}`
      }
  }
  if (record.loadingImages) {
      template.loading = () => {
          let images = record.loadingImages
          return images[Math.floor(Math.random() * images.length)] // Random image
      }
  } if (record.placeholderImages) {
      template.placeholder = () => {
          let images = record.placeholderImages
          return images[Math.floor(Math.random() * images.length)] // Random image
      }
  }
  return template
}

function pad(num: string | any[], size: number) { 
  if (!num)
        return '';
  num = num.toString(); 
  while (num.length < size) num = "0" + num; 
  return num; 
}

async function getCuratedCollectionDataFromDB() {
  const response = await fetch(EMBLEM_V2_API + '/curated' , {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    next: { revalidate: 13600 }
  })  
  const jsonData = await response.json()
  return jsonData
}
