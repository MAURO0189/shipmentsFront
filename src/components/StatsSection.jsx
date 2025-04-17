import React from "react";
import { Package, Users, Globe, Award } from "lucide-react";

const StatItem = ({ icon: Icon, value, label }) => {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <Icon className="h-8 w-8 text-blue-600" />
        </div>
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
        {value}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      icon: Package,
      value: "1.2M+",
      label: "Envíos completados",
    },
    {
      icon: Users,
      value: "50K+",
      label: "Clientes satisfechos",
    },
    {
      icon: Globe,
      value: "100+",
      label: "Ciudades de cobertura",
    },
    {
      icon: Award,
      value: "99.8%",
      label: "Entregas a tiempo",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Por qué elegirnos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Somos líderes en el sector de logística con años de experiencia y
            resultados comprobados
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Nuestro Compromiso
              </h3>
              <p className="text-gray-600 mb-6">
                En ExpressShip nos comprometemos a ofrecer el mejor servicio con
                la máxima transparencia y eficiencia. Nuestra misión es
                simplificar la logística para que puedas centrarte en lo
                importante.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Entregas puntuales garantizadas
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Seguimiento en tiempo real de cada envío
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Atención al cliente 24/7
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Seguro incluido en todos los envíos
                  </span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 bg-blue-600 p-8 md:p-12 text-white flex items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">¿Eres una empresa?</h3>
                <p className="mb-6">
                  Descubre nuestras soluciones empresariales diseñadas
                  específicamente para optimizar tu cadena logística y reducir
                  costos operativos.
                </p>
                <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors">
                  Contactar con ventas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
