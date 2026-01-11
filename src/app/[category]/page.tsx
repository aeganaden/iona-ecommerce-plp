import ProductCard from "@/components/product-card";
import { getProductsByCategory } from "@/lib/api";

const categoryMap: Record<string, string> = {
  dresses: "womens-dresses",
  shoes: "womens-shoes",
  watches: "womens-watches",
  jewelry: "womens-jewellery",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const apiCategory = categoryMap[category];

  if (!apiCategory) {
    return <div>Category not found</div>;
  }

  const products = await getProductsByCategory(apiCategory);

  return (
    <section className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}