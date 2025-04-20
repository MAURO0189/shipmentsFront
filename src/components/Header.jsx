import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Package, User } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">
              Express<span className="text-blue-600">Ship</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Inicio
            </Link>
            <Link
              to="/servicios"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Servicios
            </Link>
            <Link
              to="/cobertura"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Cobertura
            </Link>
            <Link
              to="/adminLogin"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Acceso Administrativo
            </Link>
            <Link
              to="/contacto"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Contacto
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 flex items-center"
            >
              <User className="mr-1 h-5 w-5" />
              Ingresar
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Registrarse
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            <Link
              to="/"
              className="block text-gray-700 hover:text-blue-600 font-medium py-2"
            >
              Inicio
            </Link>
            <Link
              to="/servicios"
              className="block text-gray-700 hover:text-blue-600 font-medium py-2"
            >
              Servicios
            </Link>
            <Link
              to="/cobertura"
              className="block text-gray-700 hover:text-blue-600 font-medium py-2"
            >
              Cobertura
            </Link>
            <Link
              to="/precios"
              className="block text-gray-700 hover:text-blue-600 font-medium py-2"
            >
              Precios
            </Link>
            <Link
              to="/contacto"
              className="block text-gray-700 hover:text-blue-600 font-medium py-2"
            >
              Contacto
            </Link>
            <div className="pt-2 flex flex-col space-y-3">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 flex items-center"
              >
                <User className="mr-1 h-5 w-5" />
                Ingresar
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Registrarse
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
