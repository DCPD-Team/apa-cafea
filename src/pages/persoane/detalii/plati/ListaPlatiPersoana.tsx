import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ButonAdaugaModificaPlata } from '@/pages/persoane/detalii/plati/components/ButonAdaugaModificaPlata.tsx';
import { TabelPlatiPersoana } from '@/pages/persoane/detalii/plati/components/TabelPlatiPersoana.tsx';
import { FiltruColoanePlatiPersoana } from '@/pages/persoane/detalii/plati/components/FiltruColoanePlatiPersoana.tsx';
import { ApaSauCafea } from '@/types/types.ts';
import { useAuth } from '@/hooks/useAuth.tsx';

export type PlataPersoanaFilter = {
  what_for?: ApaSauCafea;
  sum?: [number | undefined, number | undefined];
};

export const ListaPlatiPersoana: React.FC = () => {
  const [filters, setFilters] = useState<PlataPersoanaFilter>({});
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader>
        <div className={'flex items-center justify-between'}>
          <CardTitle>Listǎ plăți persoană</CardTitle>
          <div className="flex items-center justify-between gap-2">
            <FiltruColoanePlatiPersoana
              currentFilter={filters}
              setFilter={setFilters}
            />

            {user?.appRole?.includes('moderator') && <ButonAdaugaModificaPlata />}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TabelPlatiPersoana filters={filters} />
      </CardContent>
    </Card>
  );
};
