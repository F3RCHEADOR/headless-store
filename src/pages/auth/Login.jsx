import React, { useState } from "react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de login o registro
    alert(isLogin ? "Login" : "Registro");
  };

  const handleGoogle = () => {
    // Aquí iría la lógica de login con Google
    alert("Login con Google");
  };

  const handleGithub = () => {
    // Aquí iría la lógica de login con Github
    alert("Login con Github");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
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
                required
              />
            </div>
          )}
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
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Contraseña
            </label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            {isLogin ? "Entrar" : "Registrarse"}
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-3 text-gray-400">o</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleGoogle}
            className="flex items-center justify-center gap-2 w-full py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148s2.75-6.148 6.125-6.148c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.711-1.57-3.914-2.531-6.656-2.531-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.023 9.547-9.711 0-.656-.07-1.148-.156-1.656z"/></svg>
            Continuar con Google
          </button>
          <button
            onClick={handleGithub}
            className="flex items-center justify-center gap-2 w-full py-2 rounded bg-gray-800 text-white font-semibold hover:bg-gray-900 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            Continuar con Github
          </button>
        </div>
        <p className="mt-6 text-center text-gray-600">
          {isLogin ? (
            <>
              ¿No tienes cuenta?{' '}
              <button
                className="text-blue-600 hover:underline font-semibold"
                onClick={() => setIsLogin(false)}
              >
                Regístrate
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{' '}
              <button
                className="text-blue-600 hover:underline font-semibold"
                onClick={() => setIsLogin(true)}
              >
                Inicia sesión
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
