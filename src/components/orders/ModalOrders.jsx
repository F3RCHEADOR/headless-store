// Modal de detalles de la orden
const OrderDetailModal = ({ order, onClose, onDownload }) => {
  if (!order) return null;

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: "success", text: "Completado" },
      processing: { color: "info", text: "Procesando" },
      pending: { color: "warning", text: "Pendiente" },
      cancelled: { color: "error", text: "Cancelado" },
      refunded: { color: "neutral", text: "Reembolsado" },
    };

    const config = statusConfig[status] || { color: "neutral", text: status };
    return (
      <span className={`badge badge-${config.color} badge-lg`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="modal modal-open z-50 ">
      <div className="modal-box max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header fijo */}
        <div className="flex justify-between items-start mb-6 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold">Pedido #{order.number}</h2>
            <div className="mt-2">{getStatusBadge(order.status)}</div>
          </div>
        
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto pr-2">
          {/* Información general */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="card bg-base-200">
              <div className="card-body p-4">
                <h3 className="card-title text-lg mb-3">
                  Información del Pedido
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Fecha:</span>
                    <span>{order.date_created?.split("T")[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-lg">
                      {order.currency_symbol}
                      {order.total}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Método de pago:</span>
                    <span>{order.payment_method_title}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body p-4">
                <h3 className="card-title text-lg mb-3">Dirección de Envío</h3>
                <div className="text-sm space-y-1">
                  <div className="font-medium">
                    {order.billing.first_name} {order.billing.last_name}
                  </div>
                  <div>
                    {order.billing.address_1} {order.billing.address_2}
                  </div>
                  <div>
                    {order.billing.city}, {order.billing.state},{" "}
                    {order.billing.country}
                  </div>
                  <div>CP: {order.billing.postcode}</div>
                  <div className="divider my-2"></div>
                  <div>📧 {order.billing.email}</div>
                  <div>📞 {order.billing.phone}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Productos */}
          <div className="card bg-base-100 border mb-6">
            <div className="card-body p-4">
              <h3 className="card-title text-lg mb-4">
                Productos ({order.line_items.length})
              </h3>
              <div className="space-y-4">
                {order.line_items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 bg-base-200 rounded-lg"
                  >
                    <div className="avatar flex-shrink-0">
                      <div className="w-16 h-16 rounded-lg">
                        <img
                          src={item.image?.src || "/placeholder-product.jpg"}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{item.name}</h4>
                      <div className="text-sm text-base-content/70 space-y-1">
                        <div>Cantidad: {item.quantity}</div>
                        <div>
                          Precio unitario: {order.currency_symbol}
                          {item.price}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-lg">
                        {order.currency_symbol}
                        {item.subtotal}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer fijo con botones */}
        <div className="modal-action flex-shrink-0 border-t pt-4 mt-4">
          <button className="btn btn-ghost" onClick={onClose}>
            Cerrar
          </button>
          <button className="btn btn-success" onClick={() => onDownload(order)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Descargar Detalles
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default OrderDetailModal;
