import { useNavigate } from "react-router-dom";
import { useMyStore } from "../../lib/useMyStore.js";

const ProductCard = ({
  id,
  images,
  name,
  price,
  short_description,
  regular_price,
  sale_price,
  categories,
  addToCart,
}) => {
  const navigate = useNavigate();
  const { renderProductPrice } = useMyStore();

  const handleClick = () => {
    navigate(`/single-product/${id}`);
  };

  return (
    <div className="card bg-base-100 w-auto md:w-72 lg:w-80 px-1 py-2  shadow-md shadow-secondary-content">
      <figure className="group ">
        <button onClick={handleClick} className="relative cursor-pointer">
          <img
            src={images[0].src}
            alt={name}
            className="object-cover object-center w-full h-48  group-hover:scale-x-110 transition-all"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute top-1 right-1 size-6 hover:scale-110 py-0.5  bg-white/50 rounded-md"
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
        <h2 className="card-title text-secondary">
          {name}
          {/* Puedes mostrar un badge "NEW" si el producto es nuevo, aquí es solo un ejemplo */}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{renderProductPrice({ price, regular_price, sale_price })}</p>
        <div
          className="text-secondary-content"
          dangerouslySetInnerHTML={{ __html: short_description }}
        />
        <div className="card-actions justify-end ">
          {categories.map((category, index) => (
            <div
              key={index}
              className="badge badge-outline bg-secondary-content text-primary"
            >
              {category.name}
            </div>
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
