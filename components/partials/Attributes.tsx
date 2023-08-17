import React, { Component } from 'react'
import {
  Box,
  Image,
  Text,
  Link,
  useColorMode,
  Button,
  Flex,
  PseudoBox
} from '@chakra-ui/core'

import {HStack, VStack, Circle } from '@chakra-ui/core'

type AttributesProps = {
  attributes: any[],
  colorMode: string,
}

export class Attributes extends Component<AttributesProps> {
  render() {
    let colorMode = this.props.colorMode
    let attributes = this.props.attributes
    return (
      <Flex w="100%" flexWrap="wrap" mt={3} >
        {
          attributes.map((attribute, index)=>{
            return (
              <Box mt="2px" p={1} ml="3px" minWidth="45%" /*maxWidth="50%"*/ width="48%" className="NFT newest coin-balance-content" key={0}  >
                <Text ml={2} mr={Number.isInteger(index/2) ? 0: "4px"} fontSize=".9em" textAlign={Number.isInteger(index/2) ? "left": "right"} fontWeight="bold" overflow="hidden" isTruncated={true} >{attribute.trait_type}</Text>
                <Text ml={2} mr={Number.isInteger(index/2) ? 0: "4px"}  fontSize=".7em" textAlign={Number.isInteger(index/2) ? "left": "right"} color={this.props.colorMode=="dark" ? "navajowhite": "gray"} >{attribute.value}</Text>
              </Box>
            )
          })
        }
      </Flex>
      // <Flex w="100%" justify="center" >
       
            // <VStack justify="center" mt={10} key={0} w="340px" >
              // <HStack>
              //   <Flex w={50} justify="center" flexWrap="wrap">
              //   {
              //     attributes.map(attribute=>{
              //       return (
              //         <Box d="flex"width="100%" backgroundColor={colorMode == "light"? "gray.100": "gray.500"} alignItems="baseline" className="coin-balance-content">
              //           <Box width="100%" color="gray.500" textAlign="center" fontSize="sm" >
              //             <Text color={this.props.colorMode=="dark" ? "navajowhite": "gray"} >{attribute.trait_type}</Text>
              //             <Text color={this.props.colorMode=="dark" ? "navajowhite": "gray"} >{attribute.value}</Text>
              //           </Box>
              //         </Box>
              //       )
              //     })
              //   }
              //   </Flex>
              // </HStack>
            // </VStack>
          
      // </Flex>
    )
  }
}

export default Attributes
