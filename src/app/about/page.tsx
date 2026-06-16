import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Metro Restaurant Supply",
  description:
    "Metro Restaurant Supply — a family-owned Asian American business serving the Pacific Northwest food service community.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-800 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            Family-owned. Community-driven. Proudly serving the Pacific Northwest.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Metro Restaurant Supply is a small, family-owned Asian American
              business based in Fife, Washington. We&apos;ve been serving
              restaurants, cafes, and food service businesses across the Puget
              Sound area for over 10 years.
            </p>
            <p>
              We started this business because we saw a need in our community
              for a restaurant supply partner that was affordable, reliable,
              and easy to work with. That&apos;s still what we do today.
            </p>
            <p>
              We recently moved to a new showroom to better serve our
              customers. Come visit us — we&apos;d love to help you find what
              you need.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">Contact Us</Link>
            <Link href="/products" className="btn-secondary">Browse Products</Link>
          </div>
        </div>
      </section>
    </>
  );
}
