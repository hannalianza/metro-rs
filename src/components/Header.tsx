"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { getCart, getCartCount } from "@/data/cart";
import { categories } from "@/data/products";

// Category icons mapped by slug
const categoryIcons: Record<string, string> = {
  "refrigeration": "🧊",
  "cooking-equipment": "🔥",
  "prep-tables": "🥗",
  "ice-makers": "❄️",
  "food-prep": "⚙️",
  "sinks": "🚿",
  "work-tables": "🔩",
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const update = () => setCartCount(getCartCount(getCart()));
    update();
    window.addEventListener("cart-updated", update);
    return () => window.removeEventListener("cart-updated", update);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setProductsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 150);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      {/* Top bar */}
      <div className="bg-gray-100 text-sm text-gray-500">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5">
          <span>(253) 266-9394 &bull; Mon–Fri 8am–4:30pm, Sat 8am–4pm</span>
          <span className="hidden sm:inline">Free Delivery &bull; Expert Installation &bull; Warranty Included</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-500 text-lg font-bold text-gray-900">
            M
          </div>
          <div className="leading-tight">
            <span className="block text-lg font-bold text-gray-900">Metro</span>
            <span className="block text-xs text-gray-500">Restaurant Supply</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-gray-500 transition-colors hover:text-accent-500">
            Home
          </Link>

          {/* Products with dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/products"
              className="flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-accent-500"
            >
              Products
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${productsDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
              </svg>
            </Link>

            {/* Dropdown panel */}
            {productsDropdownOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-[480px] -translate-x-1/2 rounded-xl border border-gray-100 bg-white shadow-xl">
                {/* Arrow */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2">
                  <div className="h-3 w-3 rotate-45 border-l border-t border-gray-100 bg-white" />
                </div>

                <div className="p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Browse by Category
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/products?category=${cat.slug}`}
                        onClick={() => setProductsDropdownOpen(false)}
                        className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-50"
                      >
                        <span className="text-xl">{categoryIcons[cat.slug] ?? "📦"}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-800 group-hover:text-accent-500">
                            {cat.name}
                          </p>
                          <p className="text-xs text-gray-400 line-clamp-1">{cat.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <Link
                      href="/products"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                    >
                      View All Products
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/about" className="text-sm font-medium text-gray-500 transition-colors hover:text-accent-500">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-500 transition-colors hover:text-accent-500">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* Quote List — desktop label */}
          <Link
            href="/cart"
            className="relative hidden items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-accent-500 hover:text-accent-600 md:flex"
          >
            <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
            </svg>
            Quote List
            {cartCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-gray-900">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Quote List — mobile icon only */}
          <Link
            href="/cart"
            className="relative md:hidden text-gray-700 transition-colors hover:text-accent-500"
            aria-label="Quote List"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-[10px] font-bold text-gray-900">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Get a Quote CTA */}
          <Link
            href="/contact"
            className="hidden rounded-md bg-accent-500 px-4 py-2 text-sm font-bold text-gray-900 transition-colors hover:bg-accent-600 md:inline-flex"
          >
            Get a Quote
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-gray-200 bg-white px-4 pb-4 md:hidden">
          <Link
            href="/"
            className="block py-2 text-sm font-medium text-gray-600 hover:text-accent-500"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          {/* Mobile Products accordion */}
          <button
            className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-600 hover:text-accent-500"
            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
          >
            Products
            <svg
              className={`h-4 w-4 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
            </svg>
          </button>
          {mobileProductsOpen && (
            <div className="mb-2 ml-4 space-y-1 border-l-2 border-gray-100 pl-4">
              <Link
                href="/products"
                className="block py-1.5 text-sm font-medium text-accent-500"
                onClick={() => setMobileOpen(false)}
              >
                All Products
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/products?category=${cat.slug}`}
                  className="flex items-center gap-2 py-1.5 text-sm text-gray-500 hover:text-accent-500"
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{categoryIcons[cat.slug] ?? "📦"}</span>
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/about"
            className="block py-2 text-sm font-medium text-gray-600 hover:text-accent-500"
            onClick={() => setMobileOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="block py-2 text-sm font-medium text-gray-600 hover:text-accent-500"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/cart"
            className="mt-2 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700"
            onClick={() => setMobileOpen(false)}
          >
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
              </svg>
              Quote List
            </span>
            {cartCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-gray-900">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      )}
    </header>
  );
}
