import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetListaPlatiPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPlatiPersoanaQuery.tsx';
import { SkeletonTable } from '@/components/ui/SkeletonTable.tsx';
import { ColumnDef } from '@tanstack/react-table';
import { FiltruColoanePlatiPersoana } from '@/pages/persoane/detalii/plati/components/FiltruColoanePlatiPersoana.tsx';
import { Payment } from '@/fake-api/fakePaymentApi.ts';
import { ActiuniPlatiPersoana } from '@/pages/persoane/detalii/plati/components/ActiuniPlatiPersoana.tsx';
import { useCustomDataTable } from '@/hooks/useCustomDataTable.tsx';
import { TabelCustom } from '@/components/ui/TabelCustom.tsx';

export const TabelPlatiPersoana: React.FC = () => {
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

  const { table } = useCustomDataTable({ columns, data: plati });

  if (isLoading || !plati) {
    return (
      <SkeletonTable
        numberOfColumns={5}
        numberOfRows={5}
      />
    );
  }

  return (
    <div className={'flex flex-col gap-3'}>
      <div className="flex items-center justify-between">
        <FiltruColoanePlatiPersoana table={table} />
      </div>
      <TabelCustom
        table={table}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </div>
  );
};
