import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { ApaSauCafea } from '@/types/types.ts';
import { apaCafeaEnum } from '@/pages/persoane/detalii/plati/components/FormularAdaugaModificaPlata.tsx';
import { FiltreLeaderboardType } from '@/pages/leaderboard/Leaderboard.tsx';

type Props = {
  filtre: FiltreLeaderboardType;
  setFiltre: React.Dispatch<React.SetStateAction<FiltreLeaderboardType>>;
};

export const FiltreLeaderboard: React.FC<Props> = ({ filtre, setFiltre }) => {
  return (
    <div className={'flex flex-col items-center justify-center'}>
      <Select
        value={filtre.pentru}
        onValueChange={(value) => setFiltre((prevState) => ({ ...prevState, pentru: value as ApaSauCafea }))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Pentru</SelectLabel>
            {Object.entries(apaCafeaEnum).map(([key, value]) => (
              <SelectItem
                key={key}
                value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
