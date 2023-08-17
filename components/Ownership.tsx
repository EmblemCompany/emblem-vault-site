import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Flex, Input, Select, useColorMode, Table, Thead, Tbody, Tr, Th, Td, useToast } from "@chakra-ui/core";
import { EMBLEM_V2_API } from '../constants';

export default function TokenOwnershipTable() {
  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({
    owner: "",
    status: "unminted",
    claimedBy: "",
  });

  const { colorMode } = useColorMode();
  const toast = useToast();

  useEffect(() => {
    axios.post(EMBLEM_V2_API + '/findTokenOwnership', formValues)
      .then(res => {
        if (res.data.error) {
          throw new Error(res.data.msg);
        }
        setData(res.data.tokens);
      })
      .catch(err => {
        console.error(err);
        toast({
          title: "Error fetching data.",
          description: err.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }, [formValues]);
  

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formValues);
    // Perform your search/filter operation here
  };

  return (
    <Box>
      
        <Flex mb="2">
        <form onSubmit={handleSubmit}>
          <Input name="owner" value={formValues.owner} onChange={handleChange} placeholder="Owner" mr="2" />
          <Select name="status" value={formValues.status} onChange={handleChange} mr="2">
            <option value="unminted">Unminted</option>
            <option value="minted">Minted</option>
            <option value="claimed">Claimed</option>
          </Select>
          <Input name="claimedBy" value={formValues.claimedBy} onChange={handleChange} placeholder="Claimed By" mr="2" />
          <Button type="submit">Search</Button>
          </form>
        </Flex>
     
      <Table variant="simple" colorScheme={colorMode === 'light' ? 'blackAlpha' : 'whiteAlpha'}>
        <Thead>
          <Tr>
            <Th>Owner</Th>
            <Th>Status</Th>
            <Th>Claimed By</Th>
            <Th>Internal Token ID</Th>
            <Th>Category</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(row => (
            <Tr key={row.id}>
              <Td>{row.owner == "0x0000000000000000000000000000000000000000"? row.createdBy: row.owner}</Td>
              <Td>{row.status}</Td>
              <Td>{row.claimedBy}</Td>
              <Td>{row.internalTokenId}</Td>
              <Td>{row.category}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
