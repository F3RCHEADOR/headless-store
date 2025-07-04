import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Account from "./pages/auth/Account";
import Login from "./pages/auth/Login";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedUserData, setLoggerUserData] = useState({});

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
    <Router>
      <ToastContainer />
      <MainLayout
        isAuthenticated={isAuthenticated}
        setUserLogout={setUserLogout}
        cartItem={cart}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/products"
            element={<Products addToCart={addToCart} />}
          />
          <Route
            path="/single-product/:id"
            element={
              <SingleProduct
                addToCart={addToCart}
                reduceFromCart={reduceFromCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                onRemoveProduct={removeFromCart}
                cart={cart}
                reduceFromCart={reduceFromCart}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout clearCart={clearCart} loggedUserData={loggedUserData} />
            }
          />
          <Route
            path="/my-orders"
            element={<MyOrders loggedUserData={loggedUserData} />}
          />
          <Route
            path="/account"
            element={<Account loggedUserData={loggedUserData} />}
          />
          <Route
            path="/login"
            element={<Login isAuthenticated={setUserLoggedStatus} />}
          />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
