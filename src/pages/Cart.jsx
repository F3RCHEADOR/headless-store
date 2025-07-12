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
        <div className="inline-flex space-x-1 mt-1 text-sm">
          <span className="line-through text-base-content/50">${regular_price || price}</span>
          <span className="text-red-500 font-bold">${sale_price}</span>
        </div>
      );
    }
    return <span className="mt-1 text-sm font-semibold">${regular_price || price}</span>;
  };

  const calculeTotalItemsPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price = item.sale_price || item.regular_price || item.price || 0;
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-primary mb-2 drop-shadow-lg">
          Tu Carrito
        </h1>
        <p className="text-center text-lg text-base-content/70 mb-10 max-w-2xl mx-auto">
          Revisa tus productos antes de finalizar la compra. ¡Aprovecha las ofertas!
        </p>
        {cartItems.length === 0 ? (
          <div className="text-center text-base-content/60 text-xl py-24">
            Tu carrito está vacío.
          </div>
        ) : (
          <div className="bg-base-100 rounded-2xl shadow-lg p-6">
            <div className="overflow-x-auto rounded-xl">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-base-200 text-base-content/80">
                    <th className="py-3 px-2">#</th>
                    <th className="py-3 px-2">Imagen</th>
                    <th className="py-3 px-2">Nombre</th>
                    <th className="py-3 px-2 text-center">Cantidad</th>
                    <th className="py-3 px-2 text-right">Precio U</th>
                    <th className="py-3 px-2 text-right">Total</th>
                    <th className="py-3 px-2 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item, idx) => (
                    <tr
                      key={item.id}
                      className="hover:bg-base-200/60 transition"
                    >
                      <td className="py-3 px-2 text-center">{idx + 1}</td>
                      <td className="py-3 px-2">
                        <img
                          src={item?.images?.[0].src || item?.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl shadow hover:scale-105 transition-all"
                        />
                      </td>
                      <td className="py-3 px-2 font-medium">{item.name}</td>
                      <td className="py-3 px-2 text-center">
                        <div className="inline-flex items-center gap-2">
                          <button
                            className={`btn btn-xs ${item.quantity === 1 ? 'bg-red-500 hover:bg-red-600' : 'bg-red-400 hover:bg-red-500'} text-white`}
                            onClick={() => reduceFromCart(item)}
                            aria-label="Disminuir cantidad"
                          >
                            -
                          </button>
                          <span className="w-8 inline-block text-center font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="btn btn-xs bg-green-400 hover:bg-green-500 text-white"
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-right">
                        {renderProductPrice(item)}
                      </td>
                      <td className="py-3 px-2 text-right font-semibold">
                        $
                        {(item.quantity *
                          (item.sale_price || item.regular_price || item.price)).toFixed(2)}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => removeFromCart(item)}
                          className="btn btn-xs bg-red-100 text-red-500 hover:bg-red-200 font-semibold"
                          aria-label="Eliminar producto"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={5} className="text-right font-semibold py-3 px-2">
                      Total:
                    </th>
                    <th className="text-right text-xl font-bold py-3 px-2">
                      ${calculeTotalItemsPrice()}
                    </th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={handleGoToCheckout}
                className="w-full max-w-xs hover:cursor-pointer bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-full shadow-lg transition text-lg"
              >
                Ir a pagar
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
