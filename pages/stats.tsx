import Stats from '../components/Stats'
import { Suspense } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

export default function SwapPage(): JSX.Element {
  return (
    <Suspense fallback={<h1>Loading stats...</h1>}>
      <ErrorBoundary fallback={<h2>Oops! Something went wrong.</h2>}>
        <Stats />
      </ErrorBoundary>
    </Suspense>
  )
}
