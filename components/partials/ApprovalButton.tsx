import React, { Component, useEffect, useState } from 'react'
import { Button, Flex} from '@chakra-ui/react'

import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'

const getContract = (address, abi, library, account): any =>{
  return new Contract(address, abi, library.getSigner(account).connectUnchecked())
}

type AttributesProps = {
  handler: {address: string, abi: any},
  spending: {address: string, abi: any},
  amount: number,
  label: string,
  watcher: any
}
export default function ApprovalButton(props: AttributesProps) {
  
  const { account, library } = useWeb3React()
  const [approved, setApproved] = useState(false)
  const [decimals, setDecimals] = useState(null)
  const [spendingContract, setSpendingContract] = useState(null)
  const [handlerContract, setHandlerContract] = useState(null)

  useEffect(()=>{
    if (!handlerContract && props.handler) {
      createHandlerContract(props.handler)
    }    
  })

  useEffect(()=>{
    if (!spendingContract && props.spending) {
      createSpendingContract(props.spending)
    }    
  })

  useEffect(()=>{
    if (spendingContract){
      checkApproval(props.handler, props.spending, props.amount)
    }
  })
  
  return account && !approved? (
    <Flex w="100%" flexWrap="wrap" mt={3} >
      <Button onClick={chooseApprovalFlow} backgroundColor={"#02b402"} color={"black !important"} fontWeight={"bold !important"} width="100%">
        {props.label}
      </Button>
    </Flex>
  ):(<>Approved</>)

  function createSpendingContract(spending){
    let _contract = getContract(spending.address, spending.abi, library, account)
      setSpendingContract(_contract)
  }

  function createHandlerContract(handler){
    let _contract = getContract(handler.address, handler.abi, library, account)
      setHandlerContract(_contract)
  }

  function checkApproval(handler: { address: string; abi: any }, spending: { address: string; abi: any }, amount: number) {
    if (amount > 0) { // IS ERC20 Approval Check
      spendingContract.decimals().then((decimals: any) => {
        setDecimals(decimals)
        spendingContract.allowance(account, handler.address).then((allowance: any) => {
          setApproved(allowance >= amount * 10 ** decimals)
        })
      })
    } else { // IS NFT Approval Check
      spendingContract.isApprovedForAll(account, handler.address).then((approved: any) => {
        setApproved(approved)
      })
    }
  }


  function chooseApprovalFlow() {
    if (props.amount > 0) { 
      return approveCovalFlow()
    } else {
      return approveNFTFlow()
    }
  }
  function approveCovalFlow () {
    spendingContract.approve(props.handler.address, 1000000 * 10 ** decimals).then((tx: any) => {
      props.watcher(tx.hash, (receipt: any) => {
        if (receipt.status === 1) {
          setApproved(true)
        }
      })
    })
  }
  function approveNFTFlow () {
    spendingContract.setApprovalForAll(props.handler.address, true).then((tx: any) => {
      props.watcher(tx.hash, (receipt: any) => {
        if (receipt.status === 1) {
          setApproved(true)
        }
      })
    })
  }
}




