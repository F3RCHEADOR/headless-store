import React, { useState } from "react";

const mockOrders = [
  {
    id: "001",
    date: "2024-06-01",
    total: 120.5,
    items: [
      { name: "Producto A", quantity: 2 },
      { name: "Producto B", quantity: 1 },
    ],
    status: "Entregado",
  },
  {
    id: "002",
    date: "2024-05-20",
    total: 75.0,
    items: [
      { name: "Producto C", quantity: 1 },
    ],
    status: "En camino",
  },
];

const statusColors = {
  "Entregado": "text-green-600 bg-green-100",
  "En camino": "text-yellow-600 bg-yellow-100",
  "Cancelado": "text-red-600 bg-red-100",
};

const MyOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handlePrint = () => {
    // Aquí puedes conectar con una función real de descarga/impresión
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Mis Pedidos</h1>
      {mockOrders.length === 0 ? (
        <p className="text-center text-gray-500">No tienes pedidos aún.</p>
      ) : (
        <ul className="space-y-6">
          {mockOrders.map((order) => (
            <li
              key={order.id}
              className="border rounded-lg shadow-sm p-6 bg-white"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <h2 className="text-xl font-semibold">
                  Pedido <span className="text-blue-600">#{order.id}</span>
                </h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status] || "bg-gray-100 text-gray-600"}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between text-gray-600 mb-4">
                <p>Fecha: <span className="font-medium">{order.date}</span></p>
                <p>Total: <span className="font-medium">${order.total}</span></p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Ver detalles
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setSelectedOrder(null)}
              aria-label="Cerrar"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2">
              Detalles del pedido #{selectedOrder.id}
            </h2>
            <p className="mb-1">Fecha: <span className="font-medium">{selectedOrder.date}</span></p>
            <p className="mb-1">Estado: <span className={`font-medium ${statusColors[selectedOrder.status] || "text-gray-600"}`}>{selectedOrder.status}</span></p>
            <p className="mb-4">Total: <span className="font-medium">${selectedOrder.total}</span></p>
            <h3 className="font-semibold mb-2">Productos:</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              {selectedOrder.items.map((item, idx) => (
                <li key={idx}>
                  <span className="font-medium">{item.name}</span> x{item.quantity}
                </li>
              ))}
            </ul>
            <div className="flex justify-end gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Descargar factura
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
