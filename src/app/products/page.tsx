"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { products, categories, getBrands } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center"><p className="text-gray-400">Loading products...</p></div>}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("name-asc");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setCategory(searchParams.get("category") || "");
    setPage(1);
  }, [searchParams]);

  const brands = getBrands();

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const lower = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower) ||
          p.brand.toLowerCase().includes(lower)
      );
    }

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    if (brand) {
      result = result.filter((p) => p.brand === brand);
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, category, brand, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const activeCategoryName = categories.find((c) => c.slug === category)?.name;

  return (
    <>
      {/* Hero */}
      <section className="border-b bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <nav className="mb-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-accent-500">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Products</span>
            {activeCategoryName && (
              <>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{activeCategoryName}</span>
              </>
            )}
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">
            {activeCategoryName || "All Products"}
          </h1>
          <p className="mt-2 text-gray-500">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="lg:flex lg:gap-8">
            {/* Sidebar Filters */}
            <aside className="mb-8 w-full flex-shrink-0 lg:mb-0 lg:w-64">
              <div className="space-y-6 rounded-lg border bg-white p-5">
                {/* Search */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Search</label>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Category</label>
                  <select
                    value={category}
                    onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Brand</label>
                  <select
                    value={brand}
                    onChange={(e) => { setBrand(e.target.value); setPage(1); }}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="">All Brands</option>
                    {brands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Sort By</label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                  </select>
                </div>

                {/* Clear */}
                {(search || category || brand) && (
                  <button
                    onClick={() => { setSearch(""); setCategory(""); setBrand(""); setPage(1); }}
                    className="w-full text-sm font-medium text-brand-500 hover:text-brand-600"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {paginated.length === 0 ? (
                <div className="rounded-lg border bg-gray-50 py-16 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <p className="mt-4 text-gray-500">No products match your filters.</p>
                  <button
                    onClick={() => { setSearch(""); setCategory(""); setBrand(""); setPage(1); }}
                    className="mt-4 text-sm font-medium text-brand-500 hover:text-brand-600"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {paginated.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-40"
                      >
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`rounded-md px-3 py-1.5 text-sm ${
                            p === page
                              ? "bg-brand-500 text-white"
                              : "border hover:bg-gray-50"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                      <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-40"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
