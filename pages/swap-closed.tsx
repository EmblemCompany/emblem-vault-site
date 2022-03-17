import SwapChain from '../components/SwapChain'
import { Suspense } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

export default function SwapPage(): JSX.Element {
  return (
    <Suspense fallback={<h1>Loading vaults...</h1>}>
      <ErrorBoundary fallback={<h2>Oops! Something went wrong.</h2>}>
        <SwapChain />
      </ErrorBoundary>
    </Suspense>
  )
}
