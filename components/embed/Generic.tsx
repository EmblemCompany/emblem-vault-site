import React, { Component } from 'react'

type GenericProps = {
  url: string
}

export class Generic extends Component<GenericProps> {
  render() {
    return (
      <>
        <iframe src={this.props.url} width="100%" height="400" allow="encrypted-media"></iframe>
      </>
    )
  }
}

export default Generic
