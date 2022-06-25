import React from "react";
import styled from "styled-components";
import {useForm} from '../../utils/hooks/useForm.js'
import {Link, useNavigate, useLocation} from 'react-router-dom'

const Formulario = styled.form`
  margin: 3px;
  grid-column: 1/2;
  display: inline-flex;

  /* Media Query for Tablets Ipads portrait mode */
  @media (min-width: 768px) and (max-width: 1024px) {
    height: 25px;
    width: 25px;
  }
  /* Media Query for Laptops and Desktops */
  @media (min-width: 1025px) {
    height: 40px;
    width: 40px;
  }
`;
const Buscar = () => {

  const navigate = useNavigate()

  const {searchTerm, onInputChange} = useForm({
    searchTerm: ''
  })

  const onSearchSubmit = (e) => {
    e.preventDefault()

    if( searchTerm.trim().length <=1 ) return;
    navigate(`/search?q=${searchTerm}`)

  }

  return (
    <Formulario onSubmit= {onSearchSubmit}>
      <input type="text" 
      placeholder ='Write Product'
      name='searchTerm'
      value={searchTerm}
      onChange={onInputChange}
      />

     <button> Search </button>
    </Formulario>
  );
};

export default Buscar;
