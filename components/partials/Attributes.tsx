import React, { Component } from 'react'
import {
  Box,
  Image,
  Text,
  Link,
  useColorMode,
  Button,
  Flex,
} from '@chakra-ui/react'


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
                {typeof attribute.value === 'string' ? (
                  <>
                    <Text ml={2} mr={Number.isInteger(index/2) ? 0: "4px"} fontSize=".9em" textAlign={Number.isInteger(index/2) ? "left": "right"} fontWeight="bold" overflow="hidden" isTruncated={true} >{attribute.trait_type}</Text>
                    <Text ml={2} mr={Number.isInteger(index/2) ? 0: "4px"}  fontSize=".7em" textAlign={Number.isInteger(index/2) ? "left": "right"} color={this.props.colorMode=="dark" ? "navajowhite": "gray"} >{attribute.value}</Text>
                  </>
                ) : null}
                
              </Box>
            )
          })
        }
      </Flex>
    )
  }
}

export default Attributes
