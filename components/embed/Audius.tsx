import React, { Component } from 'react'

type AudiusProps = {
  url: string
}

export class Audius extends Component<AudiusProps> {
  render() {
    return (
      <>
        <iframe src={this.props.url} width="100%" height="400" allow="encrypted-media"></iframe>
      </>
    )
  }
}

export default Audius
