import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import ProductsOnCar from "../context/ProductsCar";
import { useFeaturedCategories } from "../../utils/hooks/useFeaturedCategories";
import { useProductList } from "../../utils/hooks/useProductList";
import CategoryCheckbox from "./CategoryCheckbox";
import Spinner from "../spinner";
import * as S from "./ProductList.styled";

const ProductList = () => {
  const [category, setCategory] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const { data: dataProductList } = useProductList();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const categorias = searchParams.get("category");
  const { data, isLoading } = useFeaturedCategories();
  const [categories, setCategories] = useState([]);
  const { agregarCarrito } = useContext(ProductsOnCar);
  const [pageNumber, setPageNumber] = useState(1);
  const [tope, setTope] = useState(12);
  const postNumber = 12;
  const [hiddenBottonL, setHiddenBottonL] = useState(true);
  const [hiddenBottonR, setHiddenBottonR] = useState(true);
  let categoriaActiva = categorias;
  let currentPageNumber = pageNumber * postNumber - postNumber;

  const handleChange = (e) => {
    if (e.target.checked) {
      setCategory([...category, e.target.value.toLowerCase()]);
    } else {
      setCategory(
        category.filter((cate) => cate !== e.target.value.toLowerCase())
      );
    }
  };

  const handleTheChange = (e) => {
    let updatedList = categories.map((item) => {
      if (item.id == e.target.id) {
        return { ...item, checked: !item.checked }; //gets everything that was already in item, and updates "done"
      }
      return item; // else return unmodified item
    });

    setCategories(updatedList); // set state to new object with updated list
  };

  const handlePrev = () => {
    if (pageNumber == 1) return;
    setPageNumber(pageNumber - 1);
    setTope(tope - 12);
  };
  const handleNext = () => {
    setPageNumber(pageNumber + 1);
    setTope(tope + 12);
  };

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

  useEffect(() => {
    if (pageNumber === 1) {
      setHiddenBottonL(true);
    }
  }, [tope, pageNumber]);

  useEffect(() => {
    if (isLoading == false) {
      if (filteredCategory.length > 12) {
        setHiddenBottonR(false);
      }
    }
  }, [isLoading, filteredCategory]);

  useEffect(() => {
    if (pageNumber > 1 && filteredCategory.length > 12) {
      setHiddenBottonR(false);
      setHiddenBottonL(false);
    }
  }, [tope, pageNumber]);

  useEffect(() => {
    if (filteredCategory.length === tope) {
      setHiddenBottonR(true);
    } else {
      setHiddenBottonR(false);
    }
  }, [tope, pageNumber, isLoading, currentPageNumber]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <S.ContenedorProductList>
          <S.SidebarContenedor>
            <S.TituloSidebar>Categories</S.TituloSidebar>
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
            <S.Lista>
              {categories.map((result) => (
                <li key={result.id}>
                  <S.CategorySidebar>
                    <CategoryCheckbox
                      handleChange={handleChange}
                      handleTheChange={handleTheChange}
                      result={result}
                      isSelected={result.checked}
                    />
                  </S.CategorySidebar>
                </li>
              ))}
            </S.Lista>
          </S.SidebarContenedor>
          <S.ProductContenedor>
            {filteredCategory.slice(currentPageNumber, tope).map((result) => (
              <S.Producto key={result.id}>
                <S.CajaName>
                  <S.ProductName value="1">{result.data.name}</S.ProductName>
                </S.CajaName>
                <S.ContenedorButtonCar>
                  <button
                    onClick={() => {
                      const productoSeleccionado = {
                        id: result.data.name,
                        name: result.data.name,
                        imagen: result.data.mainimage.url,
                        price: result.data.price,
                        quantity: 1,
                        stock: result.data.stock,
                      };
                      agregarCarrito(productoSeleccionado);
                    }}
                  >
                    {" "}
                    Add to car
                  </button>
                  <Link to={`/product/${result.id}`}>
                    <button>More info</button>
                  </Link>
                </S.ContenedorButtonCar>
                <S.ProductImage
                  src={result.data.mainimage.url}
                  alt={result.id}
                />

                <S.PrizeCategory>{result.data.category.slug}</S.PrizeCategory>
                <S.PrizeCategory>$ {result.data.price}</S.PrizeCategory>
              </S.Producto>
            ))}
          </S.ProductContenedor>
          <S.ContenedorButton>
            <button onClick={handlePrev} hidden={hiddenBottonL}>
              prev
            </button>
            <button onClick={handleNext} hidden={hiddenBottonR}>
              next
            </button>
          </S.ContenedorButton>
          <Link to={"/home"}>
            <S.ButtonProducts>Home</S.ButtonProducts>
          </Link>
        </S.ContenedorProductList>
      )}
    </>
  );
};

export default ProductList;
