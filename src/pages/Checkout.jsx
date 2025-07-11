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
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto px-2 py-8 flex flex-col items-center justify-center md:h-screen mt-12 md:-mt-12"
    >
      <fieldset
        className="
          bg-base-200 border-base-300 rounded-box grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 w-full"
      >
        <legend className="fieldset-legend">datos de la compra</legend>
        {/* Nombre */}
        <div className="flex flex-col">
          <label className="label text-sm mb-2" htmlFor="first_name">
            Nombre
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="Nombre"
            name="first_name"
            id="first_name"
            value={form.billing.first_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Apellido */}
        <div className="flex flex-col">
          <label className="label text-sm mb-2" htmlFor="last_name">
            Apellido
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="Apellido"
            name="last_name"
            id="last_name"
            value={form.billing.last_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Dirección */}
        <div className="flex flex-col ">
          <label className="label text-sm mb-2" htmlFor="address_1">
            Dirección
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="Dirección"
            name="address_1"
            id="address_1"
            value={form.billing.address_1}
            onChange={handleChange}
            required
          />
        </div>

        {/* Departamento, piso, etc. */}
        <div className="flex flex-col ">
          <label className="label text-sm mb-2" htmlFor="address_2">
            Departamento, piso, etc. (opcional)
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="Departamento, piso, etc."
            name="address_2"
            id="address_2"
            value={form.billing.address_2}
            onChange={handleChange}
          />
        </div>

        {/* Ciudad */}
        <div className="flex flex-col">
          <label className="label text-sm mb-2" htmlFor="city">
            Ciudad
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="Ciudad"
            name="city"
            id="city"
            value={form.billing.city}
            onChange={handleChange}
            required
          />
        </div>

        {/* Estado/Provincia */}
        <div className="flex flex-col">
          <label className="label text-sm mb-2" htmlFor="state">
            Estado/Provincia
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="Estado/Provincia"
            name="state"
            id="state"
            value={form.billing.state}
            onChange={handleChange}
            required
          />
        </div>

        {/* Código Postal */}
        <div className="flex flex-col">
          <label className="label text-sm mb-2" htmlFor="postcode">
            Código Postal
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="Código Postal"
            name="postcode"
            id="postcode"
            value={form.billing.postcode}
            onChange={handleChange}
            required
          />
        </div>

        {/* País */}
        <div className="flex flex-col">
          <label className="label text-sm mb-2" htmlFor="country">
            País
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="País"
            name="country"
            id="country"
            value={form.billing.country}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="label text-sm mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="input w-full"
            placeholder="Email"
            name="email"
            id="email"
            value={form.billing.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Teléfono */}
        <div className="flex flex-col">
          <label className="label text-sm mb-2" htmlFor="phone">
            Teléfono
          </label>
          <input
            type="tel"
            className="input w-full"
            placeholder="Teléfono"
            name="phone"
            id="phone"
            value={form.billing.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="mt-4 sm:col-span-2 btn btn-accent hover:btn-active transition w-full"
        >
          Finalizar pedido
        </button>
      </fieldset>
    </form>
  );
}

export default Checkout;
