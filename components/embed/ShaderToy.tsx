import React, { Component } from 'react'

type ShaderToyProps = {
  url: string
}

export class ShaderToy extends Component<ShaderToyProps> {
  render() {
    let url = this.props.url.replace('paused=true', 'paused=false')
    return (
      <>
        <iframe width="95%"  frameBorder="0" src={url} allowFullScreen></iframe>
      </>
    )
  }
}

export default ShaderToy
