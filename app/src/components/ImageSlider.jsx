import React from 'react';
import Slider from 'react-slick';

const ImageSlider = ({ images, onImageClick }) => {
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
        <div key={index} className="image-slide" onClick={() => onImageClick(image)} style={{ cursor: 'pointer' }}>
            <img src={image.url} alt={image.title} style={{ width: '100%', height: '200px', borderRadius: 20}} />
            <div className="image-title">{image.title}</div>
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;