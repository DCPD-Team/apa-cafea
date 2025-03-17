import {
  ColumnDef,
  ColumnFilter,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';

export type CustomTableOptions<TData> = {
  data?: TData[] | null;
  columns: ColumnDef<TData>[];
  filters?: Record<string, any>;
  disablePagination?: boolean;
};

export const useCustomDataTable = <TData,>({
  columns,
  data = [],
  filters,
  disablePagination,
}: CustomTableOptions<TData>) => {
  const columnFilters: ColumnFilter[] = useMemo(() => {
    if (!filters) return [];
    return Object.entries(filters)
      .filter(([k, v]) => v !== undefined)
      .map(([k, v]) => ({ id: k, value: v }));
  }, [filters]);

  const table = useReactTable<TData>({
    columns,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: !!disablePagination,
    rowCount: data?.length,
    autoResetPageIndex: false,
    state: {
      columnFilters,
    },
  });

  return { table };
};
