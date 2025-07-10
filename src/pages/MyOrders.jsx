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
        <div className="overflow-x-auto">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th>#</th>
                <td>Número</td>
                <td>Estado</td>
                <td>Fecha</td>
                <td>Total</td>
                <td>Método de pago</td>
                <td>Acciones</td>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((order, idx) => (
                <tr key={order.id}>
                  <th>{idx + 1}</th>
                  <td>{order.number}</td>
                  <td>{order.status}</td>
                  <td>{order.date_created?.split("T")[0]}</td>
                  <td>
                    {order.currency_symbol}
                    {order.total}
                  </td>
                  <td>{order.payment_method_title}</td>
                  <td>
                    <button
                      className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>#</th>
                <td>Número</td>
                <td>Estado</td>
                <td>Fecha</td>
                <td>Total</td>
                <td>Método de pago</td>
                <td>Acciones</td>
              </tr>
            </tfoot>
          </table>
        </div>
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
