import React, { useState, useEffect } from "react";
import { ArrowLeft, Truck, Calendar, MapPin, User } from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const RouteDetail = ({ routeId, onBack }) => {
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRouteDetail = async () => {
      try {
        setLoading(true);
        // Suponiendo que existe un endpoint para obtener detalles de una ruta
        const response = await fetch(
          `${API_URL}/api/shipment-route/status/{status}`
        );
        if (!response.ok) {
          throw new Error("No se pudo cargar el detalle de la ruta");
        }
        const data = await response.json();
        setRoute(data);
      } catch (err) {
        setError("Error al cargar el detalle de la ruta");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRouteDetail();
  }, [routeId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        {error}
      </div>
    );
  }

  if (!route) {
    return (
      <div className="text-center py-16">
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          No se encontró la ruta solicitada
        </h3>
        <button
          onClick={onBack}
          className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver al listado de rutas
        </button>
      </div>
    );
  }

  // Simulamos datos que podría tener una ruta
  const routeData = route || {
    uuid: routeId,
    shipmentId: "SH12345",
    status: "in_progress",
    createdAt: new Date().toISOString(),
    origin: "Ciudad Origen",
    destination: "Ciudad Destino",
    assignedTransporter: {
      name: "Juan Pérez",
      vehiclePlate: "ABC123",
    },
    estimatedDelivery: new Date(Date.now() + 86400000).toISOString(),
    stops: [
      { location: "Punto intermedio 1", status: "completed" },
      { location: "Punto intermedio 2", status: "pending" },
    ],
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 flex items-center text-gray-500 hover:text-indigo-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          Detalle de Ruta #{routeData.uuid.substring(0, 8)}
        </h2>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Información de la Ruta
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Detalles y progreso del envío #{routeData.shipmentId}
            </p>
          </div>
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              routeData.status === "completed"
                ? "bg-green-100 text-green-800"
                : routeData.status === "in_progress"
                ? "bg-blue-100 text-blue-800"
                : routeData.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {routeData.status === "completed"
              ? "Completada"
              : routeData.status === "in_progress"
              ? "En Progreso"
              : routeData.status === "pending"
              ? "En Espera"
              : "Cancelada"}
          </span>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Calendar className="h-4 w-4 mr-2" /> Fecha de Creación
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(routeData.createdAt).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <MapPin className="h-4 w-4 mr-2" /> Origen
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {routeData.origin}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <MapPin className="h-4 w-4 mr-2" /> Destino
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {routeData.destination}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <User className="h-4 w-4 mr-2" /> Transportador Asignado
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {routeData.assignedTransporter ? (
                  <div>
                    <p>{routeData.assignedTransporter.name}</p>
                    <p className="text-xs text-gray-500">
                      Placa: {routeData.assignedTransporter.vehiclePlate}
                    </p>
                  </div>
                ) : (
                  <span className="text-yellow-600">Sin asignar</span>
                )}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Truck className="h-4 w-4 mr-2" /> Paradas
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  {routeData.stops && routeData.stops.length > 0 ? (
                    routeData.stops.map((stop, index) => (
                      <li
                        key={index}
                        className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                      >
                        <div className="w-0 flex-1 flex items-center">
                          <span
                            className={`flex-shrink-0 h-4 w-4 rounded-full mr-2 ${
                              stop.status === "completed"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }`}
                          />
                          <span className="ml-2 flex-1 w-0 truncate">
                            {stop.location}
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <span
                            className={`text-xs ${
                              stop.status === "completed"
                                ? "text-green-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {stop.status === "completed"
                              ? "Completada"
                              : "Pendiente"}
                          </span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="pl-3 pr-4 py-3 text-sm text-gray-500">
                      No hay paradas registradas
                    </li>
                  )}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default RouteDetail;
