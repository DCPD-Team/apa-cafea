import { Luna, LunileAnului, SituatiePersoana } from '@/pages/situatie/components/TabelSituatie.tsx';
import { useMemo } from 'react';
import { useGetListaPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPersoanaQuery.tsx';
import { useQuery } from '@tanstack/react-query';
import { FakePaymentApi } from '@/fake-api/fakePaymentApi.ts';

export const PE_LUNA = 40;

export const useCalculeazaSituatie = ({ an }: { an: number }): SituatiePersoana[] => {
  const { data: persoane } = useGetListaPersoanaQuery();

  const { data: plati } = useQuery({
    queryKey: ['plati'],
    queryFn: () => {
      return FakePaymentApi.getAll();
    },
    select: (data) => data.filter((plata) => new Date(plata.data).getFullYear() === an),
  });

  return useMemo(() => {
    if (!plati) return [];
    if (!persoane) return [];

    const groupedPayments: Record<string, number> = plati.reduce(
      (acc, payment) => {
        if (!acc[payment.userId]) {
          acc[payment.userId] = 0;
        }
        acc[payment.userId] += payment.suma;
        return acc;
      },
      {} as Record<string, number>
    );

    for (const userId in groupedPayments) {
      groupedPayments[userId] = groupedPayments[userId] / PE_LUNA;
    }

    const getSumPerMonth = ({ monthIndex, paidMonths }: { monthIndex: number; paidMonths: number }): number => {
      const index = monthIndex + 1;

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
          laZi: paidMonths >= new Date().getMonth(),
          luni: Object.keys(LunileAnului).reduce(
            (acc, key, monthIndex) => {
              return {
                ...acc,
                [key]: getSumPerMonth({ monthIndex, paidMonths }),
              };
            },
            {} as Record<Luna, number>
          ),
          // luni: {
          //   IANUARIE: paidMonths >= 1 ? 40 : (paidMonths - Math.floor(paidMonths)) * 12,
          //   FEBRUARIE: paidMonths >= 2 ? 40 : (paidMonths - Math.floor(paidMonths)) * 12,
          //   MARTIE: paidMonths >= 3 ? 40 : (paidMonths - Math.floor(paidMonths)) * 12,
          //   APRILIE: paidMonths >= 4 ? 40 : (paidMonths - Math.floor(paidMonths)) * 12,
          //   MAI: paidMonths >= 5 ? 40 : (paidMonths - Math.floor(paidMonths)) * 12,
          //   IUNIE: paidMonths >= 6 ? 40 : (paidMonths - Math.floor(paidMonths)) * 12,
          //   IULIE: paidMonths >= 7 ? 40 : (paidMonths - Math.floor(paidMonths)) * 12,
          //   AUGUST: paidMonths >= 8 ? 40 : (paidMonths - Math.floor(paidMonths)) * 12,
          //   SEPTEMBRIE: paidMonths >= 9 ? 40 : (paidMonths - Math.floor(paidMonths)) * 12,
          //   OCTOMBRIE: paidMonths >= 10 ? 40 : (paidMonths - Math.floor(paidMonths)) * 12,
          //   NOIEMBRIE: paidMonths >= 11 ? 40 : (paidMonths - Math.floor(paidMonths)) * 12,
          //   DECEMBRIE: paidMonths >= 12 ? 40 : (paidMonths - Math.floor(paidMonths)) * 12,
          // },
        } satisfies SituatiePersoana,
      ];
    }, [] as SituatiePersoana[]);
  }, [an, persoane, plati]);
};
