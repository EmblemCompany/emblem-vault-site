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

export class Embed extends Component<EmbedProps> {
  render() {
    let url = this.props.url || ""
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
        ) : url.includes('/dynamic/') || url.includes('https://s3.amazonaws.com/') ||  url.includes('googleusercontent.com') || url.includes('ipfs.io') || url.includes('framed/') ||  url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.includes('.gif') || url.includes('.svg') ? (
              <Image
                p={"20px"}
                h={"100%"}
                className={this.props.className || "d-block w-100"}
                src={validImage(url) ? url : 'https://circuitsofvalue.com/public/coval-logo.png'}
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

export default Embed
