import React, { useState } from "react";

function Checkout() {
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    telefono: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Pedido recibido!\n" + JSON.stringify(form, null, 2));
  };

  return (
    <div className="max-w-5xl w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
      <form onSubmit={handleSubmit} className="w-full grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="nombre">
            Nombre completo
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="nombre"
            id="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="direccion">
            Dirección
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="direccion"
            id="direccion"
            value={form.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="ciudad">
            Ciudad
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="ciudad"
            id="ciudad"
            value={form.ciudad}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="codigoPostal"
          >
            Código Postal
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="codigoPostal"
            id="codigoPostal"
            value={form.codigoPostal}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="telefono">
            Teléfono
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="tel"
            name="telefono"
            id="telefono"
            value={form.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Finalizar pedido
        </button>
      </form>
    </div>
  );
}

export default Checkout;
