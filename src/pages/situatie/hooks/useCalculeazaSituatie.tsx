import { Luna, LunileAnului, SituatiePersoana } from '@/pages/situatie/components/TabelSituatie.tsx';
import { useMemo } from 'react';
import { ApaSauCafea, Payment, Person } from '@/fake-api/fakePaymentApi.ts';

export const PE_LUNA = 40;

export const useCalculeazaSituatie = ({
  platiApi,
  persoane,
  an,
  pentru,
}: {
  persoane: Person[] | undefined;
  platiApi: Payment[] | undefined;
  an: number;
  pentru: ApaSauCafea;
}): SituatiePersoana[] => {
  const plati = useMemo(() => {
    if (!platiApi) {
      return [];
    }
    return platiApi.filter((plata) => new Date(plata.data).getFullYear() === an && plata.pentru === pentru);
  }, [platiApi, an, pentru]);

  return useMemo(() => {
    if (!plati) return [];
    if (!persoane) return [];

    const groupedPayments: Record<string, number> = plati.reduce(
      (acc, payment) => {
        acc[payment.userId] += payment.suma;
        return acc;
      },
      persoane.reduce((acc, curr) => ({ ...acc, [curr.id]: 0 }), {} as Record<string, number>)
    );

    for (const userId in groupedPayments) {
      groupedPayments[userId] = groupedPayments[userId] / PE_LUNA;
    }

    const getSumPerMonth = ({ monthIndex, paidMonths }: { monthIndex: number; paidMonths: number }): number => {
      const index = monthIndex;

      if (paidMonths >= index) {
        if (paidMonths < index + 1) {
          return (paidMonths - Math.floor(paidMonths)) * PE_LUNA;
        }
        return PE_LUNA;
      }
      return 0;
    };

    return Object.entries(groupedPayments).reduce((acc, [userId, paidMonths]) => {
      const persoana = persoane.find((persoana) => persoana.id === userId);
      if (!persoana) return acc;

      return [
        ...acc,
        {
          nume: persoana.nume,
          prenume: persoana.prenume,
          userId,
          laZi: paidMonths >= new Date().getMonth() + 1,
          luni: Object.keys(LunileAnului).reduce(
            (acc, key, monthIndex) => {
              return {
                ...acc,
                [key]: getSumPerMonth({ monthIndex, paidMonths }),
              };
            },
            {} as Record<Luna, number>
          ),
        } satisfies SituatiePersoana,
      ];
    }, [] as SituatiePersoana[]);
  }, [an, persoane, plati]);
};
