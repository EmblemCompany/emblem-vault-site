import { useState, useLayoutEffect, useEffect } from 'react'
import { NextComponentType } from 'next'
import NextApp from 'next/app'
import Head from 'next/head'
import { ThemeProvider, CSSReset, ColorModeProvider, Text } from '@chakra-ui/core'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import 'doka/doka.css'
import theme from '../theme'
import { useQueryParameters } from '../hooks'
import Base from '../components/Base'
import Favicon from '../components/Favicon'
import Provider from '../context'

import Layout from '../components/Layout'
import Error from '../components/Error'
import SwitchToChain from '../components/SwitchToChain'
import '../styles.css'
import '@reach/combobox/styles.css'
import { QueryParameters } from '../constants'
import Loading from '../components/Loading'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function FunctionalApp({ Component }: { Component: NextComponentType }): JSX.Element | null {
  const { query } = useRouter()
  const [painted, setPainted] = useState(false)
  const [useLayout, setUseLayout] = useState(true)
  useIsomorphicLayoutEffect(() => {
    setPainted(true)
  }, [])

  useEffect(() => {
    if (query.noLayout && query.noLayout == 'true' && useLayout) {
      setUseLayout(false)
    }
  })
  

  const { error, chainId } = useWeb3React()
  const queryParameters = useQueryParameters()
  const requiredChainId = queryParameters[QueryParameters.CHAIN]

  return !painted ? null : (
    
    <>
    {/* <Text>Testing APP Level {useLayout.toString()} </Text> */}
      <ColorModeProvider >
        <Favicon />
        <Provider>
          <Layout>
            {error ? (
              <Error />
            ) : typeof chainId !== 'number' ? (
              <Loading />
            ) : typeof requiredChainId === 'number' && chainId !== requiredChainId ? (
              <SwitchToChain requiredChainId={requiredChainId} />
            ) : (
              <Component />
            )}
          </Layout>
        </Provider>
      </ColorModeProvider>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLibrary(provider: any): Web3Provider {
  return new Web3Provider(provider)
}

export default class App extends NextApp {
  render(): JSX.Element {
    
    const { Component } = this.props
    return (
      <>
        <Base />
        <Head>
          <title key="title">Emblem Vault</title>
          <meta key="description" name="Description" content="An entire wallet inside a token" />
          {/* <script src="https://cdn.trackjs.com/agent/v3/latest/t.js"></script> */}
          <script src="/jquery.js"></script>
          <script src="/tilt.jquery.js"></script>
          <script src="/bip39/bip39-libs.js"></script>
          <script src="/bip39/bitcoinjs-extensions.js"></script>
          <script src="/bip39/sjcl-bip39.js"></script>
          <script src="/bip39/wordlist_english.js"></script>
          <script src="/bip39/jsbip39.js"></script>
          <script src="/bip39/entropy.js"></script>
          <script src="/bip39/new.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `                
                if (location.href.includes('/vault?')) {
                  location.href = location.href.replace('/vault?', '/nft?')
                }
              `,
            }}
          />
        </Head>
        <Web3ReactProvider getLibrary={getLibrary}>
          <ThemeProvider theme={theme}>
            <CSSReset />
            <FunctionalApp Component={Component} />
          </ThemeProvider>
        </Web3ReactProvider>
      </>
    )
  }
}
