export default function Account({ loggedUserData }) {
 

  const handleUpdate = (e) => {
    e.preventDefault();
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
            value={loggedUserData.name}
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
            value={loggedUserData.email}
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
            value={loggedUserData.username}
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
}
