import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetInformatiiPersoanaQuery } from '@/pages/persoane/hooks/useGetInformatiiPersoanaQuery.tsx';
import { CardContent, CardFooter } from '@/components/ui/card.tsx';
import { SkeletonInformatiiPersoana } from '@/pages/persoane/detalii/informatii/components/SkeletonInformatiiPersoana.tsx';
import { ActiuniPersoana } from '@/pages/persoane/lista/components/ActiuniPersoana.tsx';

export const ContinutInformatiiPersoana: React.FC = () => {
  const { id } = useParams();
  const { isLoading, data: persoana } = useGetInformatiiPersoanaQuery({ id });

  if (isLoading || !persoana) {
    return <SkeletonInformatiiPersoana />;
  }

  return (
    <>
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
    </>
  );
};
