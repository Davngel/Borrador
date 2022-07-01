import { createContext, useState } from "react";

const ProductsOnCar = createContext();

const ProductsProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarCarrito = (producto) => {
    if (carrito.some((articulo) => articulo.id === producto.id)) {
      const carritoActualizado = carrito.map((articulo) => {
        if (articulo.id === producto.id) {
          articulo.quantity = producto.quantity + articulo.quantity;
        }
        return articulo;
      });
      setCarrito(carritoActualizado);
    } else {
      setCarrito([...carrito, producto]);
    }
  };

  const actualizarCantidad = (producto) => {
    const carritoActualizado = carrito.map((articulo) => {
      if (articulo.id === producto.id) {
        articulo.quantity = parseInt(producto.quantity);
      }
      return articulo;
    });

    setCarrito(carritoActualizado);
  };

  const eliminarProducto = (id) => {
    const carritoActualizado = carrito.filter((articulo) => articulo.id !== id);
    setCarrito(carritoActualizado);
  };

  return (
    <ProductsOnCar.Provider
      value={{ carrito, agregarCarrito, actualizarCantidad, eliminarProducto }}
    >
      {children}
    </ProductsOnCar.Provider>
  );
};
export { ProductsProvider };

export default ProductsOnCar;
