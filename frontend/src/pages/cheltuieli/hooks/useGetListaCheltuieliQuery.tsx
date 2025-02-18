import { useQuery } from '@tanstack/react-query';
import { getCheltuieli } from '@/fake-api/fakePaymentApi.ts';

export const useGetListaCheltuieliQuery = ({ compareFn }: { compareFn?: (a: any, b: any) => number } = {}) => {
  return useQuery({
    queryKey: ['cheltuieli'],
    queryFn: () => getCheltuieli(compareFn),
  });
}; 