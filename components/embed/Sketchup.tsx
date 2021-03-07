import React, { Component } from 'react'

type SketchupProps = {
  url: string
}

export class Sketchup extends Component<SketchupProps> {
  render() {
    return (
      <>
        <iframe src={this.props.url} frameBorder="0" scrolling="no" width="580" height="326" allowFullScreen></iframe>
      </>
    )
  }
}

export default Sketchup
