import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.SUPABASE_URL || "https://kujcphlqvvaswkmlviyh.supabase.co",
	process.env.SUPABASE_SERVICE_ROLE_KEY ||
		(() => {
			throw new Error("OI Oi supabaseKey is required.");
		})()
);

export default supabase;
