import { Flex, Text, Link, Image, Stack, Spinner, useColorMode, Input, VStack, Button, Tabs, TabList, Tab, TabPanels, TabPanel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Select, Checkbox } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import Loader from 'react-loader'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { EMBLEM_API, EMBLEM_V2_API, EMBLEM_V3_API, contractAddresses } from '../constants'
import { DataGrid } from '@material-ui/data-grid';
import { initCuratedContracts, sdk } from '../utils'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'


export default function Explorer() {
  const router = useRouter()
  const { account, chainId, library } = useWeb3React()
  const { asPath } = router
  const urlParams = new URLSearchParams(window.location.search);
  const tabIndexFromUrl = urlParams.get('tab') ? Number(urlParams.get('tab')) : 0
  const filterTypeFromUrl = urlParams.get('filterType') || null
  const filterValueFromUrl = urlParams.get('filterValue') || null
  const [state, setState] = useState({ loaded: true })
  const [cloneData, setCloneData] = useState(null)
  const [curatedData, setCuratedData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [showAddNew, setShowAddNew] = useState(false);
  const [assetChains, setAssetChains] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [threadCount, setThreadCount] = useState(1)
  const [showUnqualifiedVaults, setShowUnqualifiedVaults] = useState(false)
  const [curatedContracts, setCuratedContracts] = useState(null)
  const [targetContract, setTargetContract] = useState(null)
  const [assetMetadataVaultedProjects, setAssetMetadataVaultedProjects] = useState([]);
  const [assetMetadataProjects, setAssetMetadataProjects] = useState([]);
  const [assetMetadataProjectAssets, setAssetMetadataProjectAssets] = useState([]);
  const [vaultProject, setVaultProject] = useState(null);
  const [balanceProgress, setBalanceProgress] = useState(null);
  const [livelinessProgress, setLivelinessProgress] = useState(null);
  const [vaults, setVaults] = useState([]);
  const [nonFilteredVaults, setNonFilteredVaults] = useState([]);
  const DataTable = DataGrid;
  const [tabIndex, setTabIndex] = useState(tabIndexFromUrl);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalImage, setModalImage] = useState(null)
  const { colorMode } = useColorMode();
  const [testOnly, setTestOnly] = useState(true);
  const isDark = colorMode === 'dark';

  const handleTabsChange = (index) => {
    setTabIndex(index);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('tab', index);
    router.push(`${router.pathname}?${urlParams.toString()}`);
  };

  useEffect(() => {
    if (targetContract) {
      filterMigratable({ target: { value: targetContract } });
    }
  }, [showUnqualifiedVaults]);

  useEffect(() => {
    if(filterValueFromUrl && !vaultProject) {
      setVaultProject(() => decodeURIComponent(filterValueFromUrl));
      if (filterTypeFromUrl === 'project') {
        getProjectVaults(decodeURIComponent(filterValueFromUrl));
      } else if (filterTypeFromUrl === 'asset_name') {
        getAssetNameVaults(decodeURIComponent(filterValueFromUrl));
      } else if (filterTypeFromUrl === 'asset_chain') {
        getAssetChainVaults(decodeURIComponent(filterValueFromUrl));
      } else if (filterTypeFromUrl === 'category') {
        getCategoryVaults(decodeURIComponent(filterValueFromUrl));
      } else if (filterTypeFromUrl === 'status') {
        getStatusVaults(decodeURIComponent(filterValueFromUrl));
      }
    }
  }, [filterValueFromUrl, vaultProject]);

  useEffect(() => {
    fetch(`${EMBLEM_V2_API}/curated`)
      .then(response => response.json())
      .then(data => {
        setCuratedData(data);
        setFilteredData(data);
      });
  }, []);

  useEffect(() => {
    if (!curatedContracts) {
      initCuratedContracts().then((data)=>{
        setCuratedContracts(data)
      })
    }
  }, []);
  

  useEffect(() => {
    if(curatedData && deployments.length === 0) {
      fetch(`${EMBLEM_V3_API}/v3/deployments`)
        .then(response => response.json())
        .then(data => {
          const newDataList = data.filter((item, index) => {
            return !curatedData.some(contract=> contract.contracts["1"] == item.address ) && item.name.includes("upgradableERC")
          });
          setDeployments(newDataList);
        });
    }
  }, [curatedData, deployments]);

  useEffect(() => {
    fetch(`${EMBLEM_V3_API}/asset_metadata/projects/vaulted`)
      .then(response => response.json())
      .then(data => {
        setAssetMetadataVaultedProjects(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${EMBLEM_V3_API}/asset_metadata/projects`)
      .then(response => response.json())
      .then(data => {
        setAssetMetadataProjects(data);
      });
  }, []);

async function getGasPrice() {
  const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=TMWK7RK9YTQ8VYWD8Q8GFAZS6UZ8MTH57E`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === '1') {
        return data.result.ProposeGasPrice
      } else {
        throw new Error('Failed to fetch gas prices');
      }
    })
    .catch(error => {
      console.error('Error fetching gas prices:', error);
      return null;
    });
}

  function getProjectAssets(project) {
    setVaultProject(project)
    fetch(`${EMBLEM_V3_API}/asset_metadata/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ project: project }),
    })
      .then(response => response.json())
      .then(data => {
        setAssetMetadataProjectAssets(data);
      });
  }

  function getProjectVaults(project) {
    setState({ loaded: false })
    setVaultProject(project)
    fetch(`${EMBLEM_V3_API}/vaults?project=${project}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        setVaults(data);
        setState({ loaded: true })
        router.push(`${router.pathname}?filterType=project&filterValue=${encodeURIComponent(project)}&tab=${tabIndex}`);
      });
  }

  function getAssetNameVaults(name) {
    setState({ loaded: false })
    setVaultProject(name)
   
    fetch(`${EMBLEM_V3_API}/vaults?asset_name=${encodeURIComponent(name)}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        setVaults(data);
        setState({ loaded: true })
        router.push(`${router.pathname}?filterType=asset_name&filterValue=${encodeURIComponent(name)}&tab=${tabIndex}`);
      });
  }

  function getAssetChainVaults(chain) {
    setState({ loaded: false })
    setVaultProject(chain)
    fetch(`${EMBLEM_V3_API}/vaults?asset_chain=${chain}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        setVaults(data);
        setState({ loaded: true })
        router.push(`${router.pathname}?filterType=asset_chain&filterValue=${chain}&tab=${tabIndex}`);
      });
  }

  function getCategoryVaults(category) {
    setState({ loaded: false })
    setVaultProject(category)
    fetch(`${EMBLEM_V3_API}/vaults?category=${category}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        setVaults(data);
        setState({ loaded: true })
        router.push(`${router.pathname}?filterType=category&filterValue=${category}&tab=${tabIndex}`);
      });
  }

  //getStatusVaults
  function getStatusVaults(status) {
    setState({ loaded: false })
    setVaultProject(status)
    fetch(`${EMBLEM_V3_API}/vaults?status=${status}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        setVaults(data);
        setState({ loaded: true })
      router.push(`${router.pathname}?filterType=status&filterValue=${status}&tab=${tabIndex}`);
      });
  }

  function getCuratedByContractNetwork(contract, network) {
    if(network == "mainnet") {
      let contractData = curatedData.find(item=>{return item.contracts[1] == contract})
      return contractData ? contractData : null;
    }
  }

