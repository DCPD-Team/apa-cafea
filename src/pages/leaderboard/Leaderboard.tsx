import React, { useState } from 'react';
import { Podium } from '@/pages/leaderboard/components/Podium.tsx';
import { useCalculeazaLeaderboard } from '@/pages/leaderboard/hooks/useCalculeazaLeaderboard.tsx';
import { FiltreLeaderboard } from '@/pages/leaderboard/components/FiltreLeaderboard.tsx';
import { ApaSauCafea } from '@/fake-api/fakePaymentApi.ts';

export type FiltreLeaderboardType = {
  pentru: ApaSauCafea;
};

export const Leaderboard: React.FC = () => {
  const [filtre, setFiltre] = useState<FiltreLeaderboardType>({ pentru: 'cafea' });
  const rezultat = useCalculeazaLeaderboard(filtre);

  if (!rezultat) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center gap-5">
      <FiltreLeaderboard
        filtre={filtre}
        setFiltre={setFiltre}
      />
      <div className="flex flex-row justify-center gap-20">
        <Podium
          {...rezultat.buniPlatnici}
          titlu={'Buni platnici'}
        />

        <Podium
          {...rezultat.restantieri}
          titlu={'Restantieri'}
        />
      </div>
    </div>
  );
};
