import React, { useMemo, useState } from 'react';
import { SkeletonTable } from '@/components/ui/SkeletonTable.tsx';
import { ApaSauCafea, Cheltuiala, compareByDataCheltuiala } from '@/fake-api/fakePaymentApi.ts';
import { useGetListaCheltuialaQuery } from '@/pages/cheltuieli/hooks/useGetListaCheltuialaQuery.tsx';
import { ActiuniCheltuiala } from '@/pages/cheltuieli/lista/components/ActiuniCheltuiala.tsx';
import { FiltreCheltuiala } from '@/pages/cheltuieli/lista/components/FiltreCheltuiala.tsx';
import { ColumnDef } from '@tanstack/react-table';
import { FiltruColoaneCheltuieli } from '@/pages/cheltuieli/lista/components/FiltruColoaneCheltuieli.tsx';
import { SumarCheltuieli } from '@/pages/cheltuieli/lista/components/SumarCheltuieli.tsx';
import { useCustomDataTable } from '@/hooks/useCustomDataTable.tsx';
import { TabelCustom } from '@/components/ui/TabelCustom.tsx';

export type FiltreCheltuialaType = {
  an: number;
  pentru: ApaSauCafea;
};

export const TabelCheltuieli: React.FC = () => {
  const [filtre, setFiltre] = useState<FiltreCheltuialaType>({ an: 2025, pentru: 'cafea' });

  const columns = useMemo<ColumnDef<Cheltuiala>[]>(
    () => [
      {
        header: 'Index',
        id: 'index',
        accessorFn: (originalRow, index) => {
          return index + 1;
        },
      },
      {
        header: () => 'Sumă',
        accessorKey: 'suma',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        header: () => 'Dată cheltuială',
        accessorKey: 'data',
        cell: (data) => data.getValue()?.toString().slice(0, -14),
        filterFn: 'includesString',
      },
      {
        header: () => 'Descriere',
        accessorKey: 'descriere',
        sortingFn: 'alphanumeric',
        filterFn: 'includesString',
      },
      {
        header: () => 'Acțiuni',
        accessorKey: 'actiuni',
        cell: ({ row }) => <ActiuniCheltuiala cheltuiala={row.original} />,
      },
    ],
    []
  );

  const {
    isLoading,
    isFetching,
    data: cheltuieli,
  } = useGetListaCheltuialaQuery({ ...filtre, compareFn: compareByDataCheltuiala });

  const { table } = useCustomDataTable({ columns, data: cheltuieli });

  if (isLoading || !cheltuieli || cheltuieli.length === 0) {
    return (
      <SkeletonTable
        numberOfColumns={7}
        numberOfRows={15}
      />
    );
  }

  return (
    <div className={'flex flex-col gap-3'}>
      <div className="flex items-center justify-between">
        <SumarCheltuieli filtre={filtre} />
        <div className={'flex flex-row gap-2'}>
          <FiltreCheltuiala
            filtre={filtre}
            setFiltre={setFiltre}
          />
          <FiltruColoaneCheltuieli table={table} />
        </div>
      </div>
      <TabelCustom
        table={table}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </div>
  );
};
