import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import HomeUser from "../pages/HomeUser";
import Loading from "../components/Loading";
import AdminLogin from "../admin/pages/AdminLogin";
import AdminDashboard from "../admin/components/AdminDashboard";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/adminLogin" element={<AdminLogin />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/homeUser" element={<HomeUser />} />
    </Routes>
  );
};

export default AppRouter;
