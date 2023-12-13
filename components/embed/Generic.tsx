import React, { Component } from 'react'
import IframeResizer from 'iframe-resizer-react'

type GenericProps = {
  url: string
}

export class Generic extends Component<GenericProps> {
  render() {
    return (
      <>
        {/* <iframe frameBorder="0" scrolling="no" src=width="100%" height="400" allow="encrypted-media"></iframe> */}
        <IframeResizer
          log
          src={this.props.url}        
          scrolling={true}
          width="100%" height="400" allow="encrypted-media"
        />
      </>
    )
  }
}

export default Generic
