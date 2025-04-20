import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ErrorSigningModal from "../../components/ErrorSigningModal";
import SuccessSingInModal from "../../components/SuccessSingInModal";

const backURL = import.meta.env.VITE_BACKEND_URL;
const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backURL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.data?.token || !data.data?.admin?.email) {
        setErrorModalIsOpen(true);
        return;
      }

      const token = data.data.token;
      const adminEmail = data.data.admin.email;
      const name = data.data.admin.AdminName;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("email", adminEmail);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("role", "admin");

      setSuccessModalIsOpen(true);

      navigate("/adminDashboard");
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
                Acceso administrativo a ExpressShip
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

export default AdminLogin;
