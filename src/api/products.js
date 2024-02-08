import axios from 'axios';

const API_URL = 'http://localhost:8000/api/products/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, 
  },
});

const getProducts = async () => {
  return api.get('/');
};

const getProductById = async (id) => {
  return api.get(`${id}`);
};
const getCategories = async () => {
  return api.get(`/categories`);
};

const getProductsByCategory = async (category) => {
    return api.get(`/categories/${category}`);
}

const addProduct = async (productData) => {
  return api.post('/', productData);
};

const updateProduct = async (id, productData) => {
  return api.put(`${id}`, productData);
};

const deleteProduct = async (id) => {
  return api.delete(`${id}`);
};

export default {
  getProducts,
  getProductById,
  getCategories,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
};
