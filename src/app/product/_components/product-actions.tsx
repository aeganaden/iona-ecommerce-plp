"use client";

import { useState } from "react";
import {
  HeartIcon,
  ShoppingCartIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import type { Product } from "@/components/product-card";
import { useCartFavorites } from "@/contexts/header-navigation-context";

interface ProductActionsProps {
  product: Product;
}

function ProductActions({ product }: ProductActionsProps) {
  const { addToCart, toggleFavorite, favorites } = useCartFavorites();

  const isFavorite = favorites.some((item) => item.id === product.id);

  const [isProductAdded, setIsProductAdded] = useState(false);

  const handleAddToCart = () => {
    if ((product.stock ?? 0) <= 0) return;
    addToCart(product);

    setIsProductAdded(true);
    window.setTimeout(() => {
      setIsProductAdded(false);
    }, 1500);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
  };

  return (
    <div className="flex gap-4 pt-4">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="flex-1 flex items-center cursor-pointer justify-center gap-2 rounded-lg bg-amber-900 px-6 py-4 text-base font-semibold text-white transition hover:bg-amber-800 disabled:bg-red-300 disabled:cursor-not-allowed"
      >
        {isProductAdded ? (
          <>
            <CheckIcon className="h-5 w-5" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingCartIcon className="h-5 w-5" />
            Add to Cart
          </>
        )}
      </button>
      <button
        type="button"
        onClick={handleToggleFavorite}
        className={`flex items-center cursor-pointer justify-center rounded-lg border-2 p-4 transition hover:bg-red-50 ${
          isFavorite
            ? "border-red-500 text-red-600"
            : "border-amber-900 text-amber-900"
        }`}
        aria-pressed={isFavorite}
      >
        {isFavorite ? (
          <HeartIconSolid className="h-6 w-6" />
        ) : (
          <HeartIcon className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}

export default ProductActions;
