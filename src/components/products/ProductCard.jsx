import { useNavigate } from "react-router-dom";

const ProductCard = ({
  id,
  images,
  name,
  price,
  regular_price,
  sale_price,
  categories,
  addToCart,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/single-product/${id}`);
  };

  const renderProductPrice = ({
    price,
    regular_price,
    sale_price
  }) => {
    if (sale_price) {
      return (
        <>
          <div className="inline-flex space-x-1 mt-1 text-sm">
            <span className="line-through">${regular_price || price}</span>
            <span className="text-red-500">${sale_price}</span>
          </div>
        </>
      );
    }

    return <span className=" mt-1 text-sm">${regular_price || price}</span>;
  };

  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <div className="block relative h-48 rounded overflow-hidden">
        <button onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </button>

        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src={images[0].src}
        />
      </div>

      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {categories.map((category, index) => (
            <span key={index}>{category.name}</span>
          ))}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">{name}</h2>

        {renderProductPrice({ price, regular_price, sale_price })}
      </div>

      <button
        onClick={() => addToCart({ id, images, name, price, regular_price, sale_price, categories })}
        className="flex items-center justify-center mx-auto bg-blue-200 border-2 px-2 py-1 border-blue-300 rounded-md hover:scale-x-105 transition-all"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
