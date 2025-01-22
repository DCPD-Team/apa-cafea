import { Luna, LunileAnului, SituatiePersoana } from '@/pages/situatie/components/TabelSituatie.tsx';
import { useMemo } from 'react';
import { useGetListaPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPersoanaQuery.tsx';
import { useQuery } from '@tanstack/react-query';
import { ApaSauCafea, FakePaymentApi } from '@/fake-api/fakePaymentApi.ts';

export const PE_LUNA = 40;

export const useCalculeazaLeaderboard = ({ pentru }: { pentru: ApaSauCafea }): SituatiePersoana[] => {
  const { data: persoane } = useGetListaPersoanaQuery({});

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
    return platiApi.filter((plata) => plata.pentru === pentru);
  }, [platiApi, pentru]);

  return useMemo(() => {
    if (!plati) return [];
    if (!persoane) return [];

    const groupedPayments: Record<string, number> = plati
      .filter((plata) => new Date(plata.data) > new Date())
      .reduce(
        (acc, payment) => {
          acc[payment.userId] += payment.suma;
          return acc;
        },
        persoane.reduce((acc, curr) => ({ ...acc, [curr.id]: 0 }), {} as Record<string, number>)
      );

    Object.entries(groupedPayments).sort((a, b) => a[1] - b[1]);

    const getSumInAvans = ({ monthIndex, paidMonths }: { monthIndex: number; paidMonths: number }): number => {
      const currentDate = new Date();
      const index = monthIndex;

      if (paidMonths >= index) {
        if (paidMonths < index + 1) {
          return (paidMonths - Math.floor(paidMonths)) * PE_LUNA;
        }
        return PE_LUNA;
      }
      return 0;
    };

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
  }, [persoane, plati]);
};
