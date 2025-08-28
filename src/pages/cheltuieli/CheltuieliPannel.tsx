import { ListaCheltuieli } from '@/pages/cheltuieli/lista/ListaCheltuieli.tsx';
import { ListaSugestiiCheltuiala } from '@/pages/cheltuieli/sugestii/ListaSugestiiCheltuiala.tsx';
import React from 'react';

export const CheltuieliPannel: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <ListaCheltuieli />
      <ListaSugestiiCheltuiala />
    </div>
  );
};
