import { Button, Flex, FormControl, FormLabel, Input, InputGroup, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { EMBLEM_V2_API, EMBLEM_V3_API } from '../../constants';


function VaultTools({ targetContract }) {
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
   
        fetch(`${EMBLEM_V2_API}/refreshMarketplaceMetadata/${targetContract.contracts[1]}/${tokenId}`, options)
          .then(response => response.json())
          .then(data => {
           setResults(data)
          })
          .catch(err => {
            console.error(err);
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
            console.error(err);
          });
      };

  return (
    <Flex direction="row" justify="space-between">
        <FormControl id="tokenId" width="50%" margin="15px">
            <FormLabel>Token ID</FormLabel>
            <InputGroup>
                <Input type="text" name="tokenId" />                                            
            </InputGroup>
            <Button h="1.75rem" size="sm" m="5px">Get Balance</Button>
            <Button h="1.75rem" size="sm" m="5px">Get Custom Balance</Button>
            <Button h="1.75rem" size="sm" m="5px" onClick={() => {
              let tokenId = document.getElementsByName('tokenId')[0] as HTMLInputElement
              if (tokenId) {
                fetchBalanceForTokenId(tokenId.value)
              }
            }}>Get Ownership</Button>
            <Button h="1.75rem" size="sm" m="5px" onClick={()=>{
              let tokenId = document.getElementsByName('tokenId')[0] as HTMLInputElement
              if (tokenId) {
                refreshMarketplaceMetadata(tokenId.value)
              }
            }}>Refresh Marketplace Metadata</Button>
            <Button onClick={()=>{
              let tokenId = document.getElementsByName('tokenId')[0] as HTMLInputElement
              if (tokenId) {
                checkCanMint(tokenId.value)
              }
            }} h="1.75rem" size="sm" m="5px">Can Mint?</Button>
        </FormControl>
        <FormControl id="results" width="50%" margin="15px">
            <FormLabel>Results</FormLabel>
            <Textarea name="results" placeholder="results here" value={JSON.stringify(results, null, 2)} />
        </FormControl>
    </Flex>
  );
}

export default VaultTools;
