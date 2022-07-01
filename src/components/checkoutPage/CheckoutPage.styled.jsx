import styled from "styled-components";

export const Formulario = styled.form`
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  :hover {
    background-color: #d7cccce8;
  }
`;
export const ButtonCar = styled.button`
  border: none;
  outline: none;
  width: 100%;
  padding: 16px 0;
  margin: 10px 0;
  background-color: #8a817c;
  color: black;
  font-size: 18px;
  cursor: pointer;
`;
export const TableContainer = styled.table`
  border: 1px solid;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  text-align: justify;
`;

export const ProductName = styled.td`
  font-size: 1.1rem;
  width: 170px;
  padding: 2px 5px;

  /* BOTH of the following are required for text-overflow */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 500px) {
    width: auto;
  }
`;

export const ButtonOrder = styled.input`
  background-color: #bcb8b1;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 12px;
  margin: 4px 2px;
  cursor: pointer;
  transition-duration: 0.4s;
  :hover {
    background-color: #f2f2f2;
    color: black;
  }
`;

export const TotalContainer = styled.div`
  display: grid;
  justify-content: end;
`;
