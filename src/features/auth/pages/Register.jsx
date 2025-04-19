import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Phone, CheckCircle } from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const backURL = import.meta.env.VITE_BACKEND_URL;
const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (formData.password !== formData.confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      setIsSubmitting(false);
      return;
    }
    if (formData.password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch(`${backURL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Sin anidarlo en un objeto adicional
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registro exitoso. ¡Ahora puedes iniciar sesión!");
        setMessageType("success");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        if (data.message) {
          setMessage(data.message);
        } else if (data.error) {
          setMessage(data.error);
        } else if (data.errors && Array.isArray(data.errors)) {
          const firstError = data.errors[0];
          if (firstError.errores) {
            setMessage(firstError.errores[0]);
          } else if (typeof firstError === "string") {
            setMessage(firstError);
          } else {
            setMessage("Error en el formulario. Por favor revisa los datos.");
            setMessageType("error");
          }
        } else {
          setMessage("Hubo un problema con el registro.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Hubo un problema al conectar con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
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
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nombre
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="username"
                        name="username"
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
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Teléfono
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
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
                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                  >
                    {isSubmitting ? "Registrando..." : "Registrarse"}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
              {message && (
                <p
                  className={`mt-4 text-sm text-center ${
                    messageType === "error" ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {message}
                </p>
              )}

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
