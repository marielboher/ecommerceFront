import React, { useEffect, useState } from "react";
import "./featured.css";
import image1 from "../../images/plant4.jpg"
import image2 from "../../images/plant3.jpg"
import image3 from "../../images/plant2.jpg"


const Featured = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success" && Array.isArray(data.payload)) {
          const featuredProducts = data.payload.filter((product) => product.featured === true);
          setProducts(featuredProducts);
        } else {
          console.error("Error en la respuesta:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container-featured">
      <h3>FEATURED</h3>
      <p className="line-feature"></p>
      <div className="products-featured">
        <div className="product-featured">
            <img src={image1}></img>
            <img src={image2}></img>
            <img src={image3}></img>
        </div>
        {/* {products.map((product) => (
          <div key={product._id} className="product-featured">
            <img src={product.thumbnails} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Featured;
