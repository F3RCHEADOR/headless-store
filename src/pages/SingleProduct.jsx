import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExpecificProduct, getProductsWithSameTags } from "../lib/api";
import Loader from "../components/utils/Loader";
import { useMyStore } from "../lib/useMyStore";
import { getProductAttributeOptions } from "../components/utils/ColorsProducts";

const COLOR_ATTR = "Color";
const SIZE_ATTR = "Talla";

const SingleProduct = ({ addToCart }) => {
  const { renderProductPrice } = useMyStore();
  const { id } = useParams();

  const [singleProduct, setSingleProduc] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getExpecificProduct(id);
        setSingleProduc(product);

        if (product.tags && product.tags.length > 0) {
          const tagId = product.tags[0].id;
          const related = await getProductsWithSameTags(tagId);
          const filteredRelated = related.filter((p) => p.id !== product.id);
          setRelatedProducts(filteredRelated);
        }
      } catch (error) {
        console.error("Error loading product or related products", error);
      } finally {
        setLoader(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loader) return <Loader />;

  const colorOptions = getProductAttributeOptions(singleProduct.attributes, COLOR_ATTR);
  const attributeKeys = Object.keys(singleProduct.attributes);
  const firstAttribute = attributeKeys[0]; 
  const sizeOptions = getProductAttributeOptions(singleProduct.attributes, firstAttribute);
  
  const colorClasses = {
    white: "bg-white",
    black: "bg-black",
    gray: "bg-gray-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
  };

  return loader ? (
    <Loader />
  ) : (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={singleProduct?.name || "Producto"}
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={
              singleProduct?.image ||
              singleProduct?.gallery_images?.[0]?.src ||
              "#"
            }
          />

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="stat-title  title-font tracking-widest">
              {singleProduct.categories?.map((category, index) => (
                <span
                  className="text-lg text-secondary font-semibold"
                  key={index}
                >
                  {category.name || ""}
                </span>
              ))}{" "}
              /
              {singleProduct.tags?.map((tag, index) => (
                <span
                  className="ml-1 text-xs border rounded-lg p-0.5 text-primary"
                  key={index}
                >
                  {tag.name || " "}{" "}
                </span>
              ))}
            </h2>
            <div className="stat-title text-3xl font-bold ">
              {singleProduct.name}
            </div>
            <hr className="border-dashed my-4" />
            <div
              className="leading-relaxed bg-primary text-primary-content rounded-xl p-1"
              dangerouslySetInnerHTML={{ __html: singleProduct?.description }}
            />

            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex items-center">
                <div className="stat-title text-base mr-3">
                  {Array.isArray(colorOptions) && colorOptions.length > 0
                    ? "Color"
                    : ""}
                </div>
                {Array.isArray(colorOptions) && colorOptions.length > 0
                  ? colorOptions.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`border-2 ml-1 rounded-full w-6 h-6 focus:outline-none ${
                          colorClasses[color] || "bg-black"
                        } ${
                          selectedColor === color
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                        title={color}
                      ></button>
                    ))
                  : null}
              </div>
              {/* Selector de talla */}

              {sizeOptions.length > 0 && (
                <div className="flex ml-6 items-center">
                  <div className="stat-title text-base mr-3">Talla</div>
                  <div className="relative">
                    <select
                      defaultValue={"Selecciona una talla"}
                      className="select select-primary bg-primary text-secondary-content"
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                    >
                      <option value="">Selecciona una talla</option>
                      {sizeOptions.map((size, index) => (
                        <option
                          key={index}
                          value={size}
                          className="text-secondary-content"
                        >
                          {size}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              {renderProductPrice(singleProduct)}
              <div className="inline-flex space-x-2">
                <button
                  onClick={() => addToCart(singleProduct)}
                  className="flex btn btn-soft btn-accent"
                >
                  Add to Cart!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
