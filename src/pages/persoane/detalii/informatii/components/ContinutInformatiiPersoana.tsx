import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetInformatiiPersoanaQuery } from '@/pages/persoane/hooks/useGetInformatiiPersoanaQuery.tsx';
import { CardContent, CardFooter } from '@/components/ui/card.tsx';
import { SkeletonInformatiiPersoana } from '@/pages/persoane/detalii/informatii/components/SkeletonInformatiiPersoana.tsx';
import { ActiuniPersoana } from '@/pages/persoane/lista/components/ActiuniPersoana.tsx';
import { supabaseClient } from '@/supabase/supabase.ts';

export const ContinutInformatiiPersoana: React.FC = () => {
  const { id } = useParams();
  const { isLoading, data: persoana } = useGetInformatiiPersoanaQuery({ id });

  async function getRemainingBalance(personId: string, expenseTypeId: string) {
    const { data, error } = await supabaseClient
      .from('remaining_balance_view')
      .select('person_id, expense_type_id, remaining_balance')
      .eq('person_id', personId) // Filter by person_id
      .eq('expense_type_id', expenseTypeId);

    if (error) {
      console.error('Error fetching remaining balance:', error);
      return null;
    }

    return data;
  }

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
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">Participa apa</span>
          <span className="text-xl font-bold">{persoana.water ? 'DA' : 'NU'}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">Participa cafea</span>
          <span className="text-xl font-bold">{persoana.coffee ? 'DA' : 'NU'}</span>
        </div>
        //TODO: call getRemainingBalance
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">Buget cafea</span>
          <span className="text-xl font-bold">{persoana.coffee ? 'DA' : 'NU'}</span>
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
