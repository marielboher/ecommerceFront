import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { singup, isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/products");
    }
  }, [isAuth, navigate]);
  return (
    <div>
      <form
        onSubmit={handleSubmit(async (values) => {
          singup(values);
        })}
      >
        <input
          type="text"
          {...register("first_name", { required: true })}
          placeholder="firstName"
        />
        {errors.first_name && <p>This field is required</p>}
        <input
          type="text"
          {...register("last_name", { required: true })}
          placeholder="lastName"
        />
        {errors.last_name && <p>This field is required</p>}
        <input
          type="text"
          {...register("age", { required: true })}
          placeholder="age"
        />
        {errors.age && <p>This field is required</p>}
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
