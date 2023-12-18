import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://dquewxxgzokwkynmwmtq.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxdWV3eHhnem9rd2t5bm13bXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwOTc3MjEsImV4cCI6MjAxMDY3MzcyMX0.Hwdy6t7b-1v44A3Y6dqydCdCYGIEK1ChpH87T7FNxFI`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
