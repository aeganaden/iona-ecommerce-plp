"use client";
import { Button } from "@headlessui/react";
import type { MouseEventHandler, ReactNode } from "react";

interface IconButtonProps {
  count?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
}

function IconButton({ count = 0, onClick, icon }: IconButtonProps) {
  const hasItems = typeof count === "number" && count > 0;

  return (
    <Button
      as="button"
      type="button"
      onClick={onClick}
      className="relative cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-950 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 hover:bg-amber-800"
      aria-label="Open shopping cart"
    >
      {icon && icon}
      {hasItems && (
        <span className="absolute -top-1 -right-1 inline-flex min-w-[1.25rem] justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-amber-950 border-2 border-amber-950">
          {count}
        </span>
      )}
    </Button>
  );
}

export default IconButton;
