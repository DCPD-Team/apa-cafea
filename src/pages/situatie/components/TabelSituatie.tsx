import React, {useState} from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table.tsx';
import {useCalculeazaSituatie} from '@/pages/situatie/hooks/useCalculeazaSituatie.tsx';
import {FaArrowDown, FaArrowUp, FaInfo} from 'react-icons/fa';
import {FiltreSituatie} from '@/pages/situatie/components/FiltreSituatie.tsx';
import {ApaSauCafea} from '@/fake-api/fakePaymentApi.ts';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {PagingFooterTabel} from '@/components/ui/PagingFooterTabel.tsx';
import {twMerge} from 'tailwind-merge';
import {Badge} from '@/components/ui/badge.tsx';
import {FiltruColoaneSituatie} from '@/pages/situatie/components/FiltruColoaneSituatie.tsx';
import {useGetDateSituatie} from '@/pages/situatie/hooks/useGetDateSituatie.tsx';
import {LoadingBarTable} from '@/components/ui/LoadingBarTable.tsx';
import {SkeletonTable} from '@/components/ui/SkeletonTable.tsx';
import {Button} from '@/components/ui/button.tsx';
import {NavLink} from 'react-router-dom';

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
    const [filtre, setFiltre] = useState<FiltreSituatieType>({an: 2025, pentru: 'cafea'});
    const {queryPersoane, queryPlati} = useGetDateSituatie();
    const situatii = useCalculeazaSituatie({...filtre, persoane: queryPersoane.data, platiApi: queryPlati.data});

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
                info.getValue() ? <Badge variant={'success'}>La zi</Badge> :
                    <Badge variant={'destructive'}>Restantier</Badge>,
        },
        ...luniColumnDefs,
        {
            header: 'Detalii',
            id: 'detalii',
            cell: (info) => {
                return (
                    <Button asChild={true}>
                        <NavLink to={`/persoana/${info.row.original.userId}`}>
                            <FaInfo/> Detalii
                        </NavLink>
                    </Button>
                );
            },
        },
    ];

    const table = useReactTable({
        columns,
        data: situatii,
        // onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(), //client side filtering
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    if (queryPersoane.isLoading || queryPlati.isLoading || !situatii) {
        return (
            <SkeletonTable
                numberOfColumns={15}
                numberOfRows={12}
            />
        );
    }

    return (
        <div className={'flex flex-col gap-3'}>
            <div className="flex items-center justify-between">
                <FiltreSituatie
                    filtre={filtre}
                    setFiltre={setFiltre}
                />
                <FiltruColoaneSituatie table={table}/>
            </div>
            <Table className="w-full table-auto">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        key={header.id}
                                        colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={
                                                    header.column.getCanSort()
                                                        ? 'flex cursor-pointer select-none content-center items-center gap-1'
                                                        : 'flex content-center items-center'
                                                }
                                                onClick={header.column.getToggleSortingHandler()}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {{
                                                    asc: <FaArrowUp/>,
                                                    desc: <FaArrowDown/>,
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    <LoadingBarTable
                        isFetching={queryPersoane.isFetching || queryPlati.isFetching}
                        colSpan={16}
                    />

                    {table.getRowModel().rows.map((row) => {
                        return (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <TableCell
                                            className="font-medium"
                                            key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <PagingFooterTabel table={table}/>
        </div>
    );
};
