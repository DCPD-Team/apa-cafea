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
    if (payments) {
      if (!expenses) {
        return { totalDisponibil: payments, totalCheltuit: 0 };
      }
    } else {
      if (expenses) {
        return { totalDisponibil: 0, totalCheltuit: expenses };
      } else {
        return { totalDisponibil: 0, totalCheltuit: 0 };
      }
    }
    return { totalCheltuit: expenses, totalDisponibil: payments - expenses };
  }, [expenses, payments, an, expenseTypeId]);
};
