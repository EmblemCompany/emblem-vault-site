import { Box, Flex, Text, Link, Image, Stack, Button, BoxProps, Input, Select, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/core'
import Loader from 'react-loader'
import Refreshing from './Refreshing'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { validImage, toContractValue, CHAIN_ID_NAMES } from '../utils'
import { useContract } from '../hooks'
import { Contract } from '@ethersproject/contracts'
import { EMBLEM_API, contractAddresses } from '../constants'
import { TransactionToast } from './TransactionToast'
import { parseUnits } from '@ethersproject/units'
import BridgeDeposits from './partials/BridgeDeposits'


export default function Stats() {
  const { query } = useRouter()
  const { account, chainId } = useWeb3React()
  // const [vaults, setVaults] = useState([])
  const [state, setState] = useState({ loaded: false })
  const [loadingApi, setLoadingApi] = useState(false)
  const [stats, setStats] = useState(null)
  // const [transfering, setTransfering] = useState(false)
  // const [balance, setBalance] = useState(null)
  // const [address, setAddress] = useState(query.address)
  // const [experimental, setExperimental] = useState(query.experimental)
  // const [decimals, setDecimals] = useState(null)
  // const [allowance, setAllowance] = useState(null)
  // const [transferChain, setTransferChain] = useState(0)
  // const [covalApprovedFor, setIsCovalApproved] = useState(0)
  // const [hash, setHash] = useState(null)
  // const [swapAmount, setSwapAmount] = useState(0)
  // const [isInvalid, setIsInvalid] = useState(false)
  // const [transferChainChanged, setTransferChainChanged] = useState(true)
  // const handlerContract = useContract(contractAddresses.vaultHandler[chainId], contractAddresses.vaultHandlerAbi, true)
  // const covalContract = useContract(contractAddresses.coval[chainId], contractAddresses.covalAbi, true)

  interface ErrorWithCode extends Error {
    code?: number
  }

  // const transferToChain = async () => {
  //   setTransfering(true)
  //   ;(handlerContract as Contract)
  //   .transferToChain(transferChain, swapAmount.toString())
  //   .then(({ hash }: { hash: string }) => {
  //     setHash(hash)
  //   })
  //   .catch((error: ErrorWithCode) => {
  //     if (error?.code == 4001) {
  //       setTransfering(false)
  //     }
  //   })
  // }

  // const getContractStates = async () => {
  //   setHash(null)
  //   setDecimals(await covalContract.decimals())
  //   setAllowance(
  //     await covalContract
  //       .allowance(account, contractAddresses.vaultHandler[chainId])
  //       .then((balance: { toString: () => string }) => balance.toString())
  //   )
  //   setBalance(await covalContract.balanceOf(account).then((balance: { toString: () => string }) => balance.toString()))
  //   if (Number(allowance) >= Number(0)) {      
  //     setIsCovalApproved(allowance)
  //   }
  //   setState({ loaded: true })
  // }

  // const approveCovalFlow = () => {
  //   setApproving(true)
  //   ;(covalContract as Contract)
  //     .approve(contractAddresses.vaultHandler[chainId], 10000000 * Math.pow(10, +decimals) )
  //     .then(({ hash }: { hash: string }) => {
  //       setHash(hash)
  //     })
  //     .catch((error: ErrorWithCode) => {
  //       if (error?.code == 4001) {
  //         setApproving(false)
  //       }
  //     })
  // }

  // const getTransferLogs = async () =>{
  //   console.log("getting logs")
  //   fetch(EMBLEM_API + '/web3/transfersOut', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       service: 'evmetadata',
  //       chainid: chainId.toString()
  //     }
  //   }).then(async function (response) {
  //     console.log("doing transfers")
  //     fetch(EMBLEM_API + '/doTransfers', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         service: 'evmetadata',
  //         chainid: chainId.toString()
  //       }
  //     }).then(async function (response) {
  //       getContractStates()
  //     })
  //   })
  // }

  // function SwapText({ children, ...rest }: BoxProps): JSX.Element {
  //   return (
  //     <Text fontSize="2xl" lineHeight={1} py="0.3rem" {...rest}>
  //       {children}
  //     </Text>
  //   )
  // }

  // const [acct, setAcct] = useState('')
  // useEffect(() => {
  //   if (account && acct != account) {
  //     setAcct(account)
  //     setState({ loaded: false })
  //     getContractStates()
  //   }
  // }, [account, acct])

  // const [chain, setChain] = useState(chainId)
  // useEffect(() => {
  //   if (chainId && chain != chainId) {
  //     setChain(chainId)
  //     setState({ loaded: false })
  //     getContractStates()
  //   }
  // }, [chainId, chain])

  useEffect(() => {
    if (state.loaded == false && !loadingApi) {
      setLoadingApi(false)
      getStats()
    }
  }, [])

  const getStats = async() =>{
    console.log("getting logs")
    fetch('https://api.emblemvault.io/s:osautomate/earnings/emblem-vault', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async function (response) {
      setLoadingApi(false)
      setState({ loaded: true })
      let jsonData = await response.json()
      setStats(jsonData)
      console.log(jsonData)
    })
  }

  return (
    <Loader loaded={state.loaded}>
      {loadingApi ? <Refreshing /> : ''}

      <Flex w="100%" justify="center" mt={10}>
        <Stack align="center">
          {stats? (
            <>
              <Text>Total Sales in USD: ${stats.totalUsd.toFixed(2)}</Text>
              <Text m={3}> </Text>
              <Text>------------- Opensea -------------</Text>
              <Text># of Sales: {stats.opensea.saleCount}</Text>
              <Text>Total Sales in USD: ${stats.opensea.totalUsd.toFixed(2)}</Text>
              <Text>Total Sales in ETH: {stats.opensea.totalEth.toFixed(2)}</Text>
              <Text m={3}> </Text>
              <Text>---------- Emblem.finance ----------</Text>
              <Text># of Sales: {stats.vaultSales.saleCount}</Text>
              <Text>Total Sales in USD: ${stats.vaultSales.totalSalesUsd.toFixed(2)}</Text>
              <Text>COVAL balance: {stats.vaultSales.covalBalance.toFixed(2)}</Text>
            </>
          ) : null }
        </Stack>
      </Flex>
     
    </Loader>
  )
}
