import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { modifyUrlObjectForIPFS } from '../utils'

export default function Redirect(): null {
  const { replace } = useRouter()

  const debug = process.env.NODE_ENV !== "production";
  const { href, as } = modifyUrlObjectForIPFS(!debug ? '/create': '/create')

  useEffect(() => {
    replace(href, as)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
