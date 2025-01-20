import { useQuery } from '@tanstack/react-query';
import { FakePaymentApi } from '@/fake-api/fakePaymentApi.ts';

export const useGetListaPlatiPersoanaQuery = ({ id }: { id?: string }) => {
  return useQuery({
    queryKey: ['platiPersoana', id],
    // placeholderData:[],
    enabled: !!id,
    queryFn: () => {
      return FakePaymentApi.getAll();
    },
    select: (data) => data.filter((plata) => plata.userId === id),
  });
};
