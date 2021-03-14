import React, { Component } from 'react'

type VimeoProps = {
  url: string
}

export class Vimeo extends Component<VimeoProps> {
  render() {
    return (
      <>
        <iframe src={this.props.url} width="100%" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
      </>
    )
  }
}

export default Vimeo
