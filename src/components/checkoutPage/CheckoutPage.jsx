import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductsOnCar from "../context/ProductsCar";
import * as S from "./CheckoutPage.styled";

const CheckoutPage = () => {
  const { carrito } = useContext(ProductsOnCar);
  const [order, setOrder] = useState({});
  const [nameCustomer, setNameCustomer] = useState("");
  const [emailCustomer, setEmailCustomer] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (total, producto) => total + producto.quantity * producto.price,
      0
    );

    setTotal(calculoTotal);
  }, [carrito]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderInfo = {
      nameCustomer,
      emailCustomer,
      zipCode,
      notes,
      totalCar: total,
    };
    setOrder(orderInfo);

    if ([nameCustomer, emailCustomer, zipCode].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    console.log(order);
  };

  const Error = ({ children }) => {
    return <div>{children}</div>;
  };

  return (
    <div>
      <S.Formulario onSubmit={handleSubmit}>
        <div>
          {error && (
            <Error>
              <p>Todos los campos son obligatorios</p>
            </Error>
          )}
          <div>
            <label htmlFor="nameCustomer">Name:</label>
            <br />
            <S.TextInput
              id="nameCustomer"
              type="text"
              placeholder="Name"
              value={nameCustomer}
              onChange={(e) => setNameCustomer(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="emailCustomer">E-mail:</label>
            <br />

            <S.TextInput
              id="emailCustomer"
              type="email"
              placeholder="E-mail"
              value={emailCustomer}
              onChange={(e) => setEmailCustomer(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="zipCode">Zip Code:</label>
            <br />

            <S.TextInput
              type="text"
              placeholder="Zip Code"
              required
              pattern="\d{5,5}(-\d{4,4})?"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="notes">Notes:</label>
            <br />

            <S.TextInput
              id="notes"
              type="textarea"
              placeholder="Order notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <S.TableContainer>
            <tbody>
              <tr style={{ fontSize: "1.1rem" }}>
                <th>Product Name</th>
                <th style={{ textAlign: "center" }}>Total items</th>
                <th style={{ textAlign: "right" }}>Subtotal $</th>
              </tr>
            </tbody>
            {carrito.map((product) => {
              return (
                <tbody key={product.id}>
                  <tr>
                    <S.ProductName>
                      {" "}
                      {product.name} <hr />
                    </S.ProductName>
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {product.quantity}
                      {""} pz
                      <hr />
                    </td>
                    <td style={{ textAlign: "end" }}>
                      {product.quantity * product.price} <hr />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </S.TableContainer>
          <S.TotalContainer>
            <p style={{ textAlign: "end", fontSize: "1.3rem" }}>
              Total: ${total}
            </p>
            <S.ButtonOrder type="submit" value="Place Order" />
          </S.TotalContainer>
        </div>
        <div></div>
      </S.Formulario>
      <Link to={"/cart"}>
        <S.ButtonCar>Back to car </S.ButtonCar>
      </Link>
    </div>
  );
};

export default CheckoutPage;
