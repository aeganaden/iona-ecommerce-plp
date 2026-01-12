"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IconButton from "./ui/icon-button";
import ProductListCard from "./product-list-card";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useCartFavorites } from "../contexts/header-navigation-context";

const navLinks = [
  { href: "/dresses", label: "Dresses" },
  { href: "/shoes", label: "Shoes" },
  { href: "/watches", label: "Watches" },
  { href: "/jewelry", label: "Jewelry" },
];

function HeaderNavigation() {
  const pathname = usePathname();
  const { cartItems, favorites, cartCount, favoritesCount } =
    useCartFavorites();

  const subtotal = cartItems.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  return (
    <nav className="py-4 px-30 flex items-center justify-between border-b border-gray-300">
      <div className="flex items-center">
        <div className="mr-20">
          <Link
            href="/"
            className={`font-semibold text-xl font-serif cursor-pointer text-amber-950`}
          >
            IONA Marketplace
          </Link>
        </div>
        <div className="flex space-x-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-sans cursor-pointer ${
                pathname === href ? "text-amber-950" : "text-amber-800"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Menu as="div" className="relative">
          <MenuButton as={Fragment}>
            <IconButton
              icon={<ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />}
              count={cartCount}
            />
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 mt-2 w-100 origin-top-right rounded-2xl bg-white py-3 shadow-lg ring-1 ring-black/5 focus:outline-none z-20">
              <div className="px-4 pb-2 text-sm font-semibold text-amber-900">
                Cart
              </div>
              {cartItems.length === 0 ? (
                <div className="px-4 py-3 text-sm text-amber-700">
                  Your cart is empty.
                </div>
              ) : (
                <>
                  <ul className="max-h-80 overflow-y-auto px-2 space-y-1">
                    {cartItems.map(({ product, quantity }) => (
                      <li key={product.id} className="px-1">
                        <ProductListCard
                          product={product}
                          quantity={quantity}
                        />
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 border-t border-gray-200 pt-3 px-4 flex items-center justify-between text-sm font-semibold text-amber-950">
                    <span>Subtotal</span>
                    <span>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 2,
                      }).format(subtotal)}
                    </span>
                  </div>
                </>
              )}
            </MenuItems>
          </Transition>
        </Menu>
        <Menu as="div" className="relative">
          <MenuButton as={Fragment}>
            <IconButton
              icon={<HeartIcon className="h-5 w-5" aria-hidden="true" />}
              count={favoritesCount}
            />
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 mt-2 w-80 origin-top-right rounded-2xl bg-white py-3 shadow-lg ring-1 ring-black/5 focus:outline-none z-20">
              <div className="px-4 pb-2 text-sm font-semibold text-amber-900">
                Favorites
              </div>
              {favorites.length === 0 ? (
                <div className="px-4 py-3 text-sm text-amber-700">
                  You have no favorites yet.
                </div>
              ) : (
                <ul className="max-h-80 overflow-y-auto px-2 space-y-1">
                  {favorites.map((product) => (
                    <li key={product.id} className="px-1">
                      <ProductListCard product={product} />
                    </li>
                  ))}
                </ul>
              )}
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
}

export default HeaderNavigation;
