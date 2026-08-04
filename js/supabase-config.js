/* ==========================================================
   Supabase Config — Cliente para la Iglesia Adventista Telemán
   ========================================================== */

var SUPABASE_URL = "https://bfntxxunwvbyctiwnrpy.supabase.co";
var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmbnR4eHVud3ZieWN0aXducnB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MDY1MjcsImV4cCI6MjEwMTM4MjUyN30.svWPDKXxFC9hiTblQvVSPuqcHk01U5kxOneH5pD0Kn0";

var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
