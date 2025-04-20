import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import {
  PackagePlus,
  Search,
  Package,
  Settings,
  Menu,
  X,
  Home,
} from "lucide-react";
import UserHeader from "../components/UserHeader";
import ShipmentForm from "../features/components/ShipmentForm";
import TrackingSection from "../features/components/TrackingSection";
import ShipmentsList from "../features/components/ShipmentsList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { icon: <Home size={20} />, text: "Inicio", path: "/userLayout" },
    {
      icon: <PackagePlus size={20} />,
      text: "Crear Envío",
      path: "/userLayout/create",
    },
    {
      icon: <Search size={20} />,
      text: "Rastrear Envío",
      path: "/userLayout/track",
    },
    {
      icon: <Package size={20} />,
      text: "Mis Envíos",
      path: "/userLayout/shipments",
    },
    {
      icon: <Settings size={20} />,
      text: "Configuración",
      path: "/userLayout/settings",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <UserHeader />

      <div className="flex flex-grow">
        <button
          className="md:hidden fixed top-16 left-4 z-40 p-2 bg-blue-600 text-white rounded-full shadow-lg"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <aside
          className={`
            fixed md:relative z-30 bg-white shadow-lg md:shadow-none
            h-full md:h-auto transition-all duration-300 ease-in-out
            ${isSidebarOpen ? "left-0" : "-left-64 md:left-0"}
            w-64 flex-shrink-0
          `}
        >
          <div className="p-4 h-full">
            <div className="flex items-center justify-center mb-6 mt-4">
              <h2 className="text-xl font-bold text-blue-600">
                Panel de Usuario
              </h2>
            </div>
            <nav>
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        navigate(item.path);
                        if (window.innerWidth < 768) setIsSidebarOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <span className="mr-3 text-blue-500">{item.icon}</span>
                      <span>{item.text}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={toggleSidebar}
          />
        )}
        <main className="flex-grow p-6 md:p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="text-center py-10">
                    <h1 className="text-3xl text-blue-500 font-bold">
                      Bienvenido a Su Panel de Usuario
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg">
                      Accede de forma segura a tus datos de envío, configuración
                      personal y más.
                    </p>
                  </div>
                }
              />
              <Route path="create" element={<ShipmentForm />} />
              <Route path="track" element={<TrackingSection />} />
              <Route path="shipments" element={<ShipmentsList />} />
              <Route
                path="settings"
                element={<div className="text-center py-10">...</div>}
              />
              <Route
                path="/settings"
                element={
                  <div className="text-center py-10">
                    <h2 className="text-2xl font-semibold">Configuración</h2>
                    <p>Ajustes de cuenta y preferencias</p>
                  </div>
                }
              />
            </Routes>
          </div>
        </main>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={3}
      />
    </div>
  );
};

export default UserLayout;
