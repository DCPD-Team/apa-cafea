import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ButonAdaugaModificaCheltuiala } from '@/pages/cheltuieli/lista/components/ButonAdaugaModificaCheltuiala.tsx';
import { TabelCheltuieli } from '@/pages/cheltuieli/lista/components/TabelCheltuieli.tsx';

export const ListaCheltuieli: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className={'flex items-center justify-between'}>
          <CardTitle className={'text-3xl'}>Listǎ cheltuieli</CardTitle>
          <ButonAdaugaModificaCheltuiala />
        </div>
      </CardHeader>
      <CardContent>
        <TabelCheltuieli />
      </CardContent>
    </Card>
  );
}; 