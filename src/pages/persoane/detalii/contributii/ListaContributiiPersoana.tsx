import React, { useState } from 'react';
import { ApaSauCafea } from '@/types/types.ts';
import { useAuth } from '@/hooks/useAuth.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { TabelContributiiPersoana } from '@/pages/persoane/detalii/contributii/components/TabelContributiiPersoana.tsx';
import { FiltruColoaneContributiePersoana } from '@/pages/persoane/detalii/contributii/components/FiltruColoaneContributiePersoana.tsx';
import { ButonAdaugaModificaContributie } from '@/pages/persoane/detalii/contributii/components/ButonAdaugaModificaContributie.tsx';

export type ContributiiPersoanaFilter = {
  expense_type_id?: ApaSauCafea;
  payment?: [number | undefined, number | undefined];
};

export const ListaContributiiPersoana: React.FC = () => {
  const [filters, setFilters] = useState<ContributiiPersoanaFilter>({});
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader>
        <div className={'flex items-center justify-between'}>
          <CardTitle>Listǎ contribuții persoană</CardTitle>
          <div className="flex items-center justify-between gap-2">
            <FiltruColoaneContributiePersoana
              currentFilter={filters}
              setFilter={setFilters}
            />

            {user?.appRole?.includes('moderator') && <ButonAdaugaModificaContributie />}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TabelContributiiPersoana filters={filters} />
      </CardContent>
    </Card>
  );
};
