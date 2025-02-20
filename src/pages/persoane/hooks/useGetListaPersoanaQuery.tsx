import { useQuery } from '@tanstack/react-query';
import { Person } from '@/types/types.ts';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetListaPersoanaQuery = ({ compareFn }: { compareFn?: (a: Person, b: Person) => number }) => {
  return useQuery({
    queryKey: ['persoane'],
    queryFn: async () => {
      const { data: persons } = await supabaseClient.from('persons').select().is('inactivation_date', null);
      return persons;
    },
    select: (data) => (compareFn ? data?.sort(compareFn) : data),
  });
};
