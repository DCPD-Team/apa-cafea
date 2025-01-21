import { SituatiePersoana } from '@/pages/situatie/components/TabelSituatie.tsx';
import { useMemo } from 'react';
import { useGetListaPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPersoanaQuery.tsx';
import { useQuery } from '@tanstack/react-query';
import { FakePaymentApi } from '@/fake-api/fakePaymentApi.ts';

const SUMA = 40;

export const useCalculeazaSituatie = ({ an }: { an: number }): SituatiePersoana[] => {
  //   query persoana
  const { data: persoane } = useGetListaPersoanaQuery();
  //   query plati
  const { data: plati } = useQuery({
    queryKey: ['plati'],
    // placeholderData:[],
    queryFn: () => {
      return FakePaymentApi.getAll();
    },
    select: (data) => data.filter((plata) => new Date(plata.data).getFullYear() === an),
  });
  //   logica

  if (!plati) return [];
  if (!persoane) return [];

  // Group payments by userId and sum their amounts
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
    groupedPayments[userId] = groupedPayments[userId] / SUMA;
  }

  //   nume: string;
  //   prenume: string;
  //   luni: Record<Luna, number>;
  //   laZi: boolean;
  //   userId: string;

  return useMemo(() => {
    return Object.entries(groupedPayments).reduce((acc, [userId, months]) => {
      const persoana = persoane.find((persoana) => persoana.id === userId);
      if (!persoana) return acc;
      return [
        ...acc,
        {
          nume: persoana.nume,
          prenume: persoana.prenume,
          userId,
          laZi: months >= new Date().getMonth(),
          luni: {
            IANUARIE: months >= 1 ? 40 : (months - Math.floor(months)) * 12,
            FEBRUARIE: months >= 2 ? 40 : (months - Math.floor(months)) * 12,
            MARTIE: months >= 3 ? 40 : (months - Math.floor(months)) * 12,
            APRILIE: months >= 4 ? 40 : (months - Math.floor(months)) * 12,
            MAI: months >= 5 ? 40 : (months - Math.floor(months)) * 12,
            IUNIE: months >= 6 ? 40 : (months - Math.floor(months)) * 12,
            IULIE: months >= 7 ? 40 : (months - Math.floor(months)) * 12,
            AUGUST: months >= 8 ? 40 : (months - Math.floor(months)) * 12,
            SEPTEMBRIE: months >= 9 ? 40 : (months - Math.floor(months)) * 12,
            OCTOMBRIE: months >= 10 ? 40 : (months - Math.floor(months)) * 12,
            NOIEMBRIE: months >= 11 ? 40 : (months - Math.floor(months)) * 12,
            DECEMBRIE: months >= 12 ? 40 : (months - Math.floor(months)) * 12,
          },
        } satisfies SituatiePersoana,
      ];
    }, [] satisfies SituatiePersoana[]);
  }, [an]);
};
