import Link from "next/link";
import { categories, products } from "@/data/products";

// 4 specific featured products from real Atosa data
const featuredIds = ["rf-002", "ce-003", "im-002", "pt-002"];

// Strip model number prefix ("AGR-10B — ") from display names
function displayName(name: string): string {
  const sep = name.indexOf(" — ");
  return sep !== -1 ? name.slice(sep + 3) : name;
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you offer free delivery on restaurant equipment?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Metro Restaurant Supply offers free local delivery within the greater Tacoma and Seattle metro area on qualifying orders. Contact us for a custom delivery quote on large or heavy equipment outside our standard delivery zone." },
    },
    {
      "@type": "Question",
      name: "What brands of commercial kitchen equipment do you carry?",
      acceptedAnswer: { "@type": "Answer", text: "We carry top commercial foodservice brands including Turbo Air, Atosa, Winco, and 5Star. Our inventory covers refrigeration, cooking equipment, ice machines, prep tables, sinks, work tables, and smallwares." },
    },
    {
      "@type": "Question",
      name: "Do you provide installation for restaurant equipment?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. We provide professional installation for all major equipment, including commercial hoods and walk-in coolers. Our technicians make sure your equipment meets local codes and is ready to use on day one." },
    },
    {
      "@type": "Question",
      name: "Where is Metro Restaurant Supply located?",
      acceptedAnswer: { "@type": "Answer", text: "Our showroom is at 5113 Pacific Highway East, Unit 1B, Fife, WA 98424 — conveniently located between Seattle and Tacoma. We are open Monday through Friday 8am-4:30pm and Saturday 8am-4pm." },
    },
    {
      "@type": "Question",
      name: "What is your warranty policy?",
      acceptedAnswer: { "@type": "Answer", text: "All new equipment is covered by the manufacturer's standard warranty, typically 1 to 3 years depending on the product. Extended warranties are available. Our in-house service team also handles repairs and maintenance." },
    },
    {
      "@type": "Question",
      name: "Do you offer financing for commercial kitchen equipment?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. We partner with trusted lenders to offer flexible financing for qualifying restaurants and foodservice businesses — whether you're opening a new location or upgrading your kitchen." },
    },
  ],
};

