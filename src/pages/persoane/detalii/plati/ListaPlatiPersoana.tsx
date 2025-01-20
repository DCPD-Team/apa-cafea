import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import { useGetListaPlatiPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPlatiPersoanaQuery.tsx';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ActiuniPlatiPersoana } from '@/pages/persoane/detalii/plati/components/ActiuniPlatiPersoana.tsx';
import { useParams } from 'react-router-dom';

export const ListaPlatiPersoana: React.FC = () => {
  const { id } = useParams();
  const { isLoading, isFetching, data: plati } = useGetListaPlatiPersoanaQuery({ id });

  if (isLoading || !plati) {
    return <div>loading</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Listǎ plati persoana</CardTitle>
      </CardHeader>
      <CardContent>
        {isFetching && <Loader2 className="animate-spin" />}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Index</TableHead>
              <TableHead>Suma</TableHead>
              <TableHead>Apǎ/Cafea</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Actiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={'group'}>
            {plati.map((plata, index) => (
              <TableRow
                key={plata.id}
                className={'bg-white odd:bg-slate-100 hover:bg-slate-300'}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{plata.suma}</TableCell>
                <TableCell className="font-medium">{plata.pentru}</TableCell>
                <TableCell className="font-medium">{plata.data.slice(0, -14)}</TableCell>
                <TableCell>
                  <ActiuniPlatiPersoana payment={plata} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
