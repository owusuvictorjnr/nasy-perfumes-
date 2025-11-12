"use client";

import { formatCurrency } from "@/lib/utils";
import { IProductInput } from "@/types";
import Image from "next/image";

interface ProductCardProps {
  product: IProductInput;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <Image
        src={product.images[0]}
        alt={product.name}
        height={200}
        width={200}
        className="w-full h-40 object-center rounded"
      />

      <h4 className="mt-2 font-medium">{product.name}</h4>
      <p className="text-sm text-shadow-gray-500">{product.description}</p>
      <p className="mt-1 font-bold">{formatCurrency(product.price)}</p>
    </div>
  );
}
