import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://drrhonkiqhmpnqhuzvlh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRycmhvbmtpcWhtcG5xaHV6dmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4OTU3NTgsImV4cCI6MjA2MzQ3MTc1OH0.E8veK1djbCd0CHinT8soI8oeKnY8BjzlEjR8wzAnwIk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); 
