import React from 'react';
import { Podium } from '@/pages/leaderboard/components/Podium.tsx';

export const Leaderboard: React.FC = () => {
  // TODO: hook care sa calculeze restantierii / bunii platnici
  return (
    <div className="flex flex-row justify-center gap-20">
      <Podium
        locul1={{ nume: 'Loc1', valoare: 20 }}
        locul2={{ nume: 'Loc2', valoare: 10 }}
        locul3={{ nume: 'Loc3', valoare: 5 }}
        titlu={'Restantieri'}
      />

      <Podium
        locul1={{ nume: 'Loc1', valoare: 20 }}
        locul2={{ nume: 'Loc2', valoare: 10 }}
        locul3={{ nume: 'Loc3', valoare: 5 }}
        titlu={'Buni platnici'}
      />
    </div>
  );
};
