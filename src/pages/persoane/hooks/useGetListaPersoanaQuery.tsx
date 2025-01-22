import { useQuery } from '@tanstack/react-query';
import { FakePersonApi, Person } from '@/fake-api/fakePaymentApi.ts';

export const useGetListaPersoanaQuery = ({ compareFn }: { compareFn?: (a: Person, b: Person) => number }) => {
  return useQuery({
    queryKey: ['persoane'],
    // placeholderData:[],
    queryFn: () => {
      return FakePersonApi.getAll();
    },
    select: (data) => (compareFn ? data.sort(compareFn) : data),
  });
};
