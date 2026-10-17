"use client";

import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ProductCard } from "@/components/ProductCard";
import { Pagination } from "@/components/Pagination";
import {
  ProductGridSkeleton,
  ErrorState,
  EmptyState,
} from "@/components/ProductGridStates";
import { useProducts } from "@/lib/useProducts";
import { useDebouncedValue } from "@/lib/useDebouncedValue";

const LIMIT = 12;

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);

  // Debounce typing so we don't hit the API on every keystroke
  const debouncedSearch = useDebouncedValue(search, 400);

  const { data, isPending, isError, error, refetch, isFetching } = useProducts({
    search: debouncedSearch,
    skip,
    limit: LIMIT,
  });

  function handleSearchChange(value: string) {
    setSearch(value);
    setSkip(0); // reset to first page on a new search
  }

  function handlePageChange(newSkip: number) {
    setSkip(newSkip);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <SearchBar value={search} onChange={handleSearchChange} />
      </div>

      {isPending && <ProductGridSkeleton />}

      {isError && (
        <ErrorState
          message={error instanceof Error ? error.message : "Failed to load products."}
          onRetry={() => refetch()}
        />
      )}

      {!isPending && !isError && data && data.products.length === 0 && (
        <EmptyState query={debouncedSearch} />
      )}

      {!isPending && !isError && data && data.products.length > 0 && (
        <>
          <div
            className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 ${
              isFetching ? "opacity-60 transition-opacity" : ""
            }`}
          >
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination
            skip={skip}
            limit={LIMIT}
            total={data.total}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}
