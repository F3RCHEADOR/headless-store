import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/modules/Header";
import Footer from "../components/modules/Footer";
import SEO from "../components/utils/SEO";
import { manualSeoData } from "../lib/api";

const MainLayout = ({ children, cartItem, isAuthenticated, setUserLogout }) => {
  const location = useLocation();
  const [seo, setSeo] = useState(manualSeoData.home);

  useEffect(() => {
    // Mapeo de path a clave de manualSeoData
    let slug = "home";
    if (location.pathname !== "/") {
      slug = location.pathname.replace(/^\//, "").replace(/\/$/, "").toLowerCase();
      // Mapeo especial para rutas dinámicas
      if (slug.startsWith("blog")) slug = "blogs";
      if (slug.startsWith("singleblog")) slug = "blogs";
      if (slug.startsWith("singleproduct")) slug = "products";
      if (slug.startsWith("myorders")) slug = "myorders";
      if (slug.startsWith("cart")) slug = "cart";
      if (slug.startsWith("checkout")) slug = "checkout";
      if (slug.startsWith("account")) slug = "account";
      if (slug.startsWith("login")) slug = "login";
      if (slug.startsWith("notfound")) slug = "notfound";
    }
    setSeo(manualSeoData[slug] || manualSeoData.home);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {seo && <SEO {...seo} />}
      <Header
        cartItem={cartItem}
        isAuthenticated={isAuthenticated}
        setUserLogout={setUserLogout}
      />
      <main className="relative flex-grow -mt-12 z-40 bg-base-200 bg-gradient-to-br from-primary/20 via-base-200/80 to-secondary/20 backdrop-blur-md transition-colors duration-500 overflow-hidden">
        {/* Onda decorativa arriba */}
        <svg
          className="absolute top-0 left-0 w-full h-32 md:h-40 lg:h-48 z-60"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            className="text-primary/20 dark:text-secondary/30 transition-colors duration-500"
            d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,186.7C1200,203,1320,213,1380,218.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>

        {/* Círculo decorativo abajo derecha */}
        <div className="absolute bottom-[-10px] right-[-70px] w-60 h-60 rounded-full bg-secondary/20 dark:bg-primary/20 blur-2xl pointer-events-none"></div>

        {/* Contenido principal */}
        <div className="relative z-60">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
