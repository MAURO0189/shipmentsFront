import React, { useState } from "react";
import { X } from "lucide-react";
import { createCarrier } from "../handler/HandlerApi";

const CreateTransporter = ({ onClose, onTransporterCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicleModel: "",
    vehiclePlate: "",
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Limpiar error del campo cuando se edita
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!/^\d{7,15}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Formato de teléfono inválido";
    }

    if (!formData.vehicleModel.trim()) {
      newErrors.vehicleModel = "El modelo del vehículo es obligatorio";
    }

    if (!formData.vehiclePlate.trim()) {
      newErrors.vehiclePlate = "La placa del vehículo es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await createCarrier(formData);
      onTransporterCreated();
    } catch (error) {
      console.error("Error al crear transportador:", error);
      setErrors({
        submit: "Error al crear el transportador. Inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-medium">Crear Nuevo Transportador</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.name ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Teléfono
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.phone ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="vehicleModel"
                className="block text-sm font-medium text-gray-700"
              >
                Modelo del Vehículo
              </label>
              <input
                type="text"
                id="vehicleModel"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.vehicleModel ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.vehicleModel && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.vehicleModel}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="vehiclePlate"
                className="block text-sm font-medium text-gray-700"
              >
                Placa del Vehículo
              </label>
              <input
                type="text"
                id="vehiclePlate"
                name="vehiclePlate"
                value={formData.vehiclePlate}
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.vehiclePlate ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.vehiclePlate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.vehiclePlate}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isActive"
                className="ml-2 block text-sm text-gray-700"
              >
                Transportador Activo
              </label>
            </div>

            {errors.submit && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {errors.submit}
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? "Creando..." : "Crear Transportador"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTransporter;
