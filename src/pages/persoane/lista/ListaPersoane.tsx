import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FakePersonApi } from '@/fake-api/fakePaymentApi.ts';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { ActiuniPersoana } from '@/pages/persoane/lista/components/ActiuniPersoana.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ButonAdaugaPersoana } from '@/pages/persoane/lista/components/ButonAdaugaPersoana.tsx';

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
    <div className={'container mx-auto'}>
      <div className={'flex items-center justify-between pb-3 pt-10'}>
        <h1 className={'text-3xl font-bold'}>Listǎ persoane</h1>
        <ButonAdaugaPersoana />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Index</TableHead>
            <TableHead>Nume</TableHead>
            <TableHead>Prenume</TableHead>
            <TableHead>Participǎ apǎ</TableHead>
            <TableHead>Participǎ cafea</TableHead>
            <TableHead>Datǎ înscriere</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className={'group'}>
          {persoane.map((persoana, index) => (
            <TableRow
              key={persoana.id}
              className={'bg-white odd:bg-slate-100 hover:bg-slate-300'}>
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
              <TableCell>
                <ActiuniPersoana persoana={persoana} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
