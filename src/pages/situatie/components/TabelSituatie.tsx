import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { useCalculeazaSituatie } from '@/pages/situatie/hooks/useCalculeazaSituatie.tsx';
import { twMerge } from 'tailwind-merge';

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

export const TabelSituatie: React.FC = () => {
  // const { isLoading: isLoadingPersoane, isFetching: isFetchingPersoane, data: persoane } = useGetListaPersoanaQuery();
  // const { isLoading, isFetching, data: situatii } = useGetListaPersoanaQuery();
  // const { isLoading: isLoadingPlati, isFetching: isFetchingPlati, data: plati } = useGetListaPlatiPersoanaQuery();

  // const situatii: SituatiePersoana[] = [];
  const situatii = useCalculeazaSituatie({ an: 2025 });

  console.log(situatii);

  const getMonthCellColor = (value: number) => {
    if (value === 40) {
      return 'bg-green-200';
    }

    if (value > 0) {
      return 'bg-yellow-200';
    }

    return 'bg-red-200';
  };

  // if (isLoading || !situatii) {
  //   return (
  //     <div>Loading...</div>
  //     // <SkeletonTable
  //     //   numberOfColumns={7}
  //     //   numberOfRows={15}
  //     // />
  //   );
  // }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Index</TableHead>
          <TableHead>Nume</TableHead>
          <TableHead>Prenume</TableHead>

          {Object.keys(LunileAnului).map((key) => (
            <TableHead key={key}>{LunileAnului[key as Luna]}</TableHead>
          ))}

          <TableHead>La zi?</TableHead>
          <TableHead>Actiuni</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <tr>
          <td
            className={'h-2.5 border-b'}
            colSpan={7}>
            {/*{isFetching && <ProgressBar mode={'indeterminate'} />}*/}
          </td>
        </tr>

        {situatii.map((situatie, index) => (
          <TableRow
            key={situatie.userId}
            className={'odd:bg-slate-50 hover:bg-slate-100'}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">{situatie.nume}</TableCell>
            <TableCell className="font-medium">{situatie.prenume}</TableCell>
            {Object.keys(LunileAnului).map((key) => (
              <TableCell
                key={key}
                className={twMerge('text-lg font-bold', getMonthCellColor(situatie.luni[key as Luna]))}>
                {situatie.luni[key as Luna]}
              </TableCell>
            ))}

            {/*<TableCell className={'max-w-[200px]'}>{}</TableCell>*/}
            <TableCell className={'max-w-[200px]'}>{/*<ActiuniPersoana persoana={situatie} />*/}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
