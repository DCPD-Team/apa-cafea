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
import { apaCafeaEnum } from '@/pages/persoane/detalii/plati/components/FormularAdaugaModificaPlata.tsx';
import { FiltreSituatieType } from '@/pages/situatie/components/TabelSituatie.tsx';
import { ApaSauCafea } from '@/types/types.ts';

type Props = {
  filtre: FiltreSituatieType;
  setFiltre: React.Dispatch<React.SetStateAction<FiltreSituatieType>>;
};

export const FiltreSituatie: React.FC<Props> = ({ filtre, setFiltre }) => {
  return (
    <div className="flex flex-row gap-2">
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
