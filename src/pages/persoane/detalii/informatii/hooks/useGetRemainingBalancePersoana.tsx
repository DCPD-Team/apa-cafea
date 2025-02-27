import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetRemainingBalancePersoana = ({ personId }: { personId: string }) => {
  return useQuery({
    queryKey: ['balance', personId],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('remaining_balance_view')
        .select('person_id, expense_type_id, remaining_balance')
        .eq('person_id', personId); // Filter by person_id

      if (error) {
        console.error('Error fetching remaining balance:', error);
        return null;
      }

      return data;
    },
  });
};
