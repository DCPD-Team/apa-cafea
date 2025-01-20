import { useQuery } from '@tanstack/react-query';
import { FakePersonApi } from '@/fake-api/fakePaymentApi.ts';

export const useGetInformatiiPersoanaQuery = ({ id }: { id?: string }) => {
  return useQuery({
    enabled: !!id,
    queryKey: ['persoane', id],
    // placeholderData:[],
    queryFn: () => {
      return FakePersonApi.getById(id as string);
    },
  });
};
