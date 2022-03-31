import React, { Component } from 'react'
import { validImage } from '../utils'
import { Image } from '@chakra-ui/core'
import SketchFab from './embed/SketchFab'
import ShaderToy from './embed/ShaderToy'
import Bandcamp from './embed/Bandcamp'
import SoundCloud from './embed/SoundCloud'
import Clyp from './embed/Clyp'
import Sketchup from './embed/Sketchup'
import Clara from './embed/Clara'
import MyMiniFactory from './embed/MyMiniFactory'
import { Audius } from './embed/Audius'
import { Generic } from './embed/Generic'
import Youtube from './embed/Youtube'
import Vimeo from './embed/Vimeo'

type EmbedProps = {
  url: string,
  className?: string
}

const getIPFSImage = async function(hash){
  // alert(0)
  const responce = await fetch('https://gateway.ipfs.io/ipfs/'+hash, {
    method: 'GET',
    headers: {
      // redirect:'follow'
    },
  })
  let jsonData = await responce.text()
  // setVaultImage(jsonData) 
  // const preview = document.querySelector('img.d-block') as HTMLImageElement
  if (jsonData.includes("data:image")) {
    // preview.src = jsonData
    return jsonData
  } else {
    // preview.src = 'https://gateway.ipfs.io/ipfs/'+hash
    return 'https://gateway.ipfs.io/ipfs/'+hash
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export class Embed extends Component<EmbedProps> {
  render() {
    let url = this.props.url || ""
    url = url.replace("&framed=true", "")
    let classIdentifier = url.split('/').reverse()[0] + getRandomInt(999).toString()
    if (url.includes('ipfs://')) {
      
      setTimeout(()=>{
        getIPFSImage(url.split('/').reverse()[0]).then((result)=>{
          if (result.includes('data:image')) {
            const preview = document.querySelector('.'+classIdentifier) as HTMLImageElement
            preview? preview.src = result: null
            url = result
          }
        })
      }, 1000)
      console.log("before",url)
      url = url.replace('ipfs://', 'https://gateway.ipfs.io/ipfs/')
      console.log("after", url)
      return ( <Image
        p={"20px"}
        h={"100%"}
        className={(this.props.className || "d-block w-100") + " blah "+classIdentifier}
        src={url}
        width="250px"
      />)
    } else {
      return (
        <>
          {url.includes('sketchfab.com/') ? (
            <SketchFab
              url={url}
            />
          ) : url.includes('shadertoy.com/') ? (
            <ShaderToy
              url={url}
            />
          ) : url.includes('bandcamp.com/') ? (
            <Bandcamp
              url={url}
            />
          ) : url.includes('soundcloud.com/') ? (
            <SoundCloud
              url={url}
            />
          ) : url.includes('clyp.it/') ? (
            <Clyp
              url={url}
            />
          ) : url.includes('sketchup.com/') ? (
            <Sketchup
              url={url}
            />
          ) : url.includes('clara.io/') ? (
            <Clara
              url={url}
            />
          ) : url.includes('myminifactory.com/') ? (
            <MyMiniFactory
              url={url}
            />
          ) : url.includes('audius.co/') ? (
            <Audius
              url={url}
            />
          ) : url.includes('youtube.com') ? (
            <Youtube
              url={url}
            />
          ) : url.includes('vimeo.com') ? (
            <Vimeo
              url={url}
            />
          ) : url.includes('/dynamic/') || url.includes('arweave') || url.includes('https://s3.amazonaws.com/') ||  url.includes('googleusercontent.com') || url.includes('ipfs.io') || url.includes('framed/') ||  url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.includes('.gif') || url.includes('.svg') || url.includes('data:image') ? (
                <Image
                  p={"20px"}
                  h={"100%"}
                  className={(this.props.className || "d-block w-100") + " "+classIdentifier}
                  src={url}
                  width="250px"
                />
          ) : (
            <Generic
              url={url}
            />
          )
            }
        </>
      )
    }
    
  }
}

export default Embed
