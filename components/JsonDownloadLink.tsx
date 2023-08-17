import { Button } from '@chakra-ui/react';
import {Box} from '@chakra-ui/react'
import React from 'react';

const JsonDownloadLink = ({ data, filename }) => {
  const handleClick = (event) => {
    event.preventDefault();

    // Convert the JSON object to a string
    const jsonString = JSON.stringify(data, null, 2);

    // Create a Blob from the JSON string
    const jsonBlob = new Blob([jsonString], { type: 'application/json' });

    // Create a URL for the Blob
    const jsonUrl = URL.createObjectURL(jsonBlob);

    // Create a temporary anchor element and simulate a click to download the file
    const downloadLink = document.createElement('a');
    downloadLink.href = jsonUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
      <>
          <Box display="flex" alignItems="baseline" justifyContent="space-between" mt="4">
              <Button id="downloadLink" width="100%" onClick={handleClick}>
                  Backup Vault
              </Button>
          </Box>
      </>
  );
};

export default JsonDownloadLink;
