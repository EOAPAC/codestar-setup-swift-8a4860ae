import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xgzyqatttynmktqnwwva.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_rWVwXRtktYCQYZi-wlFnCA_TxN81Tcp";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
