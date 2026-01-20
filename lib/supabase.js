import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jxilnpjbhzskovvffqkk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4aWxucGpiaHpza292dmZmcWtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5OTk1NTcsImV4cCI6MjA3NjU3NTU1N30.ajOyIP58w6Q5GcE9BZv8o8urn_bMa_lRJaFEzSTswh8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
