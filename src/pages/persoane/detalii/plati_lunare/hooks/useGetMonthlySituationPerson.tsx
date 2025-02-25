import { useGetMonthlyPaymentsPerson } from '@/pages/persoane/detalii/plati_lunare/hooks/useGetMonthlyPaymentsPerson.tsx';
import { useGetInactiveMonthsPerson } from '@/pages/persoane/detalii/plati_lunare/hooks/useGetInactiveMonthsPerson.tsx';
import { Months } from '@/types/types.ts';
import { useGetMonths } from '@/hooks/useGetMonths.tsx';

type MonthStatus = {
  active: boolean;
  paid: boolean;
};

function generatePersonMonthlySituation(
  months: Months[]
  // Array of months when user paid
): Record<string, MonthStatus> {
  const defaultStatus: MonthStatus = { active: true, paid: false }; // Default values
  const monthsMap: Record<string, MonthStatus> = {};

  // Iterate over all 12 months (1 to 12)

  return monthsMap;
}

export const useGetMonthlySituationPerson = ({ personId, whatForId }: { personId: string; whatForId: string }) => {
  const { data: queryMonthlyPayments } = useGetMonthlyPaymentsPerson({ personId, whatForId });
  const { data: queryInactiveMonths } = useGetInactiveMonthsPerson({ personId, whatForId });
  const { data: months } = useGetMonths();

  const ceva = months?.map((month) => {
    return {
      month: month,
      paid: !!queryMonthlyPayments?.find((x) => {
        console.log('paid ', x.month_id, month);
        return x.month_id === month.id;
      }),
      inactive: !!queryInactiveMonths?.find((x) => x.month_id === month),
    };
  });

  console.log(ceva);

  return ceva;
};
