import React from 'react';
import { InformatiiPersoana } from '@/pages/persoane/detalii/informatii/InformatiiPersoana.tsx';
import { ListaContributiiPersoana } from '@/pages/persoane/detalii/contributii/ListaContributiiPersoana.tsx';
import { ListaPlatiLunarePersoana } from '@/pages/persoane/detalii/plati_lunare/ListaPlatiLunarePersoana.tsx';

export const Persoana: React.FC = () => {
  return (
    <>
      <InformatiiPersoana />
      <ListaContributiiPersoana />
      <ListaPlatiLunarePersoana />
    </>
  );
};
