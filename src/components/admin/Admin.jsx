import React, { useState, useEffect, useContext } from "react";
import productService from "../../api/products";
import { AuthContext } from "../../context/AuthContext";

const Admin = () => {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (filterCategory === "all") {
            response = await productService.getProducts();
            setProducts(response.data.payload);
        } else {
          response = await productService.getProductsByCategory(filterCategory);
          setProducts(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, [filterCategory]);
  useEffect(() => {
    const categories = async () => {
      const response = await productService.getCategories();
      setCategories(response.data.categories);
    };
    categories();
  }, []);
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditTitle(product.title);
    setEditImage(product.thumbnails);
    setEditCategory(product.category);
    setEditPrice(product.price);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (editingProduct) {
      const updatedProduct = {
        ...editingProduct,
        title: editTitle,
        thumbnails: editImage,
        category: editCategory,
        price: editPrice,
      };
      try {
        await productService.updateProduct(
          editingProduct._id,
          updatedProduct,
          token
        );
        setProducts(
          products.map((p) =>
            p._id === editingProduct._id ? updatedProduct : p
          )
        );
        setEditingProduct(null);
        setEditTitle("");
        setEditImage("");
        setEditCategory("");
      } catch (err) {
        console.error("Failed to update product:", err);
      }
    }
  };

  const handleDelete = async (productId) => {
    try {
      await productService.deleteProduct(productId, token);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const handleChange = (setter) => (e) => setter(e.target.value);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "20%",
          borderRight: "1px solid #ccc",
          paddingRight: "20px",
        }}
      >
        <h3>Filter Products</h3>
        <button onClick={() => setFilterCategory("all")}>All Products</button>
        {categories.map((category) => (
          <button onClick={() => setFilterCategory(category)}>
            {category.toUpperCase()}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, paddingLeft: "20px" }}>
        <h2>Product List</h2>
        {products?.map((product) => (
          <div key={product._id}>
            {editingProduct && editingProduct._id === product._id ? (
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  placeholder="Title"
                  value={editTitle}
                  onChange={handleChange(setEditTitle)}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={editImage}
                  onChange={handleChange(setEditImage)}
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={editCategory}
                  onChange={handleChange(setEditCategory)}
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={editPrice}
                  onChange={handleChange(setEditPrice)}
                ></input>
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
                <span>{product.title}</span> <br />
                <img
                  src={product.thumbnails}
                  style={{ width: "100px", height: "100px" }}
                />{" "}
                <br />
                <span>{product.category}</span>
                <button onClick={() => handleEditClick(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
