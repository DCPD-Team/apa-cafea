import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { TabelSituatie } from '@/pages/situatie/components/TabelSituatie.tsx';

export const Situatie: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className={'flex items-center justify-between'}>
          <CardTitle className={'text-3xl'}>Situație</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <TabelSituatie />
      </CardContent>
    </Card>
  );
};
