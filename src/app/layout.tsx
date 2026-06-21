import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Commercial Kitchen Equipment & Restaurant Supplies in Fife, WA | Metro Restaurant Supply",
  description:
    "Shop commercial restaurant equipment, refrigeration, ice machines, and smallwares from top brands like Turbo Air, Atosa, and Winco. Free delivery, expert installation, and warranty — serving the Pacific Northwest from Fife, WA since 1985.",
  keywords: "commercial kitchen equipment, restaurant supply Seattle, restaurant equipment Fife WA, commercial refrigeration, commercial ice machines, Turbo Air, Atosa, Winco, restaurant supply store Tacoma",
  robots: "index, follow, max-image-preview:large",
  alternates: { canonical: "https://www.metrorestaurantsupply.com/" },
  openGraph: {
    type: "website",
    siteName: "Metro Restaurant Supply",
    title: "Commercial Kitchen Equipment & Supplies | Metro Restaurant Supply",
    description: "Commercial-grade restaurant equipment from top brands at affordable prices. Expert installation, warranty, and free local delivery in WA.",
    url: "https://www.metrorestaurantsupply.com/",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  other: {
    "geo.region": "US-WA",
    "geo.placename": "Fife, Washington",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": "https://www.metrorestaurantsupply.com/#store",
  name: "Metro Restaurant Supply",
  description: "Commercial restaurant equipment and supplies dealer serving the Pacific Northwest since 1985.",
  url: "https://www.metrorestaurantsupply.com/",
  telephone: "+1-253-266-9394",
  email: "just4metrors@gmail.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5113 Pacific Highway East, Unit 1B",
    addressLocality: "Fife",
    addressRegion: "WA",
    postalCode: "98424",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 47.2368, longitude: -122.3601 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "16:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "16:00" },
  ],
  areaServed: [
    { "@type": "City", name: "Seattle" },
    { "@type": "City", name: "Tacoma" },
    { "@type": "City", name: "Fife" },
  ],
  brand: [
    { "@type": "Brand", name: "Turbo Air" },
    { "@type": "Brand", name: "Atosa" },
    { "@type": "Brand", name: "Winco" },
    { "@type": "Brand", name: "5Star" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.metrorestaurantsupply.com/" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-34M8FE2VFG" />
    </html>
  );
}
