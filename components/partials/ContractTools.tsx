import { Button, Flex, FormControl, FormLabel, Input, InputGroup, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { EMBLEM_V2_API, EMBLEM_V3_API, contractAddresses } from '../../constants';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts'

function ContractTools({ targetContract }) {
    const { account, chainId, library } = useWeb3React()
    const [results, setResults] = useState(null);



      const fetchBalanceForTokenId = (tokenId) => {
        const options = {
          method: 'POST',
          headers: {
            'x-api-key': localStorage.getItem('apiKey') || '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "tokenId": tokenId
          })
        };
   
        fetch(`${EMBLEM_V2_API}/refreshBalanceForTokenId`, options)
          .then(response => response.json())
          .then(data => {
           setResults(data)
          })
          .catch(err => {
            console.error(err);
          });
      };

      const refreshMarketplaceMetadata = (tokenId) => {
        const options = {
          method: 'GET',
          headers: {
            'x-api-key': localStorage.getItem('apiKey') || '',
            'Content-Type': 'application/json'
          }
        };
   
        fetch(`${EMBLEM_V2_API}/refreshMarketplaceMetadata/${targetContract.contracts[chainId]}/${tokenId}`, options)
          .then(response => response.json())
          .then(data => {
           setResults(data)
          })
          .catch(err => {
            setResults(err);
          });
      };

      const checkCanMint = (tokenId) => {
        const options = {
          method: 'GET',
          headers: {
            'x-api-key': localStorage.getItem('apiKey') || '',
            'Content-Type': 'application/json'
          }
        };
   
        fetch(`${EMBLEM_V3_API}/v3/allowed/${targetContract.contracts["1"]}/${tokenId}`, options)
          .then(response => response.json())
          .then(data => {
           setResults(data)
          })
          .catch(err => {
            setResults(err);
          });
      };

      const clearCache = (tokenId) => {
        const options = {
          method: 'POST',
          headers: {
            'x-api-key': localStorage.getItem('apiKey') || '',
            'Content-Type': 'application/json'
          }, body: JSON.stringify({
            "tokenIds": [tokenId],
          })
        };
   
        fetch(`${EMBLEM_V3_API}/v3/cache/${targetContract.contracts[tokenId]}/refresh`, options)
          .then(response => response.json())
          .then(data => {
           setResults(data)
          })
          .catch(err => {
            setResults(err);
          });
      };

      const bypassOn = async () => {
        let contractInstance = createCuratedContractInstance()
        let isByPassable = await contractInstance.byPassable()
        console.log("byPassable", isByPassable)
        if (!isByPassable) {
          await contractInstance.toggleBypassability()
          console.log("setting byPassable")
        } else {
          alert("Already Bypassable")
        }        
      }

      const delegateMint = async () => {
        let contractInstance = createCuratedContractInstance()
        let functionId = targetContract.collectionType == 'ERC721a' || targetContract.collectionType == 'ERC721'? "0x40c10f19": "0x8bcef78e"
        let canDelegateMint = await contractInstance.byPassableFunction(contractAddresses.vaultHandlerV8[chainId], functionId)
        if (!canDelegateMint) {
          await contractInstance.addBypassRule(contractAddresses.vaultHandlerV8[chainId], functionId, 0)
        } else {
          alert("Handler Can Already Mint")
        }
      }

      const delegateMintBulk = async () => {
        let contractInstance = createCuratedContractInstance()
        let functionId = targetContract.collectionType == 'ERC721a' || targetContract.collectionType == 'ERC721'? "0x4029a3ce": "0x8bcef78e"
        let canDelegateMint = await contractInstance.byPassableFunction(contractAddresses.vaultHandlerV8[chainId], functionId)
        if (!canDelegateMint) {
          await contractInstance.addBypassRule(contractAddresses.vaultHandlerV8[chainId], functionId, 0)
        } else {
          alert("Handler Can Already Mint")
        }
      }

      const setBaseUri = async () => {
        let contractInstance = createCuratedContractInstance()        
        let uri = `https://v2.emblemvault.io/v3/meta/${contractInstance.address}/`
        await contractInstance.setBaseURI(uri)
      }

      const mintPlaceholder = async () => {
        let contractInstance = createCuratedContractInstance()   
        let totalSupply = await contractInstance.totalSupply()
        if (totalSupply > 0) {
          alert(`Already Minting: ${totalSupply}`)
        } else {
          await contractInstance.mint(account, 0)
        }
      }

      const delegateBurn = async () => {
        let contractInstance = createCuratedContractInstance()
        let functionId = targetContract.collectionType == 'ERC721a' || targetContract.collectionType == 'ERC721'? "0x42966c68": "0xf5298aca"
        let canDelegateBurn = await contractInstance.byPassableFunction(contractAddresses.vaultHandlerV8[chainId], functionId)
        if (!canDelegateBurn) {
          await contractInstance.addBypassRule(contractAddresses.vaultHandlerV8[chainId], functionId, 0)
        } else {
          alert("Handler Can Already Burn")
        }
      }

      const setName = async () => {
        let contractInstance = createCuratedContractInstance()
        let newName = prompt("Please enter the new name", targetContract.name);
        let newSymbol = prompt("Please enter the new symbol", targetContract.name.toLowerCase());
        if (newName === null || newName === "" || newSymbol === null || newSymbol === "") {
          alert("No name or symbol entered. Operation cancelled.");
        } else {
          let confirmation = confirm(`Are you sure you want to set the name to ${newName} and symbol to ${newSymbol}?`);
          if (confirmation) {
            await contractInstance.setDetails(newName, newSymbol);
          } else {
            alert("Operation cancelled.");
          }
        }
        // let contractInstance = createCuratedContractInstance()   
        // let totalSupply = await contractInstance.totalSupply()
        // if (totalSupply > 0) {
        //   alert(`Already Minting: ${totalSupply}`)
        // } else {
        //   await contractInstance.mint(account, 0)
        // }
      }

      const createCuratedContractInstance = () =>{
        return new Contract(targetContract.contracts[chainId], targetContract.collectionType == 'ERC1155'? contractAddresses.erc1155Abi:  targetContract.collectionType == 'ERC721a'? contractAddresses.erc721aAbi: contractAddresses.erc721Abi, library.getSigner(account).connectUnchecked())
      }

  return (
    <Flex direction="row" justify="space-between">
        <FormControl id={`tokenId`} width="50%" margin="15px">
            <FormLabel>Token ID</FormLabel>
            <InputGroup>
                <Input type="text" name={`${targetContract.name}-tokenId`} />
            </InputGroup>
            <Button h="1.75rem" size="sm" m="5px">Get Balance</Button>
            <Button h="1.75rem" size="sm" m="5px">Get Custom Balance</Button>
            <Button h="1.75rem" size="sm" m="5px" onClick={() => {
              let tokenId = document.getElementsByName(`${targetContract.name}-tokenId`)[0] as HTMLInputElement
              if (tokenId) {
                fetchBalanceForTokenId(tokenId.value)
              }
            }}>Get Ownership</Button>
            <Button h="1.75rem" size="sm" m="5px" onClick={()=>{
              let tokenId = document.getElementsByName(`${targetContract.name}-tokenId`)[0] as HTMLInputElement
              if (tokenId) {
                refreshMarketplaceMetadata(tokenId.value)
              }
            }}>Refresh Marketplace Metadata</Button>
            <Button onClick={()=>{
              let tokenId = document.getElementsByName(`${targetContract.name}-tokenId`)[0] as HTMLInputElement
              if (tokenId) {
                checkCanMint(tokenId.value)
              }
            }} h="1.75rem" size="sm" m="5px">Can Mint?</Button>
            <Button onClick={()=>{
              let tokenId = document.getElementsByName(`${targetContract.name}-tokenId`)[0] as HTMLInputElement
              if (tokenId) {
                clearCache(tokenId.value)
              }
            }} h="1.75rem" size="sm" m="5px">Clear Cache</Button>

            <hr/>Marketplace
            <div></div>
              <Button h="1.75rem" size="sm" m="5px" onClick={()=>{
                let tokenId = document.getElementsByName(`${targetContract.name}-tokenId`)[0] as HTMLInputElement
                if (tokenId) {
                  console.log(targetContract)
                  window.open(`https://opensea.io/assets/ethereum/${targetContract.contracts[chainId]}/${tokenId.value}`, "_blank");
                }
              }}>Opensea</Button>

            <hr/>Contract
            <div></div>

            <Flex direction="row" justify="space-between">
                <Button h="1.75rem" size="sm" m="5px" onClick={bypassOn}>Turn on Bypassability</Button>
            </Flex>
            <Flex direction="row" justify="space-between">
                <Button h="1.75rem" size="sm" m="5px" onClick={delegateMint}>Delegate Handler to Mint</Button>
            </Flex>
            <Flex direction="row" justify="space-between">
                <Button h="1.75rem" size="sm" m="5px" onClick={delegateBurn}>Delegate Handler to Burn</Button>
            </Flex>
            <Flex direction="row" justify="space-between">
                <Button h="1.75rem" size="sm" m="5px" onClick={delegateMintBulk}>Delegate Handler to Mint Bulk</Button>
            </Flex>
            <Flex direction="row" justify="space-between">
                <Button h="1.75rem" size="sm" m="5px" onClick={setName}>Update Name</Button>
            </Flex>
            <Flex direction="row" justify="space-between">
                <Button h="1.75rem" size="sm" m="5px" onClick={setBaseUri}>Set Uri</Button>
            </Flex>
            <Flex direction="row" justify="space-between">
                <Button h="1.75rem" size="sm" m="5px" onClick={mintPlaceholder}>Mint Placeholder</Button>
            </Flex>

        </FormControl>
        <FormControl id="results" width="50%" margin="15px">
            <FormLabel>Results</FormLabel>
            <Textarea name="results" placeholder="results here" value={JSON.stringify(results, null, 2)} />
        </FormControl>
    </Flex>
  );
}

export default ContractTools;
