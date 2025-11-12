import CategoryList from "@/features/products/components/CategoryList";
import { products } from "@/lib/data";

export default function ProductList() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <CategoryList products={products} />
    </main>
  );
}
