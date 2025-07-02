import React, { useState } from "react";

const initialData = {
  name: "Juan Pérez",
  email: "juan@email.com",
  username: "juanperez",
};

export default function Account() {
  const [form, setForm] = useState(initialData);
  const [original, setOriginal] = useState(initialData);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isChanged =
    form.name !== original.name ||
    form.email !== original.email ||
    form.username !== original.username;

  const handleUpdate = (e) => {
    e.preventDefault();
    setOriginal(form);
    // Aquí iría la lógica para actualizar en backend
    alert("Datos actualizados");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Mi Cuenta</h2>
      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="name">
            Nombre
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="username">
            Username
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded text-white font-semibold transition ${
            isChanged
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isChanged}
        >
          Actualizar
        </button>
      </form>
    </div>
  );
}
