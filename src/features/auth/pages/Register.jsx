import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Phone, CheckCircle } from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    receiveNews: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de registro
    console.log("Registration data:", formData);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-blue-600 py-4 px-6 text-white">
              <h1 className="text-2xl font-bold">Crear Cuenta</h1>
              <p className="text-blue-100">
                Regístrate para gestionar tus envíos de forma rápida y fácil
              </p>
            </div>

            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nombre
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                  </div>

                  {/* Apellido */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Apellido
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Tu apellido"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
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
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="ejemplo@correo.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Teléfono
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>

                  {/* Contraseña */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Contraseña
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      La contraseña debe contener al menos una letra mayúscula,
                      una minúscula, un número y un carácter especial
                    </p>
                  </div>

                  {/* Confirmar Contraseña */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirmar Contraseña
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Tipo de Cuenta */}
                <div className="mt-6">
                  <p className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Cuenta
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                      <input
                        type="radio"
                        id="personal"
                        name="accountType"
                        value="personal"
                        className="hidden"
                        defaultChecked
                      />
                      <label
                        htmlFor="personal"
                        className="flex items-start cursor-pointer"
                      >
                        <div className="h-5 w-5 rounded-full border border-gray-400 flex items-center justify-center mr-3">
                          <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Personal</p>
                          <p className="text-sm text-gray-600">
                            Para envíos particulares y ocasionales
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className="border border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                      <input
                        type="radio"
                        id="business"
                        name="accountType"
                        value="business"
                        className="hidden"
                      />
                      <label
                        htmlFor="business"
                        className="flex items-start cursor-pointer"
                      >
                        <div className="h-5 w-5 rounded-full border border-gray-400 flex items-center justify-center mr-3">
                          <div className="h-3 w-3 rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Empresa</p>
                          <p className="text-sm text-gray-600">
                            Para negocios y envíos frecuentes
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Términos y condiciones */}
                <div className="mt-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="acceptTerms"
                        name="acceptTerms"
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="acceptTerms" className="text-gray-700">
                        Acepto los{" "}
                        <Link
                          to="/terminos"
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Términos y Condiciones
                        </Link>{" "}
                        y la{" "}
                        <Link
                          to="/privacidad"
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Política de Privacidad
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="mt-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="receiveNews"
                        name="receiveNews"
                        type="checkbox"
                        checked={formData.receiveNews}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="receiveNews" className="text-gray-700">
                        Me gustaría recibir ofertas especiales y novedades por
                        correo electrónico
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                  >
                    Crear Cuenta
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  ¿Ya tienes cuenta?
                  <Link
                    to="/login"
                    className="ml-1 font-medium text-blue-600 hover:text-blue-800"
                  >
                    Inicia sesión
                  </Link>
                </p>
              </div>

              <div className="mt-8 bg-blue-50 rounded-lg p-4 flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Al registrarte obtienes:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Historial completo de envíos</li>
                    <li>Notificaciones en tiempo real</li>
                    <li>Descuentos exclusivos</li>
                    <li>Guardar direcciones frecuentes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
