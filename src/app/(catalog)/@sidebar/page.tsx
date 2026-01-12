import SidebarFilter from "@/components/sidebar-filter";
import { buildFiltersKey, getCatalogData } from "@/lib/catalog-data";

type SearchParamsPromise = Promise<
    Record<string, string | string[] | undefined>
>;

export default async function HomeSidebar({
    searchParams,
}: {
    searchParams: SearchParamsPromise;
}) {
    const resolvedSearchParams = await searchParams;
    const filtersKey = buildFiltersKey(resolvedSearchParams);
    const { brands } = await getCatalogData(undefined, filtersKey);

    return <SidebarFilter brands={brands} />;
}
