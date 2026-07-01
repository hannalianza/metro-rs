"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import {
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartTotal,
  type CartItem,
} from "@/data/cart";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  useEffect(() => {
    const update = () => setItems(getCart());
    update();
    window.addEventListener("cart-updated", update);
    return () => window.removeEventListener("cart-updated", update);
  }, []);

  const total = getCartTotal(items);

  function handleQuantityChange(productId: string, qty: number) {
    updateQuantity(productId, qty);
    setItems(getCart());
  }

  function handleRemove(productId: string) {
    removeFromCart(productId);
    setItems(getCart());
  }

  function handleSubmitQuote(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "(not provided)");
    const notes = String(data.get("notes") || "(none)");

    const itemLines = items
      .map(
        (item) =>
          `- ${item.product.name} (${item.product.brand}) x${item.quantity} — $${(
            item.product.price * item.quantity
          ).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
      )
      .join("\n");

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      "Requested items:",
      itemLines,
      "",
      `Estimated Total: $${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      "",
      "Notes:",
      notes,
    ].join("\n");

    const mailto = `mailto:just4metrors@gmail.com?subject=${encodeURIComponent(
      `[Website Quote Request] ${name}`
    )}&body=${encodeURIComponent(body)}`;

    // This site is a static export with no backend, so there's no server to
    // receive form submissions. Opening a pre-filled mailto: link is the
    // interim fix so quote requests actually reach us instead of vanishing.
    window.location.href = mailto;
    clearCart();
    setItems([]);
    setQuoteSubmitted(true);
  }

  if (quoteSubmitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <h1 className="mt-6 text-3xl font-bold">Almost done — check your email app</h1>
          <p className="mt-4 text-gray-500">
            Your email app should have opened with your itemized quote request ready to go — just hit Send to reach us. If nothing opened, email us directly at{" "}
            <a href="mailto:just4metrors@gmail.com" className="font-semibold text-brand-600 underline">just4metrors@gmail.com</a>.
          </p>
          <Link href="/products" className="btn-primary mt-8 inline-block">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="border-b bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold text-gray-900">Your Quote List</h1>
          <p className="mt-2 text-gray-500">
            Review your selections and submit a quote request — our team will follow up within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          {items.length === 0 ? (
            <div className="rounded-lg border bg-gray-50 py-16 text-center">
              <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              <h2 className="mt-4 text-xl font-semibold">Your quote list is empty</h2>
              <p className="mt-2 text-gray-500">Browse our catalog to add items to your quote.</p>
              <Link href="/products" className="btn-primary mt-6 inline-block">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="lg:flex lg:gap-10">
              {/* Cart Items */}
              <div className="flex-1">
                <div className="divide-y rounded-lg border bg-white">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-4 sm:p-6">
                      {/* Product thumbnail */}
                      <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded bg-gray-100 overflow-hidden">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-contain p-1"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center sm:gap-4">
                        <div className="flex-1">
                          <Link
                            href={`/products/${item.product.id}`}
                            className="font-semibold text-gray-900 hover:text-brand-500"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-gray-400">{item.product.brand}</p>
                        </div>
                        <div className="mt-2 flex items-center gap-4 sm:mt-0">
                          <div className="flex items-center rounded border">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              className="px-2 py-1 text-sm hover:bg-gray-50"
                            >
                              -
                            </button>
                            <span className="min-w-[2rem] border-x py-1 text-center text-xs">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              className="px-2 py-1 text-sm hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>
                          <span className="min-w-[5rem] text-right font-semibold">
                            ${(item.product.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                          </span>
                          <button
                            onClick={() => handleRemove(item.product.id)}
                            className="text-gray-400 hover:text-red-500"
                            aria-label="Remove item"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote Summary */}
              <div className="mt-8 w-full flex-shrink-0 lg:mt-0 lg:w-96">
                <div className="rounded-lg border bg-white p-6">
                  <h2 className="text-lg font-bold">Quote Summary</h2>
                  <div className="mt-4 space-y-3 border-b pb-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span className="text-gray-500 truncate pr-4">
                          {item.product.name} x{item.quantity}
                        </span>
                        <span className="flex-shrink-0">
                          ${(item.product.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between text-lg font-bold">
                    <span>Estimated Total</span>
                    <span className="text-brand-600">
                      ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-400">
                    Final pricing may vary. Our team will provide an exact quote.
                  </p>

                  {/* Quote form */}
                  <form onSubmit={handleSubmitQuote} className="mt-6 space-y-4 border-t pt-6">
                    <h3 className="font-semibold">Request Your Quote</h3>
                    <div>
                      <label htmlFor="q-name" className="mb-1 block text-xs font-medium text-gray-600">Full Name *</label>
                      <input id="q-name" name="name" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
                    </div>
                    <div>
                      <label htmlFor="q-email" className="mb-1 block text-xs font-medium text-gray-600">Email *</label>
                      <input id="q-email" name="email" type="email" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
                    </div>
                    <div>
                      <label htmlFor="q-phone" className="mb-1 block text-xs font-medium text-gray-600">Phone</label>
                      <input id="q-phone" name="phone" type="tel" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
                    </div>
                    <div>
                      <label htmlFor="q-notes" className="mb-1 block text-xs font-medium text-gray-600">Notes</label>
                      <textarea id="q-notes" name="notes" rows={3} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" placeholder="Any special requirements..." />
                    </div>
                    <button type="submit" className="btn-accent w-full">
                      Submit Quote Request
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
