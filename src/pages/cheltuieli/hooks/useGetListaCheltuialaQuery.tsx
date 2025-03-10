import { useQuery } from '@tanstack/react-query';
import { ApaSauCafea, Cheltuiala } from '@/types/types.ts';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetListaCheltuialaQuery = ({
  an,
  pentru,
  compareFn,
}: {
  an: number;
  pentru: ApaSauCafea;
  compareFn?: (a: Cheltuiala, b: Cheltuiala) => number;
}) => {
  return useQuery({
    queryKey: ['cheltuieli', pentru, an],
    queryFn: async () => {
      const { error: e, data } = await supabaseClient
        .from('expenses')
        .select()
        .like('what_for', pentru)
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
