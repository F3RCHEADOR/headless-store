import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ThemeToggle from "../utils/ThemeToggle";

const Header = ({ cartItem, isAuthenticated, setUserLogout }) => {
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location.pathname); 
  const pathSegments = location.pathname.split("/").filter(Boolean); 



  const redirectToCart = () => {
    if (isAuthenticated) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  const logOut = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setUserLogout();
      navigate("/login");
      toast.info("User logged out");
    }
  };

  return (
    <div className="z-50">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Homepage</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              {isAuthenticated && (
                <li>
                  <button onClick={logOut}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link to="/" className="btn btn-ghost text-xl">
            HeadlessStore
          </Link>
        </div>
        <div className="navbar-end space-x-2">
        
          <button className="btn btn-ghost btn-circle" onClick={redirectToCart}>
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />{" "}
              </svg>
              {cartItem.length > 0 && (
                <span className="badge badge-xs badge-primary indicator-item">
                  {cartItem.length}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
      <div className="breadcrumbs text-sm text-center flex items-center justify-center">
       
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-4 w-4 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              ></path>
            </svg>
            <span className="ml-1.5">
              {" "}
              {location.pathname === "/" && "Home"}
              {location.pathname === "/contact" && "Contacto"}
              {location.pathname === "/products" && "Productos"}
              {location.pathname === "/about" && "Sobre nosotros"}
              {pathSegments[0] === "single-product" && "Producto individual"}

            </span>
          </li>
        </ul>
       
      </div>
     <div className="absolute top-16 right-1 md:right-2.5">
     <ThemeToggle />
     </div>
    </div>
  );
};

export default Header;
