import React, { useState, useEffect } from "react";
import { Package, Search, Eye, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";

const backURL = import.meta.env.VITE_BACKEND_URL;

const ShipmentsList = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchShipments = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Sesión no válida. Por favor inicie sesión nuevamente.");
        return;
      }

      const response = await fetch(`${backURL}/api/shipment/user-shipments`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setShipments(data.shipments || []);
      } else {
        toast.error(data.message || "Error al cargar envíos");
      }
    } catch (error) {
      toast.error("Error de conexión al servidor");
      console.error("Error fetching shipments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredShipments = shipments.filter((shipment) => {
    return (
      shipment.trackingNumber
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      shipment.origin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const viewShipmentDetails = (shipment) => {
    setSelectedShipment(shipment);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "en proceso":
        return "text-yellow-600 bg-yellow-100";
      case "en tránsito":
        return "text-blue-600 bg-blue-100";
      case "entregado":
        return "text-green-600 bg-green-100";
      case "cancelado":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Package className="text-blue-500" /> Mis Envíos
        </h1>
        <button
          onClick={fetchShipments}
          className="flex items-center gap-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
        >
          <RefreshCw size={18} />
          <span>Actualizar</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md mb-6">
        <div className="p-4 border-b">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Buscar por # de rastreo, origen, destino o estado..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando envíos...</p>
          </div>
        ) : filteredShipments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    # Rastreo
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Origen - Destino
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredShipments.map((shipment) => (
                  <tr key={shipment._id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">
                      {shipment.trackingNumber}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">{shipment.origin}</span> →{" "}
                        <span className="font-medium">
                          {shipment.destination}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {new Date(shipment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-sm">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          shipment.status
                        )}`}
                      >
                        {shipment.status || "Pendiente"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-center">
                      <button
                        onClick={() => viewShipmentDetails(shipment)}
                        className="text-blue-600 hover:text-blue-800 flex items-center justify-center mx-auto"
                      >
                        <Eye size={18} className="mr-1" />
                        <span>Ver</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center">
            <div className="text-gray-500 mb-2">
              <Package size={48} className="mx-auto opacity-30" />
            </div>
            <p className="text-gray-600 mb-1">No se encontraron envíos</p>
            <p className="text-gray-400 text-sm">
              {searchTerm
                ? "Intenta con otra búsqueda"
                : "Crea un nuevo envío para verlo aquí"}
            </p>
          </div>
        )}
      </div>

      {/* Shipment Detail Modal */}
      {showModal && selectedShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                  Detalles del Envío
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-500 mb-2">
                    Información General
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">
                        # de Rastreo:
                      </span>
                      <p className="font-semibold">
                        {selectedShipment.trackingNumber}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Estado:</span>
                      <p
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold mt-1 ${getStatusColor(
                          selectedShipment.status
                        )}`}
                      >
                        {selectedShipment.status || "Pendiente"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        Fecha de Creación:
                      </span>
                      <p className="font-semibold">
                        {new Date(selectedShipment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-500 mb-2">Locaciones</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Origen:</span>
                      <p className="font-semibold">{selectedShipment.origin}</p>
                      <p className="text-sm text-gray-500">
                        {selectedShipment.originAddress}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Destino:</span>
                      <p className="font-semibold">
                        {selectedShipment.destination}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedShipment.destinationAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-500 mb-2">
                  Detalles del Paquete
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Descripción:</span>
                    <p className="font-semibold">
                      {selectedShipment.description}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">
                      Tipo de Producto:
                    </span>
                    <p className="font-semibold">
                      {selectedShipment.productType}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">
                      Valor Declarado:
                    </span>
                    <p className="font-semibold">
                      ${selectedShipment.declaredValue?.toLocaleString()} COP
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Frágil:</span>
                    <p className="font-semibold">
                      {selectedShipment.isFragile ? "Sí" : "No"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-500 mb-2">
                  Dimensiones y Peso
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Alto:</span>
                    <p className="font-semibold">
                      {selectedShipment.height} cm
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Ancho:</span>
                    <p className="font-semibold">{selectedShipment.width} cm</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Largo:</span>
                    <p className="font-semibold">
                      {selectedShipment.length} cm
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Peso:</span>
                    <p className="font-semibold">
                      {selectedShipment.weight} kg
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <h4 className="font-medium text-gray-700 mb-2">
                  Historial de Seguimiento
                </h4>
                {selectedShipment.trackingHistory &&
                selectedShipment.trackingHistory.length > 0 ? (
                  <div className="space-y-3">
                    {selectedShipment.trackingHistory.map((item, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-blue-400 pl-4 py-1"
                      >
                        <p className="text-sm text-gray-500">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                        <p className="font-medium">{item.status}</p>
                        <p className="text-sm">{item.location}</p>
                        {item.details && (
                          <p className="text-xs text-gray-500 mt-1">
                            {item.details}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No hay información de seguimiento disponible
                  </p>
                )}
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 rounded-b-xl">
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipmentsList;
