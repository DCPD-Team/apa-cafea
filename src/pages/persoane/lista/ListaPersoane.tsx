import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FakePersonApi } from '@/fake-api/fakePaymentApi.ts';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { ActiuniPersoana } from '@/pages/persoane/lista/components/ActiuniPersoana.tsx';

export const ListaPersoane: React.FC = () => {
  const {
    data: persoane,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['persoane'],
    // placeholderData:[],
    queryFn: () => {
      return FakePersonApi.getAll();
    },
  });
  if (isLoading || !persoane) {
    return <div>loading</div>;
  }

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Index</TableHead>
          <TableHead>Nume</TableHead>
          <TableHead>Prenume</TableHead>
          <TableHead>Participa apa</TableHead>
          <TableHead>Participa cafea</TableHead>
          <TableHead>Data inscriere</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {persoane.map((persoana, index) => (
          <TableRow key={persoana.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">{persoana.nume}</TableCell>
            <TableCell className="font-medium">{persoana.prenume}</TableCell>
            <TableCell className="font-medium">
              <Checkbox checked={persoana.participaApa} />
            </TableCell>
            <TableCell className="font-medium">
              <Checkbox checked={persoana.participaCafea} />
            </TableCell>
            <TableCell className="font-medium">{persoana.dataInscriere.slice(0, -9)}</TableCell>
            <TableCell>
              <ActiuniPersoana persoana={persoana} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
