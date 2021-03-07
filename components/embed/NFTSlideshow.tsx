import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import {Box, Stack} from '@chakra-ui/core'
import Embed from '../Embed'
type ImageProp = {
  image: string,
  description: string,
  name: string
}

type NFTSlideshowProps = {
  name: string,
  image: string,
  items: Array<ImageProp>,
  properties: Object
}


export class NFTSlideshow extends Component<NFTSlideshowProps> {
  
  render() {
    let items = [{image: this.props.image, name: this.props.name}]
    items = items.concat(this.props.items)
    items = items.filter(item=>{return item.image !== ""})
    return (
        <Container className="p-3">
          <Carousel>
            {items.map((item, index)=>{
              return (
                <Carousel.Item key={index}>
                  <Stack>
                    <Box>
                      {/* <img
                        className="d-block w-100"
                        src={item.image}
                        alt="First slide"
                      /> */}
                      <Embed url={item.image}/>
                    </Box>
                    <Box>
                      <Carousel.Caption>
                        <h3>{item.name}</h3>
                        {/* <p>{item.description}</p> */}
                      </Carousel.Caption>
                    </Box>
                  </Stack>
                </Carousel.Item>   
              )
            })}                     
          </Carousel>
        </Container>
    );
  }
};

export default NFTSlideshow;