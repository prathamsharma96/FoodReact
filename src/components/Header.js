import { Link } from "react-router-dom";
import { LOGO } from "../utils/constant.js";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img src={LOGO} alt="App Logo" className="logo" />
        <h1>Pratham's Cafe</h1>
      </div>

      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home </Link>
          </li>
          <li>
            <Link to="/about"> About </Link>
          </li>
          <li>
            <Link to="/contact"> Contact </Link>
          </li>
          <li>
            <a href="#"> Cart </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
