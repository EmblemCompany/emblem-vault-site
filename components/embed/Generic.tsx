import React, { Component } from 'react'
import IframeResizer from 'iframe-resizer-react'

type GenericProps = {
  url: string
}

export class Generic extends Component<GenericProps> {
  render() {
    return (
      <>
        <iframe frameBorder="0" src={this.props.url} width="350" height="650" allow="encrypted-media" sandbox="allow-scripts allow-same-origin"></iframe>
        {/* <IframeResizer
          log
          src={this.props.url}        
          scrolling={true}
          width="100%" height="400" allow="encrypted-media"
        /> */}
      </>
    )
  }
}

export default Generic