async function estimateMigrateMany(toMigrate: any) {
    let targetContractObject = curatedData.find(item=>{return item.name == targetContract})
    if (!targetContract || !targetContractObject) {
      return alert('Target contract address not found')      
    } else if (toMigrate.length == 0) {
      return migrationConsole.log('No vaults to migrate')
    }

    try {
      
      let abi: any = targetContractObject.collectionType == 'ERC1155'? contractAddresses.erc1155Abi : contractAddresses.erc721aAbi;
      const contract = new Contract(targetContractObject.contracts[chainId], abi);
      const contractWithSigner = contract.connect(library.getSigner());
      let gasPrice = await getGasPrice()
      let gasEstimate: any;
      if (targetContractObject.collectionType === 'ERC721a') {
        gasEstimate = await contractWithSigner.estimateGas.mintMany(
          toMigrate.map(item => item.to),
          toMigrate.map(item => item.tokenId)
        );
      } else if (targetContractObject.collectionType === 'ERC1155') {
        gasEstimate = await contractWithSigner.estimateGas.migrationMintMany(
          toMigrate.map(item => item.serial),
          toMigrate.map(item => item.to),
          toMigrate.map(item => item.tokenId)
        );
      } else {
        throw new Error('Unsupported contract collection type');
      }
      let gasEstimateFormatted =  gasEstimate * gasPrice * 1e-9; 
      migrationConsole.log(`Estimated gas for mintMany: ${gasEstimateFormatted}`);
    } catch (error) {
      migrationConsole.log('Error estimating gas for mintMany:', error);
    }
}
async function performMigrateMany(toMigrate: any) {
    let targetContractObject = curatedData.find(item=>{return item.name == targetContract})
    if (!targetContract || !targetContractObject) {
      return alert('Target contract address not found')      
    } else if (toMigrate.length == 0) {
      return alert('No vaults to migrate')
    }

    try {
      let abi: any = targetContractObject.collectionType == 'ERC1155'? contractAddresses.erc1155Abi : contractAddresses.erc721aAbi;
      const contract = new Contract(targetContractObject.contracts[chainId], abi);
      const contractWithSigner = contract.connect(library.getSigner());
      let tx;
      if (targetContractObject.collectionType === 'ERC721a') {
        tx = await contractWithSigner.mintMany(
          toMigrate.map(item => item.to),
          toMigrate.map(item => item.tokenId)
        );
      } else if (targetContractObject.collectionType === 'ERC1155') {
        tx = await contractWithSigner.migrationMintMany(
          toMigrate.map(item => item.serial),
          toMigrate.map(item => item.to),
          toMigrate.map(item => item.tokenId)
        );
      } else {
        throw new Error('Unsupported contract collection type');
      }
      await tx.wait();
      alert(`TX hash: ${tx.hash}`);
      migrationConsole.log('Minted vaults:', toMigrate.length);
      migrationConsole.log('refreshing')
      await Promise.all(toMigrate.map(item => {
        if (targetContractObject.collectionType === 'ERC721a') {
          return sdk.fetchMetadata(item.tokenId);
        } else if (targetContractObject.collectionType === 'ERC1155') {
          sdk.fetchMetadata(`${Number(item.serial)}`);
          return sdk.fetchMetadata(`${Number(item.serial)}1`);
        } else {
          throw new Error('Unsupported contract collection type');
        }
      }));
      if (targetContractObject.collectionType === 'ERC721a') {
        await sdk.checkLivelinessBulk(toMigrate.map(item => item.tokenId), chainId);
      } else if (targetContractObject.collectionType === 'ERC1155') {
        await sdk.checkLivelinessBulk(toMigrate.map(item => `${Number(item.serial)}1`), chainId);
        await sdk.checkLivelinessBulk(toMigrate.map(item => `${Number(item.serial)}`), chainId);
      }
      migrationConsole.log('Refreshed metadata and liveliness for migrated vaults')
    } catch (error) {
      migrationConsole.log('Error minting vaults:', error);
    }
}

