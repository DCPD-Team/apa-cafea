import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ContinutInformatiiPersoana } from '@/pages/persoane/detalii/informatii/components/ContinutInformatiiPersoana.tsx';

export const InformatiiPersoana: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Participant</CardTitle>
      </CardHeader>
      <ContinutInformatiiPersoana />
    </Card>
  );
};
