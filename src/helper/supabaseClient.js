import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://uvlxbwjerwtexjcsdzgy.supabase.co";
const supabasrAnonKey = 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2bHhid2plcnd0ZXhqY3Nkemd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMTc1ODEsImV4cCI6MjA4MzY5MzU4MX0.SuB-HEGr5Y4l118Jh5WI5CBrFa67WX2_wr__zhAoRbE";

const supabase = createClient(supabaseUrl, supabasrAnonKey);

export default supabase;