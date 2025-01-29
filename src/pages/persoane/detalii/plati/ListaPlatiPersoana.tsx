import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ButonAdaugaModificaPlata } from '@/pages/persoane/detalii/plati/components/ButonAdaugaModificaPlata.tsx';
import { TabelPlatiPersoana } from '@/pages/persoane/detalii/plati/components/TabelPlatiPersoana.tsx';

export const ListaPlatiPersoana: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className={'flex items-center justify-between'}>
          <CardTitle>Listǎ plăți persoană</CardTitle>
          <ButonAdaugaModificaPlata />
        </div>
      </CardHeader>
      <CardContent>
        <TabelPlatiPersoana />
      </CardContent>
    </Card>
  );
};
