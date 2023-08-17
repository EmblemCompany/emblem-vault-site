import { Suspense } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import Update from '../components/Update'

export default function FindPage(): JSX.Element {
  return (
    // <Suspense fallback={<h1>Loading vaults...</h1>}>
      // <ErrorBoundary fallback={<h2>Oops! Something went wrong.</h2>}>
        <Update />
      // </ErrorBoundary>
    // </Suspense>
  )
}
