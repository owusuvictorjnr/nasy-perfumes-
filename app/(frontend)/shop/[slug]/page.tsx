import { products } from "@/lib/data";
import Image from "next/image";

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{product.name}</h1>

      <Image src={product.images[0]} alt={product.name} className="my-4" />

      <p className="">{product.price}</p>

      {/* TODO! Add to cart button, sizes, colors, etc */}
    </div>
  );
}
