import React, { useMemo, useState } from 'react';
import { TabelCustom } from '@/components/ui/TabelCustom.tsx';
import { useCustomDataTable } from '@/hooks/useCustomDataTable.tsx';
import { ColumnDef } from '@tanstack/react-table';
import { MonthlyPayments } from '@/types/types.ts';
import { useGetMonthlyPaymentsPerson } from '@/pages/persoane/detalii/plati_lunare/hooks/useGetMonthlyPaymentsPerson.tsx';
import { LunileAnului } from '@/pages/situatie/components/TabelSituatie.tsx';
import { ActiuniPlataLunara } from '@/pages/persoane/detalii/plati_lunare/components/ActiuniPlataLunara.tsx';
import { useParams } from 'react-router-dom';
import { FiltrePlataLunaraPersoana } from '@/pages/persoane/detalii/plati_lunare/components/FiltrePlataLunaraPersoana.tsx';
import { useGetYearsOfPayments } from '@/pages/persoane/hooks/useGetYearsOfPayments.tsx';

export type FiltrePlataLunaraPersoanaType = {
  an: number;
  expenseTypeId: string;
};

export const TabelPlatiLunarePersoana: React.FC<{ expenseTypeId: string }> = ({
  expenseTypeId,
}: {
  expenseTypeId: string;
}) => {
  const { id: personId } = useParams();
  const { data } = useGetMonthlyPaymentsPerson({ personId: personId ?? '', expenseTypeId: expenseTypeId });
  const [filtre, setFiltre] = useState<FiltrePlataLunaraPersoanaType>({ an: 2025, expenseTypeId: 'cafea' });
  const { data: years } = useGetYearsOfPayments();

  const excludeSet = new Set(data?.map((x) => x.month_id));
  const celelalteluni = Object.keys(LunileAnului).filter((x) => !excludeSet.has(x));

  const fakeData = useMemo(() => {
    return celelalteluni.map(
      (x) =>
        ({
          active: null,
          paid: null,
          month_id: x,
        }) as MonthlyPayments
    );
  }, [celelalteluni]);

  const newData = [...(data ?? []), ...fakeData];

  const columns: ColumnDef<MonthlyPayments>[] = [
    {
      header: 'Luna',
      accessorKey: 'month_id',
      cell: ({ row }) => <> {row.original.month_id}</>,
    },
    {
      header: 'Activ',
      accessorKey: 'active',
      cell: ({ row }) => <> {row.original.active ? 'Activ' : row.original.active === false ? 'Inactiv' : '-'}</>,
    },
    {
      header: 'Paid',
      accessorKey: 'paid',
      cell: ({ row }) => <> {row.original.paid ? 'Achitat' : '-'}</>,
    },
    {
      header: 'Acțiuni',
      accessorKey: 'month',
      cell: ({ row }) => (
        <ActiuniPlataLunara
          expenseTypeId={expenseTypeId}
          statusLuna={row.original}
        />
      ),
    },
  ];

  const { table } = useCustomDataTable({ columns: columns, data: newData });

  return (
    <div className={'flex flex-col gap-3'}>
      <div className="flex items-center justify-between">
        <FiltrePlataLunaraPersoana
          filtre={filtre}
          setFiltre={setFiltre}
        />
      </div>
      <TabelCustom
        isFetching={false}
        table={table}
        cols={15}
        rows={12}
      />
    </div>
  );
};
