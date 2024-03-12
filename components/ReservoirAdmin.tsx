import { Button, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { createReservoirCollectionSet, getLatestReservoirCollectionSetID } from '../v3Utils'

export default function ReservoirAdmin() {
  const [latestCollSetID, setLatestCollSetID] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchCollSetID = async () => {
      const collectionSetID = await getLatestReservoirCollectionSetID();
      setLatestCollSetID(collectionSetID)
    }
    fetchCollSetID()
  }, []);

  const createCollectionSet = async() => {
    try {
      const result= await createReservoirCollectionSet()
      debugger
      setLatestCollSetID(result.collectionSetID)
      if(result.msg){
        setResult(result.msg)
      }
    } catch(error){
      alert(error)
    }
  };

  return (
    <Flex id="reservoirAdmin" direction="column" alignItems="center" padding={4} borderRadius="md" width="80vw">
      <Flex>
        <Text><h2>Reservoir</h2></Text>
      </Flex>
      <Flex  w="100%" direction="column" alignItems="center" flexWrap="wrap" >
        <Flex>
          <Text><strong> Latest Reservoir Collection Set ID:</strong> <br /> {String(latestCollSetID)}</Text>
        </Flex>
        <Flex>
          <Button ml={5} minW={115} onClick={() => createCollectionSet()}>Generate New Collection Set</Button>
        </Flex>
        <Flex id="reservoirResults" padding={4}>
          <Text>{result}</Text>
        </Flex>
      </Flex>
    </Flex>

  )
}