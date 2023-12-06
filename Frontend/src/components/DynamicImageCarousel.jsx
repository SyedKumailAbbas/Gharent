import React from 'react';
// import Slider from 'react-slick';
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const DynamicImageCarousel = ( {images} ) => {
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  return (
    // <Slider {...settings}>
    //     {images.map((image, index) => {
    //       return (
    //       <div key={index}>
    //         <img
    //           src={image}
    //           alt={`image ${index + 1}`}
    //           className="h-full w-full object-cover"
    //         />
    //       </div>
    //       )
    //     })}
    // </Slider>
    <Carousel>
    {images.map((img, key) => (
      <Carousel.Item key={key}>
        <img className="d-block w-100" src={img} alt={`Slide ${key + 1}`} />
      </Carousel.Item>
    ))}
  </Carousel>
  );
};

export default DynamicImageCarousel;
