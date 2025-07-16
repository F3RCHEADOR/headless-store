import { useEffect, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import { getAllProducts, getProductsWithSameTags } from "../lib/api.ts";
import Loader from "../components/utils/Loader.jsx";
import { useLocation } from "react-router-dom";

const Product = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);

  const location = useLocation();

  // Si llegamos con un tag desde otra página, lo aplicamos al cargar
  useEffect(() => {
    if (location.state?.tag) {
      setSelectedTag(location.state.tag);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoader(true);
      let data;
      if (selectedTag) {
        data = await getProductsWithSameTags(selectedTag.id);
      } else {
        data = await getAllProducts();
      }
      setProducts(data);
      setLoader(false);
    };
    fetchProducts();
  }, [selectedTag]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  return loader ? (
    <Loader />
  ) : (
    <section className="text-gray-600 body-font w-full">
      <div className="container px-5 py-24 mx-auto">
        <div className="mb-4">
          {selectedTag && (
            <button
              className="btn btn-secondary"
              onClick={() => setSelectedTag(null)}
            >
              Ver todos los productos
            </button>
          )}
        </div>
        <div className="grid gap-6 py-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {products.map((singleProduct, index) => (
            <ProductCard
              key={index}
              {...singleProduct}
              addToCart={addToCart}
              onTagClick={handleTagClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
