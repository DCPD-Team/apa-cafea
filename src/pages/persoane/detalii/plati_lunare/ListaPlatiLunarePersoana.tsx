import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { TabelPlatiLunarePersoana } from '@/pages/persoane/detalii/plati_lunare/components/TabelPlatiLunarePersoana.tsx';

export const ListaPlatiLunarePersoana: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className={'flex items-center justify-between'}>
          <CardTitle>Plăți lunare persoană</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <TabelPlatiLunarePersoana />
      </CardContent>
    </Card>
  );
};
