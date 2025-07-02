import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Datos de ejemplo para el carrito
const initialCart = [
  {
    id: 1,
    name: "Camiseta básica",
    image: "https://via.placeholder.com/80x80.png?text=Producto+1",
    price: 19.99,
    quantity: 2,
  },
  {
    id: 2,
    name: "Pantalón jeans",
    image: "https://via.placeholder.com/80x80.png?text=Producto+2",
    price: 39.99,
    quantity: 1,
  },
];

const Cart = () => {
  const [cart, setCart] = useState(initialCart);
  const navigate = useNavigate();

  const handleGoToCheckout = () => {
    navigate("/checkout");
  };

  const handleQuantityChange = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotal = () => {
    return cart
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6">Carrito de compras</h1>
      {cart.length === 0 ? (
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
                <th className="py-3 px-4 text-right">Precio</th>
                <th className="py-3 px-4 text-right">Total</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center gap-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="w-8 inline-block text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="text-red-500 hover:text-red-700 font-semibold"
                      onClick={() => handleRemove(item.id)}
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
                <span className="text-xl font-bold">${getTotal()}</span>
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
