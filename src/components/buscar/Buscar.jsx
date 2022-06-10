import React from "react";
import styled from "styled-components";

const Formulario = styled.form`
  margin: 3px;
  grid-column: 1/2;
  display: inline-flex;

  /* Media Query for Tablets Ipads portrait mode */
  @media (min-width: 768px) and (max-width: 1024px) {
    height: 25px;
    width: 25px;
  }
  /* Media Query for Laptops and Desktops */
  @media (min-width: 1025px) {
    height: 40px;
    width: 40px;
  }
`;
const Buscar = () => {
  return (
    <Formulario>
      <input type="text" />

      <button type="submit" onClick={(e)=>e.preventDefault()}> Buscar </button>
    </Formulario>
  );
};

export default Buscar;
