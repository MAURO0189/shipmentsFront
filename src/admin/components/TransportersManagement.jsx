import React, { useState, useEffect } from "react";
import { Plus, Users, User, Phone, Truck, Tag } from "lucide-react";
import CreateTransporter from "./CreateTransporter";
import { getAllCarriers } from "../handler/HandlerApi";

const TransportersManagement = () => {
  const [transporters, setTransporters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadTransporters();
  }, []);

  const loadTransporters = async () => {
    try {
      setLoading(true);
      const response = await getAllCarriers();
      setTransporters(response.data || []);
      setError(null);
    } catch (err) {
      setError("Error al cargar los transportadores");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTransporterCreated = () => {
    setShowCreateForm(false);
    loadTransporters();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Gestión de Transportadores
        </h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Transportador
        </button>
      </div>

      {showCreateForm && (
        <CreateTransporter
          onClose={() => setShowCreateForm(false)}
          onTransporterCreated={handleTransporterCreated}
        />
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {transporters.length === 0 ? (
            <div className="text-center py-16">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No hay transportadores registrados
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Crea un nuevo transportador para empezar.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {transporters.map((transporter) => (
                <li key={transporter.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-6 w-6 text-gray-600 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-indigo-600">
                          {transporter.name}
                        </div>
                        <div className="flex items-center mt-1">
                          <Phone className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">
                            {transporter.phone}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                            <Truck className="h-3 w-3 text-gray-500 mr-1" />
                            {transporter.vehicleModel}
                          </div>
                          <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                            <Tag className="h-3 w-3 text-gray-500 mr-1" />
                            {transporter.vehiclePlate}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => {
                          /* Implementar edición */
                        }}
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default TransportersManagement;
