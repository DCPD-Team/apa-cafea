import { useQuery } from '@tanstack/react-query';
import { Cheltuiala } from '@/types/types.ts';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetListaCheltuialaQuery = ({
  an,
  expenseTypeId,
  compareFn,
}: {
  an: number;
  expenseTypeId: string;
  compareFn?: (a: Cheltuiala, b: Cheltuiala) => number;
}) => {
  return useQuery({
    queryKey: ['cheltuieli', expenseTypeId, an],
    queryFn: async () => {
      const { error: e, data } = await supabaseClient
        .from('expenses')
        .select()
        .like('expense_type_id', expenseTypeId)
        .gte('created_at', `${an}-01-01T00:00:00Z`)
        .lt('created_at', `${an + 1}-01-01T00:00:00Z`);

      if (e) {
        throw e;
      }
      return data;
    },
    select: (data) => (compareFn ? data.sort(compareFn) : data),
  });
};
