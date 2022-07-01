import styled from "styled-components";

export const ContenedorProductList = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  margin: 0;
  padding: 0;
  @media (min-width: 1024px) {
    grid-template-columns: 15% 85%;
  }
`;
export const ButtonProducts = styled.button`
  border: none;
  outline: none;
  width: 100%;
  padding: 16px 0;
  margin: 10px 0;
  background-color: #8a817c;
  color: black;
  font-size: 18px;
  cursor: pointer;
`;
export const CajaName = styled.div`
  border: 1px solid black;
  display: flex;
  background-color: #bcb8b1;
`;
export const Lista = styled.ul`
  list-style-type: none;
`;

export const TituloSidebar = styled.h1`
  color: black;
  text-align: center;
  font-size: small;
  padding-top: 10px;
  padding-bottom: 10px;
  @media (min-width: 768px) {
    font-size: larger;
  }
`;
export const SidebarContenedor = styled.div`
  align-items: center;
  justify-content: center;
  background-color: #f4f3ee;
`;

export const CategorySidebar = styled.div`
  width: fit-content;
  margin: 3px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

export const ContenedorButton = styled.div`
  display: grid;
  padding: 10px;
  height: 90%;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  background-color: #e7e7e7;
  color: black;
  font-size: 12px;
  gap: 5px;
  border-radius: 8px;
`;

export const ProductContenedor = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: start;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Producto = styled.div`
  border: 0.5px solid black;
  width: 80%;
  @media (min-width: 768px) {
    width: 205px;
  }

  @media (min-width: 1200px) {
    width: auto;
  }
`;
export const ProductName = styled.span`
  margin: auto;
  font-size: 15px;
  text-align: center;

  width: 100%;
  padding: 2px 5px;

  /* Both of the following are required for text-overflow */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (min-width: 768px) {
    font-size: 20px;
    padding: 5px;
  }
  @media (min-width: 1024px) {
    font-size: 25px;
  }
`;

export const ProductImage = styled.img`
  padding: 5px;
  margin: auto;
  height: 150px;
  border-radius: 20%;
  width: 150px;
  display: block;
  justify-content: center;
  align-items: center;

  @media (min-width: 1024px) {
    width: 180px;
    height: 150px;
    padding: 0;
  }

  @media (min-width: 1200px) {
    margin-left: 25%;
  }
`;

export const PrizeCategory = styled.p`
  text-align: center;
  text-transform: uppercase;
  font-size: 17px;
  @media (min-width: 768px) {
    padding: 2%;
    font-size: 20px;
  }
  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

export const ContenedorButtonCar = styled.div`
  display: grid;
  padding: 5px;
  grid-template-columns: 1fr 1fr;
  width: fit-content;
  gap: 5px;
  align-items: center;
  font-size: 12px;
  border-radius: 8px;
  border: none;
`;
