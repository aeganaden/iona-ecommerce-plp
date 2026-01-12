"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "../components/product-card";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface HeaderNavigationContextValue {
  cartItems: CartItem[];
  favorites: Product[];
  cartCount: number;
  favoritesCount: number;
  addToCart: (product: Product) => void;
  toggleFavorite: (product: Product) => void;
  decreaseCartItem: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}

const HeaderNavigationContext = createContext<
  HeaderNavigationContextValue | undefined
>(undefined);

export default function HeaderNavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const decreaseCartItem = (productId: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favorites.length;

  const value: HeaderNavigationContextValue = {
    cartItems,
    favorites,
    cartCount,
    favoritesCount,
    addToCart,
    toggleFavorite,
    decreaseCartItem,
    removeFromCart,
  };

  return (
    <HeaderNavigationContext.Provider value={value}>
      {children}
    </HeaderNavigationContext.Provider>
  );
}

export function useCartFavorites() {
  const context = useContext(HeaderNavigationContext);
  if (!context)
    throw Error(
      "useCartFavorites must be used within a HeaderNavigationProvider"
    );
  return context;
}
