import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetListaPlatiQuery = () => {
  return useQuery({
    queryKey: ['plati'],
    queryFn: async () => {
      const { data: payments } = await supabaseClient.from('payments').select();
      return payments;
    },
  });
};
