import { ReactNode, useEffect, useState } from 'react'
import { FaCog } from 'react-icons/fa'
import BackgroundVideo from './BackgroundVideo'
import { } from '@chakra-ui/react'
import { Badge, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, IconButton, LightMode, Flex, useDisclosure, Stack, Box, Button, Text, Link } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import dynamic from 'next/dynamic'
import { CHAIN_ID_NAMES } from '../utils'
import { useEagerConnect, useQueryParameters, useUSDETHPrice } from '../hooks'

import { useTransactions, useFirstToken, useSecondToken, useShowUSD } from '../context'
import ColorBox from './ColorBox'
import Account from './Account'
import { TransactionToast } from './TransactionToast'
import TokenBalance from './TokenBalance'
import { WETH, ChainId, Token } from '@uniswap/sdk'
import WalletConnect from './WalletConnect'
import { QueryParameters } from '../constants'
import { Coval, CovalTest, CovalTestMatic, CovalMatic, CovalxDai, CovalBSC, CovalFantom, DEFAULT_TOKENS, CovalAurora, CovalGÖRLI } from '../tokens'
import Head from 'next/head'
import transakSDK from '@transak/transak-sdk'
import { useRouter } from 'next/router'

// import Gun from 'gun';
// import 'gun/sea'
// import { GunProvider } from 'react-gun';

const Settings = dynamic(() => import('./Settings'))

