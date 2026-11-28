"use client";

import { useState } from "react";
import HeaderHero from "@/components/HeaderHero";
// import AboutSection from "@/components/AboutSection";
import SkinKnowledgeSection from "@/components/SkinKnowledgeSection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import SpaceTechSection from "@/components/SpaceTechSection";
import ProductsSection from "@/components/ProductsSection";
import LocationSection from "@/components/LocationSection";
import CeoSection from "@/components/CeoSection";
import Footer from "@/components/Footer";

const BOOKING_URL = "https://xaviaspa.salonhero.vn/dat-lich";

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <>
      <main>
        <HeaderHero cartCount={cartCount} bookingHref={BOOKING_URL} />
        {/* <AboutSection /> */}
        <SkinKnowledgeSection />
        <ServicesSection />
        <ResultsSection bookingHref={BOOKING_URL} />
        <SpaceTechSection bookingHref={BOOKING_URL} />
        <ProductsSection onAddToCart={handleAddToCart} />
        <LocationSection />
        <CeoSection bookingHref={BOOKING_URL} />
      </main>
      <Footer />
    </>
  );
}