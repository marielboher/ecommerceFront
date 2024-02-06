import { Link } from "react-router-dom";
import "./navBar.css";

const Navbar = () => {
  return (
    <div className="nav-container">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>About</li>
        <li>Articles</li>
      </ul>
    </div>
  );
};

export default Navbar;
