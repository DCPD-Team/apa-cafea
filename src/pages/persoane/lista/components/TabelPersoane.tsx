import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { ProgressBar } from '@/components/ui/progressbar.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { ActiuniPersoana } from '@/pages/persoane/lista/components/ActiuniPersoana.tsx';
import { useGetListaPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPersoanaQuery.tsx';
import { SkeletonTable } from '@/components/ui/SkeletonTable.tsx';
import { compareByDataInscriere } from '@/fake-api/fakePaymentApi.ts';

export const TabelPersoane: React.FC = () => {
  const { isLoading, isFetching, data: persoane } = useGetListaPersoanaQuery({ compareFn: compareByDataInscriere });

  if (isLoading || !persoane) {
    return (
      <SkeletonTable
        numberOfColumns={7}
        numberOfRows={15}
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Index</TableHead>
          <TableHead>Nume</TableHead>
          <TableHead>Prenume</TableHead>
          <TableHead>Participǎ apǎ</TableHead>
          <TableHead>Participǎ cafea</TableHead>
          <TableHead>Datǎ înscriere</TableHead>
          <TableHead>Actiuni</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <tr>
          <td
            className={'h-2.5 border-b'}
            colSpan={7}>
            {isFetching && <ProgressBar mode={'indeterminate'} />}
          </td>
        </tr>

        {persoane.map((persoana, index) => (
          <TableRow
            key={persoana.id}
            className={'odd:bg-slate-50 hover:bg-slate-100'}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">{persoana.nume}</TableCell>
            <TableCell className="font-medium">{persoana.prenume}</TableCell>
            <TableCell className="font-medium">
              <Checkbox checked={persoana.participaApa} />
            </TableCell>
            <TableCell className="font-medium">
              <Checkbox checked={persoana.participaCafea} />
            </TableCell>
            <TableCell className="font-medium">{persoana.dataInscriere.slice(0, -14)}</TableCell>
            <TableCell className={'max-w-[200px]'}>
              <ActiuniPersoana persoana={persoana} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
