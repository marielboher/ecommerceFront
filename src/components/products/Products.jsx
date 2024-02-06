import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./products.css";
import { useAuth } from "../../context/AuthContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success" && Array.isArray(data.payload)) {
          setProducts(data.payload);
        } else {
          console.error("Error en la respuesta:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (products.length === 0) {
    return <div>Cargando productos...</div>;
  }

  const obtenerIdCarrito = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No autenticado");
      }

      const response = await fetch(
        "http://localhost:8000/api/carts/usuario/carrito",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener el ID del carrito");
      }

      const data = await response.json();
      return data.id;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };
  const agregarProductoAlCarrito = async (productId) => {
    try {
      const cartId = await obtenerIdCarrito();
      if (!cartId) {
        throw new Error("No se pudo obtener el ID del carrito");
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No autenticado");
      }

      const response = await fetch(
        `http://localhost:8000/api/carts/${cartId}/products/${productId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al agregar el producto al carrito");
      }

      console.log("Producto agregado al carrito con éxito");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <div className="products-container">
        {products.map((product) => {
          return (
            <div key={product._id} className="product-card">
              <img src={product.thumbnails} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <button onClick={() => agregarProductoAlCarrito(product._id)}>
                ADD TO CART
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
