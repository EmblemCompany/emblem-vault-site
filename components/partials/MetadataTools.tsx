import { Button, Flex, FormControl, FormLabel, Input, InputGroup, Textarea, Text, Select, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { EMBLEM_V2_API } from '../../constants';
import Embed from '../Embed';
import { sdk } from '../../utils';


function MetadataTools({ targetContract }) {
  let formattedMetadata = { xcp: [] }
  sdk.getAllAssetMetadata().forEach(item => {
    item.name = item.assetName
    if (!formattedMetadata.xcp[item.projectName]) {
      formattedMetadata.xcp[item.projectName] = [];
    }
    if (!formattedMetadata.xcp[item.projectName].includes(item)) {
      formattedMetadata.xcp[item.projectName].push(item);
    }
  })
  const [results, setResults] = useState(null);
  const [targetAsset, setTargetAsset] = useState(null);
  const [imageOverride, setImageOverride] = useState(null);
  const [curatedAssets, setCuratedAssets] = useState(formattedMetadata);
  useEffect(() => {
    if (targetAsset && !imageOverride) {
      getImageOverrides();
    }
  }, [targetAsset, imageOverride]);

  const getImageOverrides = () => {
    const options = {
      method: 'GET',
      headers: {
        'x-api-key': localStorage.getItem('apiKey') || '',
        'Content-Type': 'application/json'
      }
    };
    fetch(`${EMBLEM_V2_API}/getOverride/${targetAsset.name}/${targetContract.collectionChain}/image`, options)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setImageOverride({ ...targetAsset, image: data.attributeValue })
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  const saveImageOverride = () => {
    const options = {
      method: 'POST',
      headers: {
        'x-api-key': localStorage.getItem('apiKey') || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "assetName": targetAsset.name,
        "assetChain": targetContract.collectionChain,
        "attributeName": "image",
        "attributeValue": imageOverride.image
      })
    };

    fetch(`${EMBLEM_V2_API}/setOverride`, options)
      .then(response => response.json())
      .then(data => {
        setResults(data)
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <Flex direction="row" justify="space-between" marginTop="5" >
      {/* <Text>{JSON.stringify(targetContract)}</Text> */}
      {targetContract.name && targetContract["collectionType"] !== 'ERC721' && targetContract["collectionType"] !== 'ERC721a' && !targetContract.loadTypes.includes('empty') ? (
        <Box>
          <Select id="asset-selector" value={targetAsset?.name}
            onChange={(e) => {
              // setMintDisabled(false)
              setImageOverride(null)
              setTargetAsset(curatedAssets[targetContract.collectionChain][targetContract.name].filter(item => { return item.name == e.target.value })[0])
            }}
          >
            <option value="" >---Choose One---</option>
            {curatedAssets[targetContract.collectionChain][targetContract.name] ? curatedAssets[targetContract.collectionChain][targetContract.name].sort((a, b) => { if (a.name < b.name) return -1; if (a.name > b.name) return 1; return 0; }).map((asset, i) => {
              return (
                <option key={`choose-${i}`} value={asset.name} >{asset.name}</option>
              )
            }) : null}
          </Select>
          {targetAsset && (
            <>
              <InputGroup>
                <Input
                  style={{ padding: 5 }}
                  value={imageOverride?.image || targetAsset.image}
                  onChange={(e) => setImageOverride({ ...targetAsset, image: e.target.value })}
                />
                <Button onClick={() => saveImageOverride()}> Override</Button>
              </InputGroup>
              <Embed url={imageOverride?.image || targetAsset.image} />
            </>
          )}
        </Box>
      ) : null}
    </Flex>
  );
}

export default MetadataTools
