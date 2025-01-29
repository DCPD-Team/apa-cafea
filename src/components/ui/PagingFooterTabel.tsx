import React from 'react';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button.tsx';

type Props = {
  table: Table<any>;
};

export const PagingFooterTabel: React.FC<Props> = ({ table }) => {
  return (
    <div className="flex flex-row justify-end gap-2">
      <Button
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}>
        {'<<'}
      </Button>
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}>
        {'<'}
      </Button>
      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}>
        {'>'}
      </Button>
      <Button
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}>
        {'>>'}
      </Button>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | Go to page:
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
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};
