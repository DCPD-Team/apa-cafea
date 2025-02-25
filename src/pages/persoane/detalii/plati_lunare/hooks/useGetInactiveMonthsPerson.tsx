import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetInactiveMonthsPerson = ({ personId, whatForId }: { personId: string; whatForId: string }) => {
  return useQuery({
    queryKey: ['luni_inactive', whatForId, personId],
    queryFn: async () => {
      const { data: inactive_months } = await supabaseClient
        .from('inactive_months')
        .select()
        .eq('person_id', personId)
        .eq('what_for_id', whatForId);
      return inactive_months;
    },
  });
};
