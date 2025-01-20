import { useQuery } from '@tanstack/react-query';
import { FakePersonApi } from '@/fake-api/fakePaymentApi.ts';

export const useGetListaPersoanaQuery = () => {
  return useQuery({
    queryKey: ['persoane'],
    // placeholderData:[],
    queryFn: () => {
      return FakePersonApi.getAll();
    },
  });
};
