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

const Lista = styled.ul`
  list-style-type: none;
`;

const TituloSidebar = styled.h1`
  color: black;
  text-align: center;
  font-size: medium;
  padding-top: 10px;
  padding-bottom: 10px;
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
  font-size: 14px;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;


const Loader = styled.div`
    border: 16px solid #f3f3f3;
    margin-left: auto;
    margin-right: auto;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;



@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

`;

const ProductList = () => {
  const [category, setCategory] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [cargando, setCargando ] = useState(true)

  const handleChange = (e) => {
    if (e.target.checked) {
      setCategory([...category, e.target.value.toLowerCase()]);
    } else {
      setCategory(
        category.filter((cate) => cate !== e.target.value.toLowerCase())
      );
    }
  };
  useEffect(() =>{
    setTimeout(() => {
      setCargando(false)
      
    }, 2000);
    setCargando(true)
  }, [])


  useEffect(() => {
    if (category.length === 0) {
      setFilteredCategory(dataProducts.results);
    } else {
      setFilteredCategory(
        dataProducts.results.filter((product) =>
          category.some((value) => [product.data.category.slug].includes(value))
        )
      );
    }
  }, [category]);


  const Spinner = () => {
    return (
 <Loader></Loader>
    )
  }

  return (
    <>
{cargando ? (<Spinner/>) : 

(<ContenedorProductList>
 
        <SidebarContenedor>
          <TituloSidebar>Categories</TituloSidebar>
          <Lista>
            {dataCategories.results.map((result) => (
              <li key={result.id}>
                <CategorySidebar>
                  <input
                    onClick={() => setIsShown((current) => !current)}
                    style={{ margin: "2px" }}
                    type="checkbox"
                    id={result.id}
                    name={result.data.name}
                    value={result.data.name}
                    onChange={handleChange}
                  />
                  <label htmlFor={result.id}>{result.data.name}</label>
                </CategorySidebar>
              </li>
            ))}
          </Lista>
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
  
        <ContenedorButton>
            <button>Back</button>
            <button>Next</button>
          </ContenedorButton>
  
  </ContenedorProductList>)
      }
    </>
  );
};

const ContenedorButton = styled.div`
  display: grid;
  grid-column: 2/3;
  padding: 10px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  background-color: #e7e7e7;
  color: black;
  font-size: 12px;
  border-radius: 8px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  :hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

`;

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
