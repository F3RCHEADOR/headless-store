import React, { useState, useEffect } from "react";
import { newOrder } from "../lib/api.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";

function Checkout({ clearCart, loggedUserData }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

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

    // Calcular total del carrito
    const cartItems = JSON.parse(localStorage?.getItem?.("cart") || "[]");
    const total = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.sale_price || item.regular_price || item.price || 0);
      return sum + (price * item.quantity);
    }, 0);
    setCartTotal(total);
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

  const processOrder = async (paymentMethod = "cod", paymentDetails = null) => {
    setIsLoading(true);
    
    try {
      const orderData = {
        ...form,
        payment_method: paymentMethod,
        payment_method_title: paymentMethod === "paypal" ? "PayPal" : "Cash on delivery",
        set_paid: paymentMethod === "paypal",
        ...(paymentDetails && { payment_details: paymentDetails })
      };

      await newOrder(orderData);
      toast.success("¡Pedido creado exitosamente!");
      clearCart();
      navigate("/my-orders");
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Error al crear el pedido. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verificar si el carrito está vacío
    const cartItems = JSON.parse(localStorage?.getItem?.("cart") || "[]");
    if (!cartItems.length) {
      toast.error("El carrito está vacío");
      return;
    }

    processOrder("cod");
  };

  // Verificar si el carrito está vacío
  const cartItems = JSON.parse(localStorage?.getItem?.("cart") || "[]");
  if (!cartItems.length) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg mb-4">Tu carrito está vacío</p>
        <button 
          onClick={() => navigate("/products")}
          className="btn btn-primary"
        >
          Ir a productos
        </button>
      </div>
    );
  }

  if (!loggedUserData || !loggedUserData.email) {
    return <p className="text-center mt-10">Cargando datos del usuario...</p>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-8 py-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario de datos */}
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-base-200 border-base-300 rounded-box p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Datos de Envío</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="flex flex-col sm:col-span-2">
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
              <div className="flex flex-col sm:col-span-2">
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
            </div>

            {/* Botón de pago contra entrega */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? "Procesando..." : "Pagar contra entrega"}
              </button>
            </div>
          </form>
        </div>

        {/* Resumen del pedido y PayPal */}
        <div className="space-y-6">
          {/* Resumen del pedido */}
          <div className="bg-base-200 border-base-300 rounded-box p-6">
            <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
            <div className="space-y-2">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(parseFloat(item.sale_price || item.regular_price || item.price || 0) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* PayPal */}
          <div className="bg-base-200 border-base-300 rounded-box p-6">
            <h2 className="text-xl font-semibold mb-4">Pagar con PayPal</h2>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: cartTotal.toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                try {
                  const details = await actions.order.capture();
                  await processOrder("paypal", details);
                } catch (error) {
                  console.error("PayPal error:", error);
                  toast.error("Error en el pago de PayPal");
                }
              }}
              onError={(err) => {
                console.error("PayPal error:", err);
                toast.error("Error en PayPal. Inténtalo de nuevo.");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
