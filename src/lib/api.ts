import { Product } from "@/components/product-card";

const API_BASE_URL = "https://dummyjson.com";

const ALL_CATEGORIES = [
  "womens-dresses",
  "womens-shoes",
  "womens-watches",
  "womens-jewellery",
];

interface APIResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const productPromises = ALL_CATEGORIES.map((category) =>
      getProductsByCategory(category)
    );

    const results = await Promise.all(productPromises);
    const allProducts = results.flat();

    return allProducts;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 },
    });

    const product: Product = await response.json();
    return product;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`,
      {
        next: { revalidate: 3600 },
      }
    );

    const data: APIResponse = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${encodeURIComponent(category)}`,
      {
        next: { revalidate: 3600 },
      }
    );

    const data: APIResponse = await response.json();
    return data.products;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return [];
  }
}

export async function getAllCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      next: { revalidate: 3600 },
    });

    const categories: string[] = await response.json();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
