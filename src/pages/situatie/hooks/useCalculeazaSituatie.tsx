import { MonthlyPayments, Person } from '@/types/types.ts';
import { useMemo } from 'react';
import { Luna, LunileAnului, SituatiePersoana } from '@/pages/situatie/components/TabelSituatie.tsx';
import { useGetMonthlyPricesByYear } from '@/pages/persoane/detalii/plati_lunare/hooks/useGetMonthlyPricesByYear.tsx';

type PaymentData = {
  total: number;
  paidMonths: number;
};

export const useCalculeazaSituatie = ({
  an,
  expenseTypeId,
  persoane,
  platiLunare,
}: {
  an: number;
  expenseTypeId: string;
  persoane: Person[] | undefined | null;
  platiLunare: MonthlyPayments[] | undefined | null;
}) => {
  const { data: monthlyPrices } = useGetMonthlyPricesByYear({ year: an });

  return useMemo(() => {
    if (!platiLunare) return [];
    if (!persoane) return [];

    const monthlyPricesFiltered = monthlyPrices?.filter((value) => value.expense_type_id === expenseTypeId);

    const groupedPayments: Record<string, PaymentData> = platiLunare.reduce(
      (acc, payment) => {
        if (!payment.paid) return acc;
        const price =
          !!monthlyPricesFiltered && monthlyPricesFiltered?.find((x) => x.month_id === payment.month_id)?.price_value;
        acc[payment.person_id].total += price ? price : 0;
        acc[payment.person_id].paidMonths += price ? 1 : 0;
        return acc;
      },
      persoane.reduce(
        (acc, curr) => ({ ...acc, [curr.id]: { total: 0, paidMonths: 0 } }),
        {} as Record<string, PaymentData>
      )
    );
    // console.log(groupedPayments);

    return Object.entries(groupedPayments).reduce((acc, [userId, paidMonths]) => {
      const persoana = persoane.find((persoana) => persoana.id === userId);
      // console.log('paid months', paidMonths);
      // console.log(persoana);
      // console.log(platiLunare);

      console.log(new Date().getMonth() + 1);
      if (!persoana) return acc;

      return [
        ...acc,
        {
          nume: persoana.last_name,
          prenume: persoana.first_name,
          userId,
          laZi: paidMonths.paidMonths >= new Date().getMonth() + 1,
          luni: Object.keys(LunileAnului).reduce(
            (acc, key) => {
              const paidMonth = platiLunare.find(
                (x) => x.month_id === key && persoana.id === x.person_id && x.expense_type_id === expenseTypeId
              )?.paid;

              const priceValue = monthlyPricesFiltered?.find((x) => x.month_id === key)?.price_value;
              return {
                ...acc,
                [key]: paidMonth ? (priceValue ? priceValue : 0) : 0,
              };
            },
            {} as Record<Luna, number>
          ),
        } satisfies SituatiePersoana,
      ];
    }, [] as SituatiePersoana[]);
  }, [an, persoane, platiLunare, expenseTypeId]);
};
