import React, { useMemo } from 'react';
import { ButonAdaugaModificaPersoana } from '@/pages/persoane/lista/components/ButonAdaugaModificaPersoana.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { useGetListaPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPersoanaQuery.tsx';
import { compareByDataInscriere, Person } from '@/fake-api/fakePaymentApi.ts';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { ActiuniPersoana } from '@/pages/persoane/lista/components/ActiuniPersoana.tsx';
import { FiltruColoanePersoane } from '@/pages/persoane/lista/components/FiltruColoanePersoane.tsx';
import { useCustomDataTable } from '@/hooks/useCustomDataTable.tsx';
import { TabelCustom } from '@/components/ui/TabelCustom.tsx';

export const ListaPersoane: React.FC = () => {
  const { isLoading, isFetching, data: persoane } = useGetListaPersoanaQuery({ compareFn: compareByDataInscriere });

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: 'Index',
        id: 'index',
        accessorFn: (originalRow, index) => {
          return index + 1;
        },
      },
      {
        header: () => 'Nume',
        accessorKey: 'nume',
      },
      {
        header: () => 'Prenume',
        accessorKey: 'prenume',
      },

      {
        header: 'Participă apă',
        accessorKey: 'participaApa',
        cell: ({ row }) => {
          return <Checkbox checked={row.original.participaApa} />;
        },
      },
      {
        header: 'Participă cafea',
        accessorKey: 'participaCafea',
        cell: ({ row }) => {
          return <Checkbox checked={row.original.participaCafea} />;
        },
      },
      {
        header: 'Dată înscriere',
        accessorKey: 'dataInscriere',
        accessorFn: (originalRow) => originalRow.dataInscriere.slice(0, -14),
      },
      {
        header: () => 'Actiuni',
        accessorKey: 'actiuni',
        cell: ({ row }) => <ActiuniPersoana persoana={row.original} />,
      },
    ],
    []
  );

  const { table } = useCustomDataTable({ columns, data: persoane });

  return (
    <Card>
      <CardHeader>
        <div className={'flex items-center justify-between'}>
          <CardTitle className={'text-3xl'}>Listǎ persoane</CardTitle>
          <div className="flex items-center justify-between gap-2">
            <FiltruColoanePersoane table={table} />
            <ButonAdaugaModificaPersoana />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TabelCustom
          table={table}
          isLoading={isLoading}
          isFetching={isLoading}
        />
      </CardContent>
    </Card>
  );
};
