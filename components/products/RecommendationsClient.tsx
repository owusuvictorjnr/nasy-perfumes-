"use client";

import React, { useState } from "react";
import { IProductInput } from "@/types";
import ProductCard from "@/features/products/components/ProductCard";

export default function RecommendationsClient({
  recommendations,
  initialCount = 4,
  expandTo = 12,
}: {
  recommendations: IProductInput[];
  initialCount?: number;
  expandTo?: number;
}) {
  const [count, setCount] = useState(initialCount);

  const shown = recommendations.slice(0, count);

  const canShowMore = count < Math.min(recommendations.length, expandTo);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {shown.map((rec) => (
          <ProductCard key={rec.slug} product={rec} />
        ))}
      </div>

      {recommendations.length > count && (
        <div className="mt-4 text-center">
          {canShowMore ? (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() =>
                setCount(Math.min(expandTo, recommendations.length))
              }
            >
              Show more
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
              onClick={() => setCount(initialCount)}
            >
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
}
