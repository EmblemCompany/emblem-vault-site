import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Stack,
  Box,
  Flex,
  Text,
  Textarea,
  Button,
  Link,
  Select
} from '@chakra-ui/core'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { EMBLEM_API } from '../constants'
import Loader from 'react-loader'
import { usePapaParse } from 'react-papaparse';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'
import Embed from './Embed';

export default function Batch() {
  const { query } = useRouter()
  const [running, setRunning] = useState(false)
  const [offset, setOffset] = useState(Number(query.offset) || 0)
  const [status, setStatus] = useState('configure')
  const [batches, setBatches] = useState([])
  const [demoIndex, setDemoIndex] = useState(-1)
  const [action, setAction] = useState(query.action || 'list')
  const [batchVaults, setBatchVaults] = useState([])
  const [updateCount, setUpdateCount] = useState(0)
  const [batchName, setBatchName] = useState("");
  const [imageBaseUrl, setImageBaseUrl] = useState("");
  const [inscriptionBaseUrl, setInscriptionBaseUrl] = useState("");
  const [addressType, setAddressType] = useState("");
  const [titleTemplate, setTitleTemplate] = useState("");
  const [descriptionTemplate, setDescriptionTemplate] = useState("");
  const [total, setTotal] = useState("");
  const [batchData, setBatchData] = useState("");
  const [batchDataJson, setBatchDataJson] = useState([]);
  const [batchId, setBatchId] = useState(query.batch_id || "")
  const [state, setState] = useState({ loaded: false })
  const [vaultAddresses, setVaultAddresses] = useState([])
  const { readString, jsonToCSV } = usePapaParse();


  useEffect(() => {
    if (!state.loaded && batchId && !batchName) {
      getBatch()
      getVaultsForBatch(batchId.toString(), ()=>{})
    } else if (!state.loaded && !batchId && !batchName && action == 'list') {
      getBatches()
    }  else {
      setState({ loaded: true })
    }
  }, [])

  const getBatch = async () => {
    var requestOptions: any = {
      method: 'GET'
    };

    fetch(EMBLEM_API + `/batch?batchId=${batchId}`, requestOptions).then(async (response) => {
      let record = await response.json()
      setState({ loaded: true })
      setBatchName(record.batch_name)
      setImageBaseUrl(record.image_base_url)
      setInscriptionBaseUrl(record.inscription_base_url)
      setAddressType(record.address_type)
      setStatus(record.status)
      setTitleTemplate(record.title_template)
      setDescriptionTemplate(record.description_template)
      let parsedJson = JSON.parse(record.data)
      setBatchDataJson(parsedJson)
      let csvData = jsonToCSV(parsedJson)
      setBatchData(csvData)
      setTotal((parsedJson.length - 1).toString())
    }).catch(err => {
      console.log(err)
    })
  }

  const getVaultsForBatch = async (batchId: string, cb: () => any)=>{
    // alert(0)
    var requestOptions = {
      method: 'GET'
    };
    
    fetch(EMBLEM_API + "/batchVaults/"+batchId+"?_vercel_no_cache=1", requestOptions)
    .then(async (response) => {
      let records = await response.json()
      setBatchVaults(records)
      let exported_records = records.map(record=>{ 
        console.log(exported_records)
        return { to: record.to, tokenId: record.tokenId, address: record.addresses.filter(addy=>{return addy.coin == 'TAP'})[0].address }})// address: record.addresses.filter(addy=>{return addy.coin == 'LTC'})[0].address, tokenId: record.tokenId, owner: record.to
      // let addresses = records.map(record=>{ return {tokenId: record.tokenId}})
      
      let csvData: any = jsonToCSV(exported_records.reverse())
      setVaultAddresses(csvData)
      console.log(csvData)
      return cb()
    }).catch(err => {
      console.log(err)
    })
  }

  const goUpdateLoop = async(overrideOffset: number)=>{
    var requestOptions = {
      method: 'GET'
    };
    
    fetch(EMBLEM_API + `/updateNextBatchItem/${batchId}?offset=${overrideOffset || offset}&_vercel_no_cache=1`, requestOptions)
    .then(async (response) => {
      let record = await response.json()
      setUpdateCount(record.index)
      // alert(record.index)
      setOffset(record.index)
      goUpdateLoop(record.index)
    }).catch(err => {
      console.log(err)
      goUpdateLoop(overrideOffset)
    })
  }


  const goCreateLoop = async ()=>{
    var requestOptions = {
      method: 'GET'
    };
    
    fetch(EMBLEM_API + "/createNextBatchItem?_vercel_no_cache=1", requestOptions)
    .then(async (response) => {
      // let records = await response.json()
      getVaultsForBatch(batchId.toString(), ()=>{
        setTimeout(()=>{goCreateLoop()}, 10000)
      })
    }).catch(err => {
      console.log(err)
      goCreateLoop()
    })
  }

  const getBatches = async () => {
    var requestOptions: any = {
      method: 'GET'
    };

    fetch(EMBLEM_API + `/batches`, requestOptions).then(async (response) => {
      let records = await response.json()
      console.log(records)
      setBatches(records)
      setState({ loaded: true })
    }).catch(err => {
      console.log(err)
    })
  }

  const doRefresh = async (needle: string, haystack: string, offset: number) => {
    var requestOptions: any = {
      method: 'GET'
    };

    fetch(EMBLEM_API + `/bulkRefresh?live=true&needle=${needle}&haystack=${haystack}&start=${offset}`, requestOptions).then(async (response) => {
      let record= await response.json()
      doRefresh(needle, haystack, record.index + 1)
      setUpdateCount(record.index)
      setState({ loaded: true })
    }).catch(err => {
      console.log(err)
      doRefresh(needle, haystack, offset)
    })
  }

  


  const startBatch = async () =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "batchId": batchId
    });

    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch(EMBLEM_API + "/startBatch", requestOptions).then(async (response) => {
      let results = await response.json()
      location.href="/batch?action=view&batch_id="+batchId
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let jsonData: any = await csvToJson(batchData)
    const serializedForm = {
      batchName,
      imageBaseUrl,
      inscriptionBaseUrl,
      addressType,
      titleTemplate,
      descriptionTemplate,
      total,
      batchId,
      batchData: jsonData.data

    };
    fetch(EMBLEM_API + '/addBatch', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(serializedForm),
    }).then(async (response) => {
      let data = await response.json()
      if (data.id) {
        setBatchId(data.id)
      }
    }).catch(err => {
      console.log(err)
    })
  };

  function csvToJson(data) {
    return new Promise((resolve, reject) => {
      readString(data, {
        worker: true,
        complete: (results: any) => {
          resolve(results);
        }
      });
    });
  }

  function parseTemplate(index, template){
    let tokens = listTokens(template)
    let modifiedTitle = template
    tokens.forEach((item)=>{
      let value = 
      item == 'batch_name'? batchName:
      item == 'asset_number'? batchDataJson[index][0]:
      item == 'inscription_number'? batchDataJson[index][1]:
      item == 'inscription_base_url'? inscriptionBaseUrl:
      item == 'inscription_hash'? batchDataJson[index][2]:
      ''
      modifiedTitle = modifiedTitle.replace(item, value)
    })
    modifiedTitle = modifiedTitle.replaceAll('{', '').replaceAll('}', '')
    return modifiedTitle
  }

  function parseImage(index) {
    return imageBaseUrl + batchDataJson[index][2]
  }

  function parseTo(index) {
    return batchDataJson[index][3]
  }

  function listTokens(str) {
    let regex = /\{(.*?)\}/g;
    let result;
    let items = [];
    
    while (result = regex.exec(str)) {
      items = items.concat(result[1].split(','))
    }
  
    return items;
  }

  function isValidBatchData(statusCheck) {
    if (!batchDataJson) return false
    let hasRows = batchDataJson.length > 1
    if (!hasRows) return false
    // alert(JSON.stringify(batchDataJson))
    let correctColumns = batchDataJson[0].length == 4
    let correctHeaders = batchDataJson[0][0] == 'asset_number' && batchDataJson[0][1] == 'inscription_number' && batchDataJson[0][2] == 'inscription_hash' && batchDataJson[0][3] == 'to'
    let batchNotStarted = status == statusCheck || 'configure'
    return hasRows && correctColumns && correctHeaders && batchNotStarted
  }

  return (
    <Loader loaded={state.loaded}>
      <Flex width="full" align="center" justifyContent="center">
        {action && (action == 'edit' || action == 'add') ? (
          <>
            <Stack>
              <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
              <Stack>
                <Link margin="10px" href={"/batch?action=list"}> All Batch Jobs</Link>
                {batchId? (
                  <Link margin="10px" href={"/batch?action=view&batch_id="+batchId}> View Job</Link>
                ): null}
              </Stack>
                <form onSubmit={handleSubmit}>
                  <Stack direction="row" align="flex-start" padding="25px" spacing="2rem" flexWrap="wrap" shouldWrapChildren>
                    <FormControl isRequired>
                      <FormLabel htmlFor="batch-name">Batch Name</FormLabel>
                      <Input
                        type="text"
                        id="batch-name"
                        aria-describedby="batch-name-text"
                        value={batchName}
                        onChange={(e) => setBatchName(e.target.value)}
                        autoComplete="off"
                      />
                      <FormHelperText id="batch-name-text">Give it a unique name for this batch.</FormHelperText>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel htmlFor="image-base-url">Image Base Url</FormLabel>
                      <Input
                        type="text"
                        id="image-base-url"
                        aria-describedby="image-base-url-text"
                        value={imageBaseUrl}
                        onChange={(e) => setImageBaseUrl(e.target.value)}
                        autoComplete="off"
                      />
                      <FormHelperText id="image-base-url-text">
                        Enter the base url for the images in this batch.
                      </FormHelperText>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel htmlFor="inscription-base-url">Inscription Base Url</FormLabel>
                      <Input
                        type="text"
                        id="inscription-base-url"
                        aria-describedby="inscription-base-url-text"
                        value={inscriptionBaseUrl}
                        onChange={(e) => setInscriptionBaseUrl(e.target.value)}
                        autoComplete="off"
                      />
                      <FormHelperText id="inscription-base-url-text">
                        Enter the base url for the inscriptions in this batch.
                      </FormHelperText>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel htmlFor="address-type">Address Type</FormLabel>
                      <Input
                        type="text"
                        id="address-type"
                        aria-describedby="address-type-text"
                        value={addressType}
                        onChange={(e) => setAddressType(e.target.value)}
                        autoComplete="off"
                      />
                      <FormHelperText id="address-type-text">
                        Enter the address type for the items in this batch.
                      </FormHelperText>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel htmlFor="title-template">Title Template</FormLabel>
                      <Textarea
                        id="title-template"
                        fontSize={'x-small'}
                        size="lg"
                        aria-describedby="title-template-text"
                        minLength={3}
                        maxLength={4024}
                        value={titleTemplate}
                        onChange={(e) => setTitleTemplate(e.target.value)}
                        autoComplete="off"
                      />
                      <FormHelperText id="title-template-text">
                        Enter the title template for the items in this batch.
                      </FormHelperText>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel htmlFor="description-template">Description Template</FormLabel>
                      <Textarea
                        id="description-template"
                        fontSize={'x-small'}
                        size="lg"
                        aria-describedby="description-template-text"
                        minLength={3}
                        maxLength={1024}
                        value={descriptionTemplate}
                        onChange={(e) => setDescriptionTemplate(e.target.value)}
                        autoComplete="off"
                      />
                      <FormHelperText id="description-template-text">
                        Enter the description template for the items in this batch.
                      </FormHelperText>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel htmlFor="total">Total</FormLabel>
                      <Input
                        isDisabled={true}
                        type="number"
                        id="total"
                        aria-describedby="total-text"
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                        autoComplete="off"
                      />
                      <FormHelperText id="total-text">
                        Enter the total number of items in this batch.
                      </FormHelperText>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel htmlFor="description-template">Records</FormLabel>
                      <Textarea
                        id="records"
                        size="lg"
                        fontSize={'xx-small'}
                        aria-describedby="records-text"
                        minLength={3}
                        value={batchData}
                        onChange={async (e) => {
                          setBatchData(e.target.value)
                          let jsonData: any = await csvToJson(e.target.value)
                          setBatchDataJson(jsonData.data)
                          setTotal(jsonData.data.length > 1 ? (jsonData.data.length - 1).toString() : '0')
                        }}
                        autoComplete="off"
                      />
                      <FormHelperText id="records-text">
                        Enter the CSV rows from the helper spreadsheet
                      </FormHelperText>
                    </FormControl>
                  </Stack>
                  <Stack direction="row" align="flex-start" padding="15px" spacing="2rem" flexWrap="wrap" shouldWrapChildren>
                    <Button mt={4} type="submit" isDisabled={false} >
                      Save Batch Job
                    </Button>
                    <Button mt={4} isDisabled={!isValidBatchData('configure') || !isValidBatchData('running')} onClick={startBatch}>
                      Start Batch Job
                    </Button>
                  </Stack>
                  <Stack direction="row" align="flex-start" padding="15px" spacing="2rem" flexWrap="wrap" shouldWrapChildren>
                    {!isValidBatchData('running') && isValidBatchData('configure')? (
                      <Select id="type-selector" w="100%" value={demoIndex}
                      onChange={(e)=>{
                        setDemoIndex(Number(e.target.value))
                      }}
                      >
                        <option value="-1" >Select # to preview</option>
                        {batchDataJson.map((item, index)=>{
                          console.log(item)
                          if (index > 0) {
                            return (
                              <option value={index}>{parseTemplate(index, titleTemplate)}</option> 
                            )
                          }
                        })}
                      </Select>
                    ): null}                  
                  </Stack>
                  <Stack>
                    {demoIndex && demoIndex > -1 ? (
                      <>
                        <Text mt={2} as="h4" ml="4" mr="4" fontSize="xs" fontStyle="italic" className="md">
                          <ReactMarkdown plugins={[gfm]} children={parseTemplate(demoIndex, descriptionTemplate)} />
                        </Text>
                        <Embed className="d-block w-100 NFT-image" url={parseImage(demoIndex)}/>
                        <Text>Vault For: {parseTo(demoIndex)}</Text>
                      </>
                    ) : null}
                  </Stack>
                </form>
              </Box>
            </Stack>
          </>
        ) : action == 'list'? (
          <Box maxW="lg" borderWidth="1px" rounded="lg" overflow="hidden">
            {batches.length> 0 ? batches.map((item, index)=>{
              return (
                <Stack>
                  <Link margin="10px" href={"/batch?action=edit&batch_id="+item.id}> {item.batch_name} ({item.status})</Link>
                </Stack>
              )
            }):null}
          <Link margin="10px" href={"/batch?action=add"}> Add New Batch</Link>
          </Box>
        ): action == 'view'? (
          <Box maxW="lg"  margin="10px" borderWidth="1px" rounded="lg" overflow="hidden">
            <Stack>
                <Link margin="10px" href={"/batch?action=list"}> All Batch Jobs</Link>
                {batchId? (
                  <Link margin="10px" href={"/batch?action=edit&batch_id="+batchId}> Edit Job</Link>
                ): null}
                <Text padding="10px">{batchVaults.length} of {total} vaults created</Text>
                <Text padding="10px">{updateCount} of {total} vaults updated</Text>
                <Link padding="10px" isDisabled={running} onClick={()=>{goCreateLoop();setRunning(true)}}>Start Mint Loop - </Link>
                <Link padding="10px" isDisabled={running} onClick={()=>{goUpdateLoop(offset)}}>Start Update Loop</Link>
                <Link padding="10px" isDisabled={running} onClick={()=>{doRefresh(batchName, 'name', offset)}}>Start Refresh Loop</Link>
                <Link padding="10px" href={`${location.href.replace(`offset=${offset}`, `offset=${offset+600}`)}`} isDisabled={running} onClick={()=>{}}>spawn offset</Link>
              </Stack>
            
              {/* {batchDataJson.map((item, index)=>{
                  // if (index > 0) {
                    
                    if (batchVaults[index]) {
                      let address = batchVaults[index].addresses.filter(addy=>{return addy.coin == addressType})[0].address
                      // vaultAddresses.push(address)
                      return (
                        <Stack padding={"10px"}>
                          <Link href={'/nft?id='+batchVaults[index].tokenId}>{batchVaults[index].name}</Link>
                          <Text>{batchVaults[index].tokenId}</Text>
                          <Text fontSize={'xx-small'}>{address}</Text>
                        </Stack>
                      )
                    }
                  // }
                })} */}
                <Textarea
                        id="addresses"
                        size="lg"
                        fontSize={'xx-small'}
                        aria-describedby="addresses-text"
                        minLength={3}
                        value={JSON.stringify(vaultAddresses)}
                        autoComplete="off"
                      />
                <Link padding="10px" isDisabled={running} onClick={()=>{goCreateLoop();setRunning(true)}}>Start Mint Loop</Link>
                
          </Box>
        ): null}
        
      </Flex>

    </Loader>
  )
}
