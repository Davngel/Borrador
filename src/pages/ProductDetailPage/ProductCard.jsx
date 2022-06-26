import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import "./styles.css";

import styled from "styled-components";
// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs]);

const ProductCardStyle = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 350px;
  margin: auto;
  text-align: start;
  padding: 5%;
  font-size: large;
  @media (min-width: 1024px) {
    max-width: 700px;
    font-size: larger;
  }

  @media (min-width: 1200px) {
    max-width: 1050px;
    font-size: x-large;
  }
`;

const CategoryLabel = styled.label `
text-transform: capitalize;

`;

const NumberInput = styled.input `
 margin: 2px;
 width: 30px;

`;




const Title = styled.h1`
  text-align: center;
  align-items: center;
  margin: 20px;
  font-size: 25px;
  justify-content: center;
  /* Media Query for Tablets Ipads portrait mode */
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 25px;
  }
  /* Media Query for Laptops and Desktops */
  @media (min-width: 1025px) {
    font-size: 50px;
  }
`;

const ProductImg = styled.img`
  max-width: 80%;
`;

const ProductCard = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      {data.results.map((result) => (
        <ProductCardStyle key={result.id}>
          <Title>{result.data.name}</Title>
          <hr/>
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
                  <ProductImg
                    src={im.image.url}
                    alt={im.image.url}
                    key={im.image.url}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <hr/>
          <label>Price: ${result.data.price}</label>
          <br />
          <label htmlFor="items">Items:</label>
          <NumberInput
            type="number"
            id="items"
            name="items"
            min="1"
            max={result.data.stock}
            placeholder="1"
          ></NumberInput>
          <button>Add to car</button>
          <br />
          <br />
          <hr/>
          <label>SKU: {result.data.sku}</label>
          <br />
          <CategoryLabel >Category: {result.data.category.slug}</CategoryLabel>
          <br />
          {result.tags.map((tag) => {
            return <li key={tag}>{tag}</li>;
          })}
          <br />
          <hr/>
          
          {result.data.description.map((des) => {
            return <p key={des.text}>Description: <br/>{des.text}</p>;
          })}
          <br />
          {result.data.specs.map((spec) => {
            return (
              <div key={spec.spec_name}>
                                <hr/>
                <ul>{spec.spec_name}:</ul>

                <li>{spec.spec_value}</li>
                <br/>
              </div>
            );
          })}
        </ProductCardStyle>
      ))}
    </>
  );
};

export default ProductCard;
