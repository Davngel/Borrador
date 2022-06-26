import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../utils/constants";
import { useLatestAPI } from "../../utils/hooks/useLatestAPI";
import Spinner from '../spinner/Spinner'
import styled from "styled-components";


const ProductContenedor = styled.div`
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
const ContenedorButton = styled.div`
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
const Description = styled.p `
  width: 170px;
  padding: 5px;

  /* Both of the following are required for text-overflow */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;



`;

const CajaName = styled.div`
  border: 1px solid black;
  display: flex;
  background-color: #bcb8b1;
`;
const Producto = styled.div`
  border: 0.5px solid black;

`;

const ProductName = styled.span`
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

const ProductImage = styled.img`
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

 const ButtonCart = styled.button`
  width: 100%;
 
 `;

const SearchPageResults = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [searchTerm, setSearchTerm] = useState();

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

  const [pageNumber, setPageNumber] = useState(1);
  const [tope, setTope] = useState(20);
  const postNumber = 20;

  let currentPageNumber = pageNumber * postNumber - postNumber;

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
        <Spinner/>
      ) : data.total_results_size === 0 ? (
        <div>Not a match {searchTerm}</div>
      ) : (
        <>
        <ProductContenedor>
          {data.results.slice(currentPageNumber, tope).map((result, index) => {
            return (
              <div key={index}>
              <Producto key={index}>
                <CajaName>
                <ProductName>{result.data.name}</ProductName>
                </CajaName>
                <ProductImage src={result.data.mainimage.url} alt={result.data.name} />
                <PrizeCategory>{result.data.category.slug}</PrizeCategory>
                <PrizeCategory>${result.data.price}</PrizeCategory>
                <Description>{result.data.short_description}</Description>
                <br/>

              </Producto>
                              <ButtonCart>Add to car</ButtonCart>
              </div>
            );
          })}
        </ProductContenedor>
                  <ContenedorButton>
                  <button onClick={handlePrev}>prev</button>
                  <button onClick={handleNext}>next</button>
                </ContenedorButton>
                </>
      )}
    </div>
  );
};

export default SearchPageResults;
