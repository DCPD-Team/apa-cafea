import React from 'react';
import { FiltrePretLunarType } from '@/pages/admin/components/preturi_lunare/components/TabelPreturiLunare.tsx';
import { useGetExpenseTypes } from '@/pages/persoane/hooks/useGetExpenseTypes.tsx';
import { useGetYearsOfPayments } from '@/pages/persoane/hooks/useGetYearsOfPayments.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';

type Props = {
  filtre: FiltrePretLunarType;
  setFiltre: React.Dispatch<React.SetStateAction<FiltrePretLunarType>>;
};

export const FiltrePreturiLunare: React.FC<Props> = ({ filtre, setFiltre }) => {
  const { data: expenseTypes } = useGetExpenseTypes();
  const { data: yearsData } = useGetYearsOfPayments();
  const yearsArray: string[] = (yearsData ?? []) as string[];

  if (!expenseTypes) {
    return null;
  }

  return (
    <div className="flex flex-row gap-2">
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
      <Select
        value={String(filtre.an)}
        onValueChange={(value) => setFiltre((prevState) => ({ ...prevState, an: parseInt(value) }))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>An</SelectLabel>
            {yearsArray.map((value) => (
              <SelectItem
                key={value}
                value={value.toString()}>
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
