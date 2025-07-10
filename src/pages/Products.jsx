import { useEffect, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import { getAllProducts } from "../lib/api.ts";
import Loader from "../components/utils/Loader.jsx";

const Product = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      console.log(data);
      setLoader(false);
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="grid gap-6 py-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((singleProduct, index) => (
            <ProductCard key={index} {...singleProduct} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
