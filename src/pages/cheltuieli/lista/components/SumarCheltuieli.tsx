import React from 'react';
import { useGetSumarCheltuieli } from '@/pages/cheltuieli/hooks/useGetSumarCheltuieli.tsx';
import { FiltreCheltuialaType } from '@/pages/cheltuieli/lista/ListaCheltuieli.tsx';

type Props = {
  filtre: FiltreCheltuialaType;
};

export const SumarCheltuieli: React.FC<Props> = ({ filtre }) => {
  const { totalCheltuit, totalDisponibil } = useGetSumarCheltuieli(filtre);



  return (
    <div className="grid grid-cols-2 gap-3">
      {filtre.pentru === 'apa' ? (
        <>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Total disponibil apa</span>
            <span className="text-xl font-bold">{totalDisponibil} RON</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Total cheltuit apa</span>
            <span className="text-xl font-bold">{totalCheltuit} RON</span>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Total disponibil cafea</span>
            <span className="text-xl font-bold">{totalDisponibil} RON</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Total cheltuit cafea</span>
            <span className="text-xl font-bold">{totalCheltuit} RON</span>
          </div>
        </>
      )}
    </div>

// TODO:    // <div className="flex gap-2">
    //   <Badge className={'p-2'}>Total: {total}</Badge>
    //   <Badge
    //     className={'p-2'}
    //     variant="outline">
    //     Cheltuit: {totalCheltuit}
    //   </Badge>
    //   <Badge
    //     className={'p-2'}
    //     variant={totalDisponibil > 0 ? 'success' : 'destructive'}>
    //     Disponibil: {totalDisponibil}
    //   </Badge>
    // </div>
  );
};
