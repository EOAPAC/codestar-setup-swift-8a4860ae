CREATE TABLE public.entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  first_name text,
  last_name text,
  company text,
  form_data jsonb NOT NULL DEFAULT '{}',
  lookup_token text NOT NULL DEFAULT encode(gen_random_bytes(24), 'hex'),
  payment_status text NOT NULL DEFAULT 'pending',
  payment_provider text,
  payment_provider_id text,
  hubspot_deal_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.entries TO service_role;
ALTER TABLE public.entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage entries" ON public.entries FOR ALL USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_entries_updated_at BEFORE UPDATE ON public.entries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_entries_lookup_token ON public.entries(lookup_token);
CREATE INDEX idx_entries_email ON public.entries(email);