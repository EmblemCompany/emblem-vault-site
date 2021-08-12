import PnL from '../components/PnL'
import { Suspense } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

export default function PnLPage(): JSX.Element {
  return (
    <Suspense fallback={<h1>Loading stats...</h1>}>
      <ErrorBoundary fallback={<h2>Oops! Something went wrong.</h2>}>
        <PnL />
      </ErrorBoundary>
    </Suspense>
  )
}
