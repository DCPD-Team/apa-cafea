import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';
import { MonthlyPayments } from '@/types/types.ts';

export const useGetMonthlyPaymentsByYear = ({ expenseTypeId, an }: { expenseTypeId: string; an: string }) => {
  return useQuery<MonthlyPayments[]>({
    queryKey: ['luni', expenseTypeId, an],
    queryFn: async () => {
      const { error, data: monthly_payments } = await supabaseClient
        .from('monthly_payments')
        .select()
        .eq('paid', true)
        .eq('expense_type_id', expenseTypeId)
        .eq('target_year', an);

      // console.log(monthly_payments);

      if (error) {
        throw error;
      }
      return monthly_payments;
    },
  });
};
