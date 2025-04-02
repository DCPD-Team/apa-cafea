import React from 'react';
import { ListaTipCheltuiala } from '@/pages/admin/components/tip_cheltuieli/ListaTipCheltuiala.tsx';
import { ListaPreturiLunare } from '@/pages/admin/components/preturi_lunare/ListaPreturiLunare.tsx';
import { SumaPlatiLunarePerAn } from '@/pages/admin/components/stats/SumaPlatiLunarePerAn.tsx';
import { EvolutiePreturiLunarePerExpenseType } from '@/pages/admin/components/stats/EvolutiePreturiLunarePerExpenseType.tsx';

export const AdminPanel: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <ListaTipCheltuiala />
      <ListaPreturiLunare />
      <div className={'flex w-full flex-col gap-2.5 sm:items-center md:w-full md:items-center'}>
        <SumaPlatiLunarePerAn />
        <EvolutiePreturiLunarePerExpenseType />
      </div>
    </div>
  );
};
