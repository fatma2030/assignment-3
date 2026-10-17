import { Product, ProductsResponse } from "./types";

const BASE_URL = "https://dummyjson.com";

/**
 * Fetches a paginated (and optionally searched) list of products.
 * - No search term  -> GET /products?limit=&skip=
 * - With search term -> GET /products/search?q=&limit=&skip=
 */
export async function fetchProducts(params: {
  skip: number;
  limit: number;
  search?: string;
}): Promise<ProductsResponse> {
  const { skip, limit, search } = params;

  const endpoint = search && search.trim().length > 0
    ? `${BASE_URL}/products/search?q=${encodeURIComponent(search.trim())}&limit=${limit}&skip=${skip}`
    : `${BASE_URL}/products?limit=${limit}&skip=${skip}`;

  const res = await fetch(endpoint);

  if (!res.ok) {
    throw new Error(`Failed to fetch products (status ${res.status})`);
  }

  return res.json();
}

/**
 * Fetches a single product by its id.
 */
export async function fetchProductById(id: string | number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id} (status ${res.status})`);
  }

  return res.json();
}
