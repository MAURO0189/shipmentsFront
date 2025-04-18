import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserHeader = () => {
  const navigate = useNavigate();
  const name = sessionStorage.getItem("name");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Mi App de Envíos</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm md:text-base">{name}</span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 hover:text-gray-200 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Salir</span>
        </button>
      </div>
    </header>
  );
};

export default UserHeader;
