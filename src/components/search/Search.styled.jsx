import styled from "styled-components";

export const ProductContenedor = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: stretch;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
export const ContenedorButton = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: start;
  background-color: #e7e7e7;
  color: black;
  font-size: 12px;
  border-radius: 8px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  :hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
`;
export const Description = styled.p`
  width: 170px;
  padding: 5px;

  /* Both of the following are required for text-overflow */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CajaName = styled.div`
  border: 1px solid black;
  display: flex;
  background-color: #bcb8b1;
`;
export const Producto = styled.div`
  border: 0.5px solid black;
`;

export const ProductName = styled.span`
  margin: auto;
  font-size: 14px;
  width: 150px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (min-width: 768px) {
    width: 200px;
    font-size: 18px;
    padding: 5px;
  }
`;

export const ProductImage = styled.img`
  padding: 5px;
  margin: auto;
  border-radius: 10%;
  width: 60%;
  display: block;
  align-items: center;

  @media (min-width: 1024px) {
    width: 180px;
    height: 150px;
    margin-left: 10%;
    padding: 0;
  }

  @media (min-width: 1200px) {
    width: 250px;
    height: 300px;
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

export const ButtonCart = styled.button`
  width: 100%;
`;

export const Formulario = styled.form`
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
