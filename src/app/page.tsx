import ProductCard from "@/components/product-card";
import { getAllProducts } from "@/lib/api";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <section className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
