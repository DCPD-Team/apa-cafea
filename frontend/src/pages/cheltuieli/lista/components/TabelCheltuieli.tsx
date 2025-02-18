import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx';
import { ProgressBar } from '@/components/ui/progressbar.tsx';
import { useGetListaCheltuieliQuery } from '@/pages/cheltuieli/hooks/useGetListaCheltuieliQuery.tsx';
import { SkeletonTable } from '@/components/ui/SkeletonTable.tsx';
import { ActiuniCheltuiala } from '@/pages/cheltuieli/lista/components/ActiuniCheltuiala.tsx';

export const TabelCheltuieli: React.FC = () => {
  const { isLoading, isFetching, data: cheltuieli } = useGetListaCheltuieliQuery();

  if (isLoading || !cheltuieli) {
    return (
      <SkeletonTable
        numberOfColumns={6}
        numberOfRows={15}
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Index</TableHead>
          <TableHead>Descriere</TableHead>
          <TableHead>Sumǎ</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Persoanǎ</TableHead>
          <TableHead>Acțiuni</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <tr>
          <td
            className={'h-2.5 border-b'}
            colSpan={6}>
            {isFetching && <ProgressBar mode={'indeterminate'} />}
          </td>
        </tr>

        {cheltuieli.map((cheltuiala, index) => (
          <TableRow
            key={cheltuiala.id}
            className={'odd:bg-slate-50 hover:bg-slate-100'}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">{cheltuiala.descriere}</TableCell>
            <TableCell className="font-medium">{cheltuiala.suma} RON</TableCell>
            <TableCell className="font-medium">{cheltuiala.data.slice(0, -14)}</TableCell>
            <TableCell className="font-medium">{cheltuiala.persoana}</TableCell>
            <TableCell className={'max-w-[200px]'}>
              <ActiuniCheltuiala cheltuiala={cheltuiala} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}; 