import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/App.tsx';

export const useGetListaPlatiQuery = () => {
  return useQuery({
    queryKey: ['plati'],
    queryFn: async () => {
      const { data: payments } = await supabaseClient.from('payments').select();
      return payments;
    },
  });
};
