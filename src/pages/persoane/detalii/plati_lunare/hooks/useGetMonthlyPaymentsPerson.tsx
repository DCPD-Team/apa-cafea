import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetMonthlyPaymentsPerson = ({
  personId,
  expenseTypeId,
}: {
  personId: string;
  expenseTypeId: string;
}) => {
  return useQuery({
    queryKey: ['luni', expenseTypeId, personId],
    queryFn: async () => {
      const { data: monthly_payments } = await supabaseClient
        .from('monthly_payments')
        .select()
        .eq('person_id', personId)
        .eq('expense_type_id', expenseTypeId);

      console.log(monthly_payments);
      return monthly_payments;
    },
  });
};