export default function Layout({ children }: { children: ReactNode}): JSX.Element {
  const { chainId, account } = useWeb3React()
  const isTestnet = typeof chainId === 'number' && chainId !== 1

  const { isOpen: isOpenSettings, onOpen: onOpenSettings, onClose: onCloseSettings } = useDisclosure()

  const [firstToken] = useFirstToken()
  const [secondToken] = useSecondToken()
  const [showUSD, setShowUSD] = useShowUSD()

  // const [gun, setGun] = useState(Gun(['https://emblem-gun.herokuapp.com/gun']))

  const [transactions] = useTransactions()

  // automatically try connecting to the injected connector on pageload
  const triedToEagerConnect = useEagerConnect()

  const queryParameters = useQueryParameters()
  const requiredChainId = queryParameters[QueryParameters.CHAIN]
  const { query } = useRouter()
  const [useLayout, setUseLayout] = useState(true)
  useEffect(() => {
    if (((query.noLayout && query.noLayout == 'true') || query.slideshowOnly && query.slideshowOnly == 'true') && useLayout) {
      setUseLayout(false)
    }
  })
  const USDETHPrice = useUSDETHPrice()

  let transak
  const initializeTransak = (address?: string, coin? : string)=>{
    transak = new transakSDK({
      apiKey: 'e8bed1bd-6844-4eb1-973a-7a11a48fafab',  // Your API Key
      environment: 'PRODUCTION', // STAGING/PRODUCTION
      defaultCryptoCurrency: coin || 'ETH',
      walletAddress: address || '', // Your customer's wallet address
      themeColor: '000000', // App theme color
      fiatCurrency: 'USD', // INR/GBP
      // fiatAmount: 350,
      email: '', // Your customer's email address
      redirectURL: '',
      // paymentMethod: 'neft_bank_transfer',
      hostURL: window.location.origin,
      widgetHeight: '550px',
      widgetWidth: '450px',
      // networks: 'matic,bsc,eth,mainnet'

    });
  
    // To get all the events
    transak.on(transak.ALL_EVENTS, (data) => {
      console.log(data)
    });
  
    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      console.log(orderData);
      transak.close();
    });
  
    transak.init()
  }

  const showOrHideNavLink = (path: string)=> {
    return location.pathname.includes(path) ? 'none': 'block'
  }

  const handleNewNavigationClick = (path)=>{
    location.href = location.origin + '/'+path
  }
  
  const handleSearchClick = ()=>{
    let pieces = location.pathname.split('/')
    pieces.pop()
    location.href = location.origin + pieces.join('/') + '/find'
  }
  
  const handleNavigationclick = () => {
    console.log(location.pathname)
    let pieces = location.pathname.split('/')
    pieces.pop()
    if (location.pathname.includes('vaultlist')) {
      location.href = location.origin + pieces.join('/') + '/create'
    } else {
      location.href = location.origin + pieces.join('/') + '/vaultlist'
    }
  }

  const handleNavigationFeaturedclick = ()=>{
    let pieces = location.pathname.split('/')
    pieces.pop()
    if (location.pathname.includes('featured')) {
      location.href = location.origin + pieces.join('/') + '/create'
    } else {
      location.href = location.origin + pieces.join('/') + '/featured'
    }
  }
  return (
    <>
      <Settings isOpen={isOpenSettings} onClose={onCloseSettings} />
      <BackgroundVideo />
      
      <ColorBox
        as={Flex}
        flexDirection="column"
        borderColor={
          Number(chainId) === 137 ? "blue.500" : 
          Number(chainId) === 1? "blue.500" : 
          Number(chainId) === 56? "orange" : 
          "orange.500"}
        borderWidth={!useLayout ? '0em' : isTestnet ? '.5rem' : '.5rem'}
        minHeight="100vh"
        maxHeight="100vh"
      >
        {useLayout? (
          <Flex justifyContent="space-between" flexShrink={0} overflowX="auto" p="1rem">
            <Stack spacing={0} direction="row">
              <IconButton m={2} variant="ghost" onClick={onOpenSettings} aria-label="Settings" icon={<FaCog />}/>
              {/* <IconButton m={2} icon="search" variant="ghost" onClick={handleSearchClick} aria-label="Search" /> */}
              {/* <Button display={showOrHideNavLink('create')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('create')}}>
                Create
              </Button> */}
              <Button display={showOrHideNavLink('createcurated')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('createcurated')}}>
                Create Curated
              </Button>
              <Button display={showOrHideNavLink('vaults')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('vaults')}}>
                My Vaults
              </Button>
                <Button m={2} variant="ghost"  onClick={()=>{location.href="https://emblem.markets"}}>
                  Emblem.Markets
                </Button>
              {/* <Button display={showOrHideNavLink('featured')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('featured')}}>
                Featured
              </Button>
              <Button display={showOrHideNavLink('newest')} m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('newest')}}>
                Newest
              </Button> */}
              <Button m={2} variant="ghost" onClick={()=>{location.href = "https://emblem-vault.gitbook.io/docs/"}}>
                Info
              </Button>
              <Button m={2} variant="ghost" onClick={()=>{handleNewNavigationClick('tos')}}>
                Terms of Service
              </Button>
            </Stack>
            <Account triedToEagerConnect={triedToEagerConnect} />
          </Flex>
        ): null}
        
        {useLayout? (
          <Stack
            position="absolute"
            top={0}
            right={0}
            m={isTestnet ? '1.5rem' : '1rem'}
            mt={isTestnet ? '5rem' : '4.5rem'}
            alignItems="flex-end"
            spacing="1rem"
            zIndex={2}
          >
            {typeof account !== 'string' ? (
              !triedToEagerConnect ||
              (typeof chainId === 'number'
                ? chainId !== ChainId.MAINNET
                : typeof requiredChainId === 'number' && requiredChainId !== ChainId.MAINNET) ? null : (
                <Box>
                  <WalletConnect />
                </Box>
              )
            ) : (
              // [DEFAULT_TOKENS.filter((tokenrrr) => tokenrrr.chainId == chainId)[0], firstToken, secondToken]
              [
                chainId == 1 ? Coval : 
                chainId == 5 ? CovalGÖRLI:
                chainId == 80001 ? CovalTestMatic : 
                chainId == 137 ? CovalMatic : 
                chainId == 100? CovalxDai : 
                chainId == 56 ? CovalBSC :
                chainId == 250 ? CovalFantom :
                chainId == 1313161554 ? CovalAurora:
                CovalTest,
                firstToken ? (firstToken.symbol != 'Coval' ? firstToken : null) : null,
                secondToken ? (secondToken.symbol != 'Coval' ? secondToken : null) : null,
              ]
                .filter((token) => token)
                .filter((token) => !token?.equals(WETH[token.chainId]))
                .map((token) => (
                  <Box key={token?.address}>
                    <TokenBalance token={token as Token} />
                  </Box>
                ))
            )}
          </Stack>
        ): null}

        <Flex id="shannon-container" flexGrow={1} direction="column" overflow="auto">
          {children}
          {useLayout? null : (
            <Account triedToEagerConnect={triedToEagerConnect} />
          )}
        </Flex>

        

        {useLayout? (
          <Flex minHeight="1.5rem">
            {typeof chainId === 'number' /*&& chainId !== 1*/ ? (
              <LightMode>
                {/* <Link href="/swap"> */}
                  <Badge
                    variant="solid"
                    // variantColor={
                    //   chainId == 137 || chainId == 1 ? 'blue' : 
                    //   chainId == Number(56) || Number(5) ? 'orange':
                    //   'orange'/*isTestnet ? 'blue' : undefined*/}
                    fontSize="1rem"
                    style={{ borderTopLeftRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }} >
                    On {CHAIN_ID_NAMES[chainId].toLowerCase()} 
                    {/* (Swap to {chainId == 1 ? 'Matic' : 'Ethereum'}) */}
                  </Badge>
                {/* </Link> */}
              </LightMode>
            ):null}
          </Flex>
        ): null}

        {transactions.length > 0 && (
          <Stack
            position="absolute"
            bottom={0}
            right={0}
            m={isTestnet ? '1.5rem' : '1rem'}
            alignItems="flex-end"
            spacing="1rem"
            zIndex={2}
          >
            {transactions
              .filter((transaction) => transaction.chainId === chainId)
              .map(({ hash }) => (
                <Box key={hash}>
                  <TransactionToast hash={hash} />
                </Box>
              ))}
          </Stack>
        )}
        <Stack
          position="absolute"
          bottom={1}
          left={100}
          alignItems="center"
          align="center"
        >
          {/* <Popover usePortal>
            <PopoverTrigger>
            <IconButton size="sm" icon="warning-2" aria-label=''/>
            </PopoverTrigger>
            <PopoverContent zIndex={4} width="5000px">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody><Text fontSize="xs">
                Emblem is an NFT Vault protocol solution that allows you to deploy your personal “Vaults” on
the Ethereum blockchain for securing and accessing digital assets across different blockchains.
Unspecified, Inc., a company organized under the laws of the State of North Carolina, and doing
business as Emblem (“Emblem,” “we,” “us,” “our”) owns and operates Emblem, the Site(s)
(including emblem.pro and emblem.finance, and other products, services, or Smart Contracts that
we make available through our Site(s) or applications.
PLEASE READ THESE TERMS CAREFULLY AS THEY CONSTITUTE A BINDING
LEGAL AGREEMENT BETWEEN YOU AND EMBLEM. ASPECTS OF THESE
TERMS LIMIT CERTAIN RIGHTS, INCLUDING THE RIGHT TO MAINTAIN A
COURT ACTION, THE RIGHT TO A JURY TRIAL, THE RIGHT TO PARTICIPATE
IN ANY FORM OF CLASS OR REPRESENTATIVE CLAIM, THE RIGHT TO
ENGAGE IN DISCOVERY EXCEPT AS PROVIDED IN AAA (AMERICAN
ARBITRATION ASSOCIATION) RULES, AND THE RIGHT TO CERTAIN
REMEDIES AND FORMS OF RELIEF.
I. THIS IS A BINDING LEGAL AGREEMENT BETWEEN YOU AND EMBLEM
These Terms of Service (“Terms” or “Agreement”) are entered into between You and Emblem.
These Terms govern your access to and use of the Site(s), interaction with our Smart Contracts,
Vaults, and any other software, websites, applications, API’s, webtools, third party tools,
experiences, features, or functionalities provided on or in connection with the Site(s) and all
successor Site(s) thereto (collectively, the “Services”). Without limitation, these Terms govern
your voluntary use our Services for any purpose, including to deploy Non-Fungible Token
(“NFT”) “Vaults,” upload content, and configure, interact, or perform functions involving our
Site or Smart Contracts. For the purposes of these Terms, “you” includes both you, the person or
entity, and the digital wallet that you use for the purposes of using the services.
YOU ACKNOWLEDGE AND REAFFIRM YOUR AGREEMENT TO THESE TERMS
EACH TIME YOU ACCESS THE SITE, USE THE SERVICES, LOG ONTO TO THE
SITE, CONNECT YOUR DIGITAL WALLET THROUGH THE SITE, INITIATE
TRANSACTIONS FROM YOUR DIGITAL WALLET THROUGH THE SITE, DEPLOY
OR INTERACT WITH A VAULT, OR OTHERWISE INVOKE OR INTERACT WITH
THE SITE. YOU MUST IMMEDIATELY AND PERMANENTLY DISCONTINUE
YOUR ACCESS AND USE OF THE SITE IF YOU DO NOT AGREE TO THESE
TERMS.
II. MODIFICATIONS AND ADDITIONS TO THESE TERMS

Emblem reserves the right to change or modify these Terms at any time and in our sole
discretion. By continuing to access or use the Service, you confirm your acceptance of the
revised Terms and all of the terms incorporated therein by reference effective as of the date these
Terms are updated. It is your sole responsibility to review the Terms from time to time to view
such changes and to ensure that you understand the terms and conditions that apply when you
access or use the Service. We sometimes need to provide additional terms for specific services
(and all such services are deemed part of the “Service” hereunder and shall also be subject to
these Terms). Those additional terms and conditions, which are available in connection with the
relevant service and hereby incorporated by reference, then become part of your agreement with
us if you use those Services. In the event of a conflict between these Terms and any additional
applicable terms we may provide for a specific service, such additional terms shall control for
that specific service.
III. CAPACITY AND AUTHORITY TO USE THE SERVICES
You expressly represent and warrant that you have the right, authority, and capacity to enter into
this agreement on behalf of yourself and any third-party individual or organization for which you
are acting as an authorized agent. You expressly represent and warrant that you are over the age
of majority in your jurisdiction and at least over the age of thirteen (13). If you are under
eighteen (18) years old you may only use the Services through a parent or guardian’s Account
and upon their separate agreement to these Terms. It is prohibited to use our Service if you are
under 13 years old.
If you use our Services from or on behalf of a company, collective, digital autonomous
organization (“DAO”), smart contract, or any other type of entity then “you” includes you and
that entity, and you represent and warrant that: (i) you are an authorized representative of the
entity with the authority to bind the entity to these Terms, (ii) you are authorized by the entity to
initiate transactions and interact with our Smart Contracts from your digital wallet on behalf of
the entity; and (iii) you agree to these Terms on the entity’s behalf. If you utilize “bots,”
“spiders,” “smart contracts,” or other technical instruments or agents to use our Services, then
“you” includes you and that technical instrument or agent. You bear all responsibility and
liability stemming from the use of such technical instruments.
IV. YOUR RESPONSIBILITIES
In addition to other responsibilities and obligations provided in these Terms, you are solely
responsible for evaluating, observing, and discharging any applicable legal obligations and
requirements that may apply to your voluntary use of the Services. Without limitation, you are
solely responsible for determining what, if any, taxes apply to your transactions and to withhold,
collect, report, and remit the correct amounts of taxes to the appropriate tax authorities. Emblem
is not responsible for determining, withholding, collecting, reporting, or remitting the taxes that
apply to your assets held in or sold from your Vault. Further, you agree not to use our Services in
any manner that could be violative of any applicable regulation. We strongly encourage you to
seek the help of a competent legal and tax professional before making use of the Service.
Nothing in these Terms should be construed as legal advice, tax advice, investment advice, or a
legal opinion.

V. THE VAULT SERVICES RELY ON PUBLIC BLOCKCHAINS AND OTHER EXPERIMENTAL
TECHNOLOGIES
Our Services enable you to create personal Vaults that are represented as NFTs issued on the
Ethereum Blockchain. Our Site facilitates the generation, encryption, communication, storage
and decryption of private-public key pairs for your Vault and for wallets on various public
Blockchains (as designated by Emblem) that may be associated with your Vault.
Emblem’s Services enable you to voluntarily interact with experimental technologies, including
the blockchains, smart contracts, NFT(s), Ordinals, Vaults, cryptocurrencies, and stablecoins.
Blockchains are decentralized, open-source virtual machines or databases that utilize public-key
cryptography and that are not under the direct control of Emblem or any specific third party.
Certain blockchains enable the operation of automatically executable computer programs (i.e.,
“Smart Contracts,” “decentralization application,” or “Dapps”) with functions that are
deterministic, publicly inspectable, and executed by an independent network transaction
validators.
The Services depend to a large extent on such experimental technologies and are subject to many
risks, uncertainties, and possibly unknown security vulnerabilities. The Services, Smart
Contracts, and your digital wallet and assets may be the target of third-party attacks, including
but not limited to phishing, Sybil attacks, bruteforcing, inactive listing exploits, impersonations,
or the use of viruses (“Third-Party Attacks”). Emblem will not be responsible or liable, directly
or indirectly, for any actual or alleged loss or damage sustained by You in connection with
Third-Party Attacks. Blockchain technologies and digital assets are also subject to many legal
and regulatory uncertainties that could adversely impact the Services, which could impede or
limit your ability to continue the use and enjoyment of the Services or related assets and
technologies. Emblem reserves the right to execute smart contract transactions as a buyer, Vault
deployer, or otherwise as an ordinary user.
Blockchains may require the payment of a transaction Fee (i.e., “Gas”) for transactions executed
by our Smart Contracts. The value of the Fee changes, often unpredictably, and is entirely
outside of Emblem. The User acknowledges that under no circumstances will a contract,
agreement, offer, sale, bid, or other transaction involving our Smart Contracts be invalidated,
revocable, reversible, refundable, or otherwise unenforceable on the basis that the Fee for the
given transaction was unknown, too high, or otherwise unacceptable to a User.
You acknowledge and agree that technologies that may be available through the Service are
novel, experimental, and speculative, and that therefore there is significant uncertainty regarding
the operation, effects, and security risks thereof, including uncertainty regarding the application
of existing law to activities related thereto. To the maximum extent permitted by applicable law,
Emblem disclaims any and all liability related to the foregoing experimental technologies and
with respect to its own role in facilitating your use of such experimental technologies. Without
limitation, Emblem disclaims any and all liability related to its role relating to generating,
encrypting, decrypting, storing or communicating your private keys or other information related
to the security of your Vault or assets.
VI. USERS CONSENTS TO THE AUTOMATED OPERATION OF SMART CONTRACTS

You agree and understand that all transactions executed by you and all fees, assets, and NFTs
transferred by, received by, or claimed by you are processed and settled exclusively by the
applicable public Blockchain - not Emblem. Emblem does not control any public blockchain.
Emblem has no ability to reverse any transactions previously settled by the Ethereum blockchain.
By invoking or interacting with our Smart Contracts, you agree and irrevocably consent to the
automated processing of any authorized transactions, fees, operations, or functionalities enabled
by them.
You acknowledge and agree that the Smart Contracts may be subject to bugs, malfunctions,
timing errors, hacking and theft, vulnerabilities, or changes or errors of the applicable blockchain
(including &quot;forks&quot;), which can adversely affect the Services, affect your property interests over
your digital assets, and may expose you to a risk of total loss or forfeiture of your digital assets.
Emblem does not guarantee, and is not responsible for, your continued ownership over your
Vault, or assets held in your Vault, or your ability to exercise your rights with respect to digital
assets held in your Vault or with respect to your use or enjoyment of our Services.
You agree that you have reviewed, have had the chance to audit, and hereby approve the Smart
Contracts we enable you to interact with through the Site, including at least the Smart Contracts
identified in our developer documentation here: https://github.com/EmblemCompany and
https://github.com/EmblemCompany/emblem-vault-solidity/blob/RC1.1/deployed-mainnet.json.
By interacting with our Smart Contracts, whether on or off of the Site, you irrevocably consent to
any foreseeable or unforeseeable function, operation, rule, parameter, or consequence enabled or
required by the Smart Contract code.
VII. NON-RELIANCE
You are knowledgeable, experienced, and sophisticated in using and evaluating blockchain and
related technologies, cryptocurrency, digital assets, NFTs, Ordinals, Vaults, and Smart Contracts.
You represent that you have sufficient knowledge, market sophistication, professional advice,
and experience to make your own evaluation of the merits and risks of any transaction conducted
via the Services or any underlying digital asset. You have conducted your own thorough
independent investigation and analysis of the Services and Smart Contracts and the other matters
contemplated by these Terms. You have not relied up-on any information, statement, omission,
representation, or warranty, express or implied, written or oral, made by or on behalf of Emblem
in connection therewith, except as expressly set forth by Emblem in these Terms.
VIII. ACCESSING AND USING THE SERVICE
To create an Account and enjoy full functionality of our Services you must connect your third-
party digital wallet. By connecting your wallet to the Site, you expressly represent that you are
the lawful and rightful owner of the digital wallet and that you are solely responsible for
maintaining the security of your wallet and your control over any wallet-related authentication
credentials, private or public cryptocurrency keys, and non-fungible tokens or cryptocurrencies
that are stored in or are accessible through your wallet. You may be required to authenticate
ownership of your digital wallet before you can perform transactions through the Services by
cryptographically verifying, through your third-party wallet provider, your possession of the

digital wallet’s associated private key. You are to only use your digital wallet under the terms
and conditions established by your third party-wallet provider. Your digital wallet and all assets
held therein are your personal property, and not the property of Emblem. Emblem has no ability -
and assumes no responsibility or obligation to - manage, modify, secure, or perform transactions
on behalf of your digital wallet.
IX. YOUR WALLET IS YOUR SOLE RESPONSIBILITY
You are solely and exclusively responsible for the security and management of your digital
wallet(s). For your safety and the safety of other Users, you agree to maintain reasonable security
measures over your digital wallets’ private keys, make best efforts to avoid potential scams
which may compromise the security of your wallet or others, and to preserve the upmost secrecy
of your digital wallet’s private key, seedphrase, your Account details, passwords, and any other
information that you use to access your digital wallet or the Account. You are solely responsible
for ensuring that your digital wallet will not be used by any unauthorized person(s) or entities.
Emblem accepts no responsibility for, and disclaims all liability to you, in connection with the
security of or your use of your digital wallet and disclaims any responsibility or obligation to
assist or remedy you in the event of a breach of your digital wallet’s security. We are not liable
for any acts or omissions by you in connection with your digital wallet or as a result of your
digital wallet being compromised. Further, you agree that you may be liable to Emblem, other
Users, or other third parties for harm or losses arising from acts or omissions by you related to
the security of your digital wallet.
You agree to notify us immediately of any actual or suspected breach of security, loss, theft, or
unauthorized use of your digital wallet or Account at hello@emblem.pro.
X. THE SERVICES ARE PROPERTY OF EMBLEM
You acknowledge and agree that Emblem owns all legal rights, title, and interest in and to all
aspects of the Site, Smart Contracts, and Services. The graphics, design, systems, images, logos,
icons, information, articles, icons, scripts, templates, code, software, Smart Contracts, services,
“look and feel,” organization, compilation of content on the Services, data, and all other elements
or other intellectual property comprising Services, including all copyrightable content, patentable
subject matter, trademarks, and service marks (collectively, “Emblem’s Materials”) are
Emblem’s sole property. To the extent that we suggest that you “own” a Vault, your ownership
interest is a limited property interest in the actual instances of the Vaults actually deployed by
your digital wallet in connection with your use of our Services, and not an intellectual property
interest or assignment in the underlying Smart Contracts or code. Any use of Emblem’s
Materials other than as specifically authorized herein is strictly prohibited. We reserve all rights
in and to all aspects of Emblem’s Materials not expressly granted to you in the Terms.
XI. YOUR LICENSE TO THE SERVICES AND CONTENT
You are hereby granted a limited, non-exclusive, non-transferable, revocable, non-sublicensable,
and personal license to access and use the Services, Site, and Smart Contracts subject to your
compliance with these Terms. If any software, content, or other materials owned by, controlled
by, or licensed to us are distributed or made available to you as part of your use of the Services,

we hereby grant you a non-commercial, personal, non-assignable, non-sublicensable, non-
transferrable, and non-exclusive right and license to access and display such software, content,
and materials provided to you as part of the Services, in each case for the sole purpose of
enabling you to use the Services as permitted by these Terms of Use. Your access and use of the
Services may be interrupted from time to time for any of reason, including, without limitation,
the malfunction of equipment, periodic updating, maintenance, or repair of the Services,
Emblem’s enforcement of these Terms, or other actions that Emblem may make in its sole
discretion.  You agree that Emblem will not be liable to you or to any third party for any
modification, suspension, or discontinuance of the Services.
XII. YOU MUST OBEY THE LAW
You represent and warrant that you will use our Services only for purposes that are legal, proper,
in accordance with these Terms, and in strict compliance with all applicable laws (e.g., local,
state, federal and the laws of other jurisdictions). Without limitation, you represent and warrant
that you will not directly or indirectly through or in connection with our Services: (i) send, mint,
publish, upload, distribute or disseminate any unlawful, infringing, defamatory, harassing,
abusive, fraudulent, obscene, pornographic, or otherwise objectionable content; (ii) undertake
any unlawful activity which would violate, or assist in violation of, any law, statute, ordinance,
or regulation, sanctions program administered in any relevant country, including but not limited
to the U.S. Department of Treasury’s Office of Foreign Assets Control (“OFAC”), or which
would involve proceeds of any unlawful activity; (iii) distribute viruses, worms, defects, Trojan
horses, corrupted files, hoaxes, or any other items of a destructive or deceptive nature; (iv)
impersonate Emblem or another person or use deceptive means to obtain access to a third party’s
digital wallet; (v) defraud Emblem, other Users, or any other third party, or provide false,
inaccurate, or misleading information, especially if that information gives a misleading or false
impression as to the contents, value, status, authenticity or security of a Vault ; (vi) violate the
intellectual property rights, property rights, privacy rights, or other legal rights of others; (vii)
engage in, promote, solicit, or otherwise encourage illegal activity (including, without limitation,
terrorism, tax evasion, theft, or money laundering); (viii) interfere with another users access to or
enjoyment of the Services; (ix) defame, abuse, extort, stalk, threaten or otherwise harass other
Users; (x) incite, threaten, facilitate, promote, or encourage hate, racial intolerance or violent acts
against others; (xi) harvest or collect personal information about other Users without their
consent; (xii) create user accounts or interact with the Services by automated means or under
false or fraudulent pretenses; (xiii) exploit the Services for any unauthorized commercial
purpose; (xiv) modify, adapt, translate, or reverse engineer any portion of the Services; (xv)
remove any copyright, trademark or other proprietary rights notices contained in or on the
Services; (xvi) use any robot, spider, site search/retrieval application, or other device to retrieve
or index any portion of the Site or the content posted on the Site, or to collect information about
its users for any unauthorized purpose (xvii) engage in any attack, hack, Sybil attack, DoS attack,
distributed denial-of-service of attack, “griefing attacks,” interference, or any other type of
exploit or unfair misuse of the Smart Contracts; (xviii) bypass or ignore instructions that control
access to the Service, including attempting to circumvent any rate limiting systems by using
multiple API keys, directing traffic through multiple IP addresses, or otherwise obfuscating the
source of traffic you send to Emblem;
XIII. OTHER FORMS OF PROHIBITED ACTIVITY

The Services relate to technologies such as Vaults, Ordinals, NFTs, Smart Contracts,
cryptocurrencies, and other technologies that present unique legal and security risks to you and
others. Accordingly, you further agree that you will not:
i. Use or attempt to use another’s digital wallet without authorization from such user;
ii. Pose as another person or entity, or use a wallet to engage in a transaction that is owned
or controlled, in whole or in part, by any other person;
iii. Access the Service from a different blockchain address if we’ve blocked any of your
other blockchain addresses from accessing the Service, unless you have our written
permission first;
iv. Distribute spam, including through sending unwanted assets, NFTs or Vaults to others;
v. Use our Service for commercial purposes inconsistent with these Terms or any other
instructions;
vi. Engage in behaviors that have the intention or the effect of artificially influencing the
apparent value of a Vault or assets held therein;
vii. Attempt to sell or transfer a Vault that has already been claimed or that is otherwise not
secure;
viii. Misrepresent the contents of a Vault or otherwise provide misleading, false, or confusing
information about the contents of a Vault;
ix. Send assets to Vaults that you do not control for any unlawful purpose;
x. Use the Service or Smart Contract to carry out any financial activities subject to
registration or licensing, including but not limited to creating, offering, selling, or buying
securities, commodities, options, or debt instruments;
xi. Use the Service to create, sell, or buy NFTs or other items that give owners rights to
participate in an ICO or any securities offering, or that are redeemable for securities,
commodities, or other financial instruments;
xii. Engage in price manipulation, fraud, or other deceptive, misleading, or manipulative
activity with respect to NFTs minted through the Services;
xiii. Use the Service to buy, sell, vault, or transfer stolen items, fraudulently obtained items,
items taken without authorization, and/or any other illegally obtained items;
xiv. Create or display illegal content, such as content that may involve pornographic content
or involve child sexual exploitation;
xv. Use the Service in any manner that could interfere with, disrupt, negatively affect or
inhibit other users from fully enjoying the Service;
xvi. Claim assets from your Vault that are proceeds from criminal activity;
xvii. Attempt to breach Emblem’s security systems or compromise the security of other
users’ digital wallets or Vaults.
XIV. PROHIBITED PERSONS
You represent and warrant that: (i) you are not located in, ordinarily reside in, or organized under
the laws of any jurisdiction that is subject to a comprehensive U.S. Government embargo
(&quot;Embargoed Jurisdiction&quot;); (ii) you and your digital wallet are not subject to any sanctions
administered by an agency of the U.S. Government, any other government, or the United Nations
(collectively, “Sanctions”); (iii) you are not owned or controlled, directly or indirectly, by any
person that is subject to Sanctions, or that is located in, ordinarily resident in, or organized under
the laws of, any Embargoed Jurisdiction; (iv) you, your digital wallet, any transferees or

transferor of assets to or from your digital wallet or Vault, and none of your officers, managers,
directors, shareholders or authorized representatives is subject to Sanctions, listed on OFAC’s
Specially Designated Nationals and Blocked Persons List, or are located in, ordinarily reside in,
or are organized under the laws of, any Embargoed Jurisdiction, or is owned or controlled,
directly or indirectly, by any person that is subject to Sanctions or that is located in, ordinarily
resident in, or organized under the laws of, any Embargoed Jurisdiction (collectively, “Prohibited
Persons”); (v) you have not received assets directly or indirectly from any Prohibited Persons,
digital wallets, or Vaults identified by the U.S. Government as existing for the primary purpose
of facilitating illegal activity. You further covenant that the foregoing shall be true during the
entire period of this agreement. If you access or use the Service outside the United States, you
are solely responsible for ensuring that your access and use of the Service in such country,
territory or jurisdiction does not violate these Terms any applicable laws.
Emblem may require you to provide additional information and documents in certain
circumstances, such as at the request of any government authority, as any applicable law or
regulation dictates, or to investigate a potential violation of the law or these Terms. In such
cases, Emblem, in its sole discretion, may disable your Account and block your ability to access
the Service until such additional information and documents are processed by Emblem.
XV. THE EMBLEM VAULTS
The Emblem Vaults are user-generated NFTs that may be controlled, modified, transferred, and
claimed by the Vault owner (ownership is determined by the Ethereum blockchain). The
Emblem Vaults can be configured with several different addresses from many different
blockchains that are capable of receiving, but not sending, assets available on the respective
blockchains. If a Vault transferred, all assets held within the Vault are necessarily transferred
with it. Emblem Vaults and assets held therein are only claimable by the authenticated Vault
Owner. Once claimed, the private key associated with a Vault is necessarily exposed to the
claiming party, allowing that party to claim all the asset held inside the Vault and rendering that
Vault unsafe for use by anyone else. You must investigate on your own whether a Vault has been
previously claimed or not. Emblem makes no representations or warranties so to, or assumes no
duty or obligation to warn you of, the status, security, or risks associated with a given Vault.
Your ordinary use of the Services does not require you to give Emblem sole possession, custody,
or control of your digital wallet, your deployed Vault, your NFTs or other assets held in your
Vault. As a technical service provider, Emblem may exercise some control over your Vault for
the sake of facilitating your experience or protecting other Users, but Emblem will not generally
interfere with your lawful ownership of your Vault.
Emblem is not a wallet provider, Vault exchange, broker, financial institution, money services
business, or creditor. You cannot sell or transfer Vaults through the Site. Emblem is not party to
any agreement or transactions involving you and other users or assets, whether or or off of the
Site. However, Emblem may receive fees for sales of Vaults on third party marketplaces as
otherwise enabled in the deployed Smart Contract code (discussed further below).
YOU DEPLOY, VIEW, TRANSFER, AND BUY VAULTS AT YOUR OWN RISK,
WHETHER ON OR OFF OF THE SITE. EMBLEM DISCLAIMS ALL REPRESENTATIONS
AND WARRANTIES, EXPRESS OR IMPLIED, AS TO THE TITLE, SECURITY, OR

AUTHENTICTIY OF ANY VAULT AVAILABLE ON THE SITE. EMBLEM ASSUMES NO
OBLIGATION TO WARN YOU OF OR PUT YOU ON NOTICE OF THE POTENTIAL
VULNERABILITIES OR RISKS ASSOCIATED WITH ANY GIVEN VAULT.
XVI. FEES
Emblem may impose a Vault deployment fee payable in $COVAL specified on the Site in
association with your Vault deployment. All fees paid to Emblem are non-refundable and
irreversible. Emblem reserves the absolute discretion and right to change the Vault deployment
fee amount or the type of acceptable currency payable as a Vault deployment fee. As provided
by the Smart Contracts, Emblem may receive a fee for sales or transfers of your Vault. You
irrevocably consent to these fees when you deploy a Vault and again when you transfer or sell a
Vault on a third party marketplace. Emblem reserves the right to identify itself as a recipient of
royalties or creator fees to third party marketplaces that facilitate the sale of your Vaults.
XVII. $COVAL
The $COVAL (“Circuits of Value”) token is an ERC-20 token (or cryptocurrency) created and
governed by the protocol smart contract: 0x3D658390460295FB963f54dC0899cfb1c30776Df.
In its current form, $COVAL represents a unit of utility that provides you access to certain
functionalities within the Emblem ecosystem, including the ability to deploy your personal
Vault. $COVAL token holders are not entitled to profits and losses, no rights to distributions and
dividends, and no rights of ownership to the Emblem company, or any other entity. $COVAL
token holders have no possessory interest, title, deed, economic right, or claim to any capital,
equity, endeavor, venture, or commercial entity, including Emblem. $COVAL tokens do not
represent an investment contract, a commercial contract, debenture, equity interest, option, or a
contract of any kind. You only need to purchase $COVAL to the extent it enables you to access
certain goods and services made available through our Site or Smart Contracts. You should never
buy $COVAL as a speculative investment product.
XVIII. THIRD-PARTY SERVICES
The Services may include hyperlinks, options, and tools to access, purchase, or interact with
other third-party websites, resources, block explorers, wallet providers, Ordinal-related services
providers, smart contracts, products, materials, applications, or information (collectively, “Third-
Party Services”). We provide links to or functionality with respect to these Third-Party Services
only as a convenience to you and to facilitate the enjoyment of our Services. In particular, we
user a third party to facilitate the encryption, decryption, and storage of private keys associated
with your Vault. We do not necessarily review, approve, monitor, endorse, warrant, or make any
representations with respect to the Third-Party Services. When you use the Site, you assume the
risk that a Third-Party Service may lose, misplace, or divulge your private information. When
you click on a link to, or access and use, a Third-Party Services, you are subject to the terms and
conditions (including privacy policies) of the applicable Third-Party Service provider. We are
not liable for any loss or damage which may be incurred as a result of the unavailability or
malfunction of the Third-Party Services, or as a result of any reliance placed by you on the

continued completeness, accuracy, functionality, availability, or existence of any Third-Party
Services.
XIX. YOU MUST ONLY UPLOAD OR VAULT ORIGINAL, AUTHORIZED, AND NON-INFRINGING
CONTENT
By creating a Vault, uploading content through the Site, or adding NFTs to your Vault, you
expressly represent and warrant that to the best of your knowledge: (i) the associated Content
(which includes all downloadable media content, images, video, audio, metadata content or
information, descriptions, tags, attributes, logos, trademarks, likenesses, and all other elements
submitted by you), is not infringing on any intellectual property rights of any third party; (ii) that
your decision to vault, sell, upload, or transfer the Content or associated Vault does not violate
the contractual rights or expectations of any third party; and (iii) that you have exclusive right
and title to all proceeds, royalties, or revenues received to your digital wallet or Vault as a result
of sales or use of the Vault or assets held therein.
XX. VAULT METADATA
You must input only honest, correct, authentic, legal, and non-infringing information or metadata
content in association with your deployed Vaults. Information that you see on the Site is
generated by other users – not Emblem – and should be treated with extreme caution. By
deploying a Vault through our Site, you expressly consent to Emblem’s ability to modify,
amend, or delete your Vault metadata in its sole discretion and for any reason that it deems
necessary, including but not limited to any reason relating to your violation of these Terms, the
protection other Users, the security of the Site, to make certain information available to third
party marketplaces that list your Vault, and to prevent a possible violation of these Terms of the
law.
EMBLEM MAKES NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
ABOUT THE INFORMATION THAT APPEARS ON THE SITE IN CONNECTION WITH
USER’S VAULTS. EMBLEM ASSUMES NO OBLIGATION OR RESPONSIBILITY TO
AMEND ANY USER’S VAULT METADATA INFORMATION. YOU ARE SOLELY
RESPONSIBLE FOR EVALUATING THE AUTHENTICITY OF, WARRANTIES,
PROMISES, OR INFORMATION UPLOADED BY OTHER USERS IN ASSOCIATION
WITH THEIR DEPLOYED VAULTS.
XXI. VAULT CURATION
Emblem does not generally monitor the Site for possible infringements and does not generally
curate the Vaults or Ordinal collections that are available on or compatible with its Services.
Emblem instead implements a decentralized form of curation that relies on community feedback.
You can submit collections to be available on the Site by using one of our submission forms
available on the Site.
XXII. YOU GRANT A LIMITED LICENSE TO EMBLEM BY USING OUR SERVICES
You hereby acknowledge, understand, and agree that uploading content or adding assets to your
Vault constitutes an express and affirmative grant to Emblem, its affiliates, and successors a non-
exclusive, world-wide, assignable, sublicensable, perpetual, and royalty-free license to make

copies of, display, perform, reproduce, download, upload, and distribute your uploaded content
and all content associated with the NFT or other assets held in your Vault, on any media whether
now known or later discovered for the general purpose of operating, promoting, sharing,
developing, marketing, and advertising the Services, your Vault, or your vaulted NFTs.
XXIII. NO LEGAL OR PROFESSIONAL ADVICE
The information on this Site and any information provided in connection with the Services are
provided for information only and do not constitute, and should not be construed as, professional
advice or a recommendation to purchase, sell, trade or otherwise transact in any digital asset,
including any products or services, or an invitation, offer or solicitation to engage in any
purchase, sale, trade or other transaction with respect to any digital asset. The information on this
Site and any information provided in connection with the Services are provided solely on the
basis that you will make your own transaction decisions, and Emblem does not take account of
any person’s financial or other objectives, particular needs, or financial situation. In addition,
nothing on this Site or any information provided in connection with the Services, or is intended
to, constitute financial, legal, accounting or tax advice. Any decision that you make should be
based on an assessment of your risks in consultation with your professional adviser(s). There are
potential legal and economic risks associated with purchasing, minting, selling, and holding
digital assets.
THESE TERMS DO NOT REPRESENT A COMPLETE STATEMENT OF RISK FACTORS
ASSOCIATED WITH VAULTs, NFTs OR OTHER DIGITAL ASSETS THAT MAY BE
VIEWED ON, MADE AVAILABLE TO YOU BY OTHERS USING THE SERVICES, OR
THAT MAY BE FEATURED OR DISCUSSED IN CONNECTION WITH THE SERVICES.
YOU SHOULD CONSIDER THESE RISK WARNINGS CAREFULLY AND TAKE
APPROPRIATE ADVICE BEFORE TAKING ANY DECISION TO PURCHASE, SELL,
TRADE OR OTHERWISE TRANSACT IN A NFT OR DIGITAL ASSET.
XXIV. INDEMNIFICATION
You agree to defend, indemnify and hold harmless Emblem, its officers, directors, employees,
agents, successors, assigns, suppliers, vendors, and affiliates (the “Emblem Parties”) from and
against any and all claims, demands, causes of action, liabilities,
losses, damages, judgments, costs, fees, expenses (including without limitation, attorneys’ fees
and settlement costs), and losses, of any kind or nature, whether or not rightfully asserted,
whether known or unknown, foreseen or unforeseen, matured or unmatured, or suspected or
unsuspected, in law or equity, (collectively, “Claims”), arising out of or in any way related
to: (a) the actual or alleged breach of these Terms by you or anyone using your account or digital
wallet; (b) the actual or alleged misuse or illegal use of the Site, Services, Vaults, or Smart
Contracts,  by you or anyone using your digital wallet or Account or acting in concert with you;
(c) the actual or alleged misuse, or illegal use, or breach of security, by anyone of your Account
or digital wallet; (d) the creation, promotion, publication, advertising, marketing, sale, or
distribution of the NFTs or Vaults that you deploy or any content that you contribute to or
associate with the Services, including, without limitation, Claims involving the actual or alleged
infringement of any third party intellectual property; (e) your violation of the rights of or
obligations to a third party, including other Users; (f) your negligence or willful misconduct; and

(g) the alleged or actual failure by Emblem to act or fail to act in any way with regard to
the Services, Ordinals, Vault, unless Emblem intended the acts and resulting injury. You agree
that Emblem may elect to take control of the defense or settlement of any and all Claims. You
agree to promptly notify Emblem of any and all Claims and to cooperate with Emblem in
defending or resolving any and all Claims. This Indemnity is in addition to, and not in lieu of,
any other indemnities set forth in a written agreement between you and Emblem.

XXV. DISCLAIMERS
These disclaimers are provided in addition to other disclaimers expressly made or implied in
these Terms. Your access to and use of the Site and Services is at your own risk. You understand
and agree that the Services are provided on an “as is” and “as available” basis and Emblem
expressly disclaims warranties or conditions of any kind, either express or implied. Emblem (and
the Emblem Parties) makes no warranties or representations and disclaim all responsibility as to
whether the service: (a) will meet your requirements; (b) will be available on an uninterrupted,
timely, secure, or error-free basis; (c) will be accurate, reliable, complete, legal, safe, or secure
from third party attacks; (d) will be used by other Users in any manner that causes harm to you.
Emblem disclaims all other warranties or conditions, express or implied, including, without
limitation, implied warranties or conditions of merchantability, fitness for a particular purpose,
title and non-infringement. Emblem will not be liable for any loss of any kind from any action
taken or taken in reliance on material or information, contained on the service. While Emblem
attempts to make your access to and use of the service safe, Emblem cannot and does not
represent or warrant that the service, content, content linked to or associated with any Vaults,
NFTs, or any assets you interact with using our service or our service providers’ servers are free
of viruses, errors, scams, vulnerabilities or other potentially harmful defects. We cannot
guarantee the security of any data that you disclose online, that you provide to us, or that we
create for you, including the security of your Vaults, private keys, or assets. No advice or
information, whether oral or obtained from Emblem parties or through the service, will create
any warranty or representation not expressly made herein. You accept the inherent security risks
of providing information and dealing online over the internet, using your digital wallet, and will
not hold Emblem responsible for any breach of security.
We will not be responsible or liable to you for any loss and take no responsibility for any use,
storage, decay, failure, breach, transfer, modification, or interruption of any Vaults, NFTs,
private keys, or content linked to, held in, or associated with Vaults or NFTs, including but not
limited to any losses, damages, or claims arising from: (a) user error, incorrectly constructed
transactions, or mistyped addresses; (b) server failure or data loss; (c) unauthorized access or
use; (d) any unauthorized third-party activities, including without limitation the use of viruses,
phishing, bruteforcing or other means of attack against the Services or your Smart Contracts; (e)
any failure, interruption, or exploit of the Ethereum blockchain or any smart contractor (f) any
act or omission of any Third Party service provider.
Some jurisdictions do not allow the exclusion of certain warranties and limitations of
liability provided in this Section. If you are in such a jurisdiction, some of the limitations
and disclaimers provided throughout these Terms may not apply to you. To the extent we
may not, as a matter of applicable law, disclaim any implied warranty or limit our

liabilities, the scope and duration of such warranty and the extent of our liability will be the
minimum permitted by such applicable law.

XXVI. ACKNOWLEDGEMENTS; ASSUMPTION OF THE RISK
You assume all risks concerning the Service, interactions with Smart Contracts and digital assets,
and the potential inaccuracies or errors of information or functionality provided in connection
with the Service. Without limitation, you accept and acknowledge:
 The technology utilized in delivering the Services depends on experimental, public peer-
to--peer-networks such as the Ethereum blockchain that are not under the control or
influence of Emblem and are subject to many known (and unknown) risks and
uncertainties.
 The Services involve the communication, encryption, and decryption of private keys
associated with your Vault that may allow Emblem to access your Vault.
 The Smart Contracts or Vaults may not function as intended and may cause a permanent
loss of your funds, or other potentially harmful consequences
 All purchases or deployments through the Site are irreversible and non-refundable
 The price of NFTs, Vaults, cryptocurrencies, or other digital assets are extremely volatile
and subject to change
 You are responsible for evaluating the authenticity and credibility of Vaults. Some Vaults
may contain false or misleading information
 You acknowledge and agree that the costs and speeds of transacting on Ethereum are
variable and may increase or decrease dramatically at any time, resulting in prolonged
inability to access or use ETH or other cryptocurrency, NFT(s), or other digital assets
associated with the Service.
 Your access and use of the Services may be interrupted from time to time for any reason
 Advances in code cracking, or technical advances such as the development of quantum
computers, may present significant risks to the Ethereum blockchain, the Services, Smart
Contracts, Vaults, NFTs, and other digital assets, including the theft, loss or
inaccessibility thereof.
 The regulatory regime governing blockchain technologies, non-fungible tokens,
cryptocurrency, and other crypto-based items is uncertain, and new regulations or
policies may materially adversely affect the development of the Services and the utility or
value of Vaults or NFTs.
 You are solely responsible for determining what, if any, taxes apply to your transactions
and to withhold, collect, report, and remit the correct amounts of taxes to the appropriate
tax authorities. Emblem is not responsible for determining, withholding, collecting,
reporting, or remitting the taxes that apply to your Vaults, assets, or NFTs.
 We do not control the public blockchains that you are interacting with and we do not
control certain smart contracts and protocols that may be integral to your ability to
complete transactions on these public blockchains. Additionally, blockchain transactions
are irreversible and Emblem has no ability to reverse any transactions on the blockchain.
 There are risks associated with using and blockchain based services, including, but not
limited to, the risk associated with hardware, software, and Internet connections, the risk
of malicious software introduction, and the risk that third parties may obtain unauthorized

access to your third-party wallet or Account. You accept and acknowledge that Emblem
will not be responsible for any communication failures, disruptions, errors, distortions or
delays you may experience when using the Service or the Ethereum network, however
caused.
 Our Terms and pricing, and Terms and pricing of third-party services provider and/or
vendors, may change and may result in a change to the Services
 The media Content associated with your NFTs may be restricted and permanently
unavailable. You agree to keep a local download your Content associated with your
NFTs.
XXVII. LIMITATION OF LIABILITY
To the fullest extent permitted by law, you agree that in no event will Emblem or its service
providers be liable to you or any third party for any lost profit or any indirect, consequential,
exemplary, incidental, special, or punitive damages arising from these Terms, products or third-
party Services and products, or for any damages related to loss of revenue, loss of profits, loss of
business or anticipated savings, loss of use, loss of goodwill, or loss of data, and whether caused
by strict liability or tort (including negligence), breach of contract, or otherwise, even if
foreseeable and even if Emblem or its service providers have been advised of the possibility of
such damages; or (b) for any other claim, demand, or damages whatsoever resulting from or
arising out of or in connection with these terms of the delivery, use, or performance of the
service. Access to, and use of, the Service, products or third-party sites, and products are at your
own discretion and risk, and you will be solely responsible for any damage or loss to your
computer system, NFTs, digital assets, or mobile device.
Notwithstanding anything to the contrary contained herein, in no event shall the maximum
aggregate liability of Emblem arising out of or in any way related to these terms, the access to
and use of the Service, content, NFTs, Vaults, or any of Emblem’s products or services exceed
the greater of (a) $100 or (b) the amount directly received by Emblem for its service directly
relating to the assets that are the subject of the claim. The foregoing limitations will apply even if
the above stated remedy fails of its essential purpose.
Some jurisdictions do not allow the exclusion or limitation of incidental or consequential
damages, so the above limitation or exclusion may not apply to you. Some jurisdictions also
limit disclaimers or limitations of liability for personal injury from consumer products, so this
limitation may not apply to personal injury claims.

XXVIII. ARBITRATION AGREEMENT &amp; WAIVER OF CERTAIN RIGHTS, INCLUDING CLASS
ACTIONS
Please read this section carefully because it limits certain rights, including the right to
maintain a court action, the right to a jury trial, the right to participate in any form of class
or representative claim, the right to engage in discovery except as provided in AAA
(American Arbitration Association) rules, and the right to certain remedies and forms of
relief. Other rights that you or Emblem would have in court also may not be available in
arbitration. This section does not govern disputes between users or between users and third

parties. Emblem does not provide dispute resolution services for such disagreements and
the parties must resolve those disputes directly.
A. YOU AND EMBLEM AGREE TO BINDING ARBITRATION AND TO WAIVE A JURY TRIAL
You and Emblem agree to resolve any disputes between us through binding and final arbitration,
other than claims that qualify to be brought in small claims court. You waive your right to any
jury trial of any claim against Emblem and its officers, directors, employees, agents, successors,
assigns, affiliates, shareholders, parents, subsidiaries, agents and licensors. Emblem waives its
right to any jury trial of any claim against you.
Any and all disputes, controversies, claims and counterclaims, arising between You and Emblem
of any type or nature whatsoever, including but not limited to those relating to these Terms of
Service, our Services, an NFT, your Smart Contracts, or any transaction conducted through the
Services, other than those that qualify to be brought in small claims court, (“Disputes”) must be
submitted for binding arbitration under the Rules of the American Arbitration Association
(“AAA Rules”). But first, You and Emblem both agree to engage in good-faith efforts to resolve
disputes prior to either party initiating an arbitration, small claims court proceeding, or equitable
relief for intellectual property infringement. The arbitration will be heard and determined by a
single arbitrator, who may decide whether a dispute is subject to arbitration, and whose decision
on all issues will be final and binding upon the parties and may be enforced in any court of
competent jurisdiction.  You and Emblem agree that the arbitration will be kept confidential and
that the existence of the proceeding and any element of it (including, without limitation, any
pleadings, briefs or other documents submitted or exchanged and any testimony or other oral
submissions and awards) will not be disclosed beyond the arbitration proceedings, except as may
lawfully be required in judicial proceedings relating to the arbitration or by applicable disclosure
rules and regulations of securities, regulatory authorities, or other governmental agencies.
This arbitration agreement does not preclude You or Emblem from seeking action by federal,
state, or local government agencies consistent with these Terms. Specifically, the right of You
and Emblem may bring qualifying claims in small claims court.  In addition, You or Emblem
may ask any court of competent jurisdiction to compel arbitration of any dispute, other than one
that qualifies to be filed in small claims court, or to enforce the arbitrator’s award. Other than
small claims actions and actions to compel arbitration or enforce the arbitrator’s award, Emblem
and You must arbitrate all Disputes.
B. ARBITRATION COSTS
If you demonstrate that the costs of arbitration will be prohibitive as compared to the costs of
litigation, Emblem will pay as much of the administrative costs and arbitrator fees required for
the arbitration as the arbitrator deems necessary to prevent the cost of the arbitration from being
prohibitive.  In the final award, the arbitrator may apportion the costs of arbitration and the
compensation of the arbitrator among the parties in such amounts as the arbitrator deems
appropriate.
C. CLASS ACTION WAIVER
You may not act as a class representative nor participate as a class member of any class
claimants with respect to any claim. Claims may not be arbitrated on a class, collective, or
representative basis.  You may only bring individual claims, and the arbitrator may only decide

individual claims.  The arbitrator may not consolidate or join the claims of other persons or
parties who may be similarly situated.

XXIX. GOVERNING LAW AND VENUE
These Terms and your access to and use of the Service shall be governed by and construed and
enforced in accordance with the laws of the Delaware (without regard to conflict of law rules or
principles of Delaware, or any other jurisdiction that would cause the application of the laws of
any other jurisdiction). Any dispute between the parties that is not subject to arbitration as set
forth herein or cannot be heard in small claims court, shall be resolved in the state or federal
courts of Delaware.
XXX. TERMINATION
If you breach any of the provisions of these Terms, all licenses and privileges granted by
Emblem will terminate automatically. Additionally, notwithstanding anything contained in these
Terms, we reserve the right, with or without notice and in our sole discretion, to suspend,
disable, terminate, or delete your Account and/or your ability to access or use the Service (or any
part of the foregoing) at any time and for any or no reason, and you acknowledge and agree that
we shall have no liability or obligation to you in such event and that you will not be entitled to a
refund of any amounts that you have already paid to us.
XXXI. SEVERABILITY
If any term, clause, or provision of these Terms is held invalid or unenforceable, then that term,
clause, or provision will be severable from these Terms and will not affect the validity or
enforceability of any remaining part of that term, clause, or provision, or any other term, clause,
or provision of these Terms.
XXXII. INJUNCTIVE RELIEF
You agree that a breach of these Terms will cause irreparable injury to Emblem for which
monetary damages would not be an adequate remedy and Emblem shall be entitled to equitable
relief in addition to any remedies it may have hereunder or at law without a bond, other security,
or proof of damages.
XXXIII. EXPORT LAWS
You agree that you will not export or re-export, directly or indirectly, the Service, a Vault, and/or
other information or materials provided by Emblem hereunder, to any country for which the
United States or any other relevant jurisdiction requires any export license or other governmental
approval at the time of export without first obtaining such license or approval. In particular, but
without limitation, the Service may not be exported or re-exported (a) into any U.S. embargoed
countries or any country that has been designated by the U.S. Government as a “terrorist
supporting” country, or (b) to anyone listed on any U.S. Government list of prohibited or
restricted parties, including the U.S. Treasury Department’s list of Specially Designated

Nationals or the U.S. Department of Commerce Denied Person’s List or Entity List. By using the
Service, you represent and warrant that you are not located in any such country or on any such
list. You are responsible for and hereby agree to comply at your sole expense with all applicable
United States export laws and regulations.
XXXIV. SURVIVAL
All sections which by their nature should survive the termination of these Terms shall continue
in full force and effect subsequent to and notwithstanding any termination of these Terms by
Emblem or you. Termination will not limit any of Emblem’s other rights or remedies at law or in
equity.
XXXV. MISCELLANEOUS
These Terms constitute the entire agreement between you and Emblem relating to your access to
and use of the Service. Emblem’s failure to assert any right or provision under these Terms shall
not constitute a waiver of such right or provision. No waiver by either party of any breach or
default hereunder shall be deemed to be a waiver of any preceding or subsequent breach or
default. The section headings used herein are for reference only and shall not be read to have any
legal effect.
We reserve the right to assign our rights without restriction, including without limitation to any
Emblem Party, or to any successor in interest of any business associated with Emblem. In the
event that Emblem is acquired by or merged with a third party entity, we reserve the right, in any
of these circumstances, to transfer or assign the information we have collected from you as part
of such merger, acquisition, sale, or other change of control. You may not assign any rights
and/or licenses granted under this Agreement. Any attempted transfer or assignment by you in
violation hereof shall be null and void. Subject to the foregoing, this Agreement will bind and
inure to the benefit of the parties, their successors and permitted assigns.
The Service is operated by us in the United States. Those who choose to access the Service from
locations outside the United States do so at their own initiative and are responsible for
compliance with applicable local laws. Emblem reserves the restrict to restrict or prevent your
access to the Services based on your location. You and Emblem agree that the United Nations
Convention on Contracts for the International Sale of Goods will not apply to the interpretation
or construction of these Terms.
Except as otherwise provided herein, these Terms are intended solely for the benefit of the
parties and are not intended to confer third-party beneficiary rights upon any other person or
entity.
If you have any questions about these Terms please contact hello@emblem.pro.</Text></PopoverBody>
            </PopoverContent>
          </Popover> */}
        </Stack>
        {useLayout? (
        <Stack
          position="absolute"
          bottom={1}
          right={1}
          p={isTestnet ? '1.5rem' : '1rem'}
          alignItems="flex-end"
          spacing="1rem"
        >
          <Button
            // as="a"
            // {...{
            //   href:
            //     location.origin +
            //     '/buy?chain=' +
            //     chainId +
            //     '&output=0x3D658390460295FB963f54dC0899cfb1c30776Df&input=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            //   target: '_blank',
            //   rel: 'noopener noreferrer',
            // }}
            onClick={()=>{location.href = "https://app.uniswap.org/#/swap?outputCurrency=0x3d658390460295fb963f54dc0899cfb1c30776df"}}
          >
            Buy $Coval
          </Button>
        </Stack>
        ): null}
      </ColorBox>
    </>
  )
}
