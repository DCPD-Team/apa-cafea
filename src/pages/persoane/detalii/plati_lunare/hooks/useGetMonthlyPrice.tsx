import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetMonthlyPrice = ({ monthId, year }: { monthId: string; year: number }) => {
  return useQuery({
    queryKey: ['monthlyPrice', monthId, year],
    queryFn: async () => {
      const { data: price } = await supabaseClient
        .from('monthly_prices')
        .select('price_value')
        .eq('month_id', monthId)
        .eq('year', year)
        .limit(1)
        .single();
      return price;
    },
  });
};
