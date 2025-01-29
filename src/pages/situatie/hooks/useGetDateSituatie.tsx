import { useGetListaPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPersoanaQuery.tsx';
import { compareByName, FakePaymentApi } from '@/fake-api/fakePaymentApi.ts';
import { useQuery } from '@tanstack/react-query';

export const useGetDateSituatie = () => {
  const queryPersoane = useGetListaPersoanaQuery({ compareFn: compareByName });

  const queryPlati = useQuery({
    queryKey: ['plati'],
    queryFn: () => {
      return FakePaymentApi.getAll();
    },
  });
  return {
    queryPersoane,
    queryPlati,
  };
};
