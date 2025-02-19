import { useQuery } from '@tanstack/react-query';
import { ApaSauCafea } from '@/fake-api/fakePaymentApi.ts';
import { supabaseClient } from '@/App.tsx';

export const useGetListaPlatiPersoanaFilteredQuery = ({ an, pentru }: { an: number; pentru: ApaSauCafea }) => {
  return useQuery({
    queryKey: ['plati'],
    queryFn: async () => {
      const { error, data } = await supabaseClient
        .from('payments')
        .select()
        .eq('what_for', pentru)
        .gte('created_at', `${an}-01-01T00:00:00Z`)
        .lt('created_at', `${an + 1}-01-01T00:00:00Z`);

      if (error) {
        throw error;
      }

      return data;
    },
  });
};