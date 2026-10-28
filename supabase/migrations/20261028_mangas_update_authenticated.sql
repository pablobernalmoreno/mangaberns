-- Allow signed-in users to edit manga entries, matching the existing insert policy.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'mangas'
      AND policyname = 'mangas_update_authenticated'
  ) THEN
    CREATE POLICY mangas_update_authenticated
      ON public.mangas
      FOR UPDATE
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;
