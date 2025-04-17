import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";

// Placeholder para otras páginas
const ServicesPage = () => <div>Página de Servicios</div>;
const CoveragePage = () => <div>Página de Cobertura</div>;
const PricingPage = () => <div>Página de Precios</div>;
const ContactPage = () => <div>Página de Contacto</div>;
const LoginPage = () => <div>Página de Login</div>;
const RegisterPage = () => <div>Página de Registro</div>;
const TrackingPage = () => <div>Página de Rastreo</div>;

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
