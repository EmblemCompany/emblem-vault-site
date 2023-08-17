import React from 'react'
import { Flex, Text, Spinner } from '@chakra-ui/core'

const Refreshing = () => {
  return (
    <Flex pb={2} justify="center">
      <Text pr={2}>Refreshing </Text>
      <Spinner />
    </Flex>
  )
}

export default Refreshing
