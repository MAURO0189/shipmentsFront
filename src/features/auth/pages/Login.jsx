import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ErrorSigningModal from "../../../components/ErrorSigningModal";
import SuccessSingInModal from "../../../components/SuccessSingInModal";

const backURL = import.meta.env.VITE_BACKEND_URL;
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backURL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.data?.token || !data.data?.user?.email) {
        setErrorModalIsOpen(true);
        return;
      }

      const token = data.data.token;
      const userEmail = data.data.user.email;
      const name = data.data.user.username;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("email", userEmail);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("role", "user");

      setSuccessModalIsOpen(true);

      navigate("/loading");
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setErrorModalIsOpen(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-blue-600 py-4 px-6 text-white">
              <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
              <p className="text-blue-100">
                Accede a tu cuenta para gestionar tus envíos
              </p>
            </div>

            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="ejemplo@correo.com"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contraseña
                    </label>
                    <Link
                      to="/recuperar-password"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                >
                  Iniciar Sesión
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      O continúa con
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
                        fill="#1877F2"
                      />
                    </svg>
                    Facebook
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  ¿No tienes cuenta?
                  <Link
                    to="/register"
                    className="ml-1 font-medium text-blue-600 hover:text-blue-800"
                  >
                    Regístrate ahora
                  </Link>
                </p>
              </div>
            </div>
          </div>
          {/* Modales */}
          <ErrorSigningModal {...{ errorModalIsOpen, setErrorModalIsOpen }} />
          <SuccessSingInModal
            {...{ successModalIsOpen, setSuccessModalIsOpen }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
