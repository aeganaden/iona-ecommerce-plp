import ProductCard from "@/components/product-card";
import { buildFiltersKey, getCatalogData } from "@/lib/catalog-data";

type SearchParamsPromise = Promise<
    Record<string, string | string[] | undefined>
>;

export default async function Home({
    searchParams,
}: {
    searchParams: SearchParamsPromise;
}) {
    const resolvedSearchParams = await searchParams;
    const filtersKey = buildFiltersKey(resolvedSearchParams);
    const { products } = await getCatalogData(undefined, filtersKey);

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
