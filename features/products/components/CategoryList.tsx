"use client";

import ProductCard from "@/features/products/components/ProductCard";
import { IProductInput } from "@/types";

interface CategoryListProps {
  products: IProductInput[];
}

export default function CategoryList({ products }: CategoryListProps) {
  const grouped: Record<string, Record<string, IProductInput[]>> = {};

  products.forEach((p) => {
    if (!grouped[p.category]) grouped[p.category] = {};
    if (!grouped[p.category][p.subcategory])
      grouped[p.category][p.subcategory] = [];
    grouped[p.category][p.subcategory].push(p);
  });
  return (
    <div className="space-y-12">
      {Object.entries(grouped).map(([category, subcategories]) => (
        <div className="" key={category}>
          <h2 className="text-xl font-semibold mb-2">{category}</h2>

          {Object.entries(subcategories).map(([subcategory, items]) => (
            <div className="mb-6" key={subcategory}>
              <h3 className="text-lg font-medium mb-1">{subcategory}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto container">
                {items.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
