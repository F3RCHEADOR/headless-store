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
          <div className="inline-flex space-x-1 mt-1 text-sm">
            <span className="line-through">${regular_price || price}</span>
            <span className="text-red-500">${sale_price}</span>
          </div>
        </>
      );
    }

    return <span className=" mt-1 text-sm">${regular_price || price}</span>;
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
    if (window.confirm("Are you sure want to this item?")) {
      const updateCart = cart.filter((item) => item.id !== productExistent.id);
      setCart(updateCart);
      localStorage.setItem("cart", JSON.stringify(updateCart));

      toast.warning("Product removed from Cart!");
    }
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
        
      }}
    >
      {children}
    </MyStoreContext.Provider>
  );
};
