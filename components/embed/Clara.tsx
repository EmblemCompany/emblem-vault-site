import React, { Component } from 'react'

type ClaraProps = {
  url: string
}

export class Clara extends Component<ClaraProps> {
  render() {
    return (
      <>
        <iframe src={this.props.url} width="800" height="600" allowFullScreen></iframe>
      </>
    )
  }
}

export default Clara
