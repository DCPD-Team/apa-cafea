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
import { FiltreLeaderboardType } from '@/pages/leaderboard/Leaderboard.tsx';
import { useGetExpenseTypes } from '@/pages/persoane/hooks/useGetExpenseTypes.tsx';

type Props = {
  filtre: FiltreLeaderboardType;
  setFiltre: React.Dispatch<React.SetStateAction<FiltreLeaderboardType>>;
};

export const FiltreLeaderboard: React.FC<Props> = ({ filtre, setFiltre }) => {
  const { data: expenseTypes } = useGetExpenseTypes();
  if (!expenseTypes) {
    return null;
  }
  return (
    <div className={'flex flex-col items-center justify-center'}>
      <Select
        value={filtre.expenseTypeId}
        onValueChange={(value) => setFiltre((prevState) => ({ ...prevState, expenseTypeId: value }))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Pentru</SelectLabel>
            {expenseTypes.map((value) => (
              <SelectItem
                key={value.id}
                value={value.id}>
                {value.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
