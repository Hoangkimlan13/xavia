"use client";

import { useState } from "react";
import HeaderHero from "@/components/HeaderHero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import ProductsSection from "@/components/ProductsSection";

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <main>
      <HeaderHero cartCount={cartCount} />
      <AboutSection />
      <ServicesSection />
      <ResultsSection bookingHref="/booking" />
      <ProductsSection onAddToCart={handleAddToCart} />
    </main>
  );
}