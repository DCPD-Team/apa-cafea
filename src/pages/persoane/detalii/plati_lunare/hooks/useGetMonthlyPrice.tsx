import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetMonthlyPrice = ({
  monthId,
  year,
  expenseTypeId,
}: {
  monthId: string;
  year: number;
  expenseTypeId: string;
}) => {
  return useQuery({
    queryKey: ['monthlyPrice', monthId, year, expenseTypeId],
    queryFn: async () => {
      const { data: price } = await supabaseClient
        .from('monthly_prices')
        .select('price_value')
        .eq('month_id', monthId)
        .eq('year', year)
        .eq('expense_type_id', expenseTypeId)
        .limit(1)
        .single();
      return price;
    },
  });
};
