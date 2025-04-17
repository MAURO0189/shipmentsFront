import React from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Package className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">
                Express<span className="text-blue-400">Ship</span>
              </span>
            </div>
            <p className="mb-4 text-sm">
              Somos la empresa líder en logística y envíos, ofreciendo
              soluciones integrales para particulares y empresas con la mejor
              tecnología y servicio al cliente.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/servicios"
                  className="hover:text-blue-400 transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  to="/cobertura"
                  className="hover:text-blue-400 transition-colors"
                >
                  Cobertura
                </Link>
              </li>
              <li>
                <Link
                  to="/precios"
                  className="hover:text-blue-400 transition-colors"
                >
                  Precios
                </Link>
              </li>
              <li>
                <Link
                  to="/rastreo"
                  className="hover:text-blue-400 transition-colors"
                >
                  Rastrear Envío
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  className="hover:text-blue-400 transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-blue-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Nuestros Servicios
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/servicios/normal"
                  className="hover:text-blue-400 transition-colors"
                >
                  Envío Normal
                </Link>
              </li>
              <li>
                <Link
                  to="/servicios/express"
                  className="hover:text-blue-400 transition-colors"
                >
                  Express 24h
                </Link>
              </li>
              <li>
                <Link
                  to="/servicios/internacional"
                  className="hover:text-blue-400 transition-colors"
                >
                  Envíos Internacionales
                </Link>
              </li>
              <li>
                <Link
                  to="/servicios/corporativo"
                  className="hover:text-blue-400 transition-colors"
                >
                  Servicios Corporativos
                </Link>
              </li>
              <li>
                <Link
                  to="/servicios/ecommerce"
                  className="hover:text-blue-400 transition-colors"
                >
                  Soluciones E-commerce
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                <span>Av. Principal 1234, Ciudad Central, CP 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-2" />
                <span>+52 (55) 1234 5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                <span>contacto@expressship.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-white mb-2">
                Suscríbete a nuestro newsletter
              </h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="bg-gray-700 text-white px-3 py-2 rounded-l-md flex-grow focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-md"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} ExpressShip. Todos los derechos
            reservados.
          </div>
          <div className="flex space-x-4">
            <Link to="/terminos" className="hover:text-blue-400">
              Términos de Servicio
            </Link>
            <Link to="/privacidad" className="hover:text-blue-400">
              Política de Privacidad
            </Link>
            <Link to="/cookies" className="hover:text-blue-400">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
