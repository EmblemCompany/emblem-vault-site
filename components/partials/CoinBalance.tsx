import React, { Component } from 'react'
import {
  Box,
  Image,
  Text,
  Link,
  useColorMode,
  Button
} from '@chakra-ui/core'

import {HStack, VStack, Circle } from '@chakra-ui/react'
import {validImage } from '../../utils'

type CoinDetails = {
  address: string,
  coin: string,
  name: string,
  symbol: string,
  type: string,
  external_url: string,
  balance: number,
  price: number,
  project?: string,
  projectLogo?: string,
  projectUrl?: string,
  image?: string
}

type CoinBalanceProps = {
  coin: CoinDetails,
  colorMode: string,
  mine: boolean,
  onRenew: Function,
  hideAsset: any
}

export class CoinBalance extends Component<CoinBalanceProps> {
  render() {
    let coin = this.props.coin
    let mine = this.props.mine
    let onRenew = this.props.onRenew
    let hideAsset = this.props.hideAsset
    return (
      <HStack key={coin.name} w="300px" p={2} >
          <Box className="coin-image-container" w="100%" min-width="40px">                                
            {
            coin.image ? (
              <Image className="NFT-image-small" width="40px" src={coin.image}></Image>
            ) :
            coin.address && validImage("https://token-icons.s3.amazonaws.com/"+coin.address+".png") ? (
              <Image width="40px" src={"https://token-icons.s3.amazonaws.com/"+coin.address+".png"}></Image>
            ) : coin.coin && validImage("https://s3.amazonaws.com/token-icons/"+coin.coin.toLowerCase()+".png")? (
              <Image width="40px" src={"https://s3.amazonaws.com/token-icons/"+coin.coin.toLowerCase()+".png"}></Image>
            ) : (
              <Circle size="40px" bg="gray" color="white" isTruncated>
                {coin.symbol? coin.symbol.toLowerCase(): coin.name}
              </Circle>
            )}
          </Box>
          
          <VStack p="10px" w="100%">
            <HStack w="300px">
              <Text float="left" width="50%" fontWeight="bold" color={this.props.colorMode=="dark"? "white": "black"} isTruncated={true}>
                {coin.name}
              </Text>
              <Text float="right" width="40%" textAlign="right" fontWeight="bold" color={this.props.colorMode=="dark"? "lightgreen": "forestgreen"} >
                ${coin && coin.price && coin.price > 0 ? Number(coin.price.toFixed(2)).toLocaleString(): 0  }
              </Text>
            </HStack>
            <HStack w="100%" mt={0} spacing="4px" className = "coin-display-row">
              <Text position="relative" fontSize="xs" width="50%" left="-10px" color={this.props.colorMode=="dark" ? "navajowhite": "gray"}>
                {coin && coin.balance ? 
                Number(Number(coin.balance).toFixed(3)).toLocaleString() : null} {(coin.symbol? coin.symbol : coin.project? coin.project: coin.name) + " "} 
              </Text>              
              <Text width="45%" textAlign="right" fontSize="xs" right="40px">
                {coin.coin.toLowerCase()} chain
              </Text>
            </HStack>
            <HStack width="100%">
              {coin.type == 'nft' && coin.external_url ? (
                  <Link className="view-nft-link" color={this.props.colorMode=="dark" ? "navajowhite": "gray"} href={coin.external_url} isExternal>
                    View NFT
                  </Link>
                ) : null}
              {coin.coin.toLowerCase() == 'nmc' && mine && coin.type == 'nft' ? (
                <Link className="view-nft-link" color={this.props.colorMode=="dark" ? "navajowhite": "gray"} onClick={()=>{onRenew(coin.name)}}>Renew</Link>
              ) : null}
            </HStack>
            {mine && hideAsset!= false ? (
                <Link className="view-nft-link" color={this.props.colorMode=="dark" ? "navajowhite": "gray"} onClick={()=>{hideAsset(coin)}}>Hide</Link>
              ) : null}
          </VStack>
        </HStack>
    )
  }
}

export default CoinBalance
