// ... existing imports ...
import React, { useEffect, useState } from "react";
import { getOrdersByCustomer } from "../lib/api";
import Loader from "../components/utils/Loader";
import OrderDetailModal from "../components/orders/ModalOrders";

const MyOrders = ({ loggedUserData }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllOrder = async (userId) => {
    const cachedOrders = localStorage.getItem("userOrders");

    if (cachedOrders) {
      setOrderItems(JSON.parse(cachedOrders));
      setIsLoading(false);
    } else {
      try {
        const response = await getOrdersByCustomer(userId);
        setOrderItems(response);
        localStorage.setItem("userOrders", JSON.stringify(response));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (loggedUserData?.id) {
      fetchAllOrder(loggedUserData.id);
    }
  }, [loggedUserData]);

  const refreshOrders = async () => {
    localStorage.removeItem("userOrders");
    setIsLoading(true);
    await fetchAllOrder(loggedUserData.id);
  };

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
      <div className="flex items-center justify-end mt-2">
        <button
          onClick={refreshOrders}
          className="bg-green-300 border-green-400 border-2 text-sm font-bold rounded-md px-2 py-1 text-center cursor-pointer"
        >
          Refresh Orders
        </button>
      </div>
    </div>
  );
};

export default MyOrders;
