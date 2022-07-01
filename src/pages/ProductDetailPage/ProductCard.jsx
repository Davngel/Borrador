import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import "./styles.css";

import * as S from "./ProductCard.styled";
// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import ProductsOnCar from "../../components/context/ProductsCar";

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs]);

const ProductCard = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [cantidad, setCantidad] = useState(0);
  const [habilitar, setHabilitar] = useState(false);
  const productStock = parseInt(data.results[0].data.stock);
  const [stock, setStock] = useState(productStock);
  const { agregarCarrito } = useContext(ProductsOnCar);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stock >= cantidad) {
      setStock(stock - cantidad);
    }

    const productoSeleccionado = {
      id: data.results[0].data.name,
      name: data.results[0].data.name,
      imagen: data.results[0].data.mainimage.url,
      price: data.results[0].data.price,
      quantity: cantidad,
      stock: stock,
    };
    agregarCarrito(productoSeleccionado);
  };
  useEffect(() => {
    if (stock <= 0) {
      setHabilitar(true);
      alert("Out of stock");
    }
  }, [stock]);

  return (
    <>
      {data.results.map((result) => (
        <S.ProductCardStyle key={result.id} onSubmit={handleSubmit}>
          <S.Title>{result.data.name}</S.Title>
          <hr />
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
                  <S.ProductImg
                    src={im.image.url}
                    alt={im.image.url}
                    key={im.image.url}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <hr />
          <label>Price: ${result.data.price}</label>
          <br />
          <label htmlFor="items">Items:</label>
          <S.NumberInput
            type="number"
            id="items"
            name="items"
            min="1"
            max={stock}
            placeholder="0"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
            disabled={habilitar}
          ></S.NumberInput>
          <button>Add to car</button>
          <br />
          <br />
          <hr />
          <label>SKU: {result.data.sku}</label>
          <br />
          <S.CategoryLabel>
            Category: {result.data.category.slug}
          </S.CategoryLabel>
          <br />
          {result.tags.map((tag) => {
            return <li key={tag}>{tag}</li>;
          })}
          <br />
          <hr />

          {result.data.description.map((des) => {
            return (
              <p key={des.text}>
                Description: <br />
                {des.text}
              </p>
            );
          })}
          <br />
          {result.data.specs.map((spec) => {
            return (
              <div key={spec.spec_name}>
                <hr />
                <ul>{spec.spec_name}:</ul>

                <li>{spec.spec_value}</li>
                <br />
              </div>
            );
          })}
        </S.ProductCardStyle>
      ))}
    </>
  );
};

ProductCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProductCard;
