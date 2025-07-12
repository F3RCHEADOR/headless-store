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

  const getStatusBadge = (status) => {
    const statusConfig = {
      'completed': { color: 'success', text: 'Completado' },
      'processing': { color: 'info', text: 'Procesando' },
      'pending': { color: 'warning', text: 'Pendiente' },
      'cancelled': { color: 'error', text: 'Cancelado' },
      'refunded': { color: 'neutral', text: 'Reembolsado' }
    };
    
    const config = statusConfig[status] || { color: 'neutral', text: status };
    return <span className={`badge badge-${config.color}`}>{config.text}</span>;
  };

  return isLoading ? (
    <div className="flex justify-center items-center min-h-screen">
      <Loader />
    </div>
  ) : (
    <div className="container mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-6">
            <h1 className="card-title text-3xl">Mis Pedidos</h1>
            <button
              onClick={refreshOrders}
              className="btn btn-success btn-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Actualizar
            </button>
          </div>

          {orderItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">No tienes pedidos aún</h3>
              <p className="text-base-content/60">Cuando hagas tu primer pedido, aparecerá aquí</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th>Número</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Método de pago</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((order, idx) => (
                    <tr key={order.id} className="hover">
                      <td className="text-center font-bold">{idx + 1}</td>
                      <td className="font-mono">#{order.number}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>{order.date_created?.split("T")[0]}</td>
                      <td className="font-semibold">
                        {order.currency_symbol}{order.total}
                      </td>
                      <td className="text-sm">{order.payment_method_title}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Ver detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

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
