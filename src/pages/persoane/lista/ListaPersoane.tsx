import React from 'react';
import { ButonAdaugaModificaPersoana } from '@/pages/persoane/lista/components/ButonAdaugaModificaPersoana.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { TabelPersoane } from '@/pages/persoane/lista/components/TabelPersoane.tsx';

export const ListaPersoane: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className={'flex items-center justify-between'}>
          <CardTitle className={'text-3xl'}>Listǎ persoane</CardTitle>
          <ButonAdaugaModificaPersoana />
        </div>
      </CardHeader>
      <CardContent>
        <TabelPersoane />
      </CardContent>
    </Card>
  );
};
