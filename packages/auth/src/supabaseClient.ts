import { createClient } from '@supabase/supabase-js';

function getEnvVar(viteName: string, fallbackName: string): string {
  // Vite injects env vars via import.meta.env at build time
  try {
    const meta = (import.meta as any).env;
    if (meta && meta[viteName]) return meta[viteName];
  } catch {
    // Not in Vite context
  }
  return '';
}

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', 'SUPABASE_URL');
const supabaseKey = getEnvVar('VITE_SUPABASE_ANON_KEY', 'SUPABASE_ANON_KEY');

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not configured — running in demo mode');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
);
