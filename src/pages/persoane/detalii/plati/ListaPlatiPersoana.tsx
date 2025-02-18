import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ButonAdaugaModificaPlata } from '@/pages/persoane/detalii/plati/components/ButonAdaugaModificaPlata.tsx';
import { TabelPlatiPersoana } from '@/pages/persoane/detalii/plati/components/TabelPlatiPersoana.tsx';
import { FiltruColoanePlatiPersoana } from '@/pages/persoane/detalii/plati/components/FiltruColoanePlatiPersoana.tsx';
import { ApaSauCafea } from '@/fake-api/fakePaymentApi.ts';

export type PlataPersoanaFilter = {
  pentru?: ApaSauCafea;
  suma?: [number | undefined, number | undefined];
};

export const ListaPlatiPersoana: React.FC = () => {
  const [filters, setFilters] = useState<PlataPersoanaFilter>({});

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

            <ButonAdaugaModificaPlata />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TabelPlatiPersoana filters={filters} />
      </CardContent>
    </Card>
  );
};
