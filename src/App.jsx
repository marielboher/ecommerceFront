import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Navbar from "./components/navBar/Navbar";
import Products from "./components/products/Products";
import { useState } from "react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Shop from "./components/shop/Shop";

function App() {
  // const [user, setUser] = useState(null);

  // const handleLogin = (userData) => {
  //   setUser(userData);
  // };

  return (
    <div className="container-app">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Products />} />
            <Route path="/shop" element={<Shop />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
