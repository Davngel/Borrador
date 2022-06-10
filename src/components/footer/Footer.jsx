import React from "react";
import styled from "styled-components";

const CajaFooter = styled.div`
  display: flex;
  margin: auto;
  padding: 10%;
  font-size: large;
  text-align: center;
  justify-content: center;
  text-decoration: underline;
`;
const Footer = () => {
  return (
    <CajaFooter>
      <p>Ecommerce created during Wizeline's Academy React Bootcamp</p>
    </CajaFooter>
  );
};

export default Footer;
