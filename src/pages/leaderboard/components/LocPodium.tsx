import React from 'react';
import { LocPodiumType } from '@/pages/leaderboard/components/Podium.tsx';
import { twMerge } from 'tailwind-merge';

type Props = {
  locPodium: LocPodiumType;
  className?: string;
  total: number;
};

export const LocPodium: React.FC<Props> = ({ locPodium, className, total }) => {
  const heightPercentage = total ? (locPodium.valoare / total) * 100 : 0;
  console.log(locPodium, heightPercentage);
  return (
    // <div className={`h-[${(locPodium.valoare / total) * 100}]`}>
    <div style={{ height: `${heightPercentage}%` }}>
      <h3 className="text-center">{locPodium ? locPodium.nume : ''}</h3>
      <div className={twMerge('flex w-32 items-center justify-center', className)}>
        {locPodium ? locPodium.valoare : ''}
      </div>
    </div>
  );
};
