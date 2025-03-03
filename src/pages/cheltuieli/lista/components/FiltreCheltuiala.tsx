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
import { FiltreCheltuialaType } from '@/pages/cheltuieli/lista/ListaCheltuieli.tsx';
import { useGetExpenseTypes } from '@/pages/persoane/hooks/useGetExpenseTypes.tsx';

type Props = {
  filtre: FiltreCheltuialaType;
  setFiltre: React.Dispatch<React.SetStateAction<FiltreCheltuialaType>>;
};

export const FiltreCheltuiala: React.FC<Props> = ({ filtre, setFiltre }) => {
  const { data: expenses } = useGetExpenseTypes();
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
            {expenses?.map((item) => (
              <SelectItem
                key={item.id}
                value={item.id}>
                {item.id}
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
            <SelectItem value={'2025'}>2025</SelectItem>
            <SelectItem value={'2024'}>2024</SelectItem>
            <SelectItem value={'2023'}>2023</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
