import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Datos de ejemplo para el carrito

const Cart = ({ onRemoveProduct, cart, reduceFromCart, addToCart }) => {
  const [cartItems, setCartItems] = useState(cart) || [];
  const navigate = useNavigate();

  const handleGoToCheckout = () => {
    navigate("/checkout");
  };

  
  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const renderProductPrice = ({ price, regular_price, sale_price }) => {
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

  const calculeTotalItemsPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price = item.price ? parseFloat(item.price) : 0;
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6">Carrito de compras</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Tu carrito está vacío.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">Imagen</th>
                <th className="py-3 px-4 text-left">Nombre</th>
                <th className="py-3 px-4 text-center">Cantidad</th>
                <th className="py-3 px-4 text-right">Precio U</th>
                <th className="py-3 px-4 text-right">Total</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img
                      src={item?.images?.[0].src}
                      alt={item.name}
                      className="w-16 h-16 object-cover hover:scale-110 transition-all rounded"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center gap-2">
                      <button
                        className={`${item.quantity === 1 ? 'bg-red-500  hover:bg-red-600' : 'bg-red-400 hover:bg-red-500' } cursor-pointer text-white px-2 py-1 rounded`}
                        onClick={() => reduceFromCart(item)}
                      >
                        -
                      </button>
                      <span className="w-8 inline-block text-center">
                        {item.quantity}
                      </span>
                      <button onClick={() => addToCart(item)} className="px-2 py-1 bg-green-300 rounded hover:bg-green-400 cursor-pointer">
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {renderProductPrice(item)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    $
                    {item.quantity *
                      (item.sale_price || item.regular_price || item.price)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onRemoveProduct(item)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow w-full max-w-xs">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-bold">
                  ${calculeTotalItemsPrice()}
                </span>
              </div>
              <button
                onClick={handleGoToCheckout}
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
              >
                Ir a pagar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
