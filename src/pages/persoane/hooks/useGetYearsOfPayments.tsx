import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';
import { PostgrestError } from '@supabase/supabase-js';

type Return = {
  data: number[];
  status: number;
  statusText: string;
};

export const useGetYearsOfPayments = () => {
  return useQuery<Return, PostgrestError | null>({
    queryKey: ['years'],
    queryFn: async () => {
      const data = await supabaseClient.rpc('get_distinct_years');
      return data;
    },
  });
};
