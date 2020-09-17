import React from 'react';

import classes from './BackgroundVideo.module.css';

const BackgroundVideo = () => {
    const videoSource = "https://circuitsofvalue.com/public/circuits.mp4"
    return (
        // <div className={classes.Container} >
            <video id="VideoBG" autoPlay="autoplay" loop="loop" muted className={classes.Video} >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        // </div>
    )
}

export default BackgroundVideo