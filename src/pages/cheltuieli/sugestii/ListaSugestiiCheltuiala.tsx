import React, { useMemo } from 'react';
import { useGetListaSugestiiCheltuialaQuery } from '@/pages/cheltuieli/sugestii/hooks/useGetListaSugestiiCheltuialaQuery.tsx';
import { ColumnDef } from '@tanstack/react-table';
import { SugestieCheltuiala } from '@/types/types.ts';
import { useCustomDataTable } from '@/hooks/useCustomDataTable.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { TabelCustom } from '@/components/ui/TabelCustom.tsx';
import { ButonAdaugaModificaSugestieCheltuiala } from '@/pages/cheltuieli/sugestii/components/ButonAdaugaModificaSugestieCheltuiala.tsx';
import { ActiuniSugestieCheltuiala } from '@/pages/cheltuieli/sugestii/components/ActiuniSugestieCheltuiala.tsx';

export const ListaSugestiiCheltuiala: React.FC = () => {
  const { isLoading, isFetching, data: sugestii } = useGetListaSugestiiCheltuialaQuery();
  console.log(sugestii);
  const columns = useMemo<ColumnDef<SugestieCheltuiala>[]>(
    () => [
      {
        accessorKey: 'expense_proposal',
        header: 'Propunere',
      },
      {
        accessorKey: 'justification',
        header: 'Justificare propunere',
        cell: ({ row }) => row.original.justification ?? '-',
      },
      {
        accessorKey: 'link_to_resource',
        header: 'Link către sugestie',
        cell: ({ row }) => row.original.link_to_resource ?? '-',
      },
      {
        accessorKey: 'admin_decision',
        header: 'Decizie admin',
        cell: ({ row }) => (row.original.admin_decision ? 'Aprobată' : 'Neaprobată'),
      },
      {
        accessorKey: 'admin_decision_justificationm',
        header: 'Justificare decizie admin',
        cell: ({ row }) => row.original.admin_decision_justification ?? '-',
      },
      {
        accessorKey: 'id',
        header: 'Acțiuni',
        cell: ({ row }) => <ActiuniSugestieCheltuiala sugestie={row.original} />,
      },
    ],
    []
  );

  const { table } = useCustomDataTable({ columns, data: sugestii });
  return (
    <Card>
      <CardHeader>
        <div className={'flex items-center justify-between'}>
          <CardTitle className={'text-3xl'}> Sugestii cheltuieli</CardTitle>
          <div>
            <ButonAdaugaModificaSugestieCheltuiala />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TabelCustom
          table={table}
          isFetching={isFetching}
          isLoading={isLoading}
          cols={7}
          rows={15}
        />
      </CardContent>
    </Card>
  );
};
