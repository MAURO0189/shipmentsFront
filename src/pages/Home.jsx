import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import TrackingSection from "../components/TrackingSection";
import ServicesSection from "../components/ServicesSection";
import StatsSection from "../components/StatsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <TrackingSection />
        <ServicesSection />
        <StatsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
