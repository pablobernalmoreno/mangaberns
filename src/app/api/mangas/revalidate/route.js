import { revalidateTag } from "next/cache";
import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { error } = await supabase.auth.getUser(token);

  if (error) {
    return new Response("Unauthorized", { status: 401 });
  }

  revalidateTag("mangas", { expire: 0 });
  return new Response(null, { status: 204 });
}
