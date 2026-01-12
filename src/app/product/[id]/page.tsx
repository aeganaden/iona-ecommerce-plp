import { getProductById } from "@/lib/api";
import { notFound } from "next/navigation";
import ImageGallery from "../_components/image-gallery";
import ProductActions from "../_components/product-actions";
import RatingStars from "@/components/ui/rating-stars";

type ParamsPromise = Promise<{ id: string }>;

export default async function ProductPage({
  params,
}: {
  params: ParamsPromise;
}) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    notFound();
  }

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <ImageGallery product={product} />

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-amber-700 uppercase tracking-wide">
              {product.brand}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-amber-950 sm:text-4xl">
              {product.title}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <RatingStars rating={product.rating} />
            <span className="text-sm text-amber-700">
              {product.rating.toFixed(1)} ({product.reviews?.length || 0}{" "}
              reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-amber-950">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-xl text-amber-600 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-amber-950 mb-2">
              Description
            </h2>
            <p className="text-amber-800 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-amber-700">Stock:</span>
            <span
              className={`text-sm font-semibold ${
                (product.stock ?? 0) > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {(product.stock ?? 0) > 0
                ? `${product.stock} available`
                : "Out of stock"}
            </span>
          </div>

          {/* Actions */}
          <ProductActions product={product} />

          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-amber-700">Category:</span>
              <span className="font-medium text-amber-950 capitalize">
                {product.category.replace(/-/g, " ")}
              </span>
            </div>
            {product.warrantyInformation && (
              <div className="flex justify-between text-sm">
                <span className="text-amber-700">Warranty:</span>
                <span className="font-medium text-amber-950">
                  {product.warrantyInformation}
                </span>
              </div>
            )}
            {product.shippingInformation && (
              <div className="flex justify-between text-sm">
                <span className="text-amber-700">Shipping:</span>
                <span className="font-medium text-amber-950">
                  {product.shippingInformation}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
