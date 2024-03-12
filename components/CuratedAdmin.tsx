import { Flex, Text, Link, Image, Stack, Spinner, useColorMode, Input, VStack, Button } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import Loader from 'react-loader'
import Refreshing from './Refreshing'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { validImage } from '../utils'
import { EMBLEM_API, EMBLEM_V2_API, EMBLEM_V3_API } from '../constants'
import CoinBalance from './partials/CoinBalance'
import Embed from './Embed'
import CuratedCrudForm from './partials/CuratedCrudForm'
import CuratedDataView from './partials/CuratedDataView'
import ReservoirAdmin from './ReservoirAdmin'

export default function CuratedAdmin() {
  const { query } = useRouter()
  const [state, setState] = useState({ loaded: true })
  const [cloneData, setCloneData] = useState(null)
  const [curatedData, setCuratedData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [showAddNew, setShowAddNew] = useState(false);
  const [assetChains, setAssetChains] = useState([]);
  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    fetch(`${EMBLEM_V2_API}/curated`)
      .then(response => response.json())
      .then(data => {
        setCuratedData(data);
        setFilteredData(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${EMBLEM_V2_API}/assetChains`)
      .then(response => response.json())
      .then(data => {
        setAssetChains(data);
      });
  }, []);
  

  useEffect(() => {
    if(curatedData && deployments.length === 0) {
      fetch(`${EMBLEM_V3_API}/v3/deployments`)
        .then(response => response.json())
        .then(data => {
          const newDataList = data.filter((item, index) => {
            return !curatedData.some(contract=> contract.contracts["1"] == item.address ) && item.name.includes("upgradableERC")
            // return item;
          });
          setDeployments(newDataList);
        });
    }
  }, [curatedData, deployments]);

  // useEffect(() => {
  //   if (cloneData) {
  //     document.getElementById('curatedAdmin').scrollIntoView();
  //   }
  // }, [cloneData]);

  return (
    <Loader loaded={state.loaded}>

      {!showAddNew && 
        <Flex id="curatedAdmin" w="100%" justify="center" flexWrap="wrap" mt={10}>
          <Flex>
            <Input placeholder="Filter by name" onChange={(e) => {
              const newFilteredData = curatedData.filter(item => item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);
              setFilteredData(newFilteredData);
            }} />
            <Button ml={5} minW={115} onClick={() => {setShowAddNew(true)} }>Add New</Button>
          </Flex>
        </Flex>
      }
      {!cloneData && !showAddNew && filteredData && assetChains && <CuratedDataView data={filteredData} assetChains={assetChains} deployments={deployments} callback={
        (data) => {
          data = JSON.parse(JSON.stringify(data))
          delete data.name
          delete data.contracts
          delete data.id
          setCloneData(data)
          setShowAddNew(true)          
          }
        } />
      }
      {showAddNew && assetChains && 
        <Box border="1px" borderColor="gray.200" padding={4} borderRadius="md" width="80vw" mt={5}>
          <CuratedCrudForm initialFormData={cloneData || {}} assetChains={assetChains} deployments={deployments} callback={()=>{setShowAddNew(false); setCloneData(null); setFilteredData(curatedData);}} isNew={true} />
        </Box>
      }
      <ReservoirAdmin />

    </Loader>
  )
}
