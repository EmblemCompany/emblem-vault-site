import { EMBLEM_V3_API } from './constants'

/**
 * This function calls a v3 Emblem API to create a new Reservoir collection
 * set from the collections present in the curatedCollections table.
 * @returns {object} A JSON object containing collectionSetID and msg properties.
 * The collectionSetID is the reservoir collection set ID.
*/
export async function createReservoirCollectionSet(){
  const options = {
    method: 'POST',
    headers: {
      'x-api-key': localStorage.getItem('apiKey') || '',
      'Content-Type': 'application/json'
    }
  };
  const response = await fetch(`${EMBLEM_V3_API}/reservoir/collection-sets`, options)
  return await response.json()
}

/**
 * @returns {string} Most recently created Reservoir collection set ID.
*/
export async function getLatestReservoirCollectionSetID(){
  const response = await fetch(`${EMBLEM_V3_API}/reservoir/collection-sets/latest`)
  const data = await response.json()
  return data.collectionSetID
}