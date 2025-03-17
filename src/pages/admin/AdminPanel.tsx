import React from 'react';
import { ListaTipCheltuiala } from '@/pages/admin/components/tip_cheltuieli/ListaTipCheltuiala.tsx';
import { ListaPreturiLunare } from '@/pages/admin/components/preturi_lunare/ListaPreturiLunare.tsx';
import { SumaPlatiLunarePerAn } from '@/pages/admin/components/stats/SumaPlatiLunarePerAn.tsx';

export const AdminPanel: React.FC = () => {
  return (
    <>
      <ListaTipCheltuiala />
      <ListaPreturiLunare />
      <SumaPlatiLunarePerAn />
    </>
  );
};
