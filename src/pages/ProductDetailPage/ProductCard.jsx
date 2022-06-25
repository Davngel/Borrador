import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import "./styles.css";

// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs]);

const ProductCard = ({ data }) => {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      {data.results.map((result) => (
        <div key={result.id}>
          <h1>{result.data.name}</h1>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            className="mySwiper2"
          >
            {result.data.images.map((im, index) => {
              return (
                <SwiperSlide key={index}>
                  <img
                    src={im.image.url}
                    alt={im.image.url}
                    key={im.image.url}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <label>Price: ${result.data.price}</label>
          <br />
          <label>SKU: {result.data.sku}</label>
          <br />
          <label>Category: {result.data.category.slug}</label>
          <br />
          {result.tags.map((tag) => {
            return <li key={tag}>{tag}</li>;
          })}
          {result.data.description.map((des) => {
            return <p key={des.text}>{des.text}</p>;
          })}
          <label htmlFor="items">Items:</label>
          <input
            type="number"
            id="items"
            name="items"
            min="1"
            max={result.data.stock}
          ></input>
          <button>Add to car</button>
          {result.data.specs.map((spec) => {
            return (
              <div key={spec.spec_name}>
                                <ul>{spec.spec_name}</ul>

                  <li>{spec.spec_value}</li>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default ProductCard;
