import React from "react";
import Header from "../components/modules/Header";
import Footer from "../components/modules/Footer";

const MainLayout = ({ children, cartItem, isAuthenticated, setUserLogout }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header
        cartItem={cartItem}
        isAuthenticated={isAuthenticated}
        setUserLogout={setUserLogout}
      />
      <main className="flex-grow -mt-12">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
