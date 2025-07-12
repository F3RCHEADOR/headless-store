import React, { useEffect, useState } from "react";
import { loginUser, registerStoreUser, getUserData } from "../../lib/api.ts";
import Loader from "../../components/utils/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login({ isAuthenticated, setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (!isLogin) {
      try {
        await registerStoreUser({
          username: form.username,
          email: form.email,
          password: form.password,
          first_name: form.name,
        });

        setForm({
          name: "",
          email: "",
          username: "",
          password: "",
        });
        toast.success("Usuario registrado");
      } catch (error) {
        toast.error("No se pudo registrar el usuario");
      }
    } else {
      try {
        const response = await loginUser({
          username: form.username,
          password: form.password,
        });

        setForm({
          username: "",
          password: "",
        });

        localStorage.setItem("auth_token", response.token);
        toast.success("Sesión iniciada");
        setIsAuthenticated(true);

        const loggedUserData = {};
        const userData = await getUserData(response.token);

        loggedUserData.id = userData.id;
        loggedUserData.name = userData.name;
        loggedUserData.email = response.user_email;
        loggedUserData.username = response.user_nicename;

        localStorage.setItem("userData", JSON.stringify(loggedUserData));

        navigate("../");
      } catch (error) {
        toast.error("Datos de acceso inválidos");
      }
    }
    setLoader(false);
  };

  return loader ? (
    <Loader />
  ) : (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 relative overflow-hidden transition-colors duration-500">
      {/* Onda decorativa arriba */}
      <svg
        className="absolute top-0 left-0 w-full h-32 md:h-40 lg:h-48"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          className="text-primary/20 dark:text-secondary/30 transition-colors duration-500"
          d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,186.7C1200,203,1320,213,1380,218.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        />
      </svg>

      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="bg-base-100 rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-extrabold text-center text-primary mb-2">
            {isLogin ? "Inicia sesión" : "Crea tu cuenta"}
          </h1>
          <p className="text-center text-base-content/70 mb-6">
            {isLogin
              ? "Accede a tu cuenta para comprar y gestionar tus pedidos."
              : "Regístrate para disfrutar de todos los beneficios de Headless Store."}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <label className="label" htmlFor="name">
                  Nombre
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="John Doe"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </>
            )}
            <label className="label" htmlFor="username">
              Usuario
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="John123"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <label className="label" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Contraseña"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn btn-primary w-full mt-4">
              {isLogin ? "Entrar" : "Registrarse"}
            </button>
          </form>
          <div className="mt-6 text-center text-base-content/70">
            {isLogin ? (
              <>
                ¿No tienes cuenta?{" "}
                <button
                  className="text-secondary hover:underline font-semibold"
                  onClick={() => setIsLogin(false)}
                  type="button"
                >
                  Regístrate
                </button>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta?{" "}
                <button
                  className="text-secondary hover:underline font-semibold"
                  onClick={() => setIsLogin(true)}
                  type="button"
                >
                  Inicia sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
