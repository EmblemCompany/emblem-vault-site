import React, { Component } from 'react'

type MyMiniFactoryProps = {
  url: string
}

export class MyMiniFactory extends Component<MyMiniFactoryProps> {
  render() {
    return (
      <>
        <iframe width="230" height="285" src={this.props.url} frameBorder="0" scrolling="no" allowTransparency></iframe>
      </>
    )
  }
}

export default MyMiniFactory
