import { getProductById } from "@/lib/api";
import { notFound } from "next/navigation";
import {
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import ImageGallery from "../_components/image-gallery";

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

  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 >= 0.5;
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
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => {
                if (index < fullStars) {
                  return (
                    <StarIconSolid
                      key={index}
                      className="h-5 w-5 text-amber-500"
                    />
                  );
                } else if (index === fullStars && hasHalfStar) {
                  return (
                    <div key={index} className="relative">
                      <StarIcon className="h-5 w-5 text-amber-500" />
                      <StarIconSolid
                        className="absolute left-0 top-0 h-5 w-5 text-amber-500"
                        style={{ clipPath: "inset(0 50% 0 0)" }}
                      />
                    </div>
                  );
                } else {
                  return (
                    <StarIcon key={index} className="h-5 w-5 text-amber-300" />
                  );
                }
              })}
            </div>
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
          <div className="border-t border-amber-200 pt-6">
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
          <div className="flex gap-4 pt-4">
            <button
              disabled={product.stock === 0}
              className="flex-1 flex items-center cursor-pointer justify-center gap-2 rounded-lg bg-amber-900 px-6 py-4 text-base font-semibold text-white transition hover:bg-amber-800 disabled:bg-red-300 disabled:cursor-not-allowed"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              Add to Cart
            </button>
            <button className="flex items-center cursor-pointer justify-center rounded-lg border-2 border-amber-900 p-4 text-amber-900 transition hover:bg-amber-50">
              <HeartIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Additional Info */}
          <div className="border-t border-amber-200 pt-6 space-y-3">
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
