import React from "react";
import * as S from "./Search.styled";
import { useForm } from "../../utils/hooks/useForm.js";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  const { searchTerm, onInputChange } = useForm({
    searchTerm: "",
  });

  const onSearchSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim().length <= 1) return;
    navigate(`/search?q=${searchTerm}`);
  };

  return (
    <S.Formulario onSubmit={onSearchSubmit}>
      <input
        type="text"
        placeholder="Search Product"
        name="searchTerm"
        value={searchTerm}
        onChange={onInputChange}
      />

      <button> Search </button>
    </S.Formulario>
  );
};

export default Search;
