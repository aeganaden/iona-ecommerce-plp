"use client";

import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

interface RatingStarsProps {
  rating: number; // 0-5
  size?: "sm" | "md";
}

function RatingStars({ rating, size = "md" }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const iconClassName = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return (
            <StarSolid
              key={index}
              className={`${iconClassName} text-amber-500`}
            />
          );
        }

        if (index === fullStars && hasHalfStar) {
          return (
            <span key={index} className="relative inline-flex">
              <StarOutline className={`${iconClassName} text-amber-500`} />
              <StarSolid
                className={`${iconClassName} text-amber-500 absolute left-0 top-0`}
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
            </span>
          );
        }

        return (
          <StarOutline
            key={index}
            className={`${iconClassName} text-amber-300`}
          />
        );
      })}
    </div>
  );
}

export default RatingStars;
