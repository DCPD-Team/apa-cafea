import { createClient } from '@supabase/supabase-js';

export const supabaseClient = createClient(
  'https://kmopmydrlvvnuamwgvlq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb3BteWRybHZ2bnVhbXdndmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3ODQ0MDUsImV4cCI6MjA1NTM2MDQwNX0.v0AO1k-29Xim-C5n6rQdyuQ9t_6AicDi2f2LhpnNIMI'
);