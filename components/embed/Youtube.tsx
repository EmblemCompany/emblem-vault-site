import React, { Component } from 'react'

type YoutubeProps = {
  url: string
}

export class Youtube extends Component<YoutubeProps> {
  render() {
    return (
      <>
        <iframe className="ytembed" src={this.props.url.split(' ')[0].trim().replace('"', '').replace('/watch?v=','/embed/')} width="100%" height="315" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </>
    )
  }
}

export default Youtube
