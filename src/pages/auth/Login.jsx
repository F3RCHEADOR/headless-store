import React, { useEffect, useState } from "react";
import { loginUser, registerStoreUser, getUserData } from "../../lib/api.ts";
import Loader from "../../components/utils/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login({ isAuthenticated }) {
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
      navigate("/"); // o a donde quieras redirigir
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
        toast.success("User registered");
      } catch (error) {
        console.log(error);
        toast.error("User not registered");
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
        toast.success("User Loged");
        isAuthenticated(true);

        const loggedUserData = {};
        const userData = await getUserData(response.token);

        loggedUserData.id = userData.id;
        loggedUserData.name = userData.name;
        loggedUserData.email = response.user_email;
        loggedUserData.username = response.user_nicename;

        localStorage.setItem("userData", JSON.stringify(loggedUserData));

        navigate("../");
      } catch (error) {
        toast.error("Invalid login details");
        console.log(error);
      }
    }
    setLoader(false);
  };



  return loader ? (
    <Loader />
  ) : (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                {!isLogin && (
                  <>
                    <label className="label">Nombre</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Jonh Doe"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                    <label className="label">Email</label>
                    <input
                      type="email"
                      className="input"
                      placeholder="Email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </>
                )}
                <label className="label">Username</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Jonh123"
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />

                <button type="submit" className="btn btn-neutral mt-4">
                  {" "}
                  {isLogin ? "Entrar" : "Registrarse"}
                </button>
              </fieldset>

              <p className="mt-6 text-center text-gray-600">
                {isLogin ? (
                  <>
                    ¿No tienes cuenta?{" "}
                    <button
                      className="text-blue-600 hover:underline font-semibold"
                      onClick={() => setIsLogin(false)}
                    >
                      Regístrate
                    </button>
                  </>
                ) : (
                  <>
                    ¿Ya tienes cuenta?{" "}
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
        </div>
      </div>
    </form>
  );
}
