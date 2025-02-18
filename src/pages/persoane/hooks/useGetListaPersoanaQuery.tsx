import { useQuery } from '@tanstack/react-query';
import { Person } from '@/fake-api/fakePaymentApi.ts';
import { supabaseClient } from '@/App.tsx';

export const useGetListaPersoanaQuery = ({ compareFn }: { compareFn?: (a: Person, b: Person) => number }) => {
  return useQuery({
    queryKey: ['persoane'],
    // placeholderData:[],
    queryFn: async () => {
      const { data: persons } = await supabaseClient.from('persons').select();
      return persons;
    },
    // select: (data) => (compareFn ? data?.sort(compareFn) : data),
  });
};
