import { useQuery } from '@tanstack/react-query';
import { ApaSauCafea, Cheltuiala, FakeCheltuialaApi } from '@/fake-api/fakePaymentApi.ts';

export const useGetListaCheltuialaQuery = ({
  an,
  pentru,
  compareFn,
}: {
  an: number;
  pentru: ApaSauCafea;
  compareFn?: (a: Cheltuiala, b: Cheltuiala) => number;
}) => {
  return useQuery({
    queryKey: ['cheltuieli'],
    // placeholderData:[],
    queryFn: () => {
      return FakeCheltuialaApi.getAll();
    },
    select: (data) =>
      (compareFn ? data.sort(compareFn) : data).filter(
        (cheltuiala) => cheltuiala.pentru === pentru && new Date(cheltuiala.data).getFullYear() === an
      ),
  });
};
