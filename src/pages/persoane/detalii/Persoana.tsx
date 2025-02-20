import React from 'react';
import { InformatiiPersoana } from '@/pages/persoane/detalii/informatii/InformatiiPersoana.tsx';
import { ListaPlatiPersoana } from '@/pages/persoane/detalii/plati/ListaPlatiPersoana.tsx';

export const Persoana: React.FC = () => {
  return (
    <>
      <InformatiiPersoana />
      <ListaPlatiPersoana />
    </>
  );
};
