import React, { Component } from 'react'
import { sdk, validImage } from '../utils'
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

  state = {
    contentType: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const contentType = await sdk.contentTypeReport(this.props.url);
      this.setState({ contentType, loading: false });
    } catch (error) {
      console.error("Error fetching content type:", error);
      this.setState({ loading: false });
      // Handle error appropriately
    }
  }

  render() {
    let url = this.props.url || ""
    const { contentType, loading } = this.state;
    let hash = url.replace("ipfs://","").split("?")[0].split("&")[0]
    let base64 = url.toLocaleLowerCase().includes("stamp:")? toDataUri(url.split(':')[1]): false
    if (url.includes("ipfs://")) {
      url =  "https://gateway.ipfs.io/ipfs/" + hash
      getIPFSImage(hash)
    }
    if (url.includes('image-scale')) {
      url = url + '&size=400'
    }
    return (
      <>
        { contentType && contentType.contentType == "video/mp4" ? (
          <video
            src={url}
            controls
          />
        ) : url.includes('sketchfab.com/') ? (
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
        ) : base64 ? (
          <Image
            h={"100%"}
            className={this.props.className || "d-block w-100"}
            src={base64}
            width="250px"
            height="300px"
          />
        ) : contentType && contentType.valid && !contentType.contentType.includes('text/') ? (
          <Image
            p={"20px"}
            h={"100%"}
            className={this.props.className || "d-block w-100"}
            src={url}
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

function toDataUri(base64Data) {
  // Decode the base64 string to raw data
  const raw = atob(base64Data);
  
  // Convert the first few bytes to their hexadecimal representation for binary signatures
  const hexSignature = raw.slice(0, 4).split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');

  let mimeType = 'unknown'; // Default MIME type if unknown

  // Check for binary file types
  switch (hexSignature.toUpperCase()) {
      case '89504E47': mimeType = 'image/png'; break;
      case 'FFD8FFDB':
      case 'FFD8FFE0':
      case 'FFD8FFE1': mimeType = 'image/jpeg'; break;
      case '47494638': mimeType = 'image/gif'; break;
      case '25504446': mimeType = 'application/pdf'; break;
      case '66747970': mimeType = 'video/mp4'; break; // "ftyp" in ASCII to hex
      // Add more binary signatures as needed
  }

  // Check for text-based file types by examining the start of the text content
  if (mimeType === 'unknown') {
      if (raw.startsWith('<svg') || raw.startsWith('<?xml')) {
          mimeType = 'image/svg+xml';
      } else if (raw.startsWith('<!DOCTYPE html>') || raw.startsWith('<html')) {
          mimeType = 'text/html';
      } else {
          // Default to plain text if it's not HTML/SVG but the content is text-based
          mimeType = 'text/plain';
      }
  }

  // Construct the data URI
  const dataUri = `data:${mimeType};base64,${base64Data}`;
  return dataUri;
}

export default Embed
