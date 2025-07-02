import React from "react";
import Header from "../components/modules/Header";
import Footer from "../components/modules/Footer";

const MainLayout = ({ children, cartItem }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItem={cartItem} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
