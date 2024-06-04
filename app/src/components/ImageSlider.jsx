import React from 'react';
import Slider from 'react-slick';

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className="image-slide">
          <a href={image.link} rel="noopener noreferrer">
            <img src={image.url} alt={image.title} style={{ width: '100%', height: '200px' }} />
            <div className="image-title">{image.title}</div>
          </a>
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;