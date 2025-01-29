import React, { useMemo, useState } from 'react';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
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
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input.tsx';

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
        accessorKey: 'actiu',
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
        <Popover onOpenChange={(open) => (open ? table.resetColumnFilters() : null)}>
          <PopoverTrigger asChild>
            <Button variant="outline">Filtru</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Filtru cheltuieli</h4>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="descriere">Descriere</Label>
                <Input
                  id="descriere"
                  className="col-span-2 h-8"
                  type="text"
                  onChange={(value) => {
                    table?.getColumn('descriere')?.setFilterValue(value.target.value);
                  }}
                  placeholder={`Search...`}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="descriere">Suma de la</Label>
                <Input
                  id="suma"
                  className="col-span-2 h-8"
                  type="number"
                  onChange={(value) =>
                    table?.getColumn('suma')?.setFilterValue((old: [number, number]) => [value.target.value, old?.[1]])
                  }
                  placeholder={`Min`}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="descriere">Suma pana la</Label>
                <Input
                  id="suma"
                  className="col-span-2 h-8"
                  type="number"
                  onChange={(value) =>
                    table?.getColumn('suma')?.setFilterValue((old: [number, number]) => [old?.[0], value.target.value])
                  }
                  placeholder={`Max...`}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <SumarCheltuieli filtre={filtre} />
      </div>
      <Table className="w-full table-auto">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <TableHead>Index</TableHead>
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

          {table.getRowModel().rows.map((row, index) => {
            return (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
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
      <div>
        <div className="h-2" />
        <div className="flex items-center justify-end gap-2">
          <button
            className="rounded border p-1"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}>
            {'<<'}
          </button>
          <button
            className="rounded border p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            {'<'}
          </button>
          <button
            className="rounded border p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            {'>'}
          </button>
          <button
            className="rounded border p-1"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}>
            {'>>'}
          </button>
          <span className="flex items-center gap-1">
            <div>Pagina</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} din {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Mergi la pagina:
            <input
              type="number"
              min="1"
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 rounded border p-1"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option
                key={pageSize}
                value={pageSize}>
                Afiseaza {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
