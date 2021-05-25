import Newest from '../components/Newest'
import { Suspense } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

export default function NewestPage(): JSX.Element {
  return (
    <Suspense fallback={<h1>Loading vaults...</h1>}>
      <ErrorBoundary fallback={<h2>Oops! Something went wrong.</h2>}>
        <Newest />
      </ErrorBoundary>
    </Suspense>
  )
}
