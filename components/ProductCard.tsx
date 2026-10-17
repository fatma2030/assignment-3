import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="h-full">
      <div className="relative aspect-square w-full bg-muted">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover"
        />
      </div>
      <CardHeader className="pb-1">
        <CardTitle>{product.title}</CardTitle>
        <p className="text-xs text-muted-foreground capitalize">{product.category}</p>
      </CardHeader>
      <CardContent className="flex items-center justify-between pb-2">
        <span className="text-lg font-semibold">${product.price}</span>
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          {product.rating}
        </span>
      </CardContent>
      <CardFooter>
        <Link
          href={`/products/${product.id}`}
          className={buttonVariants({ size: "sm", className: "w-full" })}
        >
          View details
        </Link>
      </CardFooter>
    </Card>
  );
}
