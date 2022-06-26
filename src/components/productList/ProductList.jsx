import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { useFeaturedCategories } from "../../utils/hooks/useFeaturedCategories";
import { useProductList } from "../../utils/hooks/useProductList";
import CategoryCheckbox from "./CategoryCheckbox";
import Spinner from "../spinner/Spinner";

const ContenedorProductList = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  margin: 0;
  padding: 0;
  @media (min-width: 1024px) {
    grid-template-columns: 15% 85%;
  }
`;
const CajaName = styled.div`
  border: 1px solid black;
  display: flex;
  background-color: #bcb8b1;
`;
const Lista = styled.ul`
  list-style-type: none;
`;

const TituloSidebar = styled.h1`
  color: black;
  text-align: center;
  font-size: small;
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
  font-size: 12px;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const ProductList = () => {
  const [category, setCategory] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const { data: dataProductList, isLoading: isLoadingProduct } =
    useProductList();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const categorias = searchParams.get("category");
  let categoriaActiva = categorias;
  const { data, isLoading } = useFeaturedCategories();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data.results)
      setCategories(
        Object.values(data.results).map(({ checked, ...rest }) => ({
          checked: false,
          ...rest,
        }))
      );
  }, [data]);

  useEffect(() => {
    if (categoriaActiva === null) {
      categoriaActiva = "";
    } else if (categoriaActiva.length > 0) {
      setCategory([...category, categoriaActiva.toLowerCase()]);
    }
  }, [categoriaActiva]);

  const handleChange = (e) => {
    if (e.target.checked) {
      setCategory([...category, e.target.value.toLowerCase()]);
    } else {
      setCategory(
        category.filter((cate) => cate !== e.target.value.toLowerCase())
      );
    }
  };

  useEffect(() => {
    if (dataProductList.results) {
      if (category.length === 0) {
        setFilteredCategory(dataProductList.results);
      } else {
        setFilteredCategory(
          dataProductList.results.filter((product) =>
            category.some((value) =>
              [product.data.category.slug].includes(value)
            )
          )
        );
      }
    }
  }, [category, dataProductList]);

  const handleTheChange = (e) => {
    let updatedList = categories.map((item) => {
      if (item.id == e.target.id) {
        return { ...item, checked: !item.checked }; //gets everything that was already in item, and updates "done"
      }
      return item; // else return unmodified item
    });

    setCategories(updatedList); // set state to new object with updated list
  };

  const [pageNumber, setPageNumber] = useState(1);
  const [tope, setTope] = useState(12);
  const postNumber = 12;

  let currentPageNumber = pageNumber * postNumber - postNumber;

  const handlePrev = () => {
    if (pageNumber == 1) return;
    setPageNumber(pageNumber - 1);
    setTope(tope - 12);
  };
  const handleNext = () => {
    setPageNumber(pageNumber + 1);
    setTope(tope + 12);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <ContenedorProductList>
          <SidebarContenedor>
            <TituloSidebar>Categories</TituloSidebar>
            <Link to="/products">
              <button
                onClick={() => {
                  setCategories(
                    categories.map(({ checked, ...rest }) => ({
                      checked: false,
                      ...rest,
                    }))
                  );
                  setCategory([]);
                }}
              >
                Clear filter
              </button>
            </Link>
            <Lista>
              {categories.map((result) => (
                <li key={result.id}>
                  <CategorySidebar>
                    <CategoryCheckbox
                      handleChange={handleChange}
                      handleTheChange={handleTheChange}
                      result={result}
                      isSelected={result.checked}
                    />
                  </CategorySidebar>
                </li>
              ))}
            </Lista>
          </SidebarContenedor>
          <ProductContenedor>
            {filteredCategory.slice(currentPageNumber, tope).map((result) => (
              <Producto key={result.id}>
                <CajaName>
                  <ProductName>{result.data.name}</ProductName>
                </CajaName>
                <ContenedorButtonCar>
                  <button> Add to car</button>
                  <Link to={`/product/${result.id}`}>
                    <button>More info</button>
                  </Link>
                </ContenedorButtonCar>
                <ProductImage src={result.data.mainimage.url} alt={result.id} />

                <PrizeCategory>{result.data.category.slug}</PrizeCategory>
                <PrizeCategory>$ {result.data.price}</PrizeCategory>
              </Producto>
            ))}
          </ProductContenedor>
          <ContenedorButton>
            <button onClick={handlePrev}>prev</button>
            <button onClick={handleNext}>next</button>
          </ContenedorButton>
        </ContenedorProductList>
      )}
    </>
  );
};

const ContenedorButton = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: start;
  background-color: #e7e7e7;
  color: black;
  font-size: 12px;
  gap: 5px;
  border-radius: 8px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  :hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
`;

const ProductContenedor = styled.div`
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

const Producto = styled.div`
  border: 0.5px solid black;
  width: 80%;
  @media (min-width: 768px) {
    width: 205px;
  }

  @media (min-width: 1024px) {
    width: auto;
  }
`;
const ProductName = styled.span`
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

const ProductImage = styled.img`
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

const ContenedorButtonCar = styled.div`
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

export default ProductList;
