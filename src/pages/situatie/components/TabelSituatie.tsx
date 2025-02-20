import React, { useState } from 'react';
import { useCalculeazaSituatie } from '@/pages/situatie/hooks/useCalculeazaSituatie.tsx';
import { FaInfo } from 'react-icons/fa';
import { FiltreSituatie } from '@/pages/situatie/components/FiltreSituatie.tsx';
import { ApaSauCafea } from '@/types/types.ts';
import { ColumnDef } from '@tanstack/react-table';
import { twMerge } from 'tailwind-merge';
import { Badge } from '@/components/ui/badge.tsx';
import { useGetDateSituatie } from '@/pages/situatie/hooks/useGetDateSituatie.tsx';
import { Button } from '@/components/ui/button.tsx';
import { NavLink } from 'react-router-dom';
import { TabelCustom } from '@/components/ui/TabelCustom.tsx';
import { useCustomDataTable } from '@/hooks/useCustomDataTable.tsx';
import { FiltruColoaneSituatie } from '@/pages/situatie/components/FiltruColoaneSituatie.tsx';

export const LunileAnului = {
  IANUARIE: 'Ianuarie',
  FEBRUARIE: 'Februarie',
  MARTIE: 'Martie',
  APRILIE: 'Aprilie',
  MAI: 'Mai',
  IUNIE: 'Iunie',
  IULIE: 'Iulie',
  AUGUST: 'August',
  SEPTEMBRIE: 'Septembrie',
  OCTOMBRIE: 'Octombrie',
  NOIEMBRIE: 'Noiembrie',
  DECEMBRIE: 'Decembrie',
};

export type Luna = keyof typeof LunileAnului;

export type SituatiePersoana = {
  nume: string;
  prenume: string;
  luni: Record<Luna, number>;
  laZi: boolean;
  userId: string;
};

export type FiltreSituatieType = {
  an: number;
  pentru: ApaSauCafea;
};

export type SituatieFilter = {
  fullName?: string;
  laZi?: boolean;
};

const getMonthCellColor = (value: number, luna: Luna, an: number) => {
  const lunaCurenta = new Date().getMonth();
  const anCurent = new Date().getFullYear();

  const lunaIndex = Object.keys(LunileAnului).findIndex((key) => key === luna);

  if (lunaIndex > lunaCurenta && anCurent <= an) {
    if (value > 0) {
      return 'text-purple-500';
    }
    return 'text-primary';
  }

  if (value === 40) {
    return 'text-green-700';
  }

  if (value > 0) {
    return 'text-yellow-700';
  }

  return 'text-red-700';
};

export const TabelSituatie: React.FC = () => {
  const [columnFilters, setColumnFilters] = useState<SituatieFilter>({});
  const [filtre, setFiltre] = useState<FiltreSituatieType>({ an: 2025, pentru: 'cafea' });
  const { queryPersoane, queryPlati } = useGetDateSituatie();
  const situatii = useCalculeazaSituatie({ ...filtre, persoane: queryPersoane.data, platiApi: queryPlati.data });

  const luniColumnDefs: ColumnDef<SituatiePersoana>[] = Object.entries(LunileAnului).map(([key, value], index) => {
    return {
      accessorKey: key,
      header: value,
      accessorFn: (originalRow) => originalRow.luni[key as Luna],
      cell: (info) => (
        <div
          className={twMerge(
            'text-lg font-bold',
            getMonthCellColor(info.row.original.luni[key as Luna], key as Luna, filtre.an)
          )}>
          {info.row.original.luni[key as Luna]}
        </div>
      ),
    };
  });

  const columns: ColumnDef<SituatiePersoana>[] = [
    {
      id: 'fullName',
      header: 'Nume',
      accessorFn: (row) => `${row.nume} ${row.prenume}`,
    },
    {
      id: 'laZi',
      header: 'Status',
      accessorKey: 'laZi',
      cell: (info) =>
        info.getValue() ? <Badge variant={'success'}>La zi</Badge> : <Badge variant={'destructive'}>Restantier</Badge>,
    },
    ...luniColumnDefs,
    {
      header: 'Detalii',
      id: 'detalii',
      cell: (info) => {
        return (
          <Button asChild={true}>
            <NavLink to={`/persoana/${info.row.original.userId}`}>
              <FaInfo /> Detalii
            </NavLink>
          </Button>
        );
      },
    },
  ];

  const { table } = useCustomDataTable({ columns, data: situatii, filters: columnFilters });

  return (
    <div className={'flex flex-col gap-3'}>
      <div className="flex items-center justify-between">
        <FiltreSituatie
          filtre={filtre}
          setFiltre={setFiltre}
        />
        <FiltruColoaneSituatie
          currentFilter={columnFilters}
          setFilter={setColumnFilters}
        />
      </div>
      <TabelCustom
        isFetching={queryPersoane.isFetching || queryPlati.isFetching}
        isLoading={queryPersoane.isLoading || queryPlati.isLoading || !situatii}
        table={table}
        cols={15}
        rows={12}
      />
    </div>
  );
};
