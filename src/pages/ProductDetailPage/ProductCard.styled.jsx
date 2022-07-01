import styled from "styled-components";

export const ProductCardStyle = styled.form`
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

export const CategoryLabel = styled.label`
  text-transform: capitalize;
`;

export const NumberInput = styled.input`
  margin: 2px;
  width: 50px;
`;

export const Title = styled.h1`
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

export const ProductImg = styled.img`
  max-width: 80%;
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
