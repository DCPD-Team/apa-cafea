import { useGetListaPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPersoanaQuery.tsx';
import { compareByName } from '@/types/types.ts';

export const useGetDateSituatie = () => {
  const queryPersoane = useGetListaPersoanaQuery({ compareFn: compareByName });

  return {
    queryPersoane,
  };
};
