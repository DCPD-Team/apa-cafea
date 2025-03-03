import { useQuery } from '@tanstack/react-query';
import { Payment } from '@/types/types.ts';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetListaPlatiPersoanaFilteredQuery = ({ an, expenseTypeId }: { an: number; expenseTypeId: string }) => {
  return useQuery<Payment[]>({
    queryKey: ['plati', expenseTypeId, an],
    queryFn: async () => {
      const { error, data } = await supabaseClient
        .from('payments')
        .select()
        .eq('what_for', expenseTypeId)
        .gte('created_at', `${an}-01-01T00:00:00Z`)
        .lt('created_at', `${an + 1}-01-01T00:00:00Z`);

      if (error) {
        throw error;
      }

      return data;
    },
  });
};
