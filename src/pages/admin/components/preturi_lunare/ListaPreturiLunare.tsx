import React from 'react';
import { TabelPreturiLunare } from '@/pages/admin/components/preturi_lunare/components/TabelPreturiLunare.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { useAuth } from '@/hooks/useAuth.tsx';
import { ButonAdaugaModificaPretLunar } from '@/pages/admin/components/preturi_lunare/components/ButonAdaugaModificaPretLunar.tsx';

export const ListaPreturiLunare: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Card>
        <CardHeader>
          <div className={'flex items-center justify-between'}>
            <CardTitle className={'text-3xl'}>Preturi lunare</CardTitle>
            {user?.appRole?.includes('moderator') && <ButonAdaugaModificaPretLunar />}
          </div>
        </CardHeader>
        <CardContent>
          <TabelPreturiLunare />
        </CardContent>
      </Card>
    </>
  );
};
