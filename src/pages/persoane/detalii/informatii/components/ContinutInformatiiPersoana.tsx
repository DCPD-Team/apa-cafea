import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetInformatiiPersoanaQuery } from '@/pages/persoane/hooks/useGetInformatiiPersoanaQuery.tsx';
import { CardContent, CardFooter } from '@/components/ui/card.tsx';
import { SkeletonInformatiiPersoana } from '@/pages/persoane/detalii/informatii/components/SkeletonInformatiiPersoana.tsx';
import { ActiuniPersoana } from '@/pages/persoane/lista/components/ActiuniPersoana.tsx';
import { useGetRemainingBalancePersoana } from '@/pages/persoane/detalii/informatii/hooks/useGetRemainingBalancePersoana.tsx';

export const ContinutInformatiiPersoana: React.FC = () => {
  const { id } = useParams();
  const { isLoading, data: persoana } = useGetInformatiiPersoanaQuery({ id });
  const { isLoading: isLoadingBalance, data: balance } = useGetRemainingBalancePersoana({ personId: id ?? '' });

  if (isLoading || !persoana) {
    return <SkeletonInformatiiPersoana />;
  }

  return (
    <>
      <CardContent className="grid grid-cols-4 gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">Nume</span>
          <span className="text-xl font-bold">{persoana.last_name}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">Prenume</span>
          <span className="text-xl font-bold">{persoana.first_name}</span>
        </div>
        {balance?.map((v) => {
          return (
            <div
              className="flex flex-col gap-1"
              key={v.expense_type_id}>
              <span className="text-sm text-muted-foreground">Buget disponibil {v.expense_type_id}</span>
              <span className="text-xl font-bold">{v.remaining_balance}</span>
            </div>
          );
        })}
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