let migrationConsole = {
  log: (...toLog) => {
    const migrationUpdatesElement = document.getElementById('migrationUpdates');
    if (migrationUpdatesElement) {
      const updateMessage = document.createElement('p');
      updateMessage.textContent = toLog.join(' ');
      migrationUpdatesElement.appendChild(updateMessage);
    }
  }
};

function handleMigration(keyField: string) {
    if (!targetContract) {
      return alert('Target contract is not defined');
    }
    const selectedRows = document.querySelectorAll('.MuiDataGrid-row.Mui-selected');
    let toMigrate = [];
    function processSelectedRows(index, attempts = 0) {
      if (index >= selectedRows.length) {
        migrationConsole.log('Migratable vaults:', toMigrate.length);
        return testOnly? estimateMigrateMany(toMigrate) : performMigrateMany(toMigrate);
      }

      const row = selectedRows[index];
      const vaultIdCell = Array.from(row.children).find(cell => cell.getAttribute('data-field') === keyField);
      const vaultId = vaultIdCell ? vaultIdCell.getAttribute('data-value') : null;
      const rowData = vaults.find((vault) => vault.tokenid === vaultId);

      if (rowData) {
        migrationConsole.log('Migrating vault:', rowData.tokenid);
        fetch(`http://localhost:3001/jump/${rowData.tokenid}/${targetContract}/${rowData.network == "mainnet" ? 1 : 99999999999}?testOnly=${testOnly}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'x-api-key': localStorage.apiKey
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            migrationConsole.log('Error migrating vault:', data.msg);
          } else {
            migrationConsole.log('Successfully migrated vault:', rowData.tokenid);
            toMigrate.push(data);
          }
          processSelectedRows(index + 1);
        })
        .catch(error => {
          alert(`Error making API call:', ${error}`);
          processSelectedRows(index + 1);
        });
      } else {
        processSelectedRows(index + 1);
      }
    }
    processSelectedRows(0);
  }

  function exportSelectedRecords() {
    const selectedRows = document.querySelectorAll('.MuiDataGrid-row.Mui-selected');
    let recordsToExport;

    if (selectedRows.length > 0) {
      const selectedTokenIds = Array.from(selectedRows).map(row => {
        const vaultIdCell = Array.from(row.children).find(cell => cell.getAttribute('data-field') === 'tokenid');
        return vaultIdCell ? vaultIdCell.getAttribute('data-value') : null;
      }).filter(tokenid => tokenid !== null);

      recordsToExport = vaults.filter(vault => selectedTokenIds.includes(vault.tokenid));
    } else {
      recordsToExport = vaults;
    }

    const json = JSON.stringify(recordsToExport, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_records.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleLivelinessRefresh() {
    let threadsFinished = 0
    // let targetContractObject = curatedData.find(item=>{return item.name == targetContract})
    const nonClaimedVaults = vaults.reverse().filter((vault, index, self) =>
        index === self.findIndex((v) => v.tokenid === vault.tokenid && v.status !== 'claimed' && v.status !== 'deleted')
    );

    // let completedRequests = 0;
    const totalVaults = nonClaimedVaults.length;
    const vaultsPerThread = Math.ceil(totalVaults / threadCount);

    const checkLivelinessRecursively = async (index, threadIndex, retryCount = 0) => {
      const currentIndex = index + threadIndex * vaultsPerThread;
      if (currentIndex >= totalVaults) {
        // bulk update emblem.markets
        
        // Finally finish
        return;
      }

      const vault = nonClaimedVaults[currentIndex];
      if (vault && vault.tokenid) {        
        migrationConsole.log('Refreshing liveliness for vault', vault.tokenid, 'at index', currentIndex, 'of', totalVaults, 'vaults', 'thread #', threadIndex);
        setLivelinessProgress(`${threadsFinished} of ${totalVaults} vaults * ${threadCount} threads`);

        try {
          // The Work Goes Here
          let metadata
          if (vault.category === 'ERC721a') {
            metadata = await sdk.fetchMetadata(vault.tokenid);
          } else if (vault.category === 'ERC1155') {
            metadata = await sdk.fetchMetadata(vault.tokenid);
            metadata = await sdk.fetchMetadata(`${vault.tokenid}1 `);       
          } else {
            metadata = await sdk.fetchMetadata(vault.tokenid);
            if (vault.serialNumber) {
              await sdk.fetchMetadata(`${Number(vault.serialNumber)}`);
              await sdk.fetchMetadata(`${Number(vault.serialNumber)}1`);
            }
          }         
          // --Done
          threadsFinished = threadsFinished+1
          setTimeout(() => checkLivelinessRecursively(index + 1, threadIndex), 5000);
        } catch (error) {
          migrationConsole.log('Error refreshing liveliness:', error);
          if (retryCount < 7) {
            const retryDelay = Math.pow(2, retryCount) * 1000;
            migrationConsole.log('Retrying in', retryDelay, 'ms');
            setTimeout(() => checkLivelinessRecursively(index, threadIndex, retryCount + 1), retryDelay);
          } else {
            migrationConsole.log('Failed to refresh liveliness after 7 attempts, moving to next index');
            setTimeout(() => checkLivelinessRecursively(index + 1, threadIndex), 5000);
          }
        }
      } else {
        setTimeout(() => checkLivelinessRecursively(index + 1, threadIndex), 0);
      }

      if (threadsFinished >= totalVaults) {
        setLivelinessProgress("complete");
      }
    };

    for (let i = 0; i < threadCount; i++) {
        const initialIndex = i * vaultsPerThread;
        if (initialIndex < totalVaults) {
          checkLivelinessRecursively(0, i);
        }
    }    
}

  function handleBalanceRefresh() {
    let threadsFinished = 0
    const nonClaimedVaults = vaults.reverse().filter((vault, index, self) =>
        index === self.findIndex((v) => v.tokenid === vault.tokenid && v.status !== 'claimed' && v.status !== 'deleted')
    );

    // let completedRequests = 0;
    const totalVaults = nonClaimedVaults.length;
    const vaultsPerThread = Math.ceil(totalVaults / threadCount);

    const refreshBalanceRecursively = async (index, threadIndex, retryCount = 0) => {
      const currentIndex = index + threadIndex * vaultsPerThread;
      if (currentIndex >= totalVaults) {
        return;
      }

      const vault = nonClaimedVaults[currentIndex];
      if (vault && vault.tokenid) {
        // setThreadsCompleted(prevCount => prevCount + 1);
        
        console.log('Refreshing balance for vault', vault.tokenid, 'at index', currentIndex, 'of', totalVaults, 'vaults', 'thread #', threadIndex);
        setBalanceProgress(`${threadsFinished} of ${totalVaults} vaults * ${threadCount} threads`);

        try {
          await sdk.refreshBalance(vault.tokenid);
          // setThreadsCompleted(threadsCompleted + 1);
          threadsFinished = threadsFinished+1
          setTimeout(() => refreshBalanceRecursively(index + 1, threadIndex), 5000);
        } catch (error) {
          console.error('Error refreshing balance:', error);
          if (retryCount < 7) {
            const retryDelay = Math.pow(2, retryCount) * 1000;
            console.log('Retrying in', retryDelay, 'ms');
            setTimeout(() => refreshBalanceRecursively(index, threadIndex, retryCount + 1), retryDelay);
          } else {
            console.log('Failed to refresh balance after 7 attempts, moving to next index');
            // setThreadsCompleted(threadsCompleted + 1);
            setTimeout(() => refreshBalanceRecursively(index + 1, threadIndex), 5000);
          }
        }
      } else {
        setTimeout(() => refreshBalanceRecursively(index + 1, threadIndex), 0);
      }

      if (threadsFinished >= totalVaults) {
        setBalanceProgress("complete");
      }
    };

    for (let i = 0; i < threadCount; i++) {
        const initialIndex = i * vaultsPerThread;
        if (initialIndex < totalVaults) {
            refreshBalanceRecursively(0, i);
        }
    }    
}

async function filterMigratable(e) {
  if (e.target.value === '' || (targetContract && e.target.value !== targetContract)) {
    setVaults(nonFilteredVaults);
    if (e.target.value === '') {
      setTargetContract(null);
    }
    return;
  } else {
    setTargetContract(e.target.value);
  }

  let contractRules = await sdk.fetchCuratedContractByName(e.target.value, curatedContracts);

  // Store the original list of vaults if nonFilteredVaults is empty
  if (nonFilteredVaults.length === 0) {
    setNonFilteredVaults(vaults);
  }

  // Use nonFilteredVaults as the source list for filtering
  const vaultList = nonFilteredVaults.length > 0 ? nonFilteredVaults : vaults;

  const eligibleVaults = vaultList.filter(vault => {
    const isNotFlagged = !vault.fraud;
    const isLegacyContract = vault.category === "erc721Legacy";
    const hasPositiveBalance = vault.balance >= 1;
    const isNotJumped = vault.jumps_count === 0;
    const isNotClaimed = vault.status !== 'claimed';
    const isMinted = vault.status == 'minted';
    const isMainnet = vault.network === 'mainnet'

    // Assuming allowed is a function within contractRules
    const isAllowed = contractRules.allowed(vault.balances, contractRules);

    return isNotFlagged && isLegacyContract && hasPositiveBalance && isNotJumped && isNotClaimed && isAllowed && isMainnet && isMinted;
  });

  const unqualifiedVaults = vaultList.filter(vault => {
    const isNotFlagged = !vault.fraud;
    const isLegacyContract = vault.category === "erc721Legacy";
    const hasPositiveBalance = vault.balance >= 1;
    const isNotJumped = vault.jumps_count === 0;
    const isNotClaimed = vault.status !== 'claimed';
    const isMinted = vault.status == 'minted';
    const isMainnet = vault.network === 'mainnet'

    // Assuming allowed is a function within contractRules
    const isAllowed = contractRules.allowed(vault.balances, contractRules);

    return !(isNotFlagged && isLegacyContract && hasPositiveBalance && isNotJumped && isNotClaimed && isAllowed && isMainnet && isMinted);
  });

  setVaults(showUnqualifiedVaults ? unqualifiedVaults : eligibleVaults);
}





  return (
    <Loader loaded={state.loaded}>
      <Tabs index={tabIndex} onChange={handleTabsChange} colorScheme={isDark ? "white" : "black"}>
        <TabList>
          {['Tracked Metadata Projects', 'Metadata Project', 'Vaulted Projects', 'Vaults', 'Curated Collections'].map((tabName, index) => (
            <Tab 
              key={index}
              isDisabled={!(index === 0 || index === 2 || index === 4) && !vaultProject}
              fontWeight={tabIndex === index ? "bold" : "normal"}
              color={tabIndex === index ? (isDark ? "white" : "black") : (isDark ? "gray" : "black")}
            >
              {tabName} {vaultProject && (index === 1 || index === 3) ? `(: ${vaultProject})` : ``}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel>
            {assetMetadataProjects.length > 0 && 
              <DataTable
                style={{ backgroundColor: 'var(--background-color)', color: isDark ? 'white' : 'black', margin: '20px', borderRadius: '10px' }}
                columns={[
                  { 
                    field: 'project_name', 
                    headerName: 'Project Name', 
                    width: 200,
                    renderCell: (params) => (
                      <a href="#" onClick={(e) => {e.preventDefault(); getProjectAssets(params.value); getProjectVaults(params.value); handleTabsChange(1);}}>{params.value}</a>
                    ),
                  },
                  { field: 'protocol', headerName: 'Protocol', width: 200 },
                  { field: 'total_assets_count', headerName: 'Total Assets Count', width: 200 },
                ]}
                rows={assetMetadataProjects.map((project, index) => ({
                  id: index,
                  project_name: project.project_name,
                  protocol: project.protocol,
                  total_assets_count: project.total_assets_count,
                }))}
                autoHeight= {true}
              />
            }
          </TabPanel>          
          <TabPanel>
          {/* SAMPLE DATA {
          "id": 94283,
          "created_at": "2024-05-31T16:05:50.25022+00:00",
          "asset_name": "1BTCFP #1",
          "image": "https://ordinals.com/content/84b5627bd88f50a44bdaed48c4a4363542fdaf7ecea540b6d152640ac0e18ffbi0",
          "alt_image": null,
          "embed": null,
          "video": null,
          "project_name": "1 BTC FP",
          "chain": "BTC",
          "artist_name": null,
          "card_number": null,
          "supply": "500",
          "series": null,
          "year": null,
          "source": null,
          "link": "https://ordinals.com/inscription/84b5627bd88f50a44bdaed48c4a4363542fdaf7ecea540b6d152640ac0e18ffbi0",
          "inscription_id": "84b5627bd88f50a44bdaed48c4a4363542fdaf7ecea540b6d152640ac0e18ffbi0",
          "misc": {
            "attributes": []
          },
          "protocol": "ordinals",
          "asset_chain": "ordinalsbtc"
        } */}
          {assetMetadataProjectAssets.length > 0 && (
            <DataTable
              style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)', margin: '20px', borderRadius: '10px' }}
              columns={[
                { 
                  field: 'asset_name', 
                  headerName: 'Asset Name', 
                  width: 200,
                  renderCell: (params) => (
                    <a href="#" onClick={(e) => {e.preventDefault(); getAssetNameVaults(params.value); handleTabsChange(1);}}>{params.value}</a>
                  ),
                },
                { field: 'project_name', headerName: 'Project Name', width: 200 },
                { field: 'chain', headerName: 'Chain', width: 100 },
                { field: 'supply', headerName: 'Supply', width: 100 },
                { field: 'image', headerName: 'Image', width: 200, renderCell: (params) => (
                  <Box position="relative" zIndex="docked">
                    <Image 
                      src={params?.value?.toString()} 
                      alt="Asset Image" 
                      boxSize="64px"
                      onClick={() => { setModalImage(params?.value?.toString()); onOpen(); }}
                    />
                  </Box>
                ) },
                { field: 'link', headerName: 'Link', width: 300, renderCell: (params) => (
                  <Link href={params?.value?.toString()} isExternal>
                    {params?.value?.toString()}
                  </Link>
                ) },
              ]}
              rows={assetMetadataProjectAssets.map((asset, index) => ({
                id: asset.id,
                created_at: asset.created_at,
                asset_name: asset.asset_name,
                project_name: asset.project_name,
                chain: asset.chain,
                supply: asset.supply,
                link: asset.link,
                image: asset.image,
              }))}
              autoHeight={true}
            />
          )}
          </TabPanel>
          <TabPanel>
            {assetMetadataVaultedProjects.length > 0 && 
              <DataTable
                style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)', margin: '20px', borderRadius: '10px' }}
                columns={[
                  { 
                    field: 'project', 
                    headerName: 'Project', 
                    width: 200,
                    renderCell: (params) => (
                      <a href="#" onClick={(e) => {e.preventDefault(); getProjectVaults(params.value); getProjectAssets(params.value); handleTabsChange(3);}}>{params.value}</a>
                    ),
                  },
                  { field: 'project_count', headerName: 'Project Count', width: 200 },
                ]}
                rows={assetMetadataVaultedProjects.map((project, index) => ({
                  id: index,
                  project: project.project,
                  project_count: project.project_count,
                }))}
                autoHeight= {true}
              />
            }
          </TabPanel>
          <TabPanel>
          {(vaults?.length> 0 || targetContract) ? (
            <>
              <Flex direction="row" align="center">
                <Input
                  type="number"
                  ml = {5}
                  value={threadCount}
                  onChange={(e) => setThreadCount(Number(e.target.value))}
                  placeholder="Enter thread count"
                  width="100px"
                />
                <Button margin={5} onClick={handleBalanceRefresh}>
                    <div>
                      Refresh Internal Balances {balanceProgress}
                    </div>
                </Button>
                |
                <Button isDisabled={!targetContract} margin={5} onClick={()=>{handleMigration('tokenid')}}>
                    <div>
                     Migrate
                    </div>
                </Button>
                <Button margin={5} onClick={() => handleLivelinessRefresh()}>
                    <div>
                      Refresh Liveliness {livelinessProgress}
                    </div>
                </Button>
                <Checkbox
                  ml={5}
                  isChecked={testOnly}
                  onChange={(e) => {
                    setTestOnly(e.target.checked);
                  }}
                >
                  Test Only
                </Checkbox>
                <Select margin={5} placeholder="Select contract" onChange={async (e) => await filterMigratable(e)} width="350px">
                  {curatedContracts.map((contract, index) => (
                    <option key={index} value={contract.name}>
                      {contract.name}
                    </option>
                  ))}
                </Select>
                |
              <Input
                placeholder="Search for Asset Name"
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  const filteredVaults = nonFilteredVaults.filter(vault =>
                    vault.asset_name.toLowerCase().includes(searchValue)
                  );
                  setVaults(filteredVaults);
                }}
                width="300px"
                ml={5}
              />
              <Checkbox
                ml={5}
                onChange={async (e) => {
                  setShowUnqualifiedVaults(e.target.checked)                  
                }}
              >
                Show Unqualified Vaults
              </Checkbox>
              </Flex>
              <Flex alignItems="center">
                <Button margin={5} onClick={() => exportSelectedRecords()}>
                  Export Selected Records
                </Button>
                  <Box id="migrationUpdates" marginLeft={5} padding={5} borderWidth={1} borderRadius="lg" maxHeight="200px" overflowY="auto">
                    <Text fontSize="lg" fontWeight="bold">{testOnly? 'TEST MODE: updates' : 'Updates'}</Text>                    
                  </Box>
              </Flex>
              <DataTable
                style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)', margin: '20px', borderRadius: '10px' }}
                columns={[
                  { 
                    field: 'asset_name', 
                    headerName: 'Asset Name', 
                    width: 200,
                    renderCell: (params) => (
                      <a href="#" onClick={(e) => {e.preventDefault(); getAssetNameVaults(params.value);}}>{params.value}</a>
                    ),
                  },
                  { 
                    field: 'project', 
                    headerName: 'Project', 
                    width: 200,
                    renderCell: (params) => (
                      <a href="#" onClick={(e) => {e.preventDefault(); getProjectVaults(params.value);}}>{params.value}</a>
                    ),
                  },
                  { 
                    field: 'asset_chain', 
                    headerName: 'Chain', 
                    width: 100,
                    renderCell: (params) => (
                      <a href="#" onClick={(e) => {e.preventDefault(); getAssetChainVaults(params.value);}}>{params.value}</a>
                    ),
                  },
                  { 
                    field: 'network', 
                    headerName: 'Network', 
                    width: 150,
                    renderCell: (params) => (
                      <span>{params.value}</span>
                    ),
                  },
                  { field: 'balance', headerName: 'Balance', width: 100 },
                  { field: 'balances', headerName: 'Inside Balances', width: 200, renderCell: (params) => (
                    <span>{Array.isArray(params.value) ? params.value.length : 0}</span>
                  ) },
                  { field: 'image', headerName: 'Image', width: 100, renderCell: (params) => (
                    <Box position="relative" zIndex="docked">
                      <Image 
                        src={params?.value?.toString()} 
                        alt="Asset Image" 
                        boxSize="64px"
                        onClick={() => { setModalImage(params?.value); onOpen(); }}
                      />
                    </Box>
                  ) },
                  { 
                    field: 'tokenid', headerName: 'Token ID', width: 150, renderCell: (params) => (
                      <Link href={params.row.category === 'erc721Legacy' ? `https://emblem.finance/nft?id=${params.value}` : `https://emblem.finance/nft2?id=${params.value}`} isExternal>
                        {params.value}
                      </Link>
                    ),
                  },
                { 
                    field: 'category', 
                    headerName: 'Category', 
                    width: 150,
                    renderCell: (params) => (
                      <a href="#" onClick={(e) => {e.preventDefault(); getCategoryVaults(params.value);}}>{params.value}</a>
                    ),
                },
                { 
                    field: 'status', 
                    headerName: 'Status', 
                    width: 150,
                    renderCell: (params) => (
                      <a href="#" onClick={(e) => {e.preventDefault(); getStatusVaults(params.value);}}>{params.value}</a>
                    ),
                },
                { field: 'contract', headerName: 'Contract', width: 150, renderCell: (params) => {

                  return (
                    <>
                    {params.row.category !== 'erc721Legacy' && <Image src={getCuratedByContractNetwork(params.value, params.row.network)?.loadingImages[0]} boxSize="25px"></Image>}
                  <Link href={`https://etherscan.io/address/${params.value}`} isExternal>
                    {params.row.category === 'erc721Legacy' ? 'Legacy' : getCuratedByContractNetwork(params.value, params.row.network)?.name}
                  </Link>
                  </>
                )} },
                { 
                    field: 'fraud', 
                    headerName: '🚩', 
                    width: 100, 
                    renderCell: (params) => (
                      params.value ? '🚩' : ''
                    ),
                },
                { 
                    field: 'jumps_count', 
                    headerName: 'Jumps', 
                    width: 150,
                    renderCell: (params) => (
                      <span>{params.value}</span>
                    ),
                },
                ]}
                rows={vaults.map((asset, index) => ({
                  id: asset.tokenid,
                  asset_name: asset.asset_name,
                  project: asset.project,
                  asset_chain: asset.asset_chain,
                  network: asset.network,
                  balance: asset.balance,
                  balances: asset.balances,
                  image: asset.image,
                  tokenid: asset.tokenid,
                  category: asset.category,
                  status: asset.status,
                  contract: asset.contract,
                  fraud: asset.fraud,
                  jumps_count: asset.jumps_count,
                }))}
                autoHeight={true}
                checkboxSelection
              />                
         </>
          ): null}
          </TabPanel>
          <TabPanel>
            {curatedData && (
           <DataTable
           style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)', margin: '20px', borderRadius: '10px' }}
           columns={[
             { 
               field: 'name', 
               headerName: 'Asset Name', 
               width: 200,
               renderCell: (params) => (
                 <a href="#" onClick={(e) => {e.preventDefault(); getAssetNameVaults(params.value);}}>{params.value}</a>
               ),
             },
             { field: 'description', headerName: 'Description', width: 200 },
             { 
               field: 'addressChain', 
               headerName: 'Chain', 
               width: 100,
               renderCell: (params) => (
                 <a href="#" onClick={(e) => {e.preventDefault(); getAssetChainVaults(params.value);}}>{params.value}</a>
               ),
             },
             { field: 'balanceQty', headerName: 'Balance Quantity', width: 100 },
             { field: 'loadingImages', headerName: 'Image', width: 200, renderCell: (params) => (
               <Box position="relative" zIndex="docked">
                 <Image 
                   src={params?.value?.[0]} 
                   alt="Asset Image" 
                   boxSize="64px"
                   onClick={() => { setModalImage(params?.value?.[0]); onOpen(); }}
                 />
               </Box>
             ) },
             { field: 'balanceUrl', headerName: 'Balance URL', width: 400, renderCell: (params) => (
               <Link href={params?.value.toString()} isExternal style={{ fontSize: '8px' }}>
                 {params?.value}
               </Link>
             ) },
           { 
               field: 'vaultCollectionType', 
               headerName: 'Collection Type', 
               width: 200 
           },
           ]}
                rows={curatedData.map((asset, index) => ({
                  id: asset.id,
                  created_at: asset.created_at,
                  name: asset.name,
                  description: asset.description,
                  addressChain: asset.addressChain,
                  balanceQty: asset.balanceQty,
                  balanceUrl: asset.balanceUrl,
                  loadingImages: asset.loadingImages,
                  vaultCollectionType: asset.vaultCollectionType,
                }))}
           autoHeight={true}
         />
          )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Asset Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={modalImage} alt="Asset Image" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Loader>
  )
}

