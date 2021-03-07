import React, { Component, Dispatch, useState } from 'react'
import { Box, Flex, Text, Link, Image, Stack, Button, FormControl, FormLabel, Input, FormHelperText, Select } from '@chakra-ui/core'
import { Contract } from '@ethersproject/contracts';
import { contractAddresses } from '../constants';
import { TransactionToast } from './TransactionToast';


type Vault = {
  name: string,
  tokenId: string
}
type PropSettings = {
  vault: {
    mine: boolean,
    status: string,
    tokenId: string,
    name: string,
    offers: Array<Vault>
  },
  myVaults: Array<Vault>,
  nftContract: Contract,
  tradeContract: Contract,
  chainId: number,
  setOfferingTokenAllowed,
  offeringTokenId,
  setOfferingTokenId,
  acceptingOfferingIndex,
  setAcceptingOfferIndex,
  offeringTokenAllowed,
  acceptingTokenAllowed,
  setAcceptingTokenAllowed,
  acceptingTokenId,
  setAcceptingTokenId,
  hash,
  setHash
}



export class TradeControls extends Component<PropSettings> {

  constructor(props) {
    super(props);
  }
  render() {

    async function checkOfferingAllowance(props, tokenId) {      
      let allowed = await props.nftContract.getApproved(tokenId)
      props.setOfferingTokenAllowed(allowed != "0x0000000000000000000000000000000000000000")
    }

    async function checkAcceptingAllowance(props, tokenId) {
      debugger
      let allowed = await props.nftContract.getApproved(tokenId)
      props.setAcceptingTokenAllowed(allowed != "0x0000000000000000000000000000000000000000")
    }

    const approveOffer = (tokenId) => {
      // debugger
      console.log("checking offer for", tokenId)
        ; (this.props.nftContract as Contract)
          .approve(contractAddresses.nftrade[this.props.chainId], (tokenId && typeof tokenId === "string" ? tokenId : this.props.offeringTokenId))
          .then(({ hash }: { hash: string }) => {
            this.props.setHash(hash)
          })
      // .catch((error: ErrorWithCode) => {
      //   if (error?.code == 4001) {
      //     setApproving(false)
      //   }
      // })
    }

    const makeOffer = (tokenId) => {
      ; (this.props.tradeContract as Contract)
        .addOffer(contractAddresses.emblemVault[this.props.chainId], this.props.offeringTokenId, contractAddresses.emblemVault[this.props.chainId], tokenId)
        .then(({ hash }: { hash: string }) => {
          this.props.setHash(hash)
        })
      // .catch((error: ErrorWithCode) => {
      //   if (error?.code == 4001) {
      //     setApproving(false)
      //   }
      // })
    }

    const acceptOffer = () => {
      ; (this.props.tradeContract as Contract)
        .acceptOffer(contractAddresses.emblemVault[this.props.chainId], this.props.acceptingTokenId, Number(this.props.acceptingOfferingIndex))
        .then(({ hash }: { hash: string }) => {
          this.props.setHash(hash)
        })
      // .catch((error: ErrorWithCode) => {
      //   if (error?.code == 4001) {
      //     setApproving(false)
      //   }
      // })
    }

    const rejectOffer = () => {
      ; (this.props.tradeContract as Contract)
        .rejectOffer(contractAddresses.emblemVault[this.props.chainId], this.props.acceptingTokenId, Number(this.props.acceptingOfferingIndex))
        .then(({ hash }: { hash: string }) => {
          this.props.setHash(hash)
        })
      // .catch((error: ErrorWithCode) => {
      //   if (error?.code == 4001) {
      //     setApproving(false)
      //   }
      // })
    }

    const flexSettings = {
      flex: '1',
      minW: '300px',
      maxW: '300px',
      borderWidth: '1px',
      color: 'white',
      mx: '6',
      mb: '6',
      rounded: 'lg',
      overflow: 'hidden',
      borderColor: this.props.vault.status == 'claimed' ? 'green !important' : '',
      cursor: 'pointer',
    }
    
    return (
      <Box {...flexSettings}>
        
        {!this.props.vault.mine ? <Select p={2} m={2} w="94%" placeholder="Offer NFT" onChange={e => {
          let tokenId = e.target.value; // console.log(e.target.value)

          this.props.setOfferingTokenId(tokenId);
          checkOfferingAllowance(this.props, tokenId);
        }}>
          {this.props.myVaults.map((vault, index) => {
            return <option key={index} value={this.props.vault.tokenId}>{vault.name}</option>;
          })}
        </Select> : <Select p={2} m={2} w="94%" placeholder="Offers" onChange={e => {
          let index = e.target.value;
          console.log(e.target.value);
          this.props.setAcceptingOfferIndex(index);
          this.props.setAcceptingTokenId(this.props.vault.tokenId);
          checkAcceptingAllowance(this.props, this.props.vault.tokenId);
        }}>
            {this.props.vault.offers.map((offer, index) => {
              return <option key={index} value={index}>{Number(offer.tokenId)}</option>;
            })}
          </Select>}
        {this.props.offeringTokenId && !this.props.vault.mine ? this.props.offeringTokenAllowed ? <Button m={2} onClick={() => {
          makeOffer(this.props.vault.tokenId);
        }}>Make Offer</Button> : <Button m={2} w="94%" onClick={approveOffer}>Approve</Button> : null}
        {this.props.acceptingOfferingIndex && this.props.vault.mine ? this.props.acceptingTokenAllowed ? <Button m={2} w="94%" onClick={() => {
          acceptOffer();
        }}>Accept Offer</Button> : <Button m={2} onClick={() => {
          approveOffer(this.props.vault.tokenId);
        }}>Approve</Button> : null}
        {this.props.acceptingOfferingIndex && this.props.vault.mine ? <Button m={2} w="94%" onClick={() => {
          rejectOffer();
        }}>Reject Offer</Button> : null}
        {this.props.hash ? (
      <TransactionToast
          hash={this.props.hash}
          onComplete={() => {
            this.props.setHash(null)
          }}
        />
      ): null }
      </Box>
    );
  }
}
export default TradeControls