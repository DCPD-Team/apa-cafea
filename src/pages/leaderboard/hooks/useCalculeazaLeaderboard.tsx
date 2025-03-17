import { useMemo } from 'react';
import { useGetListaPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPersoanaQuery.tsx';
import { LocPodiumType, PodiumType } from '@/pages/leaderboard/components/Podium.tsx';
import { useGetMonthlyPaymentsByYear } from '@/pages/persoane/detalii/plati_lunare/hooks/useGetMonthlyPaymentsByYear.tsx';
import { useGetMonthlyPricesByYear } from '@/pages/persoane/detalii/plati_lunare/hooks/useGetMonthlyPricesByYear.tsx';

export const useCalculeazaLeaderboard = ({ expenseTypeId }: { expenseTypeId: string }) => {
  const { data: persoane } = useGetListaPersoanaQuery({});

  // const { data: platiApi } = useGetListaPlatiQuery();
  const { data: plati } = useGetMonthlyPaymentsByYear({ expenseTypeId: expenseTypeId, an: '2025' });

  const { data: monthlyPrices } = useGetMonthlyPricesByYear({ year: 2025 });

  const monthlyPricesFiltered = monthlyPrices?.filter((value) => value.expense_type_id === expenseTypeId);

  // const plati = useMemo(() => {
  //   if (!platiApi) {
  //     return [];
  //   }
  //   return platiApi.filter((plata) => plata.what_for === exppenseTypeId);
  // }, [platiApi, exppenseTypeId]);

  const groupedPayments = useMemo(() => {
    if (!plati?.length || !persoane?.length) return {}; // Ensure data exists

    return plati.reduce(
      (acc, payment) => {
        if (!payment.paid) return acc;

        const price = monthlyPricesFiltered?.find((x) => x.month_id === payment.month_id)?.price_value ?? 0;
        acc[payment.person_id] = (acc[payment.person_id] ?? 0) + price;

        return acc;
      },
      Object.fromEntries(persoane.map((p) => [p.id, 0])) as Record<string, number>
    );
  }, [plati, persoane, monthlyPricesFiltered]);

  return useMemo(() => {
    if (!plati) return;
    if (!persoane) return;

    // const groupedPayments: Record<string, number> = plati.reduce(
    //   (acc, payment) => {
    //     acc[payment.person_id] += payment.;
    //     return acc;
    //   },
    //   persoane.reduce((acc, curr) => ({ ...acc, [curr.id]: 0 }), {} as Record<string, number>)
    // );

    const locPodiumTypes: LocPodiumType[] = Object.entries(groupedPayments).reduce((acc, [userId, valoare]) => {
      const persoana = persoane.find((persoana) => persoana.id === userId);
      if (!persoana) return acc;

      return [
        ...acc,
        {
          nume: persoana.first_name,
          valoare,
        },
      ];
    }, [] as LocPodiumType[]);

    const sortedLocuri = locPodiumTypes.sort((a, b) => b.valoare - a.valoare);

    return {
      buniPlatnici: {
        locul1: sortedLocuri[0],
        locul2: sortedLocuri[1],
        locul3: sortedLocuri[2],
      } satisfies PodiumType,
      restantieri: {
        locul1: sortedLocuri[sortedLocuri.length - 1],
        locul2: sortedLocuri[sortedLocuri.length - 2],
        locul3: sortedLocuri[sortedLocuri.length - 3],
      } satisfies PodiumType,
    };
  }, [persoane, plati]);
};
