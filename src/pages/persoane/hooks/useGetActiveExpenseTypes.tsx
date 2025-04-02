import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetActiveExpenseTypes = () => {
  return useQuery({
    queryKey: ['expenseTypes', 'active'],
    queryFn: async () => {
      const { data: expenseTypes } = await supabaseClient.from('expense_type').select().eq('active', true);
      return expenseTypes;
    },
  });
};
