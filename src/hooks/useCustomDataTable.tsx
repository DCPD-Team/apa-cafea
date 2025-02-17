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
  data?: TData[];
  columns: ColumnDef<TData>[];
  filters?: Record<string, any>;
};

export const useCustomDataTable = <TData,>({ columns, data = [], filters }: CustomTableOptions<TData>) => {
  const columnFilters: ColumnFilter[] = useMemo(() => {
    if (!filters) return [];
    return Object.entries(filters).map(([k, v]) => ({ id: k, value: v }));
  }, [filters]);

  console.log(columnFilters);
  const table = useReactTable<TData>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: false,
    autoResetPageIndex: false,
    state: {
      columnFilters,
    },
  });

  return { table };
};
