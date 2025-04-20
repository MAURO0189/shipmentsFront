import React, { useState } from "react";
import { PackagePlus, Send } from "lucide-react";
import { toast } from "react-toastify";

const backURL = import.meta.env.VITE_BACKEND_URL;

const addressRegex =
  /^(Calle|Carrera|Transversal|Diagonal|Avenida)(\s+\d+[A-Za-z]?)\s*(#|No\.?)\s*\d+[-]?\d*/i;

const isValidColombianAddress = (address) => addressRegex.test(address);

const ShipmentForm = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    description: "",
    originAddress: "",
    destinationAddress: "",
    weight: 0,
    height: 0,
    width: 0,
    length: 0,
    productType: "",
    declaredValue: 0,
    isFragile: false,
  });

  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    const newValue =
      type === "checkbox"
        ? checked
        : type === "number"
        ? value === ""
          ? ""
          : parseFloat(value)
        : value;

    setFormData({ ...formData, [name]: newValue });
  };

  const validateForm = () => {
    const {
      origin,
      destination,
      originAddress,
      destinationAddress,
      description,
      weight,
      height,
      width,
      length,
      productType,
      declaredValue,
    } = formData;

    return (
      origin.trim() &&
      destination.trim() &&
      originAddress.trim() &&
      destinationAddress.trim() &&
      description.trim() &&
      productType &&
      weight > 0 &&
      height > 0 &&
      width > 0 &&
      length > 0 &&
      declaredValue > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (!validateForm()) {
      toast.warn("Por favor completa todos los campos correctamente.");
      setLoading(false);
      return;
    }

    if (
      !isValidColombianAddress(formData.originAddress) ||
      !isValidColombianAddress(formData.destinationAddress)
    ) {
      toast.warn("Por favor ingresa direcciones válidas.");
      setLoading(false);
      return;
    }

    try {
      const token = sessionStorage.getItem("token");

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
          origin: "",
          destination: "",
          originAddress: "",
          destinationAddress: "",
          description: "",
          weight: 0,
          height: 0,
          width: 0,
          length: 0,
          productType: "",
          declaredValue: 0,
          isFragile: false,
        });
        toast.success("¡Envío registrado!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } else {
        setMessage(data.message || "Error al registrar el envío.");
        setMessageType("error");
        toast.error("Error al conectar con el servidor.", {
          position: "bottom-right",
        });
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
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <PackagePlus className="text-blue-500" /> Crear nuevo envío
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Origen y destino */}
          <div>
            <label
              htmlFor="origin"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Origen del envío
            </label>
            <input
              type="text"
              id="origin"
              name="origin"
              placeholder="Ciudad de origen"
              value={formData.origin}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="originAddress"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Dirección de Origen*
            </label>
            <input
              type="text"
              id="originAddress"
              name="originAddress"
              placeholder="Ej: Calle 45 #12-34"
              value={formData.originAddress}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Destino del envío
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              placeholder="Ciudad de destino"
              value={formData.destination}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="destinationAddress"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Dirección de Destino*
            </label>
            <input
              type="text"
              id="destinationAddress"
              name="destinationAddress"
              placeholder="Ej: Carrera 7 #89-10"
              value={formData.destinationAddress}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Descripción y tipo de producto */}
          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descripción del paquete
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Detalle lo que contiene el paquete"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="2"
            />
          </div>

          <div>
            <label
              htmlFor="productType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo de producto
            </label>
            <select
              id="productType"
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Seleccione tipo</option>
              <option value="electronics">Electrónico</option>
              <option value="clothing">Ropa</option>
              <option value="food">Alimentos</option>
              <option value="documents">Documentos</option>
              <option value="furniture">Muebles</option>
              <option value="toys">Juguetes</option>
              <option value="books">Libros</option>
              <option value="cosmetics">Cosméticos</option>
              <option value="medicines">Medicamentos</option>
              <option value="sports">Artículos deportivos</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="declaredValue"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Valor declarado (COP)
            </label>
            <input
              type="number"
              id="declaredValue"
              name="declaredValue"
              placeholder="Valor en COP"
              value={formData.declaredValue}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Dimensiones */}
          <div className="md:col-span-2">
            <h3 className="font-medium text-gray-700 mb-2">
              Dimensiones del paquete (cm)
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="width"
                  className="block text-xs text-gray-500 mb-1"
                >
                  Ancho
                </label>
                <input
                  type="number"
                  id="width"
                  name="width"
                  placeholder="Ancho"
                  value={formData.width}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label
                  htmlFor="height"
                  className="block text-xs text-gray-500 mb-1"
                >
                  Alto
                </label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  placeholder="Alto"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label
                  htmlFor="length"
                  className="block text-xs text-gray-500 mb-1"
                >
                  Largo
                </label>
                <input
                  type="number"
                  id="length"
                  name="length"
                  placeholder="Largo"
                  value={formData.length}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Peso y fragilidad */}
          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Peso (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              placeholder="Peso en kg"
              value={formData.weight}
              onChange={handleChange}
              required
              min="0"
              step="0.1"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center">
            <div className="flex items-center h-full">
              <input
                type="checkbox"
                id="isFragile"
                name="isFragile"
                checked={formData.isFragile}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isFragile"
                className="ml-2 block text-sm text-gray-700"
              >
                Producto frágil
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 mt-6"
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
    </div>
  );
};

export default ShipmentForm;
