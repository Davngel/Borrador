import React, { useState } from "react";
import * as S from "./GridFeatured.styled";
import { useFeaturedGrid } from "../../utils/hooks/useFeaturedGrid";
import Spinner from "../spinner";

const GridFeatured = () => {
  const [visible, setVisible] = useState(4);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  const { data, isLoading } = useFeaturedGrid();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <S.ContenedorGrid>
          {data.results.slice(0, visible).map((result) => (
            <S.Card key={result.id}>
              <S.Name>
                <S.CajaName>{result.data.name}</S.CajaName>
              </S.Name>
              <S.Gallery src={result.data.mainimage.url} alt={result.id} />
              <S.TextoParrafo>{result.data.category.slug}</S.TextoParrafo>
              <S.TextoParrafo>$ {result.data.price}</S.TextoParrafo>
            </S.Card>
          ))}
        </S.ContenedorGrid>
      )}
      <S.ButtonHere onClick={showMoreItems}>More</S.ButtonHere>
    </>
  );
};

export default GridFeatured;
