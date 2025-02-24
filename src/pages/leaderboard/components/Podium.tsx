import React from 'react';
import { LocPodium } from '@/pages/leaderboard/components/LocPodium.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';

export type LocPodiumType = {
  nume: string;
  valoare: number;
};

export type PodiumType = {
  locul1: LocPodiumType;
  locul2: LocPodiumType;
  locul3: LocPodiumType;
};

type Props = {
  titlu: string;
} & PodiumType;

export const Podium: React.FC<Props> = ({ titlu, locul1, locul2, locul3 }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{titlu}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row items-end">
        <LocPodium
          locPodium={locul2}
          className={'h-40 bg-yellow-300'}
        />
        <LocPodium
          locPodium={locul1}
          className={'h-60 bg-green-300'}
        />
        <LocPodium
          locPodium={locul3}
          className={'h-20 bg-red-300'}
        />
      </CardContent>
    </Card>
  );
};
