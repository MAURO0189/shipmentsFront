import React, { useState } from "react";
import { Search, Package } from "lucide-react";

const TrackingHome = () => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrackingSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para buscar el envío
    console.log("Buscando envío:", trackingNumber);
    // Redirigir o mostrar resultados
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Rastrea tu Envío
            </h2>
            <p className="text-gray-600">
              Ingresa tu número de guía para seguir el estado de tu paquete en
              tiempo real
            </p>
          </div>

          <form
            onSubmit={handleTrackingSubmit}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <label
                  htmlFor="trackingNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Número de Guía
                </label>
                <input
                  type="text"
                  id="trackingNumber"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Ej: XYZ123456789"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Rastrear
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm text-gray-600">
              <button
                type="button"
                className="hover:text-blue-600 transition-colors"
              >
                ¿No tienes tu guía?
              </button>
              <span className="hidden md:inline">|</span>
              <button
                type="button"
                className="hover:text-blue-600 transition-colors"
              >
                Rastreo múltiple
              </button>
              <span className="hidden md:inline">|</span>
              <button
                type="button"
                className="hover:text-blue-600 transition-colors"
              >
                Ayuda con rastreo
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TrackingHome;
