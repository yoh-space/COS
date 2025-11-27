import { createClient } from "@supabase/supabase-js";

// Make sure you add these in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);