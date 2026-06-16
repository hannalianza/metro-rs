"use client";

import Link from "next/link";
import { getProductById, getProductsByCategory, categories } from "@/data/products";
import { addToCart } from "@/data/cart";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { displayName } from "@/lib/displayName";

export default function ProductDetailClient({ id }: { id: string }) {
  const product = getProductById(id);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <p className="mt-2 text-gray-500">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products" className="btn-primary mt-6 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = categories.find((c) => c.slug === product.category)?.name || product.category;
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  function handleAddToCart() {
    addToCart(product!, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      {/* Breadcrumb */}
      <section className="border-b bg-gray-50 py-4">
        <div className="mx-auto max-w-7xl px-4">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-brand-500">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-brand-500">Products</Link>
            <span className="mx-2">/</span>
            <Link href={`/products?category=${product.category}`} className="hover:text-brand-500">{categoryName}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{displayName(product.name)}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Product image */}
            <div className="flex items-center justify-center rounded-lg border bg-gray-100 p-6 overflow-hidden">
              <img
                src={product.image}
                alt={displayName(product.name)}
                className="max-h-96 w-full object-contain"
              />
            </div>

            {/* Product info */}
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-wide text-brand-500">
                {product.brand}
              </p>
              <h1 className="text-3xl font-bold">{displayName(product.name)}</h1>
              <p className="mt-4 text-3xl font-bold text-brand-600">
                ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <p className="mt-6 leading-relaxed text-gray-600">
                {product.description}
              </p>

              {/* Specs */}
              <div className="mt-8">
                <h2 className="mb-3 text-lg font-semibold">Specifications</h2>
                <dl className="divide-y rounded-lg border">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between px-4 py-3 text-sm">
                      <dt className="font-medium text-gray-500">{key}</dt>
                      <dd className="text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Quote actions */}
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={handleAddToCart} className="btn-accent">
                  {added ? "✓ Added to Quote List" : "Add to Quote List"}
                </button>
                <Link href="/contact" className="btn-secondary">
                  Request a Custom Quote
                </Link>
              </div>

              <p className="mt-4 text-xs text-gray-400">
                Free delivery included. Our team will confirm pricing and availability within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="border-t bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-2xl font-bold">Related Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
