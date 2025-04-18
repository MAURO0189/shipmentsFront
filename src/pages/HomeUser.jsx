import React, { useState } from "react";
import { PackagePlus, Send } from "lucide-react";
import UserHeader from "../components/UserHeader";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const backURL = import.meta.env.VITE_BACKEND_URL;
const HomeUser = () => {
  const [formData, setFormData] = useState({
    destinatario: "",
    direccion: "",
    ciudad: "",
    descripcion: "",
  });

  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${backURL}/api/shipment/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Envío creado con éxito.");
        setMessageType("success");
        setFormData({
          destinatario: "",
          direccion: "",
          ciudad: "",
          descripcion: "",
        });
        toast.success("¡Envío registrado!");
      } else {
        setMessage(data.message || "Error al registrar el envío.");
        setMessageType("error");
        toast.error(data.message);
      }
    } catch (error) {
      setMessage("Error en la conexión.");
      setMessageType("error");
      toast.error("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <UserHeader />

      <main className="flex-grow px-6 py-12 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <PackagePlus className="text-blue-500" /> Crear nuevo envío
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md space-y-4"
        >
          <input
            type="text"
            name="destinatario"
            placeholder="Nombre del destinatario"
            value={formData.destinatario}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección de entrega"
            value={formData.direccion}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="ciudad"
            placeholder="Ciudad de destino"
            value={formData.ciudad}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción del paquete"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            disabled={loading}
          >
            <Send className="w-4 h-4" />
            {loading ? "Enviando..." : "Registrar Envío"}
          </button>
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
      </main>

      <Footer />
    </div>
  );
};

export default HomeUser;