export default function HomePage() {
  const featured = featuredIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Announcement Banner */}
      <div className="bg-amber-400 text-gray-900">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-3 text-center text-sm font-medium">
          <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <span>
            We&apos;ve moved! Visit our new showroom at{" "}
            <strong>5113 Pacific Highway East, Unit 1B, Fife, WA 98424</strong>
          </span>
          <Link href="/contact" className="ml-2 inline-flex items-center rounded-full bg-black/10 px-3 py-1 text-xs font-bold hover:bg-black/20 transition-colors">
            Get Directions
            <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Hero — split layout */}
      <section className="hero-bg relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 top-12 h-[520px] w-[520px] rounded-full bg-amber-400/25 blur-3xl" />
          <div className="absolute -left-24 -bottom-20 h-[420px] w-[420px] rounded-full bg-blue-900/10 blur-3xl" />
          <div className="absolute -right-40 top-0 h-full w-[60%] origin-top-right rotate-6 bg-gradient-to-br from-white/60 to-transparent" />
          <div className="hero-deco-dots absolute right-8 top-8 hidden h-40 w-40 opacity-60 md:block" />
          <div className="hero-deco-dots absolute bottom-10 left-12 hidden h-28 w-28 opacity-50 md:block" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24 lg:items-center">

          {/* Left: copy */}
          <div className="lg:col-span-6">
            <div className="eyebrow mb-6">A Fife, WA Family Business · Since 1985</div>
            <h1 className="text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-warm-900 sm:text-5xl lg:text-[4.2rem]">
              Everything your kitchen needs, from{" "}
              <span className="relative inline-block">
                <span className="relative z-10">people who know it.</span>
                <span className="absolute inset-x-0 bottom-1 h-3 bg-amber-300/70 lg:h-4" aria-hidden="true" />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-warm-700">
              Commercial refrigeration, ranges, prep tables, ice machines, sinks, and smallwares from{" "}
              <strong className="font-semibold text-warm-900">Turbo Air, Atosa, Winco, and 5Star</strong> — delivered, installed, and warrantied by our Fife team. The same people who&rsquo;ve helped PNW restaurants open and stay running for forty years.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-accent">Request a Free Quote →</Link>
              <Link href="/products" className="btn-secondary border-gray-300 bg-white text-warm-900 hover:border-amber-600 hover:text-amber-700">Browse Products</Link>
            </div>
          </div>

          {/* Right: product collage */}
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto aspect-[4/5] max-w-md sm:max-w-lg lg:ml-auto lg:max-w-none">
              <div aria-hidden="true" className="absolute inset-x-6 bottom-0 top-10 rounded-[32px] bg-gradient-to-br from-blue-900 to-blue-800" />

              {/* Refrigerator — top left */}
              <figure className="absolute left-0 top-0 w-[62%] overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-xl">
                <div className="product-media flex aspect-[4/5] items-center justify-center p-5">
                  <img src="https://atosausa.com/wp-content/uploads/2023/10/MBF8507GR-1.jpg" alt="Atosa commercial reach-in refrigerator" className="h-full w-auto object-contain" loading="eager" />
                </div>
                <figcaption className="flex items-center justify-between border-t border-warm-200 px-4 py-3">
                  <span className="text-sm font-semibold text-warm-900">Reach-In Refrigerators</span>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800">Atosa</span>
                </figcaption>
              </figure>

              {/* Gas range — middle right */}
              <figure className="absolute right-0 top-[22%] w-[50%] overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-xl">
                <div className="product-media flex aspect-[5/4] items-center justify-center p-4">
                  <img src="https://atosausa.com/wp-content/uploads/2023/10/AGR-10B-1.jpg" alt="Commercial gas range with ten burners" className="h-full w-auto object-contain" loading="eager" />
                </div>
                <figcaption className="flex items-center justify-between border-t border-warm-200 px-3 py-2">
                  <span className="text-xs font-semibold text-warm-900">Gas Ranges</span>
                  <span className="text-[10px] font-semibold text-warm-500">10 burners</span>
                </figcaption>
              </figure>

              {/* Ice machine — bottom left */}
              <figure className="absolute left-[8%] bottom-0 w-[46%] overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-xl">
                <div className="product-media flex aspect-[5/4] items-center justify-center p-4">
                  <img src="https://atosausa.com/wp-content/uploads/2023/10/YR280-AP-161.jpg" alt="Commercial undercounter ice machine" className="h-full w-auto object-contain" loading="eager" />
                </div>
                <figcaption className="flex items-center justify-between border-t border-warm-200 px-3 py-2">
                  <span className="text-xs font-semibold text-warm-900">Ice Machines</span>
                  <span className="text-[10px] font-semibold text-warm-500">283 lb/day</span>
                </figcaption>
              </figure>

              {/* Showroom hours card */}
              <div className="absolute -right-2 bottom-2 hidden w-64 rounded-2xl border border-warm-200 bg-white p-4 shadow-xl sm:block lg:-right-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-warm-500">Visit our showroom</p>
                    <p className="text-sm font-bold leading-tight text-warm-900">Fife, Washington</p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-snug text-warm-700">5113 Pacific Hwy E, Unit 1B</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-warm-700">
                  <svg className="h-3.5 w-3.5 text-warm-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>Mon–Fri 8–4:30 · Sat 8–4</span>
                </div>
              </div>

              {/* Price badge */}
              <div className="absolute right-[-6%] top-[6%] hidden rotate-6 rounded-full border-4 border-amber-400 bg-white px-4 py-3 shadow-xl lg:block">
                <p className="text-[9px] font-bold uppercase tracking-widest text-warm-500">Free</p>
                <p className="-mt-0.5 text-sm font-extrabold text-warm-900">Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-warm-200 bg-white py-8" aria-label="Service highlights">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 lg:grid-cols-4">
          {[
            { icon: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0H21M3.375 14.25h17.25m-17.25 0V4.875c0-.621.504-1.125 1.125-1.125h11.25c.621 0 1.125.504 1.125 1.125v11.25m-18 1.5v-1.5m18-13.5v-1.5", label: "Free Local Delivery", sub: "Seattle & Tacoma metro" },
            { icon: "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743", label: "Expert Installation", sub: "Hoods & walk-in coolers" },
            { icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z", label: "Warranty Included", sub: "On all new equipment" },
            { icon: "M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016 2.993 2.993 0 0 0 2.25-1.016 3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z", label: "Fife Showroom", sub: "Open Mon–Sat" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 rounded-xl border border-warm-200 bg-warm-50 px-5 py-4">
              <svg className="h-8 w-8 flex-shrink-0 text-blue-800" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <div>
                <p className="text-sm font-bold text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-warm-100 py-16" aria-labelledby="categories-heading">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-amber-500">Shop by Category</p>
          <h2 id="categories-heading" className="mb-2 text-center text-3xl font-bold text-warm-900">Commercial Kitchen Equipment Categories</h2>
          <p className="mb-10 text-center text-gray-500">Everything your restaurant, bar, deli, or ghost kitchen needs — in one place.</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.filter((cat) => cat.slug !== "work-tables").map((cat) => (
              <Link key={cat.slug} href={`/products?category=${cat.slug}`} className="cat-card group relative overflow-hidden rounded-xl border transition-all hover:shadow-lg">
                <div className="cat-media h-40 overflow-hidden">
                  <img src={cat.image} alt={cat.name} className="h-full w-full object-contain p-4 transition-transform group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-800">{cat.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{cat.description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-800">
                    Shop Now
                    <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-20" aria-labelledby="top-picks-heading">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-amber-500">Featured Products</p>
              <h2 id="top-picks-heading" className="text-3xl font-bold text-warm-900">Featured Products</h2>
              <p className="mt-2 max-w-xl text-gray-500">Best-selling commercial equipment from the brands that restaurant owners in Washington trust most.</p>
            </div>
            <Link href="/products" className="hidden shrink-0 items-center text-sm font-semibold text-blue-800 hover:text-blue-900 sm:inline-flex">
              View all products
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <article key={product.id} className="product-card group flex flex-col overflow-hidden rounded-xl border">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="product-media flex h-56 items-center justify-center p-6">
                    <img src={product.image} alt={displayName(product.name)} className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-blue-800">
                    {product.brand} · {product.subcategory}
                  </p>
                  <h3 className="mb-3 text-[15px] font-semibold leading-snug text-gray-900 line-clamp-2">
                    <Link href={`/products/${product.id}`} className="hover:text-blue-800">{displayName(product.name)}</Link>
                  </h3>
                  <div className="mt-auto flex items-end justify-between pt-2">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">From</p>
                      <p className="text-xl font-bold text-gray-900">${product.price.toLocaleString()}</p>
                    </div>
                    <Link href={`/products/${product.id}`} className="rounded-md bg-blue-800 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-900">
                      Get Quote
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link href="/products" className="btn-primary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Brands We Carry */}
      <section id="brands" className="bg-warm-100 py-20" aria-labelledby="brands-heading">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-amber-500">Brands We Carry</p>
            <h2 id="brands-heading" className="text-3xl font-bold text-gray-900">Top commercial foodservice brands, all under one roof</h2>
            <p className="mt-3 text-gray-500">Metro Restaurant Supply is an authorized dealer for the brands professional kitchens rely on — Turbo Air, Atosa, Winco, and 5Star.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { name: "Turbo Air", logo: "/brands/turbo-air.jpg", tag: "Refrigeration" },
              { name: "Atosa", logo: "/brands/atosa.png", tag: "Refrig. & Cooking" },
              { name: "WinCo", logo: "/brands/winco.png", tag: "Food Prep & Tables" },
              { name: "5 Star", logo: "/brands/5star.png", tag: "Cooking Equipment" },
            ].map((brand) => (
              <Link key={brand.name} href={`/products?brand=${encodeURIComponent(brand.name)}`} className="brand-tile" aria-label={`${brand.name} commercial equipment`}>
                <img src={brand.logo} alt={`${brand.name} logo`} loading="lazy" />
                <span className="brand-tag">{brand.tag}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20" aria-labelledby="why-heading">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            <div className="flex-1">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-amber-600">Why Metro Restaurant Supply</p>
              <h2 id="why-heading" className="mb-4 text-3xl font-extrabold text-gray-900 lg:text-4xl">Built for restaurants, not big-box stores</h2>
              <p className="mb-8 text-base leading-relaxed text-gray-600">
                We specialize exclusively in commercial foodservice equipment. Our team knows what works in a real kitchen — and we back every sale with genuine, local service.
              </p>
              <ul className="mb-8 space-y-4">
                {[
                  "40+ years serving Pacific Northwest restaurants",
                  "Same-day quotes and fast order fulfillment",
                  "In-house service team for repairs & maintenance",
                  "Commercial hood & walk-in cooler installation",
                ].map((point) => (
                  <li key={point} className="flex items-center gap-3 text-gray-700">
                    <svg className="h-5 w-5 flex-shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-accent">Visit Our Showroom →</Link>
            </div>
            <div className="hidden flex-1 lg:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/commercial-kitchen.jpg" alt="Chef cooking on a commercial gas range in a restaurant kitchen" className="h-[32rem] w-full rounded-2xl object-cover shadow-lg" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-warm-100 py-20" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-amber-600">Frequently Asked Questions</p>
            <h2 id="faq-heading" className="mb-3 text-3xl font-extrabold text-gray-900">Got questions? We&apos;ve got answers.</h2>
            <p className="text-gray-500">Everything you need to know about our products, services, and policies.</p>
          </div>
          <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white px-6">
            {[
              { q: "Do you offer free delivery on restaurant equipment?", a: "Yes. Metro Restaurant Supply offers free local delivery within the greater Tacoma and Seattle metro area on qualifying orders. Contact us for a custom delivery quote on large or heavy equipment outside our standard delivery zone." },
              { q: "What brands of commercial kitchen equipment do you carry?", a: "We carry top commercial foodservice brands including Turbo Air, Atosa, Winco, and 5Star. Our inventory covers refrigeration, cooking equipment, ice machines, prep tables, sinks, work tables, and smallwares." },
              { q: "Do you provide installation for restaurant equipment?", a: "Yes. We provide professional installation for all major equipment, including commercial hoods and walk-in coolers. Our technicians make sure your equipment meets local codes and is ready to use on day one." },
              { q: "Where is Metro Restaurant Supply located?", a: "Our showroom is at 5113 Pacific Highway East, Unit 1B, Fife, WA 98424 — conveniently located between Seattle and Tacoma. We're open Monday through Friday 8am–4:30pm and Saturday 8am–4pm." },
              { q: "What is your warranty policy?", a: "All new equipment is covered by the manufacturer's standard warranty, typically 1–3 years depending on the product. Extended warranties are available. Our in-house service team also handles repairs and maintenance." },
              { q: "Do you offer financing for commercial kitchen equipment?", a: "Yes. We partner with trusted lenders to offer flexible financing for qualifying restaurants and foodservice businesses — whether you're opening a new location or upgrading your kitchen." },
            ].map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-gray-900 hover:text-amber-600">
                  {item.q}
                  <svg className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-amber-400">Ready to upgrade your kitchen?</p>
          <h2 className="mb-4 text-3xl font-extrabold text-white lg:text-4xl">Get a free quote for your restaurant</h2>
          <p className="mb-8 text-base leading-relaxed text-gray-400">
            Tell us what you need and our team will put together a custom equipment package — with delivery, installation, and warranty included.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-accent">Request a Free Quote</Link>
            <a href="tel:2532669394" className="btn-secondary border-white text-white hover:bg-white hover:text-gray-900">Call (253) 266-9394</a>
          </div>
        </div>
      </section>
    </>
  );
}
