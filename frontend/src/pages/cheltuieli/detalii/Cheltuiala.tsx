import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';

export const Cheltuiala: React.FC = () => {
  const { id } = useParams();
  const cheltuiala = {
    id,
    descriere: 'Cumpărături',
    suma: 100,
    data: '2024-03-20T00:00:00.000Z',
    persoana: 'Ion Popescu',
  }; // We'll replace this with a query hook later

  return (
    <Card>
      <CardHeader>
        <CardTitle className={'text-3xl'}>Detalii cheltuialǎ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="font-bold">ID:</div>
          <div>{cheltuiala.id}</div>
          
          <div className="font-bold">Descriere:</div>
          <div>{cheltuiala.descriere}</div>
          
          <div className="font-bold">Sumă:</div>
          <div>{cheltuiala.suma} RON</div>
          
          <div className="font-bold">Data:</div>
          <div>{cheltuiala.data.slice(0, 10)}</div>
          
          <div className="font-bold">Persoană:</div>
          <div>{cheltuiala.persoana}</div>
        </div>
      </CardContent>
    </Card>
  );
}; 