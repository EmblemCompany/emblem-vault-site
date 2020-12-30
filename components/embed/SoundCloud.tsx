import React, { Component } from 'react'

type SoundCloudProps = {
  url: string
}

export class SoundCloud extends Component<SoundCloudProps> {
  render() {
    let url = this.props.url.replace('paused=true', 'paused=false')
    return (
      <>
        <iframe width="95%" height="100%" scrolling="no" frameBorder="no" allow="autoplay" src={url}></iframe>
      </>
    )
  }
}

export default SoundCloud
