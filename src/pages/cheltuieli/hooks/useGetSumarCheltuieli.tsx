import { ApaSauCafea, FakeCheltuialaApi, FakePaymentApi } from '@/fake-api/fakePaymentApi.ts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { SumarCheltuieli } from '@/pages/cheltuieli/lista/components/SumarCheltuieli.tsx';

export const useGetSumarCheltuieli = ({ an, pentru }: { an: number; pentru: ApaSauCafea }) => {
  const { data: platiApi } = useQuery({
    queryKey: ['plati'],
    queryFn: () => {
      return FakePaymentApi.getAll();
    },
  });

  const plati = useMemo(() => {
    if (!platiApi) {
      return [];
    }
    return platiApi.filter((plata) => new Date(plata.data).getFullYear() === an && plata.pentru === pentru);
  }, [platiApi, an, pentru]);

  const { data: cheltuieliApi } = useQuery({
    queryKey: ['cheltuieli'],
    queryFn: () => {
      return FakeCheltuialaApi.getAll();
    },
  });

  const cheltuieli = useMemo(() => {
    if (!cheltuieliApi) {
      return [];
    }
    return cheltuieliApi.filter(
      (cheltuiala) => new Date(cheltuiala.data).getFullYear() === an && cheltuiala.pentru === pentru
    );
  }, [cheltuieliApi, an, pentru]);

  return useMemo(() => {
    const totalPlati = plati.reduce((acc, curr) => (acc += curr.suma), 0);
    const totalCheltuieli = cheltuieli.reduce((acc, curr) => (acc += curr.suma), 0);
    const totalDisponibil = totalPlati - totalCheltuieli;
    return {
      total: totalPlati,
      totalDisponibil: totalDisponibil,
      totalCheltuit: totalCheltuieli,
    };
  }, [cheltuieli, plati, an, pentru]);
};
