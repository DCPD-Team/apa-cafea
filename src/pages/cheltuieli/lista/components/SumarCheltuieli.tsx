import React from 'react';
import { useGetSumarCheltuieli } from '@/pages/cheltuieli/hooks/useGetSumarCheltuieli.tsx';
import { FiltreCheltuialaType } from '@/pages/cheltuieli/lista/components/TabelCheltuieli.tsx';
import { Badge } from '@/components/ui/badge.tsx';

type Props = {
  filtre: FiltreCheltuialaType;
};

export const SumarCheltuieli: React.FC<Props> = ({ filtre }) => {
  const { total, totalDisponibil, totalCheltuit } = useGetSumarCheltuieli(filtre);

  return (
    <div className="flex gap-2">
      <Badge className={'p-2'}>Total: {total}</Badge>
      <Badge
        className={'p-2'}
        variant="outline">
        Cheltuit: {totalCheltuit}
      </Badge>
      <Badge
        className={'p-2'}
        variant={totalDisponibil > 0 ? 'success' : 'destructive'}>
        Disponibil: {totalDisponibil}
      </Badge>
    </div>
  );
};
