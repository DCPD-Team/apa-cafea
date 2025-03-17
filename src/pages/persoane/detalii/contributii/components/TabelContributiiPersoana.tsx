import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { Contribution } from '@/types/types.ts';
import { useCustomDataTable } from '@/hooks/useCustomDataTable.tsx';
import { TabelCustom } from '@/components/ui/TabelCustom.tsx';
import { formatDate } from 'date-fns';
import { useGetListaContributiiPersoanaQuery } from '@/pages/persoane/detalii/contributii/hooks/useGetListaContributiiPersoanaQuery.tsx';
import { ActiuniContributiePersoana } from '@/pages/persoane/detalii/contributii/components/ActiuniContributiePersoana.tsx';
import { ContributiiPersoanaFilter } from '@/pages/persoane/detalii/contributii/ListaContributiiPersoana.tsx';

type Props = {
  filters: ContributiiPersoanaFilter;
};

export const TabelContributiiPersoana: React.FC<Props> = ({ filters }) => {
  const { id } = useParams();
  const { isLoading, isFetching, data: plati } = useGetListaContributiiPersoanaQuery({ personId: id ?? '' });

  const columns = useMemo<ColumnDef<Contribution>[]>(
    () => [
      {
        header: 'Index',
        id: 'index',
        accessorFn: (originalRow, index) => {
          return index + 1;
        },
      },
      {
        header: () => 'Suma',
        accessorKey: 'payment',
        filterFn: 'inNumberRange',
      },
      {
        header: () => 'Apa/Cafea',
        accessorKey: 'expense_type_id',
      },
      {
        header: 'Dată',
        accessorKey: 'created_at',
        accessorFn: (originalRow) => formatDate(new Date(originalRow.created_at), 'dd-MM-yyyy'),
      },
      {
        header: () => 'Actiuni',
        accessorKey: 'actiuni',
        cell: ({ row }) => <ActiuniContributiePersoana contributie={row.original} />,
      },
    ],
    []
  );

  const { table } = useCustomDataTable({ columns, data: plati, filters: filters });

  return (
    <>
      <TabelCustom
        table={table}
        isFetching={isFetching}
        isLoading={isLoading || !plati}
        cols={5}
        rows={5}
      />
    </>
  );
};
