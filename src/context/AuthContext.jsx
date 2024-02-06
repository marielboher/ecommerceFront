import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyToken } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const singup = async (userData) => {
    try {
      const res = await registerRequest(userData);
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  };

  const singin = async (userData) => {
    try {
      const res = await loginRequest(userData);
      if (res.status === 200 && res.data.token) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        setIsAuth(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuth(false);
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        console.log("respuesta del puto");
        const res = await verifyToken(token);
        console.log("respuesta del verify", res);
        if (res.status === 200) {
          setIsAuth(true);
          setUser(res.data);
        } else {
          setIsAuth(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error al verificar el token:", error);
        setIsAuth(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        singup,
        user,
        isAuth,
        singin,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
