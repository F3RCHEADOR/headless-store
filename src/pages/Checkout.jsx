import React, { useState, useEffect } from "react";
import { newOrder } from "../lib/api.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Checkout({ clearCart, loggedUserData }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customer_id: "",
    payment_method: "cod",
    payment_method_title: "Cash on delivery",
    set_paid: false,
    billing: {
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (loggedUserData && loggedUserData.email) {
      setForm((prev) => ({
        ...prev,
        customer_id: loggedUserData.id || "",
        billing: {
          ...prev.billing,
          email: loggedUserData.email || "",
        },
      }));
    }
  }, [loggedUserData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      billing: {
        ...form.billing,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      newOrder(form).then(() => {
        toast.success("New Order Created");
        clearCart();
        navigate("/my-orders");
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!loggedUserData || !loggedUserData.email) {
    return <p className="text-center mt-10">Cargando datos del usuario...</p>;
  }

  return (
    <div className="max-w-5xl w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
      <form onSubmit={handleSubmit} className="w-full grid md:grid-cols-2 gap-4">
        {[
          { label: "Nombre", name: "first_name" },
          { label: "Apellido", name: "last_name" },
          { label: "Dirección", name: "address_1" },
          { label: "Departamento, piso, etc. (opcional)", name: "address_2" },
          { label: "Ciudad", name: "city" },
          { label: "Estado/Provincia", name: "state" },
          { label: "Código Postal", name: "postcode" },
          { label: "País", name: "country" },
          { label: "Email", name: "email", type: "email" },
          { label: "Teléfono", name: "phone", type: "tel" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1" htmlFor={name}>
              {label}
            </label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={type}
              name={name}
              id={name}
              value={form.billing[name]}
              onChange={handleChange}
              required={name !== "address_2"} // el único opcional
            />
          </div>
        ))}

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
