import React from 'react';
import { useAuth } from '@/hooks/useAuth.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { TabelPlatiLunarePersoana } from '@/pages/persoane/detalii/plati_lunare/components/TabelPlatiLunarePersoana.tsx'; // export type ContributiiPersoanaFilter = {

// export type ContributiiPersoanaFilter = {
//   expense_type_id?: ApaSauCafea;
//   payment?: [number | undefined, number | undefined];
// };

export const ListaPlatiLunarePersoana: React.FC = () => {
  // const [filters, setFilters] = useState<ContributiiPersoanaFilter>({});
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader>
        <div className={'flex items-center justify-between'}>
          <CardTitle>Plăți lunare persoană</CardTitle>
          {/*<div className="flex items-center justify-between gap-2">*/}
          {/*  <FiltruColoaneContributiePersoana*/}
          {/*    currentFilter={filters}*/}
          {/*    setFilter={setFilters}*/}
          {/*  />*/}

          {/*  {user?.appRole?.includes('moderator') && <ButonAdaugaModificaContributie />}*/}
          {/*</div>*/}
        </div>
      </CardHeader>
      <CardContent>
        <TabelPlatiLunarePersoana expenseTypeId={'apa'} />
      </CardContent>
    </Card>
  );
};
