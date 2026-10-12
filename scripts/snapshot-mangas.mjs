// Saves a copy of the mangas list so the site still has data when the free
// Supabase project is paused. Runs before `next build`; on failure the
// previously committed snapshot is kept.
import { createClient } from "@supabase/supabase-js";
import { mkdir, writeFile } from "node:fs/promises";

const OUT = new URL("../src/data/mangas-snapshot.json", import.meta.url);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.warn("[snapshot] Supabase env vars missing, keeping existing snapshot.");
  process.exit(0);
}

try {
  const { data, error } = await createClient(url, key)
    .from("mangas")
    .select("id, name, image, link, description")
    .not("image", "is", null)
    .not("link", "is", null)
    .neq("image", "")
    .neq("link", "")
    .order("id", { ascending: true })
    .abortSignal(AbortSignal.timeout(10000));

  if (error) throw new Error(error.message);
  if (!data?.length) throw new Error("empty result, not overwriting snapshot");

  await mkdir(new URL("./", OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(data, null, 2) + "\n");
  console.log(`[snapshot] saved ${data.length} mangas`);
} catch (err) {
  console.warn(`[snapshot] Supabase unreachable (${err.message}), keeping existing snapshot.`);
}
