import React, { Component } from 'react'

type ClypProps = {
  url: string
}

export class Clyp extends Component<ClypProps> {
  render() {
    let url = this.props.url.replace('paused=true', 'paused=false')
    return (
      <>
        <iframe width="95%" height="256px" scrolling="no" frameBorder="no" allow="autoplay" src={url}></iframe>
      </>
    )
  }
}

export default Clyp
