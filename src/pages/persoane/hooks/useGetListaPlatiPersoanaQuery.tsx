import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetListaPlatiPersoanaQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['platiPersoana', id],
    // placeholderData:[],
    enabled: !!id,
    queryFn: async () => {
      const { data: payments } = await supabaseClient.from('payments').select().eq('person_id', id);
      return payments;
    },
  });
};
