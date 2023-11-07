import { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Button,
    Textarea,
    VStack,
    Text,
    Select
  } from "@chakra-ui/react";
import ArrayInput from './ArrayInput';

function CuratedCrudForm({ initialFormData, assetChains }) {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    console.log(formData);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to server
  };

  return (
    <VStack spacing={4} padding={4} >       
        <Box display="flex" flexDirection="row" justifyContent="flex-start">
          <Box>
            <img src={formData.loadingImages[0]} alt={formData.name} style={{width: '25%'}} />
          </Box>
          <Box marginLeft="10px">
            <Text fontSize="2xl">{formData.name}</Text>
          </Box>
        </Box>
        <form onSubmit={handleSubmit} style={{width: '100%'}}>                
            <FormControl id="contracts" >
                <FormLabel>Contracts</FormLabel>
                <Input type="text" name="contracts" value={JSON.stringify(formData.contracts)} onChange={e => setFormData({ ...formData, contracts: JSON.parse(e.target.value) })} />
            </FormControl>
            <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" value={formData.name} onChange={handleChange} disabled={true}/>
            </FormControl>
            <FormControl id="nativeAssets">
                <FormLabel>Native Assets</FormLabel>
                <ArrayInput name="nativeAssets" value={formData.nativeAssets} onChange={handleChange} />
            </FormControl>
            <FormControl id="mintable">
                <FormLabel>Mintable</FormLabel>
                <Checkbox name="mintable" isChecked={formData.mintable} onChange={e => setFormData({ ...formData, mintable: e.target.checked })} />
            </FormControl>
            <FormControl id="autoLoad">
                <FormLabel>Auto Load</FormLabel>
                <Checkbox name="autoLoad" isChecked={formData.autoLoad} onChange={e => setFormData({ ...formData, autoLoad: e.target.checked })} />
            </FormControl>
            <FormControl id="addressChain">
                <FormLabel>Address Chain</FormLabel>
                <Select name="addressChain" value={formData.addressChain} onChange={handleChange}>
                  {assetChains.map((chain, index) => (
                    <option key={index} value={chain}>
                      {chain}
                    </option>
                  ))}
                </Select>
            </FormControl>
            <FormControl id="collectionType">
                <FormLabel>Collection Type</FormLabel>
                <Select name="collectionType" value={formData.collectionType} onChange={handleChange}>
                    {["ERC1155","ERC721","ERC721a"].map((chain, index) => (
                        <option key={index} value={chain}>
                        {chain}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <FormControl id="loadTypes">
                <FormLabel>Load Types</FormLabel>
                <ArrayInput name="loadTypes" value={formData.loadTypes} onChange={handleChange} options={["empty","select","input"]} />
            </FormControl>
            <FormControl id="description">
                <FormLabel>Description</FormLabel>
                <Textarea name="description" value={formData.description} onChange={handleChange} />
            </FormControl>
            <FormControl id="purchaseMethod">
                <FormLabel>Purchase Method</FormLabel>
                <Input type="text" name="purchaseMethod" value={formData.purchaseMethod} onChange={handleChange} />
            </FormControl>
            <FormControl id="showBalance">
                <FormLabel>Show Balance</FormLabel>
                <Checkbox name="showBalance" isChecked={formData.showBalance} onChange={e => setFormData({ ...formData, showBalance: e.target.checked })} />
            </FormControl>
            <FormControl id="balanceUrl">
                <FormLabel>Balance URL</FormLabel>
                <Input type="text" name="balanceUrl" value={formData.balanceUrl} onChange={handleChange} />
            </FormControl>
            <FormControl id="price">
                <FormLabel>Price</FormLabel>
                <Input type="text" name="price" value={formData.price} onChange={handleChange} disabled={true}/>
            </FormControl>
            <FormControl id="collectionChain">
                <FormLabel>Collection Chain</FormLabel>
                <Input type="text" name="collectionChain" value={formData.collectionChain} onChange={handleChange} />
            </FormControl>
            <FormControl id="balanceQty">
                <FormLabel>Balance Quantity</FormLabel>
                <Input type="text" name="balanceQty" value={formData.balanceQty} onChange={handleChange} />
            </FormControl>
            <FormControl id="imageHandler">
                <FormLabel>Image Handler</FormLabel>
                <Input type="text" name="imageHandler" value={formData.imageHandler} onChange={handleChange} />
            </FormControl>
            <FormControl id="loadingImages">
                <FormLabel>Loading Images</FormLabel>
                <ArrayInput name="loadingImages" value={formData.loadingImages} onChange={handleChange} type={"image"} />
            </FormControl>
            <FormControl id="placeholderImages">
                <FormLabel>Placeholder Images</FormLabel>
                <ArrayInput name="placeholderImages" value={formData.placeholderImages} onChange={handleChange}  type={"image"} />
            </FormControl>
            <Button type="submit">Submit</Button>
        </form>        
    </VStack>
  );
}

export default CuratedCrudForm;
