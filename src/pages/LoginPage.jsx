import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { singin, isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/products");
    }
  }, [isAuth, navigate]);

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit((data) => {
          singin(data);
        })}
      >
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="email"
        />
        {errors.email && <p>This field is required</p>}
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="password"
        />
        {errors.password && <p>This field is required</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
