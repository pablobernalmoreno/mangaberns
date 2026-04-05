-- Supabase/Postgres best-practice migration for `public.mangas`
-- Safe to run multiple times (idempotent checks included).

-- 1) Ensure Row Level Security is enabled.
ALTER TABLE IF EXISTS public.mangas ENABLE ROW LEVEL SECURITY;

-- 2) Ensure uniqueness on link to prevent duplicate entries.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'mangas'
      AND column_name = 'link'
  ) AND NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'mangas_link_unique'
      AND conrelid = 'public.mangas'::regclass
  ) THEN
    ALTER TABLE public.mangas
      ADD CONSTRAINT mangas_link_unique UNIQUE (link);
  END IF;
END $$;

-- 3) Add a secondary index for stable ordered reads (if not already present).
CREATE INDEX IF NOT EXISTS mangas_id_idx ON public.mangas (id);

-- 4) RLS policies.
-- Public read policy.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'mangas'
      AND policyname = 'mangas_select_public'
  ) THEN
    CREATE POLICY mangas_select_public
      ON public.mangas
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

-- Authenticated write policy.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'mangas'
      AND policyname = 'mangas_insert_authenticated'
  ) THEN
    CREATE POLICY mangas_insert_authenticated
      ON public.mangas
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;
