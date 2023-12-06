import React from 'react';
import Slider from 'react-slick';

const DynamicImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`image ${index + 1}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </Slider>
  );
};

export default DynamicImageCarousel;
