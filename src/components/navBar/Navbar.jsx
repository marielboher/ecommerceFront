import { Link } from "react-router-dom";
import "./navBar.css";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <div className="nav-container">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        {user && (
          <ul>
            <li>
              <Link to="/profile">MI PROFILE</Link>
            </li>
            <li>
              <Link to="/chart">CHART</Link>
            </li>
          </ul>
        )}
        {user && user.role === "admin" && (
          <li>
            <Link to="/admin">ADMIN</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
