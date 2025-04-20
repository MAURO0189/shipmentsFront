import React, { useState } from "react";
import { Search, Package, TruckIcon, Clock, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

const backURL = import.meta.env.VITE_BACKEND_URL;

const TrackingSection = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");

  const handleTrackingChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!trackingNumber.trim()) {
      toast.warn("Por favor ingresa un número de rastreo");
      return;
    }

    setLoading(true);
    setError("");
    setShipment(null);

    try {
      const response = await fetch(`${backURL}/api/shipment/`);
      const data = await response.json();

      if (data.success && data.shipment) {
        setShipment(data.shipment);
      } else {
        setError(
          data.message ||
            "No se encontró información para este número de rastreo"
        );
        toast.error("No se encontró información para este envío");
      }
    } catch (error) {
      setError("Error de conexión al servidor");
      toast.error("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status) => {
    const statuses = {
      Registrado: {
        icon: <Clock className="text-yellow-500" />,
        color: "text-yellow-500",
        bgColor: "bg-yellow-100",
      },
      "En proceso": {
        icon: <Package className="text-orange-500" />,
        color: "text-orange-500",
        bgColor: "bg-orange-100",
      },
      "En tránsito": {
        icon: <TruckIcon className="text-blue-500" />,
        color: "text-blue-500",
        bgColor: "bg-blue-100",
      },
      Entregado: {
        icon: <CheckCircle className="text-green-500" />,
        color: "text-green-500",
        bgColor: "bg-green-100",
      },
    };

    return (
      statuses[status] || {
        icon: <Clock className="text-gray-500" />,
        color: "text-gray-500",
        bgColor: "bg-gray-100",
      }
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Search className="text-blue-500" /> Rastrear Envío
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label
              htmlFor="trackingNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Número de Rastreo
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="trackingNumber"
                name="trackingNumber"
                placeholder="Ingresa el número de rastreo"
                value={trackingNumber}
                onChange={handleTrackingChange}
                className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Buscando...
                  </span>
                ) : (
                  <>
                    <Search size={18} />
                    Rastrear
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}

        {shipment && (
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Envío #{shipment.trackingNumber}
                </h2>
                <p className="text-gray-500">
                  {shipment.origin} → {shipment.destination}
                </p>
              </div>
              <div
                className={`px-3 py-1 rounded-full ${
                  getStatusInfo(shipment.status).bgColor
                }`}
              >
                <span
                  className={`flex items-center gap-1 font-medium ${
                    getStatusInfo(shipment.status).color
                  }`}
                >
                  {getStatusInfo(shipment.status).icon}
                  {shipment.status}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Detalles del Envío</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm text-gray-500">Origen</h4>
                  <p className="font-medium">{shipment.origin}</p>
                  <p className="text-sm">{shipment.originAddress}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500">Destino</h4>
                  <p className="font-medium">{shipment.destination}</p>
                  <p className="text-sm">{shipment.destinationAddress}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500">Descripción</h4>
                  <p>{shipment.description}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500">Peso y Dimensiones</h4>
                  <p>
                    {shipment.weight} kg - {shipment.width}x{shipment.height}x
                    {shipment.length} cm
                  </p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500">Tipo de Producto</h4>
                  <p>{shipment.productType}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500">Frágil</h4>
                  <p>{shipment.isFragile ? "Sí" : "No"}</p>
                </div>
              </div>
            </div>

            {shipment.trackingHistory &&
              shipment.trackingHistory.length > 0 && (
                <div className="mt-6 border-t pt-4">
                  <h3 className="font-medium mb-3">Historial de Seguimiento</h3>
                  <div className="space-y-4">
                    {shipment.trackingHistory.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-start border-l-2 border-blue-400 pl-3"
                      >
                        <div>
                          <p className="text-sm text-gray-500">
                            {new Date(event.timestamp).toLocaleString()}
                          </p>
                          <p className="font-medium">{event.status}</p>
                          <p className="text-sm">{event.location}</p>
                          {event.details && (
                            <p className="text-sm text-gray-500 mt-1">
                              {event.details}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingSection;
