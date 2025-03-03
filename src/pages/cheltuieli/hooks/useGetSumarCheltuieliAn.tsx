import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetSumarCheltuieliAn = ({ an, expenseTypeId }: { an: number; expenseTypeId: string }) => {
  return useQuery({
    queryKey: ['expenses', an, expenseTypeId],
    queryFn: async () => {
      const { error, data } = await supabaseClient
        .from('expenses')
        .select()
        .eq('year', an)
        .eq('expense_type_id', expenseTypeId);

      if (error) throw error;

      // console.log(data);

      return data;
    },
  });
};
