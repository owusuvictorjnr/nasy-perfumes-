import Image from "next/image";
import React from "react";

export default function ProductGallery({ images }: { images: string[] }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2 w-20">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative w-20 h-20 border rounded-md overflow-hidden"
          >
            <Image
              src={img}
              alt={`thumb-${i}`}
              height={500}
              width={500}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="relative flex-1 h-[400px] border rounded-lg overflow-hidden">
        <Image
          src={images[0]}
          alt="Product Image"
          height={500}
          width={500}
          className="object-cover"
        />
      </div>
    </div>
  );
}
