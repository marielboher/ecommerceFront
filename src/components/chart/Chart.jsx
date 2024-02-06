import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";
import "./chart.css";

const Chart = () => {
  const { user, isAuth } = useAuth();
  const [chartData, setChartData] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

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

  const cargarDatosDelCarrito = async () => {
    try {
      const cartId = await obtenerIdCarrito();
      const response = await axios.get(`/api/carts/${cartId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data.cart;
      setChartData(data);

      let totalTemp = 0;
      data.products.forEach((item) => {
        totalTemp += item.product.price * item.quantity;
      });
      setTotal(totalTemp);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth && user) {
      cargarDatosDelCarrito();
    }
  }, [isAuth, user]);

  const deleteProduct = async (prodId) => {
    try {
      const cartId = await obtenerIdCarrito();
      await fetch(
        `http://localhost:8000/api/carts/${cartId}/products/${prodId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      cargarDatosDelCarrito();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const deleteAllProducts = async () => {
    try {
      const cartId = await obtenerIdCarrito();
      await fetch(`http://localhost:8000/api/carts/${cartId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      cargarDatosDelCarrito();
    } catch (error) {
      console.error("Error al eliminar todos los productos:", error);
    }
  };

  if (loading) {
    return <div>Loading chart...</div>;
  }

  if (!chartData) {
    return <div>No chart data found.</div>;
  }

  return (
    <div className="chart-container">
      {chartData?.products.map((item) => (
        <div key={item._id} className="product-card">
          <img
            src={item.product.thumbnails}
            alt={item.product.title}
            className="product-image"
          />
          <div className="product-details">
            <h3>{item.product.title}</h3>
            <p>{item.product.description}</p>
            <p className="product-price">${item.product.price}</p>
            <p className="product-quantity">Cantidad: {item.quantity}</p>
            <button onClick={() => deleteProduct(item.product._id)}>
              Delete product
            </button>
          </div>
        </div>
      ))}
      <div className="total-container">
        <p className="total">Total: ${total}</p>
        <button className="delete-all-products" onClick={deleteAllProducts}>
          Delete all Products
        </button>
      </div>
    </div>
  );
};

export default Chart;
