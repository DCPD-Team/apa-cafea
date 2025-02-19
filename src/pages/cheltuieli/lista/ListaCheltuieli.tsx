import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ButonAdaugaModificaCheltuiala } from '@/pages/cheltuieli/lista/components/ButonAdaugaModificaCheltuiala.tsx';
import { ActiuniCheltuiala } from '@/pages/cheltuieli/lista/components/ActiuniCheltuiala.tsx';
import { ColumnDef } from '@tanstack/react-table';
import { ApaSauCafea, Cheltuiala, compareByDataCheltuiala } from '@/fake-api/fakePaymentApi.ts';
import { useGetListaCheltuialaQuery } from '@/pages/cheltuieli/hooks/useGetListaCheltuialaQuery.tsx';
import { useCustomDataTable } from '@/hooks/useCustomDataTable.tsx';
import { SumarCheltuieli } from '@/pages/cheltuieli/lista/components/SumarCheltuieli.tsx';
import { TabelCustom } from '@/components/ui/TabelCustom.tsx';
import { FiltreCheltuiala } from '@/pages/cheltuieli/lista/components/FiltreCheltuiala.tsx';
import { FiltruColoaneCheltuieli } from '@/pages/cheltuieli/lista/components/FiltruColoaneCheltuieli.tsx';

export type FiltreCheltuialaType = {
  an: number;
  pentru: ApaSauCafea;
};

export type CheltuialaFilter = {
  suma?: [number | undefined, number | undefined];
  data?: [string | undefined, string | undefined];
};

export const ListaCheltuieli: React.FC = () => {
  const [columnFilters, setColumnFilters] = useState<CheltuialaFilter>({});
  const [filtre, setFiltre] = useState<FiltreCheltuialaType>({ an: 2025, pentru: 'cafea' });

  const {
    isLoading,
    isFetching,
    data: cheltuieli,
  } = useGetListaCheltuialaQuery({ ...filtre, compareFn: compareByDataCheltuiala });

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
        filterFn: (row, columnId, filterValue) => {
          if (!!filterValue[0] && !!filterValue[1]) {
            return (
              new Date(row.original.data) > new Date(filterValue[0]) &&
              new Date(row.original.data) < new Date(filterValue[1])
            );
          }

          if (filterValue[0]) {
            return new Date(row.original.data) > new Date(filterValue[0]);
          }

          if (filterValue[1]) {
            return new Date(row.original.data) < new Date(filterValue[1]);
          }

          return filterValue;
        },
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

  const { table } = useCustomDataTable({ columns, data: cheltuieli, filters: columnFilters });

  return (
    <Card>
      <CardHeader>
        <div className={'flex items-center justify-between'}>
          <CardTitle className={'text-3xl'}>Cheltuieli</CardTitle>
          <div className="flex items-center justify-between gap-2">
            <FiltruColoaneCheltuieli
              currentFilter={columnFilters}
              setFilter={setColumnFilters}
            />
            <ButonAdaugaModificaCheltuiala />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={'flex flex-col gap-3'}>
          <div className="flex items-center justify-between">
            <SumarCheltuieli filtre={filtre} />
            <FiltreCheltuiala
              filtre={filtre}
              setFiltre={setFiltre}
            />
          </div>
          <TabelCustom
            table={table}
            isFetching={isFetching}
            isLoading={isLoading || !cheltuieli || cheltuieli.length === 0}
            cols={7}
            rows={15}
          />
        </div>
      </CardContent>
    </Card>
  );
};
