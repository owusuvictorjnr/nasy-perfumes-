import { products } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT: GALLERY */}
      <div className="lg:col-span-1 flex gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-2 w-20">
          {product.images.map((img, i) => (
            <div
              key={i}
              className="relative w-20 h-20 border rounded-md overflow-hidden"
            >
              <Image
                src={img}
                alt=""
                height={500}
                width={500}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative flex-1 h-[400px] border rounded-lg overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* MIDDLE: PRODUCT INFO */}
      <div className="lg:col-span-1 space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>

        {/* Rating + sold */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="text-yellow-500">⭐ {product.avgRating}</span>
          <span>{product.numReviews} reviews</span>
          <span>{product.numSales.toLocaleString()} sold</span>
        </div>

        {/* Price */}
        <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
          <p className="text-3xl font-bold text-red-600">
            {formatCurrency(product.listPrice)}
          </p>
          {product.listPrice > product.price && (
            <p className="text-sm line-through text-gray-500">
              {formatCurrency(product.price)}
            </p>
          )}
        </div>

        {/* Variants — Sizes */}
        {product.sizes.length > 0 && (
          <div>
            <p className="font-medium mb-2">Available Sizes:</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="border px-4 py-1 rounded hover:bg-gray-100"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Variants — Colors */}
        {product.colors.length > 0 && (
          <div>
            <p className="font-medium mb-2">Colors:</p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <div
                  key={color}
                  title={color}
                  className="w-8 h-8 rounded-full border"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDE: ACTIONS */}
      <div className="lg:col-span-1 border p-4 rounded-lg space-y-6 h-fit">
        <p className="text-lg">
          <span className="font-semibold">Stock:</span>{" "}
          {product.countInStock > 0 ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-yellow-500">Pre-Order</span>
          )}
        </p>

        {/* Quantity */}
        <div>
          <p className="mb-1 font-medium">Quantity:</p>
          <input
            type="number"
            min={1}
            defaultValue={1}
            className="border rounded p-2 w-20"
          />
        </div>

        <button className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700">
          Buy Now
        </button>

        <button className="w-full border py-3 rounded-lg font-medium hover:bg-gray-100">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
