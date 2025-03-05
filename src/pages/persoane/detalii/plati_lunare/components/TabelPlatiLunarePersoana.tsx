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
import { useAuth } from '@/hooks/useAuth.tsx';

export type FiltrePlataLunaraPersoanaType = {
  an: number;
  expenseTypeId: string;
};

export const TabelPlatiLunarePersoana: React.FC = () => {
  const { user } = useAuth();
  const { id: personId } = useParams();
  const [filtre, setFiltre] = useState<FiltrePlataLunaraPersoanaType>({ an: 2025, expenseTypeId: 'cafea' });
  const { data, isFetching, isLoading } = useGetMonthlyPaymentsPerson({
    personId: personId ?? '',
    expenseTypeId: filtre.expenseTypeId,
  });

  const excludeSet = new Set(data?.filter((x) => x.target_year === filtre.an).map((x) => x.month_id));
  const celelalteluni = Object.keys(LunileAnului).filter((x) => !excludeSet.has(x));
  console.log(celelalteluni);
  const fakeData = useMemo(
    () =>
      celelalteluni.map(
        (x) =>
          ({
            active: null,
            paid: null,
            month_id: x,
            target_year: filtre.an,
            expense_type_id: filtre.expenseTypeId,
          }) as MonthlyPayments
      ),
    [celelalteluni]
  );

  const newData = [...(data?.filter((value) => value.target_year === filtre.an) ?? []), ...fakeData];

  const baseColumns: ColumnDef<MonthlyPayments>[] = [
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
  ];

  const adminColums: ColumnDef<MonthlyPayments>[] = [
    ...baseColumns,
    {
      header: 'Acțiuni',
      accessorKey: 'month',
      cell: ({ row }) => (
        <ActiuniPlataLunara
          expenseTypeId={filtre.expenseTypeId}
          targetYear={filtre.an}
          statusLuna={row.original}
        />
      ),
    },
  ];

  const { table } = useCustomDataTable({
    columns: user?.appRole?.includes('moderator') ? adminColums : baseColumns,
    data: newData,
  });

  return (
    <div className={'flex flex-col gap-3'}>
      {/*TODO FIX THE FLICKER -> DEPLASARE LA DREAPTA :(*/}
      <div className="flex items-center justify-between">
        <FiltrePlataLunaraPersoana
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
