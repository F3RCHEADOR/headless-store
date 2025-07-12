import { useNavigate, useLocation } from "react-router-dom";
import { useMyStore } from "../../lib/useMyStore.js";
import Loader from "../utils/Loader"; // 1. Importa el Loader

const ProductCard = ({
  id,
  images,
  name,
  price,
  short_description,
  regular_price,
  sale_price,
  categories,
  tags,
  onTagClick,
  addToCart,
  loading, // 2. Recibe la prop loading
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { renderProductPrice } = useMyStore();

  const handleClick = () => {
    navigate(`/single-product/${id}`);
  };

  // 3. Muestra el Loader si loading es true
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="card bg-base-100 w-full h-full  md:w-96 lg:w-80 px-1 py-2  shadow-md shadow-primary">
      <figure className="group relative ">
      <img
            src={images[0].src || "#"}
            alt={name}
            className="object-cover object-center w-1/2 h-48 group-hover:scale-x-110 transition-all"
          />
        <button onClick={handleClick} className="absolute top-0 -right-1 cursor-pointer">
         
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute top-1 right-1 size-8 hover:scale-110 py-0.5 bg-primary text-secondary-content rounded-md"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </button>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-base-content">
          {name}
          {/* Puedes mostrar un badge "NEW" si el producto es nuevo, aquí es solo un ejemplo */}
          <div className="badge badge-secondary">{categories.map((category) => `${category.name}`)}</div>
        </h2>
        <p>{renderProductPrice({ price, regular_price, sale_price })}</p>
        <div
          className="text-base-content"
          dangerouslySetInnerHTML={{ __html: short_description }}
        />
        <div className="card-actions justify-end ">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="badge badge-outline hover:cursor-pointer transition hover:scale-x-105 hover:bg-primary hover:text-secondary-content text-primary"
              onClick={() => {
                if (location.pathname === "/products") {
                  onTagClick(tag);
                } else {
                  navigate("/products", { state: { tag } });
                }
              }}
            >
              {tag.name}
            </button>
          ))}
        </div>
        <button
          onClick={() =>
            addToCart({
              id,
              images,
              name,
              price,
              regular_price,
              sale_price,
              categories,
            })
          }
          className="btn btn-primary mt-4"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
