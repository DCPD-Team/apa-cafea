import React from 'react';
import { TabelCustom } from '@/components/ui/TabelCustom.tsx';
import { useGetMonths } from '@/hooks/useGetMonths.tsx';
import { useCustomDataTable } from '@/hooks/useCustomDataTable.tsx';
import { ColumnDef } from '@tanstack/react-table';
import { Months } from '@/types/types.ts';
import { useGetMonthlyPaymentsPerson } from '@/pages/persoane/detalii/plati_lunare/hooks/useGetMonthlyPaymentsPerson.tsx';
import { useGetInactiveMonthsPerson } from '@/pages/persoane/detalii/plati_lunare/hooks/useGetInactiveMonthsPerson.tsx';
import { useGetMonthlySituationPerson } from '@/pages/persoane/detalii/plati_lunare/hooks/useGetMonthlySituationPerson.tsx';

export const ListaPlatiLunarePersoana: React.FC<{ personId: string; whatForId: string }> = ({
  personId,
  whatForId,
}: {
  personId: string;
  whatForId: string;
}) => {
  // const queryMonthlyPayments = useGetMonthlyPaymentsPerson({ personId, whatForId });
  // const queryInactiveMonths = useGetInactiveMonthsPerson({ personId, whatForId });
  //
  // const queryMonths = useGetMonths();

  const tableData = useGetMonthlySituationPerson({ personId, whatForId });

  const columns: ColumnDef<Months>[] = [
    {
      id: 'id',
      header: 'Lună',
      accessorFn: (row) => `${row.name}`,
    },
  ];

  //data trebuie compus

  const { table } = useCustomDataTable({ columns, data: tableData?.map((x) => x.month) });

  return (
    <div className={'flex flex-col gap-3'}>
      <TabelCustom
        isFetching={false}
        table={table}
        cols={15}
        rows={12}
      />
    </div>
  );
};
