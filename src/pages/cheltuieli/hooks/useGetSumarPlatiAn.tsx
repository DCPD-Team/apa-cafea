import { useGetMonthlyPricesByYear } from '@/pages/persoane/detalii/plati_lunare/hooks/useGetMonthlyPricesByYear.tsx';
import { useGetMonthlyPaymentsByYear } from '@/pages/persoane/detalii/plati_lunare/hooks/useGetMonthlyPaymentsByYear.tsx';
import { useMemo } from 'react';

export const useGetSumarPlatiAn = ({ an, expenseTypeId }: { an: number; expenseTypeId: string }) => {
  // const { id: personId } = useParams();
  const { data: monthlyPayments } = useGetMonthlyPaymentsByYear({
    expenseTypeId: expenseTypeId,
    an: an.toString(),
  });

  const { data: prices } = useGetMonthlyPricesByYear({ year: an });

  return useMemo(() => {
    if (!monthlyPayments || !prices) {
      return 0;
    }

    const pricesPaid = monthlyPayments
      .filter((payment) => payment.paid)
      .map((payment) => {
        const price = prices.find(
          (p) =>
            p.month_id === payment.month_id &&
            p.year === payment.target_year &&
            p.expense_type_id === payment.expense_type_id
        );
        return price ? price.price_value : 0;
      });

    console.log(pricesPaid);
    return pricesPaid.length > 0 ? pricesPaid.reduce((acc, value) => (acc ? acc : 0) + (value ? value : 0), 0) : 0;
  }, [monthlyPayments, prices]);
};
