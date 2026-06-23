import { Metadata } from "next";
import { products, getProductById } from "@/data/products";
import { displayName } from "@/lib/displayName";
import ProductDetailClient from "./ProductDetailClient";

const SITE = "https://www.metrorestaurantsupply.com";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const product = getProductById(params.id);
  if (!product) {
    return { title: "Product Not Found | Metro Restaurant Supply" };
  }

  const cleanName = displayName(product.name);
  const title = `${cleanName} | ${product.brand} | Metro Restaurant Supply`;
  const description = product.description.length > 160
    ? `${product.description.slice(0, 157)}...`
    : product.description;
  const url = `${SITE}/products/${product.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: "Metro Restaurant Supply",
      images: [{ url: product.image, alt: cleanName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image],
    },
  };
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    return <ProductDetailClient id={params.id} />;
  }

  const cleanName = displayName(product.name);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: cleanName,
    description: product.description,
    image: product.image,
    sku: product.id,
    mpn: product.id,
    brand: { "@type": "Brand", name: product.brand },
    category: product.subcategory,
    offers: product.price > 0
      ? {
          "@type": "Offer",
          url: `${SITE}/products/${product.id}`,
          price: product.price.toFixed(2),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Metro Restaurant Supply",
            url: SITE,
          },
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailClient id={params.id} />
    </>
  );
}
