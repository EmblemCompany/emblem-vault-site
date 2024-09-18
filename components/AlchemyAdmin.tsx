import { Button, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { createReservoirCollectionSet, getLatestReservoirCollectionSetID } from '../v3Utils'
import { EMBLEM_V3_API } from '../constants';

export default function AlchemyAdmin() {
  const [latestCollSetID, setLatestCollSetID] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
   
  }, []);

  const turnOffWebhooks = async () => {
    try {
      const response = await fetch(EMBLEM_V3_API + '/v3/delete/alchemy', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': localStorage.apiKey,
        },
      });
      const result = await response.json();
      setResult(JSON.stringify(result));
    } catch (error) {
      setResult('Error turning off webhooks: ' + error.message);
    }
  }

  const registerWebhooks = async () => {
    try {
      const response = await fetch(EMBLEM_V3_API + '/v3/reset/alchemy', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': localStorage.apiKey,
        },
      });
      const result = await response.json();
      setResult(JSON.stringify(result));
    } catch (error) {
      setResult('Error registering webhooks: ' + error.message);
    }
  }

  

  return (
    <Flex id="reservoirAdmin" direction="column" alignItems="center" padding={4} borderRadius="md" width="80vw">
      <Flex>
        <Text><h2>Alchemy Webhooks</h2></Text>
      </Flex>
      <Flex w="100%" direction="column" alignItems="center" flexWrap="wrap" >
        <Flex>
          <Button ml={5} minW={115} onClick={turnOffWebhooks}>Turn Off Webhooks</Button>
          <Button ml={5} minW={115} onClick={registerWebhooks}>Register Webhooks</Button>
        </Flex>
        <Flex id="alchemyResults" padding={4}>
          <Text>{result}</Text>
        </Flex>
      </Flex>
    </Flex>

  )
}