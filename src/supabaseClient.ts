import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uycvimwywhzauwkeddpu.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5Y3ZpbXd5d2h6YXV3a2VkZHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjU5NDgsImV4cCI6MjA2MTQ0MTk0OH0.IEud1KXuPwwp8u_GLS8rxU4Nmw-xKme6iM6CcIE02j4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
