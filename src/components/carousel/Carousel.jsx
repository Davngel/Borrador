import React from "react";
import * as S from "./Carousel.styled";
import { useFeaturedCategories } from "../../utils/hooks/useFeaturedCategories";
import { Link } from "react-router-dom";
import Spinner from "../spinner";

const Carousel = () => {
  const { data, isLoading } = useFeaturedCategories();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <S.ContenedorCarousel>
          {data.results.map((result) => (
            <S.Category key={result.id}>
              <S.ImagenCont
                src={result.data.main_image.url}
                alt={result.data.name}
              />
              <Link to={`/products?category=${result.slugs[0]}`}>
                <S.Parrafo>{result.data.name}</S.Parrafo>
              </Link>
            </S.Category>
          ))}
        </S.ContenedorCarousel>
      )}
    </>
  );
};

export default Carousel;
