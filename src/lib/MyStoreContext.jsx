import { useState, useEffect } from "react";
import { MyStoreContext } from "./MyStoreContext.js";
import { toast } from "react-toastify";

export const MyStoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedUserData, setLoggerUserData] = useState({});

  const renderProductPrice = ({ price, regular_price, sale_price }) => {
    if (sale_price) {
      return (
        <>
          <div className="inline-flex space-x-2">
            <div className="stat-value line-through text-lg text-base-content">
              ${regular_price || price}
            </div>
            <div className="stat-value text-lg text-red-500">${sale_price}</div>
          </div>
        </>
      );
    }

    return (
      <div className="stat-value mt-1 text-lg text-base-content">
        ${regular_price || price}
      </div>
    );
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productExist = cart.find((item) => item.id === product.id);

    if (productExist) {
      productExist.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    setCart([...cart]);
    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success("Product added to cart");
    console.log(cart);
  };

  const reduceFromCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productExist = cart.find((item) => item.id === product.id);

    if (productExist && productExist.quantity > 1) {
      productExist.quantity -= 1;
      setCart([...cart]);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.info("Product reduce from cart");
    } else {
      removeFromCart(product);
    }
  };

  const removeFromCart = (productExistent) => {
    toast(({ closeToast }) => (
      <div className="text-sm">
        <p className="mb-2">Are you sure you want to remove this item?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const updateCart = cart.filter((item) => item.id !== productExistent.id);
              setCart(updateCart);
              localStorage.setItem("cart", JSON.stringify(updateCart));
              toast.warning("Product removed from Cart!");
              closeToast();
            }}
            className="px-3 py-1 bg-error text-base-content rounded"
          >
            Yes
          </button>
          <button
            onClick={closeToast}
            className="px-3 py-1 bg-neutral text-white rounded"
          >
            No
          </button>
        </div>
      </div>
    ), { autoClose: false });
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const setUserLoggedStatus = (status) => {
    setIsAuthenticated(status);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (token) setIsAuthenticated(true);

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems) setCart(cartItems);

    const userData = localStorage.getItem("userData");

    setLoggerUserData(JSON.parse(userData));
  }, []);

  const setUserLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("userData");
    localStorage.removeItem("cart");
    localStorage.removeItem("userOrders");
    setIsAuthenticated(false);
    setLoggerUserData({});
    setCart([]);
  };

  return (
    <MyStoreContext.Provider
      value={{
        renderProductPrice,
        addToCart,
        reduceFromCart,
        clearCart,
        setUserLoggedStatus,
        setUserLogout,
        isAuthenticated,
        loggedUserData,
        cart,
        removeFromCart,
      }}
    >
      {children}
    </MyStoreContext.Provider>
  );
};
