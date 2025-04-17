import React from "react";
import { Link } from "react-router-dom";
import { PackageX } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <PackageX className="h-24 w-24 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-gray-800">
            404 - Página no encontrada
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            La página que estás buscando no existe o ha sido movida.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
