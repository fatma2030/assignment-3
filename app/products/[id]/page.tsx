"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Star } from "lucide-react";
import { useProduct } from "@/lib/useProduct";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ProductGridStates";

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: product, isPending, isError, error, refetch } = useProduct(params.id);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Button>

      {isPending && (
        <div className="grid animate-pulse grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="aspect-square rounded-lg bg-muted" />
          <div className="space-y-3">
            <div className="h-6 w-3/4 rounded bg-muted" />
            <div className="h-4 w-1/2 rounded bg-muted" />
            <div className="h-20 w-full rounded bg-muted" />
          </div>
        </div>
      )}

      {isError && (
        <ErrorState
          message={error instanceof Error ? error.message : "Failed to load this product."}
          onRetry={() => refetch()}
        />
      )}

      {product && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div>
            <p className="text-sm uppercase text-muted-foreground">{product.category}</p>
            <h1 className="mt-1 text-2xl font-bold">{product.title}</h1>

            <div className="mt-3 flex items-center gap-4">
              <span className="text-2xl font-semibold">${product.price}</span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {product.rating} rating
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Brand</dt>
                <dd className="font-medium">{product.brand ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Stock</dt>
                <dd className="font-medium">{product.stock}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Discount</dt>
                <dd className="font-medium">{product.discountPercentage}%</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </main>
  );
}
