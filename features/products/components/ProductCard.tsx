"use client";

import { formatCurrency } from "@/lib/utils";
import { IProductInput } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: IProductInput;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount =
    product.listPrice > product.price
      ? Math.round(
          ((product.listPrice - product.price) / product.listPrice) * 100
        )
      : 0;
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="block w-full rounded-md border border-neutral-200 hover:shadow-md transition p-2"
    >
      <div className="relative w-full h-100 z-10">
        <Image
          src={product.images[0]}
          alt={product.name}
          height={500}
          width={500}
          className="w-full h-full object-center rounded"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
            {discount}% OFF
          </span>
        )}

        {product.featured && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            choice
          </span>
        )}

        {product.newArrival && (
          <span className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">
            New
          </span>
        )}
      </div>
      <h4 className="mt-2 font-medium">{product.name}</h4>
      <p className="text-sm text-shadow-gray-500 truncate">
        {product.description}
      </p>
      <p className="mt-1 font-bold">{formatCurrency(product.price)}</p>

      {discount > 0 && (
        <p className="line-through text-gray-500">
          {formatCurrency(product.listPrice)}
        </p>
      )}

      <p className="">
        {product.countInStock > 0 ? (
          <span className="text-green-600 font-semibold">In Stock</span>
        ) : (
          <span className="text-red-600 font-semibold">Out of Stock</span>
        )}
      </p>

      <div className="">
        <span className="">⭐⭐⭐⭐ {product.avgRating}</span>
        <span className="text-gray-500">| {product.numSales} sold</span>
      </div>
    </Link>
  );
}
