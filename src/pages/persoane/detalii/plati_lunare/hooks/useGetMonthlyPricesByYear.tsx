import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';
import { MonthlyPrices } from '@/types/types.ts';

export const useGetMonthlyPricesByYear = ({ year }: { year: number }) => {
  return useQuery<MonthlyPrices[]>({
    queryKey: ['monthlyPrices', year],
    queryFn: async () => {
      const { error, data: prices } = await supabaseClient.from('monthly_prices').select().eq('year', year);
      if (error) {
        throw error;
      }
      return prices;
    },
  });
};
