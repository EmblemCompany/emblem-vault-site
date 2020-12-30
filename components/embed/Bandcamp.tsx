import React, { Component } from 'react'

type BandcampProps = {
  url: string
}

export class Bandcamp extends Component<BandcampProps> {
  render() {
    let url = this.props.url.replace('paused=true', 'paused=false')
    return (
      <>
        {/* <iframe width="100%"  frameBorder="0" src={url} allowFullScreen></iframe> */}
        <iframe height="753px" src={url} seamless></iframe>
      </>
    )
  }
}

export default Bandcamp
