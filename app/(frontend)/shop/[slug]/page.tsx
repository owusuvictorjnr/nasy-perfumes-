import { products, reviews } from "@/lib/data";
import ReviewsClient from "@/components/reviews/ReviewsClient";
import RecommendationsClient from "@/components/products/RecommendationsClient";
import AddToCartButton from "@/features/cart/components/AddToCartButton";
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

  // Use product-specific reviews if present, otherwise fall back to global reviews
  const pageReviews =
    product.reviews && product.reviews.length > 0 ? product.reviews : reviews;

  // Recommendations: other products in same category or subcategory (exclude current)
  const recommendations = products
    .filter((p) => p.slug !== product.slug)
    .filter(
      (p) =>
        p.category === product.category || p.subcategory === product.subcategory
    )
    .sort((a, b) => {
      // featured first, then higher rating
      const f = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      if (f !== 0) return f;
      return b.avgRating - a.avgRating;
    })
    .slice(0, 4);

  return (
    <>
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

          <AddToCartButton product={product} />
          <button className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700">
            Buy Now
          </button>
        </div>

        {/* Description */}
        <div className="">
          <h1 className="text-lg font-semibold mb-2">Description</h1>
          {product.description.split("\n").map((para, idx) => (
            <p key={idx} className="mb-4">
              {para}
            </p>
          ))}
        </div>

        <div className="">
          <ReviewsClient reviews={pageReviews} initialCount={3} />
        </div>
        {/* RATING SUMMARY */}
        <div className="mt-1">
          <h2 className="text-xl font-bold mb-4">Ratings Summary</h2>

          <div className="flex gap-10">
            <div className="text-center">
              <h3 className="text-5xl font-bold">
                {product.avgRating.toFixed(1)}
              </h3>
              <p className="text-gray-500">out of 5</p>
              <p className="text-sm text-gray-600 mt-2">
                ({product.numReviews} reviews)
              </p>
            </div>

            <div className="flex-1">
              {product.ratingDistribution.map(({ rating, count }) => {
                const percentage =
                  product.numReviews > 0
                    ? (count / product.numReviews) * 100
                    : 0;

                return (
                  <div key={rating} className="flex items-center mb-2">
                    <span className="w-10">{rating}★</span>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full mx-2">
                      <div
                        className="h-3 bg-yellow-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="w-6 text-sm">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations - bottom of page */}
      {recommendations.length > 0 && (
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-4">You may also like</h2>

          <div>
            <RecommendationsClient
              recommendations={recommendations}
              initialCount={4}
              expandTo={12}
            />
          </div>
        </div>
      )}
    </>
  );
}
