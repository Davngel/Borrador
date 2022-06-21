import React from "react";
import {Link} from 'react-router-dom'
import { ReactComponent as CarritoCompra } from "../../utils/img/shopping-cart_icon-icons.com_65051.svg";
import { ReactComponent as LogoT } from "../../utils/img/letters_T.svg";
import { ReactComponent as LogoM } from "../../utils/img/letters_M.svg";
import Buscar from "../buscar/Buscar";
import styled from "styled-components";

const ContenedorHeader = styled.header`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  background-color: #e0afa0;
`;

const Title = styled.h1`
  color: #463f3a;
  grid-column: 1/4;
  text-align: center;
  align-items: center;
  gap: 5%;
  padding: 10px;
  margin-left: 24px;
  font-size: 31px;

  justify-content: center;
  display: inline-flex;
  /* Media Query for Tablets Ipads portrait mode */
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 50px;
  }
  /* Media Query for Laptops and Desktops */
  @media (min-width: 1025px) {
    font-size: 70px;
  }
`;

const Carrito = styled.button`
  padding: 2px;
  background-color: white;
  border-radius: 10%;
  margin: 3px;
  height: 25px;
  width: 25px;
  grid-column: 4/4;
  border: 1px solid black;
  cursor: pointer;
  /* Media Query for Tablets Ipads portrait mode */
  @media (min-width: 768px) and (max-width: 1024px) {
    grid-column: 4/4;
    height: 30px;
    width: 30px;
  }
  /* Media Query for Laptops and Desktops */
  @media (min-width: 1025px) {
    height: 40px;
    width: 40px;
  }
`;
const LogoImagen = styled.button`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: #f4f3ee;
    transition-duration: 500ms;
  }
  transition-duration: 1000ms;
  padding: 2px;
  background-color: #e0afa0;
  grid-column: 4/4;
  height: 50px;
  width: 80px;
  border: #e0afa0;
  border-radius: 50%;
  cursor: pointer;
  grid-column: 4/4;
  svg {
    
    height: 20px;
    width: 30px;
    transform: scale(2.5, 1);
  }
  /* Media Query for Tablets Ipads portrait mode */
  @media (min-width: 768px) and (max-width: 1024px) {
    grid-column: 3/4;
    svg {
      height: 25px;
      width: 45px;
    }
  }
  /* Media Query for Laptops and Desktops */
  @media (min-width: 1025px) {
    height: 70px;
    width: 100px;
    svg {
      height: 35px;
      width: 50px;
    }
  }
`;
export const Header = ({ titulo, returnHome }) => {

  return (


    <>
      <ContenedorHeader>
        <Title>
          {titulo}
          <Link to='/home'>
            <LogoImagen onClick={returnHome}>
              <LogoM />
              <LogoT />
            </LogoImagen>
          </Link>
        </Title>
        <Buscar />
        <Carrito>
          <CarritoCompra />
        </Carrito>
      </ContenedorHeader>
    </>
  );
};
