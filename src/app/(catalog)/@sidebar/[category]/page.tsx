import SidebarFilter from "@/components/sidebar-filter";
import { buildFiltersKey, getCatalogData } from "@/lib/catalog-data";

type ParamsPromise = Promise<{ category: string }>;
type SearchParamsPromise = Promise<
    Record<string, string | string[] | undefined>
>;

export default async function CategorySidebar({
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
    const filtersKey = buildFiltersKey(resolvedSearchParams);
    const { brands } = await getCatalogData(category, filtersKey);

    return <SidebarFilter brands={brands} />;
}
