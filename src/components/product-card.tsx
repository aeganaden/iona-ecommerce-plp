"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@headlessui/react";
import {
  HeartIcon,
  ShoppingBagIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import RatingStars from "./ui/rating-stars";
import { useCartFavorites } from "../contexts/header-navigation-context";

export interface ProductReview {
  rating: number;
  comment?: string;
  reviewerName?: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  images?: string[];
  thumbnail?: string;
  brand?: string;
  reviews?: ProductReview[];
  stock?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
}

interface ProductCardProps {
  product: Product;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

import { calculateOriginalPrice } from "@/lib/pricing";

function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleFavorite, favorites } = useCartFavorites();
  const [isProductAdded, setIsProductAdded] = useState(false);

  const productHref = `/product/${product.id}?category=${encodeURIComponent(
    product.category
  )}`;

  const coverImage =
    product.thumbnail ||
    "https://dummyimage.com/600x750/f5ebe0/2f0e05&text=IONA";

  const originalPrice = calculateOriginalPrice(
    product.price,
    product.discountPercentage
  );

  const reviewsCount = product.reviews?.length || 0;
  const isFavorite = favorites.some((item) => item.id === product.id);

  return (
    <Link href={productHref}>
      <article className="group relative isolate flex flex-col gap-6 overflow-hidden rounded-4xl border border-amber-900/15 bg-gradient-to-br from-rose-50 via-white to-orange-50 shadow-[0_35px_60px_-35px_rgba(87,31,9,0.55)] transition duration-300 hover:-translate-y-1">
        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <Image
              src={coverImage}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 400px"
              className="object-cover"
              priority
            />
            <span className="absolute left-4 top-4 rounded-full bg-amber-900 px-4 py-1 text-xs font-semibold uppercase text-white shadow-lg">
              save {Math.round(product.discountPercentage)}%
            </span>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end gap-3 bg-gradient-to-t from-amber-950/80 via-transparent to-transparent px-4 pb-5 opacity-0 transition duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
              <Button
                as="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(product);
                }}
                className={`inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold hover:bg-white/20 ${
                  isFavorite
                    ? "border-red-400 bg-white/20 text-red-100"
                    : "border-white/60 bg-white/10 text-white"
                }`}
              >
                <HeartIcon className="h-4 w-4" aria-hidden="true" />
                {isFavorite ? "Remove as favorite" : "Favorite"}
              </Button>
              <Button
                as="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product);
                  setIsProductAdded(true);
                  setTimeout(() => setIsProductAdded(false), 1500);
                }}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-amber-950 shadow-lg hover:bg-white/90"
              >
                {isProductAdded ? (
                  <>
                    <CheckIcon className="h-4 w-4" aria-hidden="true" />
                    Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingBagIcon className="h-4 w-4" aria-hidden="true" />
                    Add to cart
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between text-xs font-semibold uppercase py-2 cursor-pointer">
            <span className="text-amber-700">
              {product.category.replace(/-/g, " ")}
            </span>
            <span className="text-gray-700">{product.brand}</span>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-semibold text-amber-950 cursor-pointer">
              {product.title}
            </h3>
            <div className="flex items-center gap-3 text-sm text-amber-700">
              <p className="text-lg font-semibold text-amber-950">
                {formatCurrency(product.price)}
              </p>
              <span className="line-through text-amber-600/80">
                {formatCurrency(originalPrice)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex justify-between items-center w-full">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 py-2 text-xs font-semibold text-amber-950">
                <RatingStars rating={product.rating} size="sm" />
                <span>{product.rating.toFixed(2)}</span>
              </span>
              {reviewsCount > 0 && (
                <span className="text-xs text-amber-700">
                  {reviewsCount} review{reviewsCount > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ProductCard;
