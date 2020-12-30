import React, { Component } from 'react'
import SketchFab from './embed/SketchFab'
import ShaderToy from './embed/ShaderToy'
import Bandcamp from './embed/Bandcamp'
import SoundCloud from './embed/SoundCloud'
import Clyp from './embed/Clyp'
import { validImage } from '../utils'
import { Image } from '@chakra-ui/core'

type EmbedProps = {
  url: string
}

export class Embed extends Component<EmbedProps> {
  render() {
    let url = this.props.url
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
          <SoundCloud
            url={url}
          />
        ) : (
              <Image
                src={validImage(url) ? url : 'https://circuitsofvalue.com/public/coval-logo.png'}
                width="250px"
              />
            )}
      </>
    )
  }
}

export default Embed
