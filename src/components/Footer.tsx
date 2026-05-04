import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-accent-500 text-sm font-bold text-gray-900">
                M
              </div>
              <span className="text-lg font-bold text-gray-900">Metro Restaurant Supply</span>
            </div>
            <p className="text-sm leading-relaxed">
              Commercial-grade restaurant equipment and supplies from top brands at affordable prices. Expert installation, warranty, and free delivery — serving Fife, Tacoma, and Seattle since 1985.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-accent-500">Product Catalog</Link></li>
              <li><Link href="/about" className="hover:text-accent-500">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent-500">Contact</Link></li>
              <li><Link href="/cart" className="hover:text-accent-500">Request a Quote</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products?category=refrigeration" className="hover:text-accent-500">Refrigeration</Link></li>
              <li><Link href="/products?category=cooking-equipment" className="hover:text-accent-500">Cooking Equipment</Link></li>
              <li><Link href="/products?category=prep-tables" className="hover:text-accent-500">Prep Tables</Link></li>
              <li><Link href="/products?category=ice-makers" className="hover:text-accent-500">Commercial Ice Makers</Link></li>
              <li><Link href="/products?category=food-prep" className="hover:text-accent-500">Food Prep Equipment</Link></li>
              <li><Link href="/products?category=sinks" className="hover:text-accent-500">Sinks</Link></li>
              <li><Link href="/products?category=work-tables" className="hover:text-accent-500">Work Tables & Shelving</Link></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                5113 Pacific Highway East, Unit 1B, Fife, WA 98424
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                (253) 266-9394
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                just4metrors@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Metro Restaurant Supply. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
