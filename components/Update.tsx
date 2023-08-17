// import { Box, Flex, Text, Link, Image, Stack, Spinner, useColorMode } from '@chakra-ui/core'
import { Box, Flex, Text, Link, Image, Stack, Button, FormControl, FormLabel, Checkbox, CheckboxGroup, Radio, RadioGroup, Input, FormHelperText, useColorMode, Heading } from '@chakra-ui/core'
import {Center, HStack, VStack } from '@chakra-ui/core'
import Loader from 'react-loader'
import Refreshing from './Refreshing'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { Component, useEffect, useState } from 'react'
import { EMBLEM_API } from '../constants'
import InfiniteScroll from 'react-infinite-scroll-component';
import Embed from './Embed'
export default function Update() {
  return (

    <Box m={55} textAlign="left">
      <Heading as="h1" size="lg" mb="4">
      An Exciting New Phase for Coval: Updates and Future Directions
      </Heading>
      <Text m={25} fontSize="lg">Dear Coval Community</Text>
      <Text m={25} fontSize="lg">We are eager to share updates and developments about the Coval (Circuits of Value) ecosystem. We deeply appreciate your commitment and active involvement in our community, as we strive to make our platform a beacon of innovation.</Text>
      <Text m={25} fontSize="lg">Firstly, we would like to reiterate that Coval was conceived with the primary intent of being a token used to participate within the broader Circuits of Value ecosystem. Although the token is publicly traded, it was not intended as an investment vehicle. This understanding is crucial as it underpins the core principles that guide our operations.</Text>
      <Text m={25} fontSize="lg">Our journey so far has seen a number of potential products proposed, including staking options and an NFT marketplace. We have always sought to operate within the confines of the legal framework of our jurisdiction, the United States. This has often meant erring on the side of caution, especially as the regulatory environment around crypto continues to remain opaque.</Text>
      <Text m={25} fontSize="lg">Historically, we have explored different functionalities such as staking and burn mechanisms. However, these features didn't yield the intended utility value and have been subsequently phased out. We also had to suspend the transfer ability within the Emblem Vault product under legal advice, due to the increasingly complex regulatory climate.</Text>
      <Text m={25} fontSize="lg">Nonetheless, we are excited to announce updates that we believe will enhance the utility and usability of Coval within our ecosystem. Starting today, we are introducing a new purchase model for creating vaults. Our team has developed a contract that enables us to establish a USD base price for a vault, using Uniswap as an oracle to determine the equivalent ETH required to match this price. This upgrade aims to streamline the process of purchasing vaults.</Text>
      <Text m={25} fontSize="lg">Additionally, we're introducing a tiered discount mechanism within this new model. Here's how it works: Users who hold specified amounts of Coval in their wallets at the time of purchase can earn discounts on the final ETH price. For example, holding 50,000 Coval might entitle the purchaser to a 20% discount, while holding 100,000 Coval could offer a 30% discount. These are illustrative examples and actual discount tiers will be announced separately.</Text>
      <Text m={25} fontSize="lg">This new model unlocks a host of possibilities, including enabling our partners to mint vaults within their applications. We envision a future where API partners can seamlessly integrate with the Emblem Vault and all forthcoming products. We believe this will greatly enhance the utility of Coval and open the door for a myriad of cross-chain blockchain capabilities.</Text>
      <Text m={25} fontSize="lg">While there remains uncertainty around the possibility of launching a marketplace due to jurisdictional ambiguities, we are comfortable with this reality. Our ability to adapt and respond to both market demands and regulatory developments underlines our commitment to collaboration and innovation. Our goal is to empower anyone to integrate vaults into their products, be they wallets, marketplaces, or other yet-to-be-conceived innovations.</Text>
      <Text m={25} fontSize="lg">It is important to remember that the value of Coval extends beyond its market price. It is a fundamental part of our ecosystem that we believe will only grow in importance and utility.</Text>
      <Text m={25} fontSize="lg">As we look ahead, we are excited about the future of Coval and the possibilities this new model offers. We remain committed to building a platform that not only meets but exceeds your expectations. We look forward to your continued support and engagement as we embark on this exciting new chapter.</Text>
      <Text m={25} fontSize="lg">Thank you for being a part of our journey.</Text>
      <Text m={25} fontSize="lg">Sincerely,</Text>
      <Text m={25} fontSize="lg">The Emblem Team (6/13/2023)</Text>
      
    </Box>
  )
}
