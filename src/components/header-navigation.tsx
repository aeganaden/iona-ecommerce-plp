"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IconButton from "./icon-button";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { HeartIcon } from "@heroicons/react/24/solid";

const navLinks = [
  { href: "/dresses", label: "Dresses" },
  { href: "/shoes", label: "Shoes" },
  { href: "/watches", label: "Watches" },
  { href: "/jewelry", label: "Jewelry" },
];

function HeaderNavigation() {
  const pathname = usePathname();

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
              className={`text-sm font-sans cursor-pointer ${pathname === href ? "text-amber-950" : "text-amber-800"
                }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <IconButton
          icon={<ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />}
          count={2}
        />
        <IconButton
          icon={<HeartIcon className="h-5 w-5" aria-hidden="true" />}
          count={3}
        />
      </div>
    </nav>
  );
}

export default HeaderNavigation;
