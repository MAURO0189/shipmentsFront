import React, { useState, useEffect } from "react";
import { Filter, Plus, Truck, Package, Calendar, LogOut } from "lucide-react";
import ShipmentRouteFilters from "./ShipmentRouteFilters";
import CreateShipmentRoute from "./CreateShipmentRoute";
import { fetchRoutes, updateRouteStatus } from "../handler/HandlerApi";
import { useNavigate } from "react-router-dom";
import TransportersManagement from "./TransportersManagement";
import RouteDetail from "./RouteDetail";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateRoute, setShowCreateRoute] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("routes");
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      setLoading(true);
      const response = await fetchRoutes();
      setRoutes(response.data || []);
      setError(null);
    } catch (err) {
      setError("Error al cargar rutas de envío.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterApplied = (filteredRoutes) => {
    setRoutes(filteredRoutes);
  };

  const handleRouteCreated = () => {
    setShowCreateRoute(false);
    loadRoutes();
  };

  const handleStatusChange = async (routeId, newStatus) => {
    try {
      await updateRouteStatus(routeId, newStatus);
      loadRoutes();
    } catch (err) {
      setError("Error al actualizar el estado de la ruta.");
      console.error(err);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const getStatusColor = (status) => {
    const statusStyles = {
      completed: "bg-green-100 text-green-800",
      in_progress: "bg-blue-100 text-blue-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return statusStyles[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const filterRoutes = (filterType) => {
    setActiveFilter(filterType);
    loadRoutes();
  };

  const viewRouteDetails = (routeId) => {
    setSelectedRouteId(routeId);
    setActiveTab("routeDetail");
  };

  const backToRoutes = () => {
    setSelectedRouteId(null);
    setActiveTab("routes");
  };

  const renderFilters = () => (
    <div className="mb-6 flex flex-wrap gap-2">
      {["all", "pending", "in_progress", "completed", "cancelled"].map(
        (type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-md ${
              activeFilter === type
                ? {
                    all: "bg-indigo-600 text-white",
                    pending: "bg-yellow-600 text-white",
                    in_progress: "bg-blue-600 text-white",
                    completed: "bg-green-600 text-white",
                    cancelled: "bg-red-600 text-white",
                  }[type]
                : "bg-gray-200"
            }`}
            onClick={() => filterRoutes(type)}
          >
            {type === "all"
              ? "Todas"
              : type === "pending"
              ? "En Espera"
              : type === "in_progress"
              ? "En Progreso"
              : type === "completed"
              ? "Completadas"
              : "Canceladas"}
          </button>
        )
      )}
    </div>
  );

  const renderRoutesList = () => (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      {routes.length === 0 ? (
        <div className="text-center py-16">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No hay rutas disponibles
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Crea una nueva ruta o ajusta los filtros para ver resultados.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {(Array.isArray(routes.data) ? routes.data : routes).map((route) => (
            <li key={route.uuid} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Truck className="h-6 w-6 text-gray-600 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-indigo-600">
                      Ruta #{route.uuid.substring(0, 8)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Envío ID: {route.shipmentId}
                    </div>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">
                        {new Date(route.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                      route.status
                    )}`}
                  >
                    {route.status}
                  </span>
                  <select
                    className="ml-3 border rounded-md text-sm py-1 px-2"
                    value={route.status}
                    onChange={(e) =>
                      handleStatusChange(route.uuid, e.target.value)
                    }
                  >
                    <option value="pending">En espera</option>
                    <option value="in_progress">En Progreso</option>
                    <option value="completed">Completadas</option>
                    <option value="cancelled">Canceladas</option>
                  </select>
                  <button
                    className="ml-3 text-indigo-600 hover:text-indigo-900"
                    onClick={() => viewRouteDetails(route.uuid)}
                  >
                    Detalle
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderContent = () => {
    if (activeTab === "routeDetail" && selectedRouteId) {
      return <RouteDetail routeId={selectedRouteId} onBack={backToRoutes} />;
    }

    if (activeTab === "transporters") {
      return <TransportersManagement />;
    }

    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Gestión de Rutas
          </h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filtrar
            </button>
            <button
              onClick={() => setShowCreateRoute(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Crear Ruta
            </button>
          </div>
        </div>

        {showFilters && (
          <ShipmentRouteFilters
            onClose={() => setShowFilters(false)}
            onFilterApplied={handleFilterApplied}
          />
        )}

        {showCreateRoute && (
          <CreateShipmentRoute
            onClose={() => setShowCreateRoute(false)}
            onRouteCreated={handleRouteCreated}
          />
        )}

        {renderFilters()}

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
          renderRoutesList()
        )}
      </>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="bg-indigo-600 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            Tablero de Administración
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-white hover:text-gray-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Salir</span>
          </button>
        </div>
      </header>

      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("routes")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "routes" || activeTab === "routeDetail"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Rutas
            </button>
            <button
              onClick={() => setActiveTab("transporters")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "transporters"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Transportistas
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
