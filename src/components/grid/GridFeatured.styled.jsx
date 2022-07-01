import styled from "styled-components";

export const ContenedorGrid = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #f4f3ee;
  @media (min-width: 768px) {
    padding: 10%;
  }
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 0;
  }
`;
export const Card = styled.div`
  width: 100%;
  padding: 20px;
  color: black;
  margin: 10px 10px;
  border-bottom: 2px solid black;
  @media (min-width: 1024px) {
    margin: 0;
    padding: 0;
    border-left: 1px solid black;
  }
`;

export const Name = styled.div`
  border: 1px solid black;
  display: flex;
  background-color: #bcb8b1;
`;

export const CajaName = styled.span`
  margin: auto;
  font-size: 20px;
  text-align: center;

  width: 250px;
  padding: 2px 5px;

  /* Both of the following are required for text-overflow */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 768px) {
    font-size: 30px;
    padding: 5px;
  }
  @media (min-width: 1024px) {
    font-size: 15px;
  }
`;

export const Gallery = styled.img`
  padding: 5px;
  margin: auto;
  height: 80%;
  width: 95%;
  display: block;
  justify-content: center;
  align-items: center;

  @media (min-width: 1024px) {
    width: 200px;
    height: 200px;
    margin-left: 10%;
    padding: 0;
  }

  @media (min-width: 1200px) {
    margin-left: 25%;
  }
`;

export const ButtonHere = styled.button`
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

export const TextoParrafo = styled.p`
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
