import React from "react";
import {
  Truck,
  Package,
  Clock,
  Briefcase,
  Building,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

const ServiceCard = ({ icon: Icon, title, description, link }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col h-full">
      <div className="bg-blue-50 p-3 rounded-lg inline-block mb-4">
        <Icon className="h-8 w-8 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <Link
        to={link}
        className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center"
      >
        Saber más
        <svg
          className="w-4 h-4 ml-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M5 12h14M12 5l7 7-7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: Truck,
      title: "Envío Normal",
      description:
        "Entrega de paquetes en 2-3 días hábiles con el mejor precio garantizado.",
      link: "/servicios/normal",
    },
    {
      icon: Clock,
      title: "Express 24h",
      description:
        "Servicio prioritario con entrega garantizada en menos de 24 horas.",
      link: "/servicios/express",
    },
    {
      icon: Package,
      title: "Paquetería Internacional",
      description:
        "Envíos a más de 100 países con seguimiento internacional en tiempo real.",
      link: "/servicios/internacional",
    },
    {
      icon: Building,
      title: "Servicio Corporativo",
      description:
        "Soluciones logísticas personalizadas para empresas con altos volúmenes.",
      link: "/servicios/corporativo",
    },
    {
      icon: Briefcase,
      title: "PYME",
      description:
        "Planes especiales para pequeñas y medianas empresas con tarifas preferenciales.",
      link: "/servicios/pyme",
    },
    {
      icon: ShoppingBag,
      title: "E-commerce",
      description:
        "Integración con tu tienda online y gestión automatizada de envíos.",
      link: "/servicios/ecommerce",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Nuestros Servicios
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Ofrecemos soluciones logísticas adaptadas a tus necesidades, desde
            envíos express hasta servicios especializados para empresas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/servicios"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Ver todos los servicios
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
