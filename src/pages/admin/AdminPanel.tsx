import React from 'react';
import { ListaTipCheltuiala } from '@/pages/admin/components/tip_cheltuieli/ListaTipCheltuiala.tsx';
import { ListaPreturiLunare } from '@/pages/admin/components/preturi_lunare/ListaPreturiLunare.tsx';
import { SumaPlatiLunarePerAn } from '@/pages/admin/components/stats/SumaPlatiLunarePerAn.tsx';
import { EvolutiePreturiLunarePerExpenseType } from '@/pages/admin/components/stats/EvolutiePreturiLunarePerExpenseType.tsx';

export const AdminPanel: React.FC = () => {
  return (
    <>
      <ListaTipCheltuiala />
      <ListaPreturiLunare />
      <div className={'flex w-full gap-2.5'}>
        <SumaPlatiLunarePerAn />
        <EvolutiePreturiLunarePerExpenseType />
      </div>
    </>
  );
};
