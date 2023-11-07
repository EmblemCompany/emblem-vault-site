import { Button, Flex, FormControl, FormLabel, Input, InputGroup, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { EMBLEM_V2_API } from '../../constants';


function VaultTools({  }) {
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

  return (
    <Flex direction="row" justify="space-between">
        <FormControl id="tokenId" width="50%" margin="15px">
            <FormLabel>Token ID</FormLabel>
            <InputGroup>
                <Input type="text" name="tokenId" />                                            
            </InputGroup>
            <Button h="1.75rem" size="sm" m="5px">Get Balance</Button>
            <Button h="1.75rem" size="sm" m="5px">Get Custom Balance</Button>
            <Button h="1.75rem" size="sm" m="5px" onClick={() => fetchBalanceForTokenId((document.getElementsByName('tokenId')[0] as HTMLInputElement).value)}>Get Ownership</Button>
            <Button h="1.75rem" size="sm" m="5px">Refresh Metadata</Button>
        </FormControl>
        <FormControl id="results" width="50%" margin="15px">
            <FormLabel>Results</FormLabel>
            <Textarea name="results" placeholder="results here" value={JSON.stringify(results, null, 2)} />
        </FormControl>
    </Flex>
  );
}

export default VaultTools;
