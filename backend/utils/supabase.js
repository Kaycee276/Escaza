import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.SUPABASE_URL || "https://kujcphlqvvaswkmlviyh.supabase.co",
	process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default supabase;
