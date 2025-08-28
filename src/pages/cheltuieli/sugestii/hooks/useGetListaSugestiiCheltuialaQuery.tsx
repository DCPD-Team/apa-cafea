import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetListaSugestiiCheltuialaQuery = () => {
  return useQuery({
    queryKey: ['sugestie-cheltuiala'],
    queryFn: async () => {
      const { error: e, data } = await supabaseClient.from('expense_suggestions').select();
      if (e) {
        throw e;
      }
      return data;
    },
  });
};
