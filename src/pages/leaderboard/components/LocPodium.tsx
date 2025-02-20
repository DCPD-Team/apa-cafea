import React from 'react';
import { LocPodiumType } from '@/pages/leaderboard/components/Podium.tsx';
import { twMerge } from 'tailwind-merge';

type Props = {
  locPodium: LocPodiumType;
  className?: string;
};

export const LocPodium: React.FC<Props> = ({ locPodium, className }) => {
  return (
    <div>
      <h3 className="text-center">{locPodium ? locPodium.nume : ''}</h3>
      <div className={twMerge('flex w-32 items-center justify-center', className)}>
        {locPodium ? locPodium.valoare : ''}
      </div>
    </div>
  );
};
