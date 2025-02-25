import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetMonthlyPaymentsPerson = ({ personId, whatForId }: { personId: string; whatForId: string }) => {
  return useQuery({
    queryKey: ['luni', whatForId, personId],
    queryFn: async () => {
      const { data: monthly_payments } = await supabaseClient
        .from('monthly_payments')
        .select()
        .eq('person_id', personId)
        .eq('expense_type_id', whatForId);
      return monthly_payments;
    },
  });
};
