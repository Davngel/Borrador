import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ProductsOnCar from "../context/ProductsCar";
import * as S from "./ShoppingCarPage.styled";

const ShoppingCarPage = () => {
  const { carrito, actualizarCantidad, eliminarProducto } =
    useContext(ProductsOnCar);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (total, producto) => total + producto.quantity * producto.price,
      0
    );

    setTotal(calculoTotal);
  }, [carrito]);

  return (
    <div>
      <S.MainContenedor>
        {carrito.length === 0 ? (
          ""
        ) : (
          <div>
            {carrito.map((producto) => (
              <S.ProductoCarrito key={producto.id}>
                <div>
                  <S.ProductoImagen src={producto.imagen} alt={producto.name} />
                </div>
                <div>
                  <S.ProductName>{producto.name}</S.ProductName>
                  <div>
                    <S.ProductoParrafo>
                      Items:{" "}
                      {producto.quantity > producto.stock
                        ? producto.stock
                        : producto.quantity}
                    </S.ProductoParrafo>
                    <S.NumberInput
                      type="number"
                      id="items"
                      name="items"
                      min={1}
                      max={producto.stock}
                      value={
                        producto.quantity > producto.stock
                          ? producto.stock
                          : producto.quantity
                      }
                      onChange={(e) =>
                        actualizarCantidad({
                          quantity: e.target.value,
                          id: producto.id,
                        })
                      }
                    />
                  </div>
                  <S.ProductoParrafo>${producto.price} c/u</S.ProductoParrafo>
                  <S.ProductoParrafo>
                    Subtotal: $
                    <S.SubtotalPrice>
                      {producto.price * producto.quantity}
                    </S.SubtotalPrice>
                  </S.ProductoParrafo>
                </div>
                <S.ButtonDelete
                  type="button"
                  onClick={() => eliminarProducto(producto.id)}
                >
                  X
                </S.ButtonDelete>
              </S.ProductoCarrito>
            ))}
          </div>
        )}
        <div>
          {total > 0 ? (
            <>
              <h2>Order Summary</h2>
              <S.ParrafoTotal>Total: ${total}</S.ParrafoTotal>
              <Link to={"/checkout"}>
                <S.ButtonCheckout> Go to checkout </S.ButtonCheckout>
              </Link>
            </>
          ) : (
            <h2>Empty</h2>
          )}
        </div>
      </S.MainContenedor>
    </div>
  );
};

export default ShoppingCarPage;
