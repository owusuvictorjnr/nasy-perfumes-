"use client";

import { Hero } from "@/app/(frontend)/shared/components/Hero";
import ProductList from "@/app/(frontend)/shop/page";

export default function Homepage() {
  return (
    <div className="text-center min-h-screen w-full">
      {/* Hero Carousel */}
      <div className="">
        <Hero />
      </div>

      {/* Featured Products */}
      <div className="">
        <ProductList />
      </div>
    </div>
  );
}
