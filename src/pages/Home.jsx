import React from "react";
import Carousel from "../components/carousel/Carousel";
import { Slider } from "../components/slider/Slider";
import GridFeatured from "../components/grid/GridFeatured";

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
    </>
  );
};
