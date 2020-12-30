import React, { Component } from 'react'

type SketchFabProps = {
  url: string
}

export class SketchFab extends Component<SketchFabProps> {
  render() {
    return (
      <>
        <div className="sketchfab-embed-wrapper">
          <iframe width="100%" src={this.props.url} frameBorder="0" allow="autoplay; fullscreen; vr" allowFullScreen></iframe>
        </div>
      </>
    )
  }
}

export default SketchFab
