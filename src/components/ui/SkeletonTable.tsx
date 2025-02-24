import { Skeleton } from '@/components/ui/skeleton.tsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';

type Props = {
  numberOfColumns?: number;
  numberOfRows?: number;
};

export const SkeletonTable: React.FC<Props> = (props) => {
  const { numberOfColumns = 6, numberOfRows = 10 } = props;

  const columns = [...Array(numberOfColumns).keys()];
  const rows = [...Array(numberOfRows).keys()];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((c) => (
            <TableHead key={c}>
              <Skeleton className={twMerge('h-8')} />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((r) => (
          <TableRow key={r}>
            {columns.map((c) => (
              <TableCell key={c}>
                <Skeleton className={twMerge('h-8')} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
