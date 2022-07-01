import React, { useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { ReactComponent as FlechaIzquierda } from "../../utils/img/iconmonstr-angel-left-thin.svg";
import { ReactComponent as FlechaDerecha } from "../../utils/img/iconmonstr-angel-right-thin.svg";
import Spinner from "../spinner";
import * as S from './Slider.styled'
import { useFeaturedBanners } from "../../utils/hooks/useFeaturedBanners";


const Slider = ({
  controles = false,
  autoplay = false,
  velocidad = "500",
  intervalo = "5000",
}) => {
  const slideshow = useRef(null);
  const intervaloSlideshow = useRef(null);

  const siguiente = useCallback(() => {
    // Comprobamos que el slideshow tenga elementos
    if (slideshow.current.children.length > 0) {
      // Obtenemos el primer elemento del slideshow.
      const primerElemento = slideshow.current.children[0];

      // Establecemos la transicion para el slideshow.
      slideshow.current.style.transition = `${velocidad}ms ease-out all`;

      const tamañoSlide = slideshow.current.children[0].offsetWidth;

      // Movemos el slideshow
      slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;

      const transicion = () => {
        // Reiniciamos la posicion del Slider.
        slideshow.current.style.transition = "none";
        slideshow.current.style.transform = `translateX(0)`;

        // Tomamos el primer elemento y lo mandamos al final.
        slideshow.current.appendChild(primerElemento);

        slideshow.current.removeEventListener("transitionend", transicion);
      };

      // Eventlistener para cuando termina la animacion.
      slideshow.current.addEventListener("transitionend", transicion);
    }
  }, [velocidad]);

  const anterior = () => {
    if (slideshow.current.children.length > 0) {
      // Obtenemos el ultimo elemento del slideshow.
      const index = slideshow.current.children.length - 1;
      const ultimoElemento = slideshow.current.children[index];
      slideshow.current.insertBefore(
        ultimoElemento,
        slideshow.current.firstChild
      );

      slideshow.current.style.transition = "none";
      const tamañoSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;

      setTimeout(() => {
        slideshow.current.style.transition = `${velocidad}ms ease-out all`;
        slideshow.current.style.transform = `translateX(0)`;
      }, 30);
    }
  };

  useEffect(() => {
    if (autoplay) {
      intervaloSlideshow.current = setInterval(() => {
        siguiente();
      }, intervalo);

      // Eliminamos los intervalos
      slideshow.current.addEventListener("mouseenter", () => {
        clearInterval(intervaloSlideshow.current);
      });

      // Volvemos a poner el intervalo cuando saquen el cursor del slideshow
      slideshow.current.addEventListener("mouseleave", () => {
        intervaloSlideshow.current = setInterval(() => {
          siguiente();
        }, intervalo);
      });
    }
  }, [autoplay, intervalo, siguiente]);

  const { data, isLoading } = useFeaturedBanners();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <S.ContenedorPrincipal>
          <S.ContenedorSlideshow ref={slideshow}>
            {data.results.map((result) => (
              <S.Slide key={result.id}>
                <img src={result.data.main_image.url} alt="" />
                <S.TextoSlide>
                  <p>{result.data.title}</p>
                </S.TextoSlide>
              </S.Slide>
            ))}
          </S.ContenedorSlideshow>
          {controles && (
            <S.Controles>
              <S.Boton onClick={anterior}>
                <FlechaIzquierda />
              </S.Boton>
              <S.Boton derecho onClick={siguiente}>
                <FlechaDerecha />
              </S.Boton>
            </S.Controles>
          )}
        </S.ContenedorPrincipal>
      )}
    </>
  );
};

Slider.propTypes = {
  controles: PropTypes.bool.isRequired,
  autoplay: PropTypes.bool.isRequired,
  velocidad: PropTypes.string,
  intervalo: PropTypes.string,
};

export { Slider };
