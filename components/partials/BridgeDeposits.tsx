import React  from 'react';
import useEffect from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Checkbox } from '@chakra-ui/core'

import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { EMBLEM_API } from '../../constants'
import { fromContractValue, CHAIN_ID_NAMES } from '../../utils'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

interface DepositProps {
    chainId: number;
  }

export default function BridgeDeposits(props: DepositProps) {
    let previousChainId
    
    const { account } = useWeb3React()
    const [showPending, setShowPending] = useState(false)
    const [hasDataRows, setHasDataRows] = useState(false)
    const [dataRows, setDataRows] = useState([])
    const [chainId, setChainId] = useState(props.chainId)
    const classes = useStyles();

    React.useEffect(()=>{
        console.log(chainId, props.chainId)
        if (chainId !== props.chainId) {
            setChainId(props.chainId)
            console.log("refresh data")
            setHasDataRows(false)
        }        
    })
    
    !hasDataRows ? (
        getDeposits(deposits => {
            setHasDataRows(true)
            setDataRows(deposits)
        })
    ) : null
    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Amount </TableCell>
                            <TableCell align="right">For</TableCell>
                            <TableCell align="left">Hash</TableCell>
                            <TableCell align="right">To Chain</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataRows.sort((a, b) => (b.blockNumber > a.blockNumber) ? 1 : -1).map((row) => (
                            Number(row.returnValues.amount) < 200000000000000 ? 
                            (
                                <TableRow className={account == row.returnValues.sender ? "MyRow" : ""} key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {Number(fromContractValue(row.returnValues.amount, 'gwei')*10).toLocaleString()}
                                    </TableCell>
                                    <TableCell align="right">{row.returnValues.sender}</TableCell>
                                    <TableCell align="left">{row.transactionHash}</TableCell>
                                    <TableCell align="right">{CHAIN_ID_NAMES[row.returnValues.chainId]}</TableCell>
                                    <TableCell align="right">{row.transferred == 'true' ? "Complete": "Pending"}</TableCell>
                                </TableRow>
                            ) : null
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

    async function getDeposits(cb) {

        const responce = await fetch(EMBLEM_API + '/web3/transfersOutDb?pending='+showPending, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'chainid': chainId.toString(),
                'service': 'evmetadata',
            },
        })
        const jsonData = await responce.json()
        return cb(jsonData)
    }
}