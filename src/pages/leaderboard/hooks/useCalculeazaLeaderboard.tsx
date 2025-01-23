import { useMemo } from 'react';
import { useGetListaPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPersoanaQuery.tsx';
import { useQuery } from '@tanstack/react-query';
import { ApaSauCafea, FakePaymentApi } from '@/fake-api/fakePaymentApi.ts';
import { LocPodiumType, PodiumType } from '@/pages/leaderboard/components/Podium.tsx';

export const useCalculeazaLeaderboard = ({ pentru }: { pentru: ApaSauCafea }) => {
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
    if (!plati) return;
    if (!persoane) return;

    const groupedPayments: Record<string, number> = plati.reduce(
      (acc, payment) => {
        acc[payment.userId] += payment.suma;
        return acc;
      },
      persoane.reduce((acc, curr) => ({ ...acc, [curr.id]: 0 }), {} as Record<string, number>)
    );

    const locPodiumTypes: LocPodiumType[] = Object.entries(groupedPayments).reduce((acc, [userId, valoare]) => {
      const persoana = persoane.find((persoana) => persoana.id === userId);
      if (!persoana) return acc;

      return [
        ...acc,
        {
          nume: persoana.nume,
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
