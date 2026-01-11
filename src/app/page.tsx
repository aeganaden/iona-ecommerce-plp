import ProductCard, { Product } from "@/components/product-card";

const featuredProduct: Product = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  description:
    "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  category: "Beauty",
  price: 9.99,
  discountPercentage: 10.48,
  rating: 2.56,
  brand: "Essence",
  images: [
    "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
  ],
  thumbnail:
    "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
  reviews: [
    {
      rating: 3,
      comment: "Would not recommend!",
      reviewerName: "Eleanor Collins",
    },
    {
      rating: 4,
      comment: "Very satisfied!",
      reviewerName: "Lucas Gordon",
    },
    {
      rating: 5,
      comment: "Highly impressed!",
      reviewerName: "Eleanor Collins",
    },
  ],
};

const sampleProducts: Product[] = [
  featuredProduct,
  {
    ...featuredProduct,
    id: 2,
    title: "Velvet Bloom Lip Tint",
    category: "Beauty",
    price: 14.5,
    rating: 4.4,
    discountPercentage: 18.2,
  },
  {
    ...featuredProduct,
    id: 3,
    title: "Radiant Glow Serum",
    category: "Skin Care",
    price: 32,
    rating: 4.8,
    discountPercentage: 22.5,
  },
  {
    ...featuredProduct,
    id: 4,
    title: "Celestial Lash Duo",
    category: "Beauty Sets",
    price: 24,
    rating: 4.1,
    discountPercentage: 12,
  },
  {
    ...featuredProduct,
    id: 5,
    title: "Aurora Silk Scrunchies",
    category: "Accessories",
    price: 19.5,
    rating: 4.6,
    discountPercentage: 28,
  },
  {
    ...featuredProduct,
    id: 6,
    title: "Midnight Bloom Eau de Parfum",
    category: "Fragrance",
    price: 58,
    rating: 4.7,
    discountPercentage: 16,
  },
  {
    ...featuredProduct,
    id: 7,
    title: "Saffron Amber Candle",
    category: "Home",
    price: 34,
    rating: 4.5,
    discountPercentage: 20,
  },
  {
    ...featuredProduct,
    id: 8,
    title: "Gilded Petal Hair Mist",
    category: "Hair Care",
    price: 27,
    rating: 4.3,
    discountPercentage: 14,
  },
];

export default function Home() {
  return (
    <section className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {sampleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
