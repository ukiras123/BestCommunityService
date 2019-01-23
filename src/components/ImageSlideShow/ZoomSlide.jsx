import React from 'react';
import { Zoom } from 'react-slideshow-image';

const images = [
    "https://www.usamls.net/oldcashiersrealty/data1/images/mountains_are_calling.jpg",
    "https://www.melbtravel.com/wp-content/uploads/2018/12/Org-Hiking-Nepal.jpeg",
"http://www.yachtcom.info/wp-content/uploads/2015/02/harbour-island.jpg",
"http://cssslider.com/sliders/demo-21/data1/images/arch445790_1280.jpg",
];
 
const zoomOutProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: true
}

const style = {
    height: "auto",
    width: "auto",
}
 
function ZoomSlide(){
    return (
      <Zoom {...zoomOutProperties}>
        {
          images.map((each, index) => <img alt={each} key={index} style={style} src={each} />)
        }
      </Zoom>
    )
}

export default ZoomSlide;