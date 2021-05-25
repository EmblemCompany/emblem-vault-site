import { useState, useLayoutEffect, useEffect } from 'react'
import { NextComponentType } from 'next'
import NextApp from 'next/app'
import Head from 'next/head'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
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

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function FunctionalApp({ Component }: { Component: NextComponentType }): JSX.Element | null {
  const [painted, setPainted] = useState(false)
  useIsomorphicLayoutEffect(() => {
    setPainted(true)
  }, [])

  const { error, chainId } = useWeb3React()
  const queryParameters = useQueryParameters()
  const requiredChainId = queryParameters[QueryParameters.CHAIN]

  return !painted ? null : (
    <ColorModeProvider>
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
          <script src="https://cdn.trackjs.com/agent/v3/latest/t.js"></script>
          <script src="/jquery.js"></script>
          <script src="/tilt.jquery.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.TrackJS && TrackJS.install({ 
                  token: "45e5b3e45c734f6c890f25e66f17d43d",
                  application: "ev"
                  // for more configuration options, see https://docs.trackjs.com
                });
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
