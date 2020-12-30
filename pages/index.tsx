import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { modifyUrlObjectForIPFS } from '../utils'

export default function Redirect(): null {
  const { replace } = useRouter()

  const debug = process.env.NODE_ENV !== 'production'
  const maintenance = !debug && process.env.MAINTENANCE
  const { href, as } = modifyUrlObjectForIPFS( maintenance ? '/maintenance': !debug ? '/create' : '/create' )

  useEffect(() => {
    console.log("ENV", debug, maintenance)
    replace(href, as)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
