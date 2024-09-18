import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel, GridRowParams } from '@material-ui/data-grid';
import { Box, Image, Link, Tooltip, Text } from '@chakra-ui/react';
import { ExpandMore as ExpandMoreIcon, ChevronRight as ChevronRightIcon } from '@material-ui/icons';
import styled from '@emotion/styled';

interface VaultsDataTableProps {
  vaults: any[];
  onAssetNameClick: (assetName: string) => void;
  onProjectClick: (project: string) => void;
  onAssetChainClick: (chain: string) => void;
  onCategoryClick: (category: string) => void;
  onStatusClick: (status: string) => void;
  getCuratedByContractNetwork: (contract: string, network: string) => any;
  setModalImage: (image: string) => void;
  onOpen: () => void;
  selectionModel: GridSelectionModel;
  onSelectionModelChange: (newSelectionModel: GridSelectionModel) => void;
  onRowClick?: (params: GridRowParams) => void;
  enableColumnFilter?: boolean;
}

const StyledDataGrid = styled(DataGrid)`
  .injected-row {
    background-color: rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(255, 255, 255, 0.1);
  }
`;

const VaultsDataTable: React.FC<VaultsDataTableProps> = ({
  vaults,
  onAssetNameClick,
  onProjectClick,
  onAssetChainClick,
  onCategoryClick,
  onStatusClick,
  getCuratedByContractNetwork,
  setModalImage,
  onOpen,
  selectionModel,
  onSelectionModelChange,
  onRowClick,
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRowExpansion = (id: string) => {
    setExpandedRows(prevExpandedRows => {
      const newExpandedRows = new Set(prevExpandedRows);
      if (newExpandedRows.has(id)) {
        newExpandedRows.delete(id);
      } else {
        newExpandedRows.add(id);
      }
      return newExpandedRows;
    });
  };

  const columns: GridColDef[] = [
    { 
      field: 'expansion',
      headerName: '',
      width: 50,
      renderCell: (params) => (
        <Box onClick={(e) => {
          e.stopPropagation();
          toggleRowExpansion(params.id.toString());
        }}>
          {expandedRows.has(params.id.toString()) ? <ExpandMoreIcon /> : <ChevronRightIcon />}
        </Box>
      ),
      sortable: false,
      filterable: false,
    },
    { 
      field: 'asset_name', 
      headerName: 'Asset Name', 
      width: 200,
      renderCell: (params) => (
        <a href="#" onClick={(e) => {e.preventDefault(); onAssetNameClick(params.value as string);}}>{params.value}</a>
      ),
      filterable: true,
    },
    { 
      field: 'project', 
      headerName: 'Project', 
      width: 150, 
      renderCell: (params) => (
        <a href="#" onClick={(e) => {e.preventDefault(); onProjectClick(params.value as string);}}>{params.value}</a>
      ),
      filterable: true,
    },
    { 
      field: 'asset_chain', 
      headerName: 'Chain', 
      width: 100, 
      renderCell: (params) => (
        <a href="#" onClick={(e) => {e.preventDefault(); onAssetChainClick(params.value as string);}}>{params.value}</a>
      ),
      filterable: true,
    },
    { field: 'network', headerName: 'Network', width: 100, filterable: true },
    { field: 'balance', headerName: 'Balance', width: 100, type: 'number', filterable: true },
    { 
      field: 'balances', 
      headerName: 'Inside Balances', 
      width: 150, 
      renderCell: (params) => {
        const balances = params.value as any[];
        const balanceCount = Array.isArray(balances) ? balances.length : 0;
        return (
          <Tooltip label={JSON.stringify(balances, null, 2)} placement="top" hasArrow>
            <Box>{balanceCount}</Box>
          </Tooltip>
        );
      },
      sortComparator: (v1, v2) => {
        const balances1 = Array.isArray(v1) ? v1.length : 0;
        const balances2 = Array.isArray(v2) ? v2.length : 0;
        return balances1 - balances2;
      },
      filterable: true,
    },
    { 
      field: 'expired', 
      headerName: 'Expired', 
      width: 100, 
      renderCell: (params) => 
        params.row.balances?.some((item: any) => item.traits?.some((trait: any) => trait.value === "Expired")) ? '⏳' : '',
      filterable: true,
    },
    { 
      field: 'image', 
      headerName: 'Image', 
      width: 100, 
      renderCell: (params) => (
        <Image 
          src={params.value as string} 
          alt="Asset Image" 
          boxSize="64px"
          onClick={() => { setModalImage(params.value as string); onOpen(); }}
        />
      ),
      filterable: false,
    },
    { 
      field: 'tokenid', 
      headerName: 'Token ID', 
      width: 200, 
      renderCell: (params) => (
        <Link href={params.row.category === 'erc721Legacy' ? `https://emblem.finance/nft?id=${params.value}` : `https://emblem.finance/nft2?id=${params.value}`} isExternal>
          {params.value}
        </Link>
      ),
      filterable: true,
    },
    { 
      field: 'category', 
      headerName: 'Category', 
      width: 150, 
      renderCell: (params) => (
        <a href="#" onClick={(e) => {e.preventDefault(); onCategoryClick(params.value as string);}}>{params.value}</a>
      ),
      filterable: true,
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150, 
      renderCell: (params) => (
        <a href="#" onClick={(e) => {e.preventDefault(); onStatusClick(params.value as string);}}>{params.value}</a>
      ),
      filterable: true,
    },
    { 
      field: 'contract', 
      headerName: 'Contract', 
      width: 200, 
      renderCell: (params) => (
        <>
          {params.row.category !== 'erc721Legacy' && <Image src={getCuratedByContractNetwork(params.value as string, params.row.network)?.loadingImages[0]} boxSize="25px" />}
          <Link href={`https://etherscan.io/address/${params.value}`} isExternal>
            {params.row.category === 'erc721Legacy' ? 'Legacy' : getCuratedByContractNetwork(params.value as string, params.row.network)?.name}
          </Link>
        </>
      ),
      filterable: true,
    },
    { field: 'fraud', headerName: '🚩', width: 70, renderCell: (params) => params.value ? '🚩' : '', filterable: true },
    { field: 'jumps_count', headerName: 'Jumps', width: 100, type: 'number', filterable: true },
  ];

  const rows = vaults.flatMap(vault => {
    const baseRow = {
      ...vault,
      id: vault.tokenid,
    };

    if (expandedRows.has(vault.tokenid)) {
      return [
        baseRow,
        ...(vault.balances || []).map((balance, index) => ({
          id: `${vault.tokenid}-${index}`,
          asset_name: balance.name,
          project: balance.project,
          asset_chain: balance.coin,
          balance: balance.balance,
          image: balance.image,
          // Add other fields as needed, or use null for fields that don't apply
          network: null,
          balances: null,
          expired: null,
          tokenid: null,
          category: null,
          status: null,
          contract: null,
          fraud: null,
          jumps_count: null,
          isInjected: true, // Add this flag to identify injected rows
        }))
      ];
    }
    return [baseRow];
  });

  return (
    <Box height="auto" minHeight={800} width="100%" overflow="visible">
      <StyledDataGrid
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100, 200, 500]}
        checkboxSelection
        selectionModel={selectionModel}
        onSelectionModelChange={onSelectionModelChange}
        onRowClick={onRowClick}
        getRowId={(row) => row.id}
        rowHeight={52}
        getRowClassName={(params) => 
          params.row.isInjected ? 'injected-row' : ''
        }
        style={{
          backgroundColor: 'var(--background-color)',
          color: 'var(--text-color)',
          overflow: 'visible',
        }}
        autoHeight
        disableColumnMenu={false}
        components={{
          Toolbar: () => null, // Remove default toolbar to hide global filter
        }}
      />
    </Box>
  );
};

export default VaultsDataTable;