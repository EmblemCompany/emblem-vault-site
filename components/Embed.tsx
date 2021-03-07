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

type EmbedProps = {
  url: string
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
        ) : (
              <Image
                className="d-block w-100"
                src={validImage(url) ? url : 'https://circuitsofvalue.com/public/coval-logo.png'}
                width="250px"
              />
            )}
      </>
    )
  }
}

export default Embed
