import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { ProgressBar } from '@/components/ui/progressbar.tsx';
import { useGetListaPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPersoanaQuery.tsx';
import { SkeletonTable } from '@/components/ui/SkeletonTable.tsx';
import { compareByDataInscriere, Person } from '@/fake-api/fakePaymentApi.ts';
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
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { ActiuniPersoana } from '@/pages/persoane/lista/components/ActiuniPersoana.tsx';
import { FiltruColoanePersoane } from '@/pages/persoane/lista/components/FiltruColoanePersoane.tsx';

export const TabelPersoane: React.FC = () => {
  const { isLoading, isFetching, data: persoane } = useGetListaPersoanaQuery({ compareFn: compareByDataInscriere });

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
        accessorKey: 'nume',
      },
      {
        header: () => 'Prenume',
        accessorKey: 'prenume',
      },

      {
        header: 'Participă apă',
        accessorKey: 'participaApa',
        cell: ({ row }) => {
          return <Checkbox checked={row.original.participaApa} />;
        },
      },
      {
        header: 'Participă cafea',
        accessorKey: 'participaCafea',
        cell: ({ row }) => {
          return <Checkbox checked={row.original.participaCafea} />;
        },
      },
      {
        header: 'Dată înscriere',
        accessorKey: 'dataInscriere',
        accessorFn: (originalRow) => originalRow.dataInscriere.slice(0, -14),
      },
      {
        header: () => 'Actiuni',
        accessorKey: 'actiuni',
        cell: ({ row }) => <ActiuniPersoana persoana={row.original} />,
      },
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: persoane ?? [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: false,
    autoResetPageIndex: false,
  });

  if (isLoading || !persoane) {
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
        <FiltruColoanePersoane table={table} />
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
