import { createClient } from '@supabase/supabase-js';

// นำค่ามาจากหน้า Settings > API ใน Supabase Dashboard ของคุณ
const supabaseUrl = 'https://mzyfoyujugsthfsuaiyi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16eWZveXVqdWdzdGhmc3VhaXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5OTk0NzIsImV4cCI6MjA4NzU3NTQ3Mn0.pClyLPUTwYGAKss9RCcQ8BzqcpjY_B87G5_03TCpa9I';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);