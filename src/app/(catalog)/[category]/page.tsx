import ProductCard from "@/components/product-card";
import { buildFiltersKey, getCatalogData } from "@/lib/catalog-data";
import { notFound } from "next/navigation";

type ParamsPromise = Promise<{ category: string }>;
type SearchParamsPromise = Promise<
    Record<string, string | string[] | undefined>
>;

const allowedCategories = new Set([
    "dresses",
    "shoes",
    "watches",
    "jewelry",
]);

export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: ParamsPromise;
    searchParams: SearchParamsPromise;
}) {
    const [{ category }, resolvedSearchParams] = await Promise.all([
        params,
        searchParams,
    ]);

    if (!allowedCategories.has(category)) {
        notFound();
    }

    const filtersKey = buildFiltersKey(resolvedSearchParams);
    const { products } = await getCatalogData(category, filtersKey);

    return (
        <section className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <div className="col-span-full text-center py-12">
                    <p className="text-amber-900">No products found</p>
                </div>
            )}
        </section>
    );
}
