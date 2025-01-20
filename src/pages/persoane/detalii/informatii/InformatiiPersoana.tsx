import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ActiuniPersoana } from '@/pages/persoane/lista/components/ActiuniPersoana.tsx';
import { useGetInformatiiPersoanaQuery } from '@/pages/persoane/hooks/useGetInformatiiPersoanaQuery.tsx';

export const InformatiiPersoana: React.FC = () => {
  const { id } = useParams();
  const { isLoading, data: persoana } = useGetInformatiiPersoanaQuery({ id });

  if (isLoading || !persoana) {
    return <div>loading</div>;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Participant</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Nume</span>
            <span className="text-xl font-bold">{persoana.nume}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Prenume</span>
            <span className="text-xl font-bold">{persoana.prenume}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Participa apa</span>
            <span className="text-xl font-bold">{persoana.participaApa ? 'DA' : 'NU'}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Participa cafea</span>
            <span className="text-xl font-bold">{persoana.participaCafea ? 'DA' : 'NU'}</span>
          </div>
        </CardContent>
        <CardFooter>
          <ActiuniPersoana
            persoana={persoana}
            areButonDetalii={false}
          />
        </CardFooter>
      </Card>
    </div>
  );
};
