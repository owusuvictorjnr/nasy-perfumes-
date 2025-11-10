// Copyright 2025 vitech
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IMG1, IMG2, IMG3, IMG4, IMG5, IMG6 } from "@/constant/assets";
import Image from "next/image";

export function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const images = [IMG1, IMG2, IMG3, IMG4, IMG5, IMG6];

  return (
    <div className="w-full flex items-center justify-center py-10">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full md:h-280 h-100  overflow-hidden rounded-none md:rounded">
                <Image
                  src={src}
                  alt={`Perfume ${index + 1}`}
                  className="object-cover brightness-75"
                  fill
                  priority={index === 0}
                />

                {/* Overlay Text */}
                <div className="absolute inset-0 flex flex-col justify-start text-[#ffb703] px-6 mt-8">
                  <h1 className="text-lg md:text-6xl font-bold mb-4 text-start">
                    Discover Nasy Perfumes
                  </h1>

                  <p className="text-lg md:text-xl max-w-xl text-[#e9edc9]">
                    Elegance in Every Scent. Explore our latest collection now!
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex-none" />
      </Carousel>
    </div>
  );
}
