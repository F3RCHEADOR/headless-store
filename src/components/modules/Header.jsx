import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = ({ cartItem, isAuthenticated, setUserLogout }) => {
  const navigate = useNavigate();

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
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          <Link to={"/"} className="mr-5 hover:text-gray-900">
            Home
          </Link>
          <Link to={"/about"} className="mr-5 hover:text-gray-900">
            About
          </Link>
          <Link to={"/products"} className="mr-5 hover:text-gray-900">
            Products
          </Link>
          <Link to={"/contact"} className="hover:text-gray-900">
            Contact Us
          </Link>
        </nav>
        <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Tailblocks</span>
        </a>
        <div className="lg:w-2/5 inline-flex lg:justify-end items-center ml-5 lg:ml-0 group space-x-4">
          {isAuthenticated && (
            <button
              onClick={logOut}
              className="inline-flex -space-x-2 items-center transition-transform hover:scale-110  bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                className="size-6"
              >
                <path d="M8.5 0C7.678 0 7 .678 7 1.5v6c0 .665 1 .67 1 0v-6c0-.286.214-.5.5-.5h20c.286 0 .5.214.5.5v27c0 .286-.214.5-.5.5h-20c-.286 0-.5-.214-.5-.5v-7c0-.66-1-.654-1 0v7c0 .822.678 1.5 1.5 1.5h20c.822 0 1.5-.678 1.5-1.5v-27c0-.822-.678-1.5-1.5-1.5zm-4 19c.45 0 .643-.563.354-.854L1.207 14.5l3.647-3.646c.442-.426-.254-1.16-.708-.708l-4 4c-.195.196-.195.512 0 .708l4 4c.095.097.22.146.354.146zm13-4h-14c-.277 0-.5-.223-.5-.5s.223-.5.5-.5h14c.277 0 .5.223.5.5s-.223.5-.5.5z" />
              </svg>
            </button>
          )}
          <button
            onClick={redirectToCart}
            className="inline-flex -space-x-2 items-center transition-transform hover:scale-110  bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            {cartItem.length > 0 && (
              <span className="rounded-full px-1.5 text-xs text-center mb-4 bg-green-300">
                {cartItem.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
