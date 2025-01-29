import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetListaPlatiPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPlatiPersoanaQuery.tsx';
import { SkeletonTable } from '@/components/ui/SkeletonTable.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { LoadingBarTable } from '@/components/ui/LoadingBarTable.tsx';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { PagingFooterTabel } from '@/components/ui/PagingFooterTabel.tsx';
import { FiltruColoanePlatiPersoana } from '@/pages/persoane/detalii/plati/components/FiltruColoanePlatiPersoana.tsx';
import { Payment } from '@/fake-api/fakePaymentApi.ts';
import { ActiuniPlatiPersoana } from '@/pages/persoane/detalii/plati/components/ActiuniPlatiPersoana.tsx';

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

  const table = useReactTable({
    columns,
    data: plati ?? [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: false,
    autoResetPageIndex: false,
  });

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
          <LoadingBarTable
            isFetching={isFetching}
            colSpan={7}
          />
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
