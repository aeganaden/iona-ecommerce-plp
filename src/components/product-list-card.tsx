"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "./product-card";
import { useCartFavorites } from "../contexts/header-navigation-context";
import { Button } from "@headlessui/react";
import { XMarkIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { calculateOriginalPrice } from "@/lib/pricing";

interface ProductListCardProps {
  product: Product;
  quantity?: number;
}

function ProductListCard({ product, quantity }: ProductListCardProps) {
  const { addToCart, decreaseCartItem, removeFromCart } = useCartFavorites();

  const productHref = `/product/${product.id}?category=${encodeURIComponent(
    product.category
  )}`;

  const coverImage =
    product.thumbnail || "https://dummyimage.com/80x80/f5ebe0/2f0e05&text=IONA";

  const hasQuantity = quantity && quantity > 0;

  const formatCurrency = (value: number) => {
    const currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });

    return currencyFormatter.format(value);
  };

  const unitPrice = product.price;
  const originalPrice = calculateOriginalPrice(
    unitPrice,
    product.discountPercentage
  );
  const lineTotal = hasQuantity ? unitPrice * (quantity as number) : unitPrice;

  return (
    <div className="flex items-start gap-3 rounded-xl p-2 hover:bg-red-50 transition">
      <Link
        href={productHref}
        className="relative h-12 w-12 overflow-hidden rounded-lg bg-red-100 shrink-0"
      >
        <Image
          src={coverImage}
          alt={product.title}
          fill
          sizes="48px"
          className="object-cover"
        />
      </Link>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={productHref}>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-amber-950">
                {product.title}
              </p>
              <p className="text-xs text-amber-700 truncate">
                {product.category.replace(/-/g, " ")}
              </p>
            </div>
          </Link>
          {hasQuantity && (
            <Button
              type="button"
              onClick={() => removeFromCart(product.id)}
              className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-amber-950 hover:text-red-600 transition"
              aria-label="Remove item"
            >
              <XMarkIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}
        </div>

        {hasQuantity && (
          <div className="flex items-center justify-between text-sm py-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-amber-950">
                {formatCurrency(unitPrice)}
              </span>
              <span className="text-xs text-amber-600 line-through">
                {formatCurrency(originalPrice)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-xs text-red-600 font-semibold">
                  -{Math.round(product.discountPercentage)}%
                </span>
              )}
            </div>
            <span className="text-sm text-amber-700 font-semibold">
              Total {formatCurrency(lineTotal)}
            </span>
          </div>
        )}

        {hasQuantity && (
          <div className="mt-1 flex items-center gap-2 text-xs">
            <Button
              type="button"
              onClick={() => decreaseCartItem(product.id)}
              className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-amber-900 text-amber-900 hover:bg-red-100"
              aria-label="Decrease quantity"
            >
              <MinusIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <span className="min-w-6 text-center text-sm font-semibold text-amber-900">
              {quantity}
            </span>
            <Button
              type="button"
              onClick={() => addToCart(product)}
              className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-amber-900 text-amber-900 hover:bg-red-100"
              aria-label="Increase quantity"
            >
              <PlusIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductListCard;
