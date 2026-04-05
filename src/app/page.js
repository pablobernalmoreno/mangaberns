import supabase from "@/lib/supabase";
import MangaGrid from "@/components/MangaGrid";
import { cacheLife, cacheTag } from "next/cache";

export const metadata = {
  title: "MangaBerns | My Ongoing Manga Tracker",
  description: "My private tracker for ongoing manga I am currently reading, with direct source links and notes.",
  alternates: {
    canonical: "/",
  },
};

function serializeJsonLd(data) {
  return JSON.stringify(data)
    .replaceAll("<", String.raw`\u003c`)
    .replaceAll(">", String.raw`\u003e`)
    .replaceAll("&", String.raw`\u0026`)
    .replaceAll(String.raw`\u2028`, String.raw`\u2028`)
    .replaceAll(String.raw`\u2029`, String.raw`\u2029`);
}

function sanitizeText(value) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function sanitizeHttpUrl(value) {
  if (typeof value !== "string") return undefined;

  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return undefined;
    }
    return parsed.toString();
  } catch {
    return undefined;
  }
}

async function getMangas() {
  "use cache";
  cacheLife("minutes");
  cacheTag("mangas");

  const { data: mangas, error } = await supabase
    .from("mangas")
    .select("id, name, image, link, description")
    .not("image", "is", null)
    .not("link", "is", null)
    .neq("image", "")
    .neq("link", "")
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);

  return mangas ?? [];
}

export default async function Home() {
  const mangas = await getMangas();
  const siteUrl =
    sanitizeHttpUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
    "https://mangaberns.vercel.app";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "MangaBerns",
    description: "My private tracker for ongoing manga I am currently reading.",
    url: siteUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: mangas.map((manga, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Book",
          name: sanitizeText(manga.name),
          image: sanitizeHttpUrl(manga.image),
          url: sanitizeHttpUrl(manga.link),
          description: sanitizeText(manga.description),
        },
      })),
    },
  };
  const structuredDataJson = serializeJsonLd(structuredData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />
      <MangaGrid mangas={mangas} />
    </>
  );
}

