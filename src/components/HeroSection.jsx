import React from "react";
import { ArrowRight, Truck, Clock, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Hero Content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Envíos rápidos y seguros a cualquier destino
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Simplifica tus envíos con nuestra plataforma intuitiva.
              Seguimiento en tiempo real y las mejores tarifas del mercado.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/login"
                className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium flex items-center justify-center"
              >
                Crear Envío
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/cotizar"
                className="bg-blue-700 border border-white hover:bg-blue-800 px-6 py-3 rounded-lg font-medium flex items-center justify-center"
              >
                Cotizar
              </Link>
            </div>
          </div>

          {/* Hero Features */}
          <div className="lg:w-1/2 lg:pl-12">
            <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-filter backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start p-4 rounded-lg bg-white bg-opacity-10">
                  <div className="bg-blue-500 p-2 rounded-md mr-4">
                    <Truck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Entregas Express
                    </h3>
                    <p className="text-blue-300">
                      Envíos en menos de 24 horas a destinos principales
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 rounded-lg bg-white bg-opacity-10">
                  <div className="bg-blue-500 p-2 rounded-md mr-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Seguimiento 24/7
                    </h3>
                    <p className="text-blue-300">
                      Monitorea tus envíos en tiempo real desde cualquier
                      dispositivo
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 rounded-lg bg-white bg-opacity-10">
                  <div className="bg-blue-500 p-2 rounded-md mr-4">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Cobertura Nacional
                    </h3>
                    <p className="text-blue-300">
                      Llegamos a todos los estados y principales ciudades
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 rounded-lg bg-white bg-opacity-10">
                  <div className="bg-blue-500 p-2 rounded-md mr-4">
                    <div className="text-center font-bold">$</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Mejores Precios
                    </h3>
                    <p className="text-blue-300">
                      Tarifas competitivas y transparentes sin cargos ocultos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
