import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetListaContributiiPersoanaQuery = ({ personId }: {
  personId: string
}) => {
  return useQuery({
    queryKey: ['contributiiPersoana', personId],
    // placeholderData:[],
    enabled: !!personId,
    queryFn: async () => {
      const { data: contributii } = await supabaseClient
        .from('wallet_payments')
        .select()
        .eq('person_id', personId);
      return contributii;
    },
  });
};
