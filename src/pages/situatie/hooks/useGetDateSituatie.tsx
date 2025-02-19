import { useGetListaPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPersoanaQuery.tsx';
import { compareByName } from '@/fake-api/fakePaymentApi.ts';
import { useGetListaPlatiQuery } from '@/pages/persoane/hooks/useGetListaPlatiQuery.tsx';

export const useGetDateSituatie = () => {
  const queryPersoane = useGetListaPersoanaQuery({ compareFn: compareByName });

  const queryPlati = useGetListaPlatiQuery();
  return {
    queryPersoane,
    queryPlati,
  };
};
