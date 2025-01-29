import React, { useMemo, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { ProgressBar } from '@/components/ui/progressbar.tsx';
import { SkeletonTable } from '@/components/ui/SkeletonTable.tsx';
import { ApaSauCafea, Cheltuiala, compareByDataCheltuiala } from '@/fake-api/fakePaymentApi.ts';
import { useGetListaCheltuialaQuery } from '@/pages/cheltuieli/hooks/useGetListaCheltuialaQuery.tsx';
import { ActiuniCheltuiala } from '@/pages/cheltuieli/lista/components/ActiuniCheltuiala.tsx';
import { FiltreCheltuiala } from '@/pages/cheltuieli/lista/components/FiltreCheltuiala.tsx';
import { SumarCheltuieli } from '@/pages/cheltuieli/lista/components/SumarCheltuieli.tsx';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input.tsx';
import { PagingFooterTabel } from '@/components/ui/PagingFooterTabel.tsx';
import { FiltruColoaneCheltuieli } from '@/pages/cheltuieli/lista/components/FiltruColoaneCheltuieli.tsx';

export type FiltreCheltuialaType = {
  an: number;
  pentru: ApaSauCafea;
};

export const TabelCheltuieli: React.FC = () => {
  const [filtre, setFiltre] = useState<FiltreCheltuialaType>({ an: 2025, pentru: 'cafea' });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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
        header: () => 'Suma',
        accessorKey: 'suma',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        header: () => 'Data cheltuiala',
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
        header: () => 'Actiuni',
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

  const table = useReactTable({
    columns,
    data: cheltuieli ?? [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: false,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      pagination,
      columnFilters,
    },
    autoResetPageIndex: false,
  });

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
        <FiltreCheltuiala
          filtre={filtre}
          setFiltre={setFiltre}
        />
        <FiltruColoaneCheltuieli table={table} />
        <SumarCheltuieli filtre={filtre} />
      </div>
      <Table className="w-full table-auto">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'flex cursor-pointer select-none content-center items-center gap-1'
                            : 'flex content-center items-center'
                        }
                        onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <FaArrowUp />,
                          desc: <FaArrowDown />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <tr>
            <td
              className={'h-2.5 border-b'}
              colSpan={7}>
              {isFetching && <ProgressBar mode={'indeterminate'} />}
            </td>
          </tr>

          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      className="font-medium"
                      key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <PagingFooterTabel table={table} />
    </div>
  );
};
