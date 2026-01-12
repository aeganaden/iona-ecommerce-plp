"use client";
import React from "react";
import Image from "next/image";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Product } from "@/components/product-card";

interface ImageGalleryProps {
  product: Product;
}

function ImageGallery({ product }: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = React.useState<string>(
    product.images && product.images.length > 0
      ? product.images[0]
      : product.thumbnail ||
          "https://dummyimage.com/600x750/f5ebe0/2f0e05&text=IONA"
  );
  const [isMainLoading, setIsMainLoading] = React.useState<boolean>(true);
  const [loadedThumbs, setLoadedThumbs] = React.useState<
    Record<string, boolean>
  >({});

  const handleThumbLoaded = (src: string) => {
    setLoadedThumbs((prev) => ({ ...prev, [src]: true }));
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50">
        {isMainLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-amber-100/70">
            <ArrowPathIcon className="h-8 w-8 text-amber-800 animate-spin" />
          </div>
        )}
        <Image
          src={currentImage}
          alt={product.title}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isMainLoading ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
          priority
          onLoadingComplete={() => setIsMainLoading(false)}
        />
        {product.discountPercentage > 0 && (
          <div className="absolute right-4 top-4 rounded-full bg-amber-900 px-3 py-1 text-sm font-bold text-white shadow-lg">
            SAVE {Math.round(product.discountPercentage)}%
          </div>
        )}
      </div>
      {product.images && product.images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {product.images.slice(0, 4).map((image, index) => {
            const isThumbLoaded = loadedThumbs[image];

            return (
              <div
                key={index}
                className="relative aspect-square overflow-hidden cursor-pointer rounded-lg bg-gradient-to-br from-amber-50 to-orange-50"
                onClick={() => {
                  setIsMainLoading(true);
                  setCurrentImage(image);
                }}
              >
                {!isThumbLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-amber-100/70 pointer-events-none">
                    <ArrowPathIcon className="h-5 w-5 text-amber-800 animate-spin" />
                  </div>
                )}
                <Image
                  src={image}
                  alt={`${product.title} - ${index + 1}`}
                  fill
                  className={`object-cover transition-opacity duration-200 ${
                    isThumbLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="(max-width: 768px) 25vw, 100px"
                  loading="lazy"
                  onLoadingComplete={() => handleThumbLoaded(image)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
