import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Image, Heading, Text } from '@chakra-ui/react';

const UserProfileForm = () => {
  const [banner, setBanner] = useState(null);
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { account } = useWeb3React();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://emblemvault-io-v3-6156a7b1ac82.herokuapp.com:443/users/${account}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setName(data.name);
        setBio(data.bio);
        setTwitterHandle(data.twitterHandle);
        setBannerImageUrl(data.banner_image);
        setProfileImageUrl(data.profile_image);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('banner', banner);
    formData.append('profile', profile);
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('twitter_handle', twitterHandle);

    try {
      const response = await fetch(`https://emblemvault-io-v3-6156a7b1ac82.herokuapp.com/users/${account}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setResult(result);
      setError(null);
    } catch (error) {
      setError(error.message);
      setResult(null);
    }
  };

  return (
    <Box maxWidth="600px" margin="20px auto" padding="20px" border="1px solid #ccc" borderRadius="5px" boxShadow="0 2px 4px rgba(0,0,0,0.1)">
      <form onSubmit={handleSubmit}>
        <FormControl marginBottom="15px">
          <FormLabel>Banner Image:</FormLabel>
          <Input type="file" onChange={(e) => setBanner(e.target.files[0])} />
          {bannerImageUrl && <Image src={bannerImageUrl} alt="Banner" marginTop="10px" />}
        </FormControl>
        <FormControl marginBottom="15px">
          <FormLabel>Profile Image:</FormLabel>
          <Input type="file" onChange={(e) => setProfile(e.target.files[0])} />
          {profileImageUrl && <Image src={profileImageUrl} alt="Profile" marginTop="10px" />}
        </FormControl>
        <FormControl marginBottom="15px">
          <FormLabel>Name:</FormLabel>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl marginBottom="15px">
          <FormLabel>Bio:</FormLabel>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </FormControl>
        <FormControl marginBottom="15px">
          <FormLabel>Twitter Handle:</FormLabel>
          <Input type="text" value={twitterHandle} onChange={(e) => setTwitterHandle(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="blue">Submit</Button>
      </form>
      {result && (
        <Box marginTop="20px">
          <Heading as="h2" size="md">Result:</Heading>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </Box>
      )}
      {error && (
        <Box marginTop="20px">
          <Heading as="h2" size="md">Error:</Heading>
          <Text color="red.500">{error}</Text>
        </Box>
      )}
    </Box>
  );
};

export default UserProfileForm;
