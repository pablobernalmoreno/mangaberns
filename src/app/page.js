import supabase from "@/lib/supabase";
import MangaGrid from "@/components/MangaGrid";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: mangas, error } = await supabase
    .from("mangas")
    .select("id, name, image, link, description");

  if (error) throw new Error(error.message);

  return <MangaGrid mangas={mangas ?? []} />;
}

