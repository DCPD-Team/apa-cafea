import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

export type CustomTableOptions<TData> = {
  data?: TData[];
  columns: ColumnDef<TData>[];
};

export const useCustomDataTable = <TData,>({ columns, data = [] }: CustomTableOptions<TData>) => {
  const table = useReactTable<TData>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: false,
    autoResetPageIndex: false,
  });

  return { table };
};
