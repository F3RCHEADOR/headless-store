import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Blogs from "./pages/Blogs";
import SingleBlog from "./pages/SingleBlog";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Account from "./pages/auth/Account";
import Login from "./pages/auth/Login";
import { ToastContainer } from "react-toastify";
import { useMyStore } from "./lib/useMyStore";
import NotFound from "./pages/NotFound";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  const {
    setUserLogout,
    isAuthenticated,
    cart,
    addToCart,
    reduceFromCart,
    removeFromCart,
    clearCart,
    loggedUserData,
    setUserLoggedStatus,
  } = useMyStore();

  const clientID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  return (
    <Router>
      <ToastContainer />
      <PayPalScriptProvider 
        options={{ 
          "client-id": clientID,
          currency: "USD",
          intent: "capture"
        }}
      >
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
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:slug" element={<SingleBlog />} />
            <Route
              path="/cart"
              element={
                <Cart
                  removeFromCart={removeFromCart}
                  cart={cart}
                  reduceFromCart={reduceFromCart}
                  addToCart={addToCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <Checkout
                  clearCart={clearCart}
                  loggedUserData={loggedUserData}
                />
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
              element={<Login setIsAuthenticated={setUserLoggedStatus} isAuthenticated={isAuthenticated} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </PayPalScriptProvider>
    </Router>
  );
}

export default App;
