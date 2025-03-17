import React from 'react';
import { useGetExpenseTypes } from '@/pages/persoane/hooks/useGetExpenseTypes.tsx';
import { ColumnDef } from '@tanstack/react-table';
import { ExpenseType } from '@/types/types.ts';
import { useCustomDataTable } from '@/hooks/useCustomDataTable.tsx';
import { TabelCustom } from '@/components/ui/TabelCustom.tsx';
import { ActiuniTipCheltuiala } from '@/pages/admin/components/tip_cheltuieli/components/ActiuniTipCheltuiala.tsx';

export const TabelTipCheltuieli: React.FC = () => {
  const { data, isLoading, isFetching } = useGetExpenseTypes();

  const columns: ColumnDef<ExpenseType>[] = [
    {
      id: 'tip',
      header: 'Nume',
      accessorFn: (row) => row.name,
      cell: (info) => <div>{info.row.original.name}</div>,
    },
    {
      id: 'id',
      header: 'Acțiuni',
      accessorFn: (row) => row.id,
      cell: (info) => (
        <ActiuniTipCheltuiala
          id={info.row.original.id}
          name={info.row.original.name}
          active={info.row.original.active}
        />
      ),
    },
  ];

  const { table } = useCustomDataTable({ columns, data: data });

  return (
    <TabelCustom
      isFetching={isFetching}
      isLoading={isLoading}
      table={table}
      cols={2}
      rows={12}
    />
  );
};
