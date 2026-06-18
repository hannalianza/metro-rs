"use client";

import Link from "next/link";
import { Product } from "@/data/products";
import { addToCart } from "@/data/cart";
import { displayName } from "@/lib/displayName";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-square flex items-center justify-center bg-gray-100 transition-colors group-hover:bg-gray-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-4"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-brand-500">
          {product.brand}
        </p>
        <Link href={`/products/${product.id}`}>
          <h3 className="mb-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-brand-500 line-clamp-2">
            {displayName(product.name)}
          </h3>
        </Link>
        <p className="mb-4 flex-1 text-xs text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-brand-600">
            ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="rounded-md bg-accent-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-600"
          >
            Add to Quote
          </button>
        </div>
      </div>
    </div>
  );
}
