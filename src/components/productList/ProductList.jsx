import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dataCategories from "../../mocks/en-us/product-categories.json";
import dataProducts from "../../mocks/en-us/products.json";

const ContenedorProductList = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  margin: 0;
  padding: 0;
  @media (min-width: 1024px) {
    grid-template-columns: 15% 85%;
  }
`;

const TituloSidebar = styled.h1`
  color: black;
  text-align: center;
  font-size: small;
  padding-top: 10px;
  @media (min-width: 768px) {
    font-size: larger;
  }
`;
const SidebarContenedor = styled.div`
  align-items: center;
  justify-content: center;
  background-color: #f4f3ee;
`;

const CategorySidebar = styled.div`
  width: fit-content;
  margin: 3px;
  justify-content: center;
  align-items: center;
`;

const ParrafoSidebar = styled.p`
  text-align: center;
  font-size: 8px;
  border-bottom: 2px solid black;
  padding: 5px;

  @media (min-width: 768px) {
    font-size: 15px;
    font-weight: 500;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
    font-weight: 500;
  }
`;

const ProductList = () => {

  const [category, setCategory] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  
  const handleChange = e => {
    if (e.target.checked) {
      setCategory([...category, e.target.value]);
    } else {
      setCategory(category.filter(cate => cate !== e.target.value));
    }
  };
  
  useEffect(() => {
    if (category.length === 0) {
      setFilteredCategory(dataProducts.results);
    } else {
      setFilteredCategory(
        dataProducts.results.filter(dataCategories =>
          category.some(value => [dataCategories].flat().includes(value))
        )
      );
    }
  }, [category]);

  
  return (
    <>
      <ContenedorProductList>
        <SidebarContenedor>
          <TituloSidebar>Categories</TituloSidebar>
          <ul>
          {dataCategories.results.map((result) => (
            <li key={result.id}>
              <div>
                <input
                type='checkbox'
                id={result.id}
                name={result.data.name}
                value={result.data.name}
                onChange={handleChange}
                />
                <label htmlFor={result.id}>{result.data.name}</label>
              </div>

            </li>

          ))}
          </ul>
          </SidebarContenedor>
        <ProductContenedor>
          {filteredCategory.map((result) => (
            <Producto key={result.id}>
              <ProductName>{result.data.name}</ProductName>
              <ProductImage src={result.data.mainimage.url} alt={result.id} />
              <PrizeCategory>{result.data.category.slug}</PrizeCategory>
              <PrizeCategory>$ {result.data.price}</PrizeCategory>
            </Producto>
          ))}
        </ProductContenedor>
      </ContenedorProductList>
    </>
  );
};

const ProductContenedor = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Producto = styled.div`
  border: 0.5px solid black;
`;
const ProductName = styled.p`
  background-color: #bcb8b1;
  font-size: 10px;
  font-weight: 500;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 13px;
  }

  @media (min-width: 1200px) {
    font-size: 20px;
  }
`;

const ProductImage = styled.img`
  padding: 5px;
  margin: auto;
  height: fit-content;
  border-radius: 20%;
  width: 100%;
  display: block;
  justify-content: center;
  align-items: center;

  @media (min-width: 1024px) {
    width: 200px;
    height: 200px;
    margin-left: 10%;
    padding: 0;
  }

  @media (min-width: 1200px) {
    margin-left: 25%;
  }
`;

const PrizeCategory = styled.p`
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
export default ProductList;
