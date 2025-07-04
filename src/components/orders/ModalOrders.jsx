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

export default OrderDetailModal;
