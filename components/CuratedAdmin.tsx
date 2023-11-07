import { Flex, Text, Link, Image, Stack, Spinner, useColorMode, Input, VStack } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import Loader from 'react-loader'
import Refreshing from './Refreshing'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { validImage } from '../utils'
import { EMBLEM_API } from '../constants'
import CoinBalance from './partials/CoinBalance'
import Embed from './Embed'
import CuratedCrudForm from './partials/CuratedCrudForm'
import CuratedDataView from './partials/CuratedDataView'

export default function CuratedAdmin() {
  const { query } = useRouter()
  const { account, chainId } = useWeb3React()
  const [vaults, setVaults] = useState([])
  const [state, setState] = useState({ loaded: true })
  const [loadingApi, setLoadingApi] = useState(false)
  const [editData, setEditData] = useState(null)
  const [experimental, setExperimental] = useState(query.experimental)
  const { colorMode } = useColorMode()
  const [curatedData, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);


  useEffect(() => {
    fetch('https://v2.emblemvault.io/curated')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredData(data);
      });
  }, []);

  useEffect(() => {
    if (editData) {
      document.getElementById('curatedAdmin').scrollIntoView();
    }
  }, [editData]);

  return (
    <Loader loaded={state.loaded}>
      {/* {loadingApi ? <Refreshing /> : ''} */}

      <Flex id="curatedAdmin" w="100%" justify="center" flexWrap="wrap" mt={10}>
        <Flex>
          <Input placeholder="Filter by name" onChange={(e) => {
            const newFilteredData = curatedData.filter(item => item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);
            setFilteredData(newFilteredData);
          }} />
        </Flex>
      </Flex>
      {!editData && filteredData && <CuratedDataView data={filteredData} callback={(data) => { setEditData(data) }} />}
      
    </Loader>
  )
}
