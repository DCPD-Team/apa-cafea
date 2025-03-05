import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { TabelTipCheltuieli } from '@/pages/admin/components/tip_cheltuieli/TabelTipCheltuieli.tsx';
import { useAuth } from '@/hooks/useAuth.tsx';
import { ButonAdaugaModificaTipCheltuiala } from '@/pages/admin/components/tip_cheltuieli/components/ButonAdaugaModificaTipCheltuiala.tsx';

export const ListaTipCheltuiala: React.FC = () => {
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader>
        <div className={'flex items-center justify-between'}>
          <CardTitle className={'text-3xl'}>Tipuri de cheltuieli</CardTitle>
          {user?.appRole?.includes('moderator') && <ButonAdaugaModificaTipCheltuiala />}
        </div>
      </CardHeader>
      <CardContent>
        <TabelTipCheltuieli />
      </CardContent>
    </Card>
  );
};
