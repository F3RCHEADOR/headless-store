import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const position = [7.000858, -73.050195]; //Coordenadas de Piedecuesta

  const handleOnChangeFormData = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmitData = (event) => {
    event.preventDefault();
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap sm:gap-4">
        {/* Mapa con Leaflet */}
        <div className="w-full md:w-1/2 lg:w-2/3 h-[300px] md:h-auto bg-gray-300 rounded-lg overflow-hidden mb-6 md:mb-0 order-2 md:order-1">
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
              <Popup>Tu negocio está aquí.</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleFormSubmitData}
          className=" card bg-base-100 shadow-md shadow-primary md:ml-auto mx-auto  items-center-safe w-full md:w-auto md:py-8 my-8 md:mt-0 p-6 order-1 md:order-2"
        >
          <h2 className="text-2xl font-bold mb-2">Contáctanos</h2>
          <p className="mb-5 text-base-content">
            ¿Tienes alguna pregunta? ¡Escríbenos!
          </p>


          <label className="input my-2 ">
            <span className="label">Nombre :</span>
            <input type="text" placeholder="John Doe"  onChange={handleOnChangeFormData}
            value={formData.name} />
          </label>

          <label className="input  my-2">
            <span className="label">Email : </span>
            <input type="text" placeholder="example1@gmail.com"  onChange={handleOnChangeFormData}
            value={formData.email} />
          </label>

          <fieldset className="fieldset mb-2 w-full">
            <legend className="fieldset-legend">Mensaje</legend>
            <textarea
              className="textarea h-24"
              placeholder="mensaje"
              onChange={handleOnChangeFormData}
              value={formData.message}
            ></textarea>
          </fieldset>

          <button type="submit" className="btn btn-primary w-fit">
            Enviar
          </button>

          <p className="text-xs mt-3 text-base-content/60">
            ¡Te responderemos lo más pronto posible!
          </p>
        </form>
      </div>
    </section>
  );
};

export default Contact;
