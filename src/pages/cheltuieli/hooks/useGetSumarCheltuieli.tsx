import { useMemo } from 'react';
import { useGetSumarPlatiAn } from '@/pages/cheltuieli/hooks/useGetSumarPlatiAn.tsx';
import { useGetSumarCheltuieliAn } from '@/pages/cheltuieli/hooks/useGetSumarCheltuieliAn.tsx';

export const useGetSumarCheltuieli = ({ an, expenseTypeId }: { an: number; expenseTypeId: string }) => {
  //TODO nu se face invalidate as expected, de vazut -> vreau refresh la valori cand se face useAdaugaModificaCheltuialaMutation

  const payments = useGetSumarPlatiAn({ an: an, expenseTypeId: expenseTypeId });

  const expenses = useGetSumarCheltuieliAn({ an: an, expenseTypeId: expenseTypeId }).data?.reduce(
    (acc, value) => acc + value.sum,
    0
  );

  return useMemo(() => {
    if (!payments || !expenses) {
      return { totalDisponibil: 0, totalCheltuit: 0, isLoading: true };
    }

    return { totalCheltuit: expenses, totalDisponibil: payments - expenses, isLoading: false };
  }, [expenses, payments, an, expenseTypeId]);
};
