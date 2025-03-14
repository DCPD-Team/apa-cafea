import React, { useState } from 'react';
import { Podium } from '@/pages/leaderboard/components/Podium.tsx';
import { useCalculeazaLeaderboard } from '@/pages/leaderboard/hooks/useCalculeazaLeaderboard.tsx';
import { FiltreLeaderboard } from '@/pages/leaderboard/components/FiltreLeaderboard.tsx';
import { Loader2 } from 'lucide-react';

export type FiltreLeaderboardType = {
  expenseTypeId: string;
};

export const Leaderboard: React.FC = () => {
  const [filtre, setFiltre] = useState<FiltreLeaderboardType>({ expenseTypeId: 'cafea' });
  const rezultat = useCalculeazaLeaderboard(filtre);

  if (!rezultat) {
    return (
      <div className={'flex w-full justify-center'}>
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
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
