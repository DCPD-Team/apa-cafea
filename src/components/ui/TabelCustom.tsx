import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { SkeletonTable } from '@/components/ui/SkeletonTable.tsx';
import { flexRender, HeaderGroup, Row, Table as TableTS } from '@tanstack/react-table';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { PagingFooterTabel } from '@/components/ui/PagingFooterTabel.tsx';
import { LoadingBarTable } from '@/components/ui/LoadingBarTable.tsx';

type Props<TData> = {
  table: TableTS<TData>;
  isLoading?: boolean;
  isFetching: boolean;
  cols?: number;
  rows?: number;
  disablePagination?: boolean;
};

export const TabelCustom = <TData,>({
  table,
  isLoading,
  isFetching,
  cols = 5,
  rows = 10,
  disablePagination = false,
}: Props<TData>) => {
  if (isLoading) {
    return (
      <SkeletonTable
        numberOfColumns={cols}
        numberOfRows={rows}
      />
    );
  }

  return (
    <div className={'flex flex-col gap-3'}>
      <Table className="w-full table-auto">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
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
            colSpan={cols ?? 7}
          />

          {table.getRowModel().rows.map((row: Row<TData>) => {
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
      {!disablePagination && <PagingFooterTabel table={table} />}
    </div>
  );
};
