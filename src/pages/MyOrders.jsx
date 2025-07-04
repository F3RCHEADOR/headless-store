// ... existing imports ...
import React, { useEffect, useState } from "react";
import { getOrdersByCustomer } from "../lib/api";
import Loader from "../components/utils/Loader";

// Modal de detalles de la orden
const OrderDetailModal = ({ order, onClose, onDownload }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">Pedido #{order.number}</h2>
        <div className="mb-2">
          <span className="font-semibold">Estado:</span> {order.status}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Fecha:</span>{" "}
          {order.date_created?.split("T")[0]}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Total:</span> {order.currency_symbol}
          {order.total}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Método de pago:</span>{" "}
          {order.payment_method_title}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Dirección de envío:</span>
          <div className="ml-2 text-sm">
            {order.billing.first_name} {order.billing.last_name}
            <br />
            {order.billing.address_1} {order.billing.address_2}
            <br />
            {order.billing.city}, {order.billing.state}, {order.billing.country}
            <br />
            CP: {order.billing.postcode}
            <br />
            Email: {order.billing.email}
            <br />
            Tel: {order.billing.phone}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Productos:</h3>
          <ul className="divide-y">
            {order.line_items.map((item) => (
              <li key={item.id} className="flex items-center py-2">
                <img
                  src={item.image?.src}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded mr-4 border"
                />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">
                    Cantidad: {item.quantity} | Precio unitario:{" "}
                    {order.currency_symbol}
                    {item.price}
                  </div>
                  <div className="text-sm text-gray-600">
                    Subtotal: {order.currency_symbol}
                    {item.subtotal}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          onClick={() => onDownload(order)}
        >
          Descargar Detalles
        </button>
      </div>
    </div>
  );
};

const MyOrders = ({ loggedUserData }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllOrder = async (userId) => {
    try {
      const response = await getOrdersByCustomer(userId);
      setOrderItems(response);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (loggedUserData?.id) {
      fetchAllOrder(loggedUserData.id);
    }
  }, [loggedUserData]);

  // Descarga los detalles como .txt
  const handleDownload = (order) => {
    const details = `
      Pedido #${order.number}
      Estado: ${order.status}
      Fecha: ${order.date_created}
      Total: ${order.currency_symbol}${order.total}
      Método de pago: ${order.payment_method_title}

      Dirección de envío:
      ${order.billing.first_name} ${order.billing.last_name}
      ${order.billing.address_1} ${order.billing.address_2}
      ${order.billing.city}, ${order.billing.state}, ${order.billing.country}
      CP: ${order.billing.postcode}
      Email: ${order.billing.email}
      Tel: ${order.billing.phone}

      Productos:
      ${order.line_items
        .map(
          (item) =>
            `- ${item.name} | Cantidad: ${item.quantity} | Precio unitario: ${order.currency_symbol}${item.price} | Subtotal: ${order.currency_symbol}${item.subtotal}`
        )
        .join("\n")}
    `;
    const blob = new Blob([details], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pedido_${order.number}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Mis Pedidos</h1>
      {orderItems.length === 0 ? (
        <p className="text-center text-gray-500">No tienes pedidos aún.</p>
      ) : (
        <ul className="space-y-6">
          {orderItems.map((order) => (
            <li
              key={order.id}
              className="border rounded-lg shadow-sm p-6 bg-white"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <h2 className="text-xl font-semibold">
                  Pedido <span className="text-blue-600">{order.number}</span>
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium  bg-gray-100 text-gray-600`}
                >
                  {order.status}
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between text-gray-600 mb-4">
                <p>
                  Fecha:{" "}
                  <span className="font-medium">
                    {order.date_created?.split("T")[0]}
                  </span>
                </p>
                <p>
                  Total:{" "}
                  <span className="font-medium">
                    {order.currency_symbol}
                    {order.total}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={() => setSelectedOrder(order)}
                >
                  Ver detalles
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Modal de detalles */}
      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default MyOrders;
