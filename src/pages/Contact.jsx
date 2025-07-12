import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const position = [7.000858, -73.050195]; // Coordenadas de Piedecuesta

  const handleOnChangeFormData = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmitData = (event) => {
    event.preventDefault();
    // Aquí puedes agregar lógica para enviar el formulario
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-primary mb-4 drop-shadow-lg">
          Contáctanos
        </h1>
        <p className="text-center text-lg text-base-content/70 mb-12 max-w-2xl mx-auto">
          ¿Tienes alguna pregunta o sugerencia? ¡Escríbenos o visítanos!
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Formulario */}
          <form
            onSubmit={handleFormSubmitData}
            className="bg-base-100 rounded-2xl shadow-lg p-8 flex flex-col gap-4 order-2 md:order-1"
          >
            <h2 className="text-2xl font-bold mb-2 text-primary">Envíanos un mensaje</h2>
            <label className="text-base-content font-semibold" htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full"
              onChange={handleOnChangeFormData}
              value={formData.name}
              required
            />

            <label className="text-base-content font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example1@gmail.com"
              className="input input-bordered w-full"
              onChange={handleOnChangeFormData}
              value={formData.email}
              required
            />

            <label className="text-base-content font-semibold" htmlFor="message">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              className="textarea textarea-bordered w-full h-24"
              placeholder="Escribe tu mensaje aquí..."
              onChange={handleOnChangeFormData}
              value={formData.message}
              required
            ></textarea>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-secondary transition-colors text-lg mt-2"
            >
              Enviar
            </button>
            <p className="text-xs mt-3 text-base-content/60 text-center">
              ¡Te responderemos lo más pronto posible!
            </p>
          </form>

          {/* Mapa con Leaflet y datos de contacto */}
          <div className="flex flex-col gap-6 order-1 md:order-2">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-secondary/30 bg-white/70 h-[300px]">
              <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>¡Aquí estamos!</Popup>
                </Marker>
              </MapContainer>
            </div>
            <div className="bg-base-200 rounded-xl shadow p-6 flex flex-col gap-2">
              <div>
                <span className="font-bold text-primary">Email:</span>
                <a href="mailto:info@headlessstore.com" className="block text-base-content hover:text-secondary transition">
                  info@headlessstore.com
                </a>
              </div>
              <div>
                <span className="font-bold text-primary">Teléfono:</span>
                <a href="tel:+1234567890" className="block text-base-content hover:text-secondary transition">
                  +1 234 567 890
                </a>
              </div>
              <div>
                <span className="font-bold text-primary">Dirección:</span>
                <span className="block text-base-content">
                  Piedecuesta, Santander, Colombia
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
