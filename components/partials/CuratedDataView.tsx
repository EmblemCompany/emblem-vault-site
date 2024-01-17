import { Box, Text, VStack, Collapse, Button, TabPanels, TabPanel, Tabs, TabList, Tab, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import CuratedCrudForm from "./CuratedCrudForm";
import VaultTools from "./VaultTools";
import MetadataTools from "./MetadataTools";


export default function CuratedDataView({ data, assetChains, deployments, callback = null }) {
  const [show, setShow] = useState(Array(data.length).fill(false));
  const [tabIndex, setTabIndex] = useState(0)
  const [mintEntries, setMintEntries] = useState({});

  const handleToggle = (index) => {
    const newShow = [...show];
    newShow[index] = !newShow[index];
    setShow(newShow);
  }

  const checkHandlerCanMint = async (contractType, contractAddress) =>{
    let paramData = ""
    if (contractType === "ERC721") {
      paramData = "0xedf6828000000000000000000000000023859b51117dbfbcdef5b757028b18d7759a44602fb102cf00000000000000000000000000000000000000000000000000000000"
    } else if (contractType === "ERC1155") {
      paramData = "0xedf6828000000000000000000000000023859b51117dbfbcdef5b757028b18d7759a44608bcef78e00000000000000000000000000000000000000000000000000000000"
    } else if (contractType === "ERC721a") {
      paramData = "0xedf6828000000000000000000000000023859b51117dbfbcdef5b757028b18d7759a446040c10f1900000000000000000000000000000000000000000000000000000000"
    }
    const options = {
      method: 'POST',
      headers: {        
        'content-type': 'application/json',
        'referer': 'https://etherscan.io/'
      },
      body: JSON.stringify({
        "jsonrpc": "2.0",
        "id": 200771357495041,
        "method": "eth_call",
        "params": [
          {
            "from": "0x0000000000000000000000000000000000000000",
            "data": paramData,
            "to": contractAddress
          },
          "latest"
        ]
      })
    };
    
    try {
      const response = await fetch('https://node1.web3api.com/', options);
      const data = await response.json();
      if (data && data.result && data.result === "0x0000000000000000000000000000000000000000000000000000000000000001") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <VStack spacing={4} padding={4}>
      { data.map((item, index) => {        
        return (
          <Box border="1px" borderColor="gray.200" padding={4} borderRadius="md" key={item.id} width="80vw">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Text onClick={() => handleToggle(index)} style={{cursor: "pointer"}}>{item.mintable ? "🟢" : "🔴"}<strong> Name:</strong> {item.name}</Text>
              <Button onClick={() => handleToggle(index)} style={{cursor: "pointer"}}>{show[index] ? "▼" : "▲"}</Button>
            </Box>
            <Collapse in={show[index]}>
                <Box>
                    <Tabs defaultIndex={0} index={tabIndex} onChange={(index) => setTabIndex(index)}>
                        <TabList>
                            <Tab>Details</Tab>
                            <Tab>Edit</Tab>
                            <Tab>Tools</Tab>
                            <Tab>Metadata</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel mt={5}>
                                {/* <Text onClick={async ()=>{let canMint = await checkHandlerCanMint(item.collectionType, item.contracts["1"]); item.canMint = canMint; mintEntries[item.name] = canMint; setMintEntries(mintEntries); setTabIndex(tabIndex) }} ><strong>Handler can delegate mint:</strong> {mintEntries[item.name]?.toString()}</Text> */}
                                {callback && 
                                  <Button mb={3} onClick={() => callback(item)}>Clone</Button>
                                }

                                <Text><strong>Contracts:</strong> {JSON.stringify(item.contracts)}</Text>
                                <Text><strong>Native Assets:</strong> {item.nativeAssets.join(", ")}</Text>
                                <Text><strong>Mintable:</strong> {item.mintable ? "Yes" : "No"}</Text>
                                <Text><strong>Auto Load:</strong> {item.autoLoad ? "Yes" : "No"}</Text>
                                <Text><strong>Address Chain:</strong> {item.addressChain}</Text>
                                <Text><strong>Collection Type:</strong> {item.collectionType}</Text>
                                <Text><strong>Load Types:</strong> {item.loadTypes.join(", ")}</Text>
                                <Text isTruncated><strong>Description:</strong> {item.description}</Text>                
                                <Text><strong>Purchase Method:</strong> {item.purchaseMethod}</Text>
                                <Text><strong>Show Balance:</strong> {item.showBalance ? "Yes" : "No"}</Text>
                                <Text><strong>Balance URL:</strong> {item.balanceUrl}</Text>
                                <Text><strong>Price:</strong> {item.price}</Text>
                                <Text><strong>Collection Chain:</strong> {item.collectionChain}</Text>
                                <Text><strong>Balance Quantity:</strong> {item.balanceQty}</Text>
                                <Text><strong>Image Handler:</strong> {item.imageHandler}</Text>
                                <Text><strong>Loading Images:</strong> {item.loadingImages.join(", ")}</Text>
                                <Text><strong>Placeholder Images:</strong> {JSON.stringify(item.placeholderImages)}</Text>
                            </TabPanel>
                            <TabPanel>{item && assetChains &&
                                <Flex ml={12}>
                                <VStack spacing={4} padding={4} align="left" >
                                    <CuratedCrudForm initialFormData={item} assetChains={assetChains} deployments={deployments} />
                                </VStack>
                                </Flex>
                            }</TabPanel>
                            <TabPanel>
                                <VaultTools targetContract={item}/>                                
                            </TabPanel>
                            <TabPanel>
                                <MetadataTools targetContract={item}/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Collapse>
          </Box>
        );
      })}
    </VStack>
  );
}
