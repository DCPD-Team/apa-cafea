import React, { useState } from 'react';
import { useGetMonthlyPricesByYear } from '@/pages/persoane/detalii/plati_lunare/hooks/useGetMonthlyPricesByYear.tsx';
import { MonthlyPrices } from '@/types/types.ts';
import { ColumnDef } from '@tanstack/react-table';
import { useCustomDataTable } from '@/hooks/useCustomDataTable.tsx';
import { TabelCustom } from '@/components/ui/TabelCustom.tsx';
import { FiltrePreturiLunare } from '@/pages/admin/components/preturi_lunare/components/FiltrePreturiLunare.tsx';
import { ActiuniPretLunar } from '@/pages/admin/components/preturi_lunare/components/ActiuniPretLunar.tsx';

export type FiltrePretLunarType = {
  an: number;
  expenseTypeId: string;
};

export const TabelPreturiLunare: React.FC = () => {
  const [filtre, setFiltre] = useState<FiltrePretLunarType>({ an: 2025, expenseTypeId: 'cafea' });
  const { data, isFetching, isLoading } = useGetMonthlyPricesByYear({ year: filtre.an });

  const tableData = data?.filter((value) => {
    return value.expense_type_id === filtre.expenseTypeId;
  });

  const columns: ColumnDef<MonthlyPrices>[] = [
    {
      header: 'Luna',
      accessorKey: 'month_id',
      cell: ({ row }) => <> {row.original.month_id}</>,
    },
    {
      header: 'Valoare',
      accessorKey: 'price_value',
      cell: ({ row }) => <> {row.original.price_value} RON</>,
    },
    {
      header: 'Actiuni',
      accessorKey: 'id',
      cell: ({ row }) => <ActiuniPretLunar monthlyPrice={row.original} />,
    },
  ];

  const { table } = useCustomDataTable({ columns: columns, data: tableData });

  return (
    <div className={'flex flex-col gap-3'}>
      <div className="flex items-center justify-between">
        <FiltrePreturiLunare
          filtre={filtre}
          setFiltre={setFiltre}
        />
      </div>
      <TabelCustom
        isFetching={isFetching}
        isLoading={isLoading}
        table={table}
        cols={15}
        rows={12}
      />
    </div>
  );
};
