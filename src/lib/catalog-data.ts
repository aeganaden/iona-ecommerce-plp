import { cache } from "react";
import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
} from "@/lib/api";

const categorySlugMap: Record<string, string> = {
  dresses: "womens-dresses",
  shoes: "womens-shoes",
  watches: "womens-watches",
  jewelry: "womens-jewellery",
};

type FilterKey = "q" | "minPrice" | "maxPrice" | "sort" | "brands";

type RawSearchParams = Record<string, string | string[] | undefined>;

type Filters = Partial<Record<FilterKey, string>>;

export const buildFiltersKey = (params?: RawSearchParams) => {
  if (!params) {
    return "{}";
  }

  const relevantKeys: FilterKey[] = [
    "q",
    "minPrice",
    "maxPrice",
    "sort",
    "brands",
  ];

  const normalizedEntries = relevantKeys
    .map((key) => {
      const value = params[key];
      if (value === undefined) {
        return undefined;
      }

      if (Array.isArray(value)) {
        return [key, value.join(",")];
      }

      return [key, value];
    })
    .filter((entry): entry is [FilterKey, string] => Boolean(entry));

  return JSON.stringify(Object.fromEntries(normalizedEntries));
};

export const getCatalogData = cache(
  async (slug?: string, filtersKey?: string) => {
    const filters: Filters = filtersKey ? JSON.parse(filtersKey) : {};
    const apiCategory = slug ? categorySlugMap[slug] : undefined;

    if (slug && !apiCategory) {
      return { products: [], brands: [] as string[] };
    }

    // Map sort values to API params
    let sortBy: string | undefined;
    let order: "asc" | "desc" | undefined;

    if (filters.sort === "price-asc") {
      sortBy = "price";
      order = "asc";
    } else if (filters.sort === "price-desc") {
      sortBy = "price";
      order = "desc";
    }

    // Fetch from API with sorting
    let products = filters.q
      ? await searchProducts(filters.q, sortBy, order)
      : apiCategory
      ? await getProductsByCategory(apiCategory, sortBy, order)
      : await getAllProducts(sortBy, order);

    // Filter by category when searching
    if (filters.q && apiCategory) {
      products = products.filter(
        (product) =>
          product.category.toLowerCase() === apiCategory.toLowerCase()
      );
    }

    // Extract brands for filter UI
    const brands = Array.from(
      new Set(products.map((product) => product.brand).filter(Boolean))
    ).sort((a, b) => a.localeCompare(b)) as string[];

    // Client-side price filtering (API doesn't support this)
    const min = filters.minPrice ? Number(filters.minPrice) : 0;
    const max = filters.maxPrice ? Number(filters.maxPrice) : Infinity;

    products = products.filter(
      (product) => product.price >= min && product.price <= max
    );

    // Client-side brand filtering (API doesn't support this)
    if (filters.brands) {
      const selectedBrands = filters.brands.split(",").filter(Boolean);
      if (selectedBrands.length > 0) {
        products = products.filter(
          (product) => product.brand && selectedBrands.includes(product.brand)
        );
      }
    }

    return { products, brands };
  }
);
