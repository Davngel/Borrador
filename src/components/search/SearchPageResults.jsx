import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../utils/constants";
import { useLatestAPI } from "../../utils/hooks/useLatestAPI";
import Spinner from "../spinner";
import * as S from "./Search.styled";
import ProductsOnCar from "../context/ProductsCar";

const SearchPageResults = () => {
  const { agregarCarrito } = useContext(ProductsOnCar);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [searchTerm, setSearchTerm] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [tope, setTope] = useState(20);
  const [hiddenButtonR, setHiddenButtonR] = useState(true);
  const [hiddenButtonL, setHiddenButtonL] = useState(true);

  const postNumber = 20;

  let currentPageNumber = pageNumber * postNumber - postNumber;

  useEffect(() => {
    setSearchTerm(searchParams.get("q"));
  }, [search]);

  const useSearchTerm = () => {
    const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
    const [searchTermProduct, setSearchTermProduct] = useState(() => ({
      data: {},
      isLoading: true,
    }));
    useEffect(() => {
      if (!apiRef || isApiMetadataLoading) {
        return () => {};
      }

      const controller = new AbortController();

      async function getSearchTermProduct() {
        try {
          setSearchTermProduct({ data: {}, isLoading: true });

          const response = await fetch(
            `${API_BASE_URL}/documents/search?ref=${apiRef}&q=%5B%5Bat(document.type%2C%20%22product%22)%5D%5D&q=%5B%5Bfulltext(document%2C%20%22${searchTerm}%22)%5D%5D&lang=en-us&pageSize=20`,
            {
              signal: controller.signal,
            }
          );
          const data = await response.json();

          setSearchTermProduct({ data, isLoading: false });
        } catch (err) {
          setSearchTermProduct({ data: {}, isLoading: false });
          console.error(err);
        }
      }

      getSearchTermProduct();

      return () => {
        controller.abort();
      };
    }, [apiRef, isApiMetadataLoading, searchTerm]);

    return searchTermProduct;
  };

  const { data, isLoading } = useSearchTerm();

  useEffect(() => {
    if (data.results_size > 20) {
      setHiddenButtonR(false);
    }
  }, [data]);
  useEffect(() => {
    if (data.results_size < 20) {
      setHiddenButtonL(true);
    }
  }, [data]);

  const handlePrev = () => {
    if (pageNumber == 1) return;
    setPageNumber(pageNumber - 1);
    setTope(tope - 20);
  };
  const handleNext = () => {
    setPageNumber(pageNumber + 1);
    setTope(tope + 20);
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : data.total_results_size === 0 ? (
        <div>Not a match "{searchTerm}"</div>
      ) : (
        <>
          <S.ProductContenedor>
            {data.results
              .slice(currentPageNumber, tope)
              .map((result, index) => {
                return (
                  <div key={index}>
                    <S.Producto key={index}>
                      <S.CajaName>
                        <S.ProductName>{result.data.name}</S.ProductName>
                      </S.CajaName>
                      <S.ProductImage
                        src={result.data.mainimage.url}
                        alt={result.data.name}
                      />
                      <S.PrizeCategory>
                        {result.data.category.slug}
                      </S.PrizeCategory>
                      <S.PrizeCategory>${result.data.price}</S.PrizeCategory>
                      <S.Description>
                        {result.data.short_description}
                      </S.Description>
                      <br />
                    </S.Producto>
                    <S.ButtonCart
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
                      Add to car
                    </S.ButtonCart>
                  </div>
                );
              })}
          </S.ProductContenedor>
          <S.ContenedorButton>
            <button onClick={handlePrev} hidden={hiddenButtonL}>
              prev
            </button>
            <button onClick={handleNext} hidden={hiddenButtonR}>
              next
            </button>
          </S.ContenedorButton>
        </>
      )}
    </div>
  );
};

export default SearchPageResults;
