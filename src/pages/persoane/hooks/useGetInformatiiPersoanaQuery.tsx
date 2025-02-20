import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/App.tsx';

export const useGetInformatiiPersoanaQuery = ({ id }: { id?: string }) => {
  return useQuery({
    enabled: !!id,
    queryKey: ['persoane', id],
    queryFn: async () => {
      if (id) {
        const { data: persons } = await supabaseClient.from('persons').select().eq('id', id).limit(1).single();
        return persons;
      }
    },
  });
};
