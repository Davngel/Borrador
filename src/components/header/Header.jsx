import React, { useState, useEffect, useContext } from "react";
import ProductsOnCar from "../context/ProductsCar";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as CarritoCompra } from "../../utils/img/shopping-cart_icon-icons.com_65051.svg";
import { ReactComponent as LogoT } from "../../utils/img/letters_T.svg";
import { ReactComponent as LogoM } from "../../utils/img/letters_M.svg";
import * as S from "./Header.styled";
import Search from "../search";
import PropTypes from "prop-types";

export const Header = ({ titulo }) => {
  const { carrito } = useContext(ProductsOnCar);

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/cart");
  };

  const [numberItems, setNumberItems] = useState(0);

  useEffect(() => {
    const totalItems = carrito.reduce(
      (total, producto) => total + producto.quantity,
      0
    );

    setNumberItems(totalItems);
  }, [carrito]);
  return (
    <>
      <S.ContenedorHeader>
        S.
        <S.Title>
          {titulo}
          <Link to="/home">
            <S.LogoImagen>
              <LogoM />
              <LogoT />
            </S.LogoImagen>
          </Link>
        </S.Title>
        <Search />
        <S.Carrito onClick={handleOnClick}>
          <S.NumberOf>{numberItems}</S.NumberOf>
          <CarritoCompra></CarritoCompra>
        </S.Carrito>
      </S.ContenedorHeader>
    </>
  );
};

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
};
