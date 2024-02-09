import React, { Component } from 'react'
import { validImage } from '../utils'
import { Image } from '@chakra-ui/react'
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

export class Embed extends Component<EmbedProps> {
  render() {
    let url = this.props.url || ""
    let hash = url.replace("ipfs://","").split("?")[0].split("&")[0]
    if (url.includes("ipfs://")) {
      url =  "https://gateway.ipfs.io/ipfs/" + hash
      getIPFSImage(hash)
    }
    if (url.includes('image-scale')) {
      url = url + '&size=400'
    }
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
        ) : url.includes('ipfs.io') ? (
          <Image
                p={"20px"}
                h={"100%"}
                className={this.props.className + " " + hash || "d-block w-100"}
                src={url}
                width="250px"
                maxWidth={"250px"}
              />
        ) : url.includes('image-scaler.vercel') ? (
          <Image
            p={"20px"}
            h={"100%"}
            className={this.props.className || "d-block w-100"}
            src={url}
            width="250px"
            height="300px"
          />
        ) :  url.includes('/dynamic/') || url.includes('https://s3.amazonaws.com/') ||  url.includes('googleusercontent.com') || url.includes('ipfs.io') || url.includes('framed/') ||  url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.includes('.gif') || url.includes('.svg') || url.includes('data:image') ? (
              <Image
                p={"20px"}
                h={"100%"}
                className={this.props.className || "d-block w-100"}
                src={validImage(url) ? url : 'https://raw.githubusercontent.com/EmblemCompany/Coval-Site/master/public/coval-logo.png' /*'https://circuitsofvalue.com/public/coval-logo.png'*/}
                width="250px"
                maxWidth={"250px"}
              />
        ) : url.includes('STAMP') ? (
          <Image
            p={"20px"}
            h={"100%"}
            className={this.props.className || "d-block w-100"}
            src={url.replace('STAMP:','data:image/png;base64,')}
            width="250px"
            height="300px"
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

const getIPFSImage = async function(hash){
  const responce = await fetch('https://gateway.ipfs.io/ipfs/'+hash, {
    method: 'GET',
  })
  let jsonData = await responce.text()
  if (jsonData.includes("data:image")){
    const preview = document.querySelector('img.' + hash) as HTMLImageElement 
    preview.src = jsonData
    console.log(jsonData)
  }
}

export default Embed
