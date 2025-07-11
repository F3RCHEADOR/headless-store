import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Datos de ejemplo para el carrito

const Cart = ({ removeFromCart, cart, reduceFromCart, addToCart }) => {
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

  console.log(cart)

  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6">Carrito de compras</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Tu carrito está vacío.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th>#</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th className="text-center">Cantidad</th>
                <th className="text-right">Precio U</th>
                <th className="text-right">Total</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item, idx) => (
                <tr key={item.id}>
                  <th>{idx + 1}</th>
                  <td>
                    <img
                      src={item?.images?.[0].src || item?.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover hover:scale-110 transition-all rounded"
                    />
                  </td>
                  <td className="font-medium">{item.name}</td>
                  <td className="text-center">
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
                  <td className="text-right">
                    {renderProductPrice(item)}
                  </td>
                  <td className="text-right">
                    $
                    {item.quantity *
                      (item.sale_price || item.regular_price || item.price)}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => removeFromCart(item)}
                      className="text-red-500 hover:text-red-700 font-semibold cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={5} className="text-right font-semibold">Total:</th>
                <th className="text-right text-xl font-bold">
                  ${calculeTotalItemsPrice()}
                </th>
                <th></th>
              </tr>
            </tfoot>
          </table>
          <div className="flex justify-end mt-6">
            <button
              onClick={handleGoToCheckout}
              className="w-full max-w-xs bg-primary/80 hover:bg-primary text-base-content font-semibold py-2 px-4 rounded transition"
            >
              Ir a pagar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
