import React, { useMemo, useState } from 'react';
import { ButonAdaugaModificaPersoana } from '@/pages/persoane/lista/components/ButonAdaugaModificaPersoana.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { useGetListaPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPersoanaQuery.tsx';
import { compareByDataInscriere, Person } from '@/types/types.ts';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { ActiuniPersoana } from '@/pages/persoane/lista/components/ActiuniPersoana.tsx';
import { FiltruColoanePersoane } from '@/pages/persoane/lista/components/FiltruColoanePersoane.tsx';
import { useCustomDataTable } from '@/hooks/useCustomDataTable.tsx';
import { TabelCustom } from '@/components/ui/TabelCustom.tsx';
import { formatDate } from 'date-fns';
import { useAuth } from '@/hooks/useAuth.tsx';

export type PersonFilter = Partial<Pick<Person, 'first_name' | 'last_name' | 'water' | 'coffee'>>;

export const ListaPersoane: React.FC = () => {
  const { isLoading, isFetching, data: persoane } = useGetListaPersoanaQuery({ compareFn: compareByDataInscriere });
  const [filters, setFilters] = useState<PersonFilter>({});
  const { user } = useAuth();

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
        accessorKey: 'last_name',
        filterFn: 'includesString',
      },
      {
        header: () => 'Prenume',
        accessorKey: 'first_name',
        filterFn: 'includesString',
      },

      {
        header: 'Participă apă',
        accessorKey: 'water',
        cell: ({ row }) => {
          return <Checkbox checked={row.original.water} />;
        },
      },
      {
        header: 'Participă cafea',
        accessorKey: 'coffee',
        cell: ({ row }) => {
          return <Checkbox checked={row.original.coffee} />;
        },
      },
      {
        header: 'Dată înscriere',
        accessorKey: 'created_at',
        accessorFn: (originalRow) => formatDate(new Date(originalRow.created_at), 'dd-MM-yyyy'),
      },
      {
        header: () => 'Actiuni',
        accessorKey: 'actiuni',
        cell: ({ row }) => <ActiuniPersoana persoana={row.original} />,
      },
    ],
    []
  );

  const { table } = useCustomDataTable({ columns, data: persoane, filters: filters });

  return (
    <Card>
      <CardHeader>
        <div className={'flex items-center justify-between'}>
          <CardTitle className={'text-3xl'}>Listǎ persoane</CardTitle>
          <div className="flex items-center justify-between gap-2">
            <FiltruColoanePersoane
              currentFilter={filters}
              setFilter={setFilters}
            />
            {(user?.appRole?.includes('admin') || user?.appRole?.includes('moderator')) && (
              <ButonAdaugaModificaPersoana />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TabelCustom
          table={table}
          isLoading={isLoading}
          isFetching={isLoading}
          cols={7}
          rows={13}
        />
      </CardContent>
    </Card>
  );
};
