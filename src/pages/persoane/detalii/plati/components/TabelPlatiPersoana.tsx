import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetListaPlatiPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPlatiPersoanaQuery.tsx';
import { SkeletonTable } from '@/components/ui/SkeletonTable.tsx';
import { ColumnDef } from '@tanstack/react-table';
import { Payment } from '@/fake-api/fakePaymentApi.ts';
import { ActiuniPlatiPersoana } from '@/pages/persoane/detalii/plati/components/ActiuniPlatiPersoana.tsx';
import { useCustomDataTable } from '@/hooks/useCustomDataTable.tsx';
import { TabelCustom } from '@/components/ui/TabelCustom.tsx';
import { PlataPersoanaFilter } from '@/pages/persoane/detalii/plati/ListaPlatiPersoana.tsx';

type Props = {
  filters: PlataPersoanaFilter;
};

export const TabelPlatiPersoana: React.FC<Props> = ({ filters }) => {
  const { id } = useParams();
  const { isLoading, isFetching, data: plati } = useGetListaPlatiPersoanaQuery({ id });

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
        accessorKey: 'suma',
        filterFn: 'inNumberRange',
      },
      {
        header: () => 'Apa/Cafea',
        accessorKey: 'pentru',
      },
      {
        header: 'Dată',
        accessorKey: 'data',
        accessorFn: (originalRow) => originalRow.data.slice(0, -14),
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

  if (isLoading || !plati) {
    return (
      <SkeletonTable
        numberOfColumns={5}
        numberOfRows={5}
      />
    );
  }

  return (
    <>
      <TabelCustom
        table={table}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </>
  );
};
