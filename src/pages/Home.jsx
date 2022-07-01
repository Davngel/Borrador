import React from "react";
import Carousel from "../components/carousel";
import { Slider } from "../components/slider/Slider";
import GridFeatured from "../components/grid";
import { Link } from "react-router-dom";
import * as S from "./Home.styled";

export const Home = () => {
  return (
    <>
      <Slider
        controles={true}
        autoplay={false}
        velocidad="3000"
        intervalo="5000"
      />
      <Carousel />
      <GridFeatured />
      <Link to={"/products"}>
        <S.ButtonProducts>View all products</S.ButtonProducts>
      </Link>
    </>
  );
};
