import { ApaSauCafea, compareByDataCheltuiala } from '@/fake-api/fakePaymentApi.ts';
import { useMemo } from 'react';
import { useGetListaCheltuialaQuery } from '@/pages/cheltuieli/hooks/useGetListaCheltuialaQuery.tsx';
import { useGetListaPlatiPersoanaFilteredQuery } from '@/pages/persoane/hooks/useGetListaPlatiPersoanaFilteredQuery.tsx';

export type TotalPlati = {
  totalDisponibil: number;
  totalCheltuit: number;
};

export const useGetSumarCheltuieli = ({ an, pentru }: { an: number; pentru: ApaSauCafea }) => {
  const platiFiltered = useGetListaPlatiPersoanaFilteredQuery({ an: an, pentru: pentru });

  const plati = useMemo(() => {
    return platiFiltered.data;
  }, [platiFiltered, an, pentru]);

  const cheltuieliFiltered = useGetListaCheltuialaQuery({ an: an, pentru: pentru, compareFn: compareByDataCheltuiala });

  const cheltuieli = useMemo(() => {
    return cheltuieliFiltered.data;
  }, [cheltuieliFiltered, an, pentru]);

  return useMemo(() => {
    if (!plati || !cheltuieli) {
      return { totalDisponibil: 0, totalCheltuit: 0 };
    }

    if (pentru === 'apa') {
      const filtredPaymentsApa = plati.filter((plata) => plata.pentru === 'apa');
      const filtredExpensesApa = cheltuieli.filter((cheltuiala) => cheltuiala.pentru === 'apa');

      const totalPaymentsApa =
        filtredPaymentsApa.length > 0 ? filtredPaymentsApa.reduce((acc, plata) => acc + plata.suma, 0) : 0;
      const totalExpensesApa =
        filtredExpensesApa.length > 0 ? filtredExpensesApa.reduce((acc, expense) => acc + expense.suma, 0) : 0;

      return {
        totalDisponibil: totalPaymentsApa,
        totalCheltuit: totalExpensesApa,
      } as TotalPlati;
    } else {
      const filtredPaymentsCafea = plati.filter((plata) => plata.pentru === 'cafea');
      const filtredExpensesCafea = cheltuieli.filter((cheltuiala) => cheltuiala.pentru === 'cafea');

      const totalPaymentsCafea =
        filtredPaymentsCafea.length > 0 ? filtredPaymentsCafea.reduce((acc, plata) => acc + plata.suma, 0) : 0;
      const totalExpensesCafea =
        filtredExpensesCafea.length > 0 ? filtredExpensesCafea.reduce((acc, expense) => acc + expense.suma, 0) : 0;

      return {
        totalDisponibil: totalPaymentsCafea,
        totalCheltuit: totalExpensesCafea,
      } as TotalPlati;
    }
  }, [cheltuieli, plati, an, pentru]);
};
