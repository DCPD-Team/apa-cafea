import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetListaPlatiPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPlatiPersoanaQuery.tsx';
import { ColumnDef } from '@tanstack/react-table';
import { Payment } from '@/fake-api/fakePaymentApi.ts';
import { ActiuniPlatiPersoana } from '@/pages/persoane/detalii/plati/components/ActiuniPlatiPersoana.tsx';
import { useCustomDataTable } from '@/hooks/useCustomDataTable.tsx';
import { TabelCustom } from '@/components/ui/TabelCustom.tsx';
import { PlataPersoanaFilter } from '@/pages/persoane/detalii/plati/ListaPlatiPersoana.tsx';
import { formatDate } from 'date-fns';

type Props = {
  filters: PlataPersoanaFilter;
};

export const TabelPlatiPersoana: React.FC<Props> = ({ filters }) => {
  const { id } = useParams();
  const { isLoading, isFetching, data: plati } = useGetListaPlatiPersoanaQuery({ id: id ?? '' });

  const columns = useMemo<ColumnDef<Payment>[]>(
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
        accessorKey: 'sum',
        filterFn: 'inNumberRange',
      },
      {
        header: () => 'Apa/Cafea',
        accessorKey: 'what_for',
      },
      {
        header: 'Dată',
        accessorKey: 'created_at',
        accessorFn: (originalRow) => formatDate(new Date(originalRow.created_at), 'dd-MM-yyyy'),
      },
      {
        header: () => 'Actiuni',
        accessorKey: 'actiuni',
        cell: ({ row }) => <ActiuniPlatiPersoana payment={row.original} />,
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
