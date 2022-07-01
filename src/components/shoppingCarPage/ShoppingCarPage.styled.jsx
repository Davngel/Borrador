import styled from "styled-components";

export const ProductoCarrito = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 3fr;
  gap: 4rem;
  align-items: center;
  border-bottom: 2px solid #cfcfcf;
  padding: 3rem 0;
`;

export const ProductoImagen = styled.img`
  width: 130px;
  height: 220px;
  @media (min-width: 768px) {
    width: 250px;
    height: 350px;
  }
`;

export const ProductoParrafo = styled.p`
  margin: 0 0 1rem 0;
`;

export const ProductName = styled.p`
  margin: 0 0 1rem 0;
  font-weight: 600;
  font-size: 1.2rem;
`;

export const MainContenedor = styled.div`
  display: grid;
  gap: 4rem;

  @media (min-width: 768px) {
    grid-template-columns: 3fr 2fr;
    align-items: flex-start;
  }
`;
export const SubtotalPrice = styled.span`
  font-weight: 500;
  font-size: 1.4rem;
`;

export const ButtonDelete = styled.button`
  background-color: white;
  position: absolute;
  color: black;
  top: 3rem;
  right: 1rem;
  width: 25px;
  height: 25px;
  font-weight: bold;

  :hover {
    cursor: pointer;
  }
`;

export const ParrafoTotal = styled.p`
  background-color: #f9fafb;
  padding: 3rem;
  border-radius: 1rem;
  font-size: 1.5rem;
`;

export const ButtonCheckout = styled.button`
  border: none;
  outline: none;
  margin: auto;
  width: 100%;
  padding: 16px 0;
  margin: 10px 0;
  background-color: #8a817c;
  color: black;
  font-size: 18px;
  cursor: pointer;
`;

export const NumberInput = styled.input`
  margin: 2px;
  width: 50px;
`;
