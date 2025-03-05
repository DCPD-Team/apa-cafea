import React from 'react';
import { ListaTipCheltuiala } from '@/pages/admin/components/tip_cheltuieli/ListaTipCheltuiala.tsx';
import { ListaPreturiLunare } from '@/pages/admin/components/preturi_lunare/ListaPreturiLunare.tsx';

export const AdminPanel: React.FC = () => {
  return (
    <>
      <ListaTipCheltuiala />
      <ListaPreturiLunare />
    </>
  );
};
