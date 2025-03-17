import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetMonths = () => {
  return useQuery({
    queryKey: ['luni'],
    queryFn: async () => {
      const { data: luni } = await supabaseClient.from('months').select();
      return luni;
    },
  });
};
