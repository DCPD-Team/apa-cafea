import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetExpenseTypes = () => {
  return useQuery({
    queryKey: ['expenseTypes'],
    queryFn: async () => {
      const { data: expenseTypes } = await supabaseClient.from('expense_type').select();
      return expenseTypes;
    },
  });
};
