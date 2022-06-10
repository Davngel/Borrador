import { getByText, render, screen } from '@testing-library/react';
import React from "react";
import { Header } from './components/header/Header';

test('Nombre en Header', () => {
  const titulo = 'Muebles Troncoso' ;

  const {getByText} = render(<Header titulo={titulo}/>);

  expect(getByText(titulo)).toBeInTheDocument();

});


