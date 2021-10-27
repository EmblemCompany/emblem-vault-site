import MyVaults from '../components/MyVaults'
import { Suspense } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

export default function MyVaultsPage(): JSX.Element {
  return (
    <Suspense fallback={<h1>Loading vaults...</h1>}>
      <ErrorBoundary fallback={<h2>Oops! Something went wrong.</h2>}>
        <MyVaults />
      </ErrorBoundary>
    </Suspense>
  )
}
