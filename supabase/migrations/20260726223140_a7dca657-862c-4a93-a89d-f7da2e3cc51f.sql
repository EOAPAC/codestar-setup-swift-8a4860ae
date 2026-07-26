DROP POLICY IF EXISTS "Service role can manage entries" ON public.entries;

REVOKE ALL ON public.entries FROM anon, authenticated;
GRANT ALL ON public.entries TO service_role;

CREATE POLICY "Service role manages entries"
  ON public.entries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);