import { useRouter } from 'next/router'
import Nft from '../../components/Nft'
import Head from 'next/head'
export const EMBLEM_API = 'https://api.emblemvault.io'

// export async function getProductsFromDatabase() {
//   const responce = await fetch(EMBLEM_API + '/ids/', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       service: 'evmetadata',
//     },
//   })
//   return await responce.json()
// }
// export async function getStaticPaths() {
//   const records = await getProductsFromDatabase()
//   console.log("Records", records)
//   const paths = records.map((product) => ({
//     params: { id: product.tokenId }
//   }))

//   // fallback: false means pages that don’t have the
//   // correct id will 404.
//   return { paths, fallback: false }
// }

// // params will contain the id for each generated page.
// export async function getStaticProps({ params }) {
//   return {
//     props: {
//       product: params.id
//     }
//   }
// }

// export default function Product({ product }) {
//   // Render product
// }
export default function VaultPage(): JSX.Element {
  const { query } = useRouter()
  
  return (
    <>
    <Nft/>
    </>
  )
}
