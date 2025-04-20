import { useState, useEffect } from "react";
import { X, CheckCircle, TruckIcon, MapPin } from "lucide-react";
import { getAllCarriers, createShipmentRoute } from "../handler/HandlerApi";

const CreateShipmentRoute = ({ onClose, onRouteCreated }) => {
  const [formData, setFormData] = useState({
    shipmentId: "",
    carrierId: "",
    originAddress: "",
    destinationAddress: "",
    notes: "",
  });

  const [carriers, setCarriers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadCarriers = async () => {
      try {
        setLoading(true);
        const carriersData = await getAllCarriers();
        setCarriers(carriersData);
      } catch (err) {
        setError("Error al cargar transportistas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCarriers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Convert shipmentId y carrierId a número
      const payload = {
        ...formData,
        shipmentId: Number(formData.shipmentId),
        carrierId: Number(formData.carrierId),
      };

      await createShipmentRoute(payload);
      setSuccess(true);
      setFormData({
        shipmentId: "",
        carrierId: "",
        originAddress: "",
        destinationAddress: "",
        notes: "",
      });

      setTimeout(() => {
        onRouteCreated();
      }, 2000);
    } catch (err) {
      setError("No se pudo crear la ruta");
      console.error(err);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Crear Ruta de Envío
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center py-10">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Ruta creada con éxito
            </h3>
            <p className="mt-1 text-sm text-gray-500">Redireccionando...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ID del Envío*
                </label>
                <input
                  type="number"
                  name="shipmentId"
                  value={formData.shipmentId}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Ej: 1023"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Transportista*
                </label>
                <div className="relative">
                  <TruckIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <select
                    name="carrierId"
                    value={formData.carrierId}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Seleccionar transportista</option>
                    {carriers.map((carrier) => (
                      <option key={carrier.id} value={carrier.id}>
                        {carrier.name} - {carrier.vehiclePlate} -{carrier.id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dirección de Origen*
                </label>
                <input
                  type="text"
                  name="originAddress"
                  value={formData.originAddress}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Ej: Calle 45 #12-34, Bogotá"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dirección de Destino*
                </label>
                <input
                  type="text"
                  name="destinationAddress"
                  value={formData.destinationAddress}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Ej: Carrera 7 #89-10, Medellín"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notas
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Ruta con carga refrigerada..."
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700 flex items-center"
              >
                {submitting && (
                  <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                Crear Ruta
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateShipmentRoute;
