import {
    Box,
    Flex,
    Grid,
    Text,
    Link,
    SimpleGrid,
    Image
} from "@chakra-ui/core";

import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from "react";

export default function VaultList(props: any) {

    const { account, chainId } = useWeb3React()
    const [vaults, setVaults] = React.useState([])

    const getVaults = async () => {
      // const responce = await fetch('http://104.154.252.216/vaults/0x5a63264914a1eCB626e32e8AD683704bA7b0621f', {
      const responce = await fetch('http://104.154.252.216/vaults/' + account, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const jsonData = await responce.json()
      setVaults(jsonData)
    }

    useEffect(() => {
        getVaults()
      }, [])

    return (
      <Flex width="full" align="center" justifyContent="center" justifyItems="center">
        {vaults.length
          ? vaults.map((vault) => {
            var url = '/vault/?id=' + vault.tokenId
            return (
              <Grid key={vault.tokenId} templateColumns="repeat(5, 1fr)" gap={1}>
                <Link href={url}>
                  <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" >
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                      p={1}
                      textAlign="center"
                    >
                      {vault.name}

                      <Image src={vault.image
                        ? vault.image
                        : "https://circuitsofvalue.com/public/coval-logo.png"
                      }
                        size="250px"
                      />
                    </Box>

                    <Box p="6">
                      <Box d="flex" alignItems="baseline">
                        <Box
                          color="gray.500"
                          fontWeight="semibold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                          ml="2"
                        >
                          {vault.values.length
                            ? vault.values.map((coin) => {
                              return (
                                <Text key={coin.name}>
                                  {coin.balance} {coin.name}
                                </Text>
                              )
                            })
                            : <Text>Nothing in here! Fill 'er up!</Text>
                          }
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            )
          })
          :
          <Text>
            YOU DON'T SEEM TO HAVE ANY VAULTS. {" "}
            <Link color="#638cd8" href="../create">
              CREATE ONE HERE!
          </Link>
          </Text>
        }
      </Flex>
    )

}