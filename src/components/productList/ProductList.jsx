import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useFeaturedCategories } from "../../utils/hooks/useFeaturedCategories";
import { useProductList } from "../../utils/hooks/useProductList";
import CategoryCheckbox from "./CategoryCheckbox";

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
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ProductList = () => {
  const [category, setCategory] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [cargando, setCargando] = useState(true);
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
    setTimeout(() => {
      setCargando(false);
    }, 2000);
    if(isLoadingProduct === false)
    {setCargando(true);}
  }, []);

  useEffect(() => {
    if(dataProductList.results)
{      if (category.length === 0) {
        setFilteredCategory(dataProductList.results);
      } else {
        setFilteredCategory(
          dataProductList.results.filter((product) =>
            category.some((value) =>
              [product.data.category.slug].includes(value)
            )
          )
        );
      }}

      

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

  const Spinner = () => {
    return <Loader></Loader>;
  };






  const [pageNumber, setPageNumber]= useState(1)
  const [tope, setTope] = useState(12)
  const postNumber = 12

  let currentPageNumber =  (pageNumber * postNumber) - postNumber 

  


  const handlePrev =()=>{
      if(pageNumber == 1) return
      setPageNumber(pageNumber - 1)
      setTope(tope-12)
  }
  const handleNext =()=>{
      setPageNumber(pageNumber + 1)
      setTope(tope+12)
  }

  return (
    <>
      {cargando ? (
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
                <ProductName>{result.data.name}</ProductName>
                <ProductImage src={result.data.mainimage.url} alt={result.id} />
                <PrizeCategory>{result.data.category.slug}</PrizeCategory>
                <PrizeCategory>$ {result.data.price}</PrizeCategory>
                <button> Add to car</button>
                <Link to={`/product/${result.id}`}><button>More info</button></Link>
              </Producto>
            ))}
          </ProductContenedor>
          <div>Page {pageNumber} </div>
          <ContenedorButton>
          <button onClick={handlePrev} >prev</button>
          <button onClick={handleNext}>next</button>
          </ContenedorButton>
        </ContenedorProductList>
      )}
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
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  :hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
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
