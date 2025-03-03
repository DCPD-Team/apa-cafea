import React, { useMemo } from 'react';
import { useGetSumarCheltuieli } from '@/pages/cheltuieli/hooks/useGetSumarCheltuieli.tsx';
import { FiltreCheltuialaType } from '@/pages/cheltuieli/lista/ListaCheltuieli.tsx';
import { Loader } from 'lucide-react';
import { Badge } from '@/components/ui/badge.tsx';
import { Label } from '@/components/ui/label.tsx';

type Props = {
  filtre: FiltreCheltuialaType;
};

export const SumarCheltuieli: React.FC<Props> = ({ filtre }) => {
  const { totalCheltuit, totalDisponibil, isLoading: isLoadingSumar } = useGetSumarCheltuieli(filtre);

  return useMemo(() => {
    if (isLoadingSumar) {
      return <Loader />;
    }
    return (
      <div className="grid grid-cols-2 gap-3">
        <>
          <Badge className={'p-2'}>
            <div className={'flex flex-col'}>
              <Label>Total disponibil {filtre.expenseTypeId}</Label>
              <span className="text-right text-lg font-bold">{totalDisponibil} RON</span>
            </div>
          </Badge>
          <Badge className={'p-2'}>
            <div className={'flex flex-col'}>
              <Label>Total cheltuit {filtre.expenseTypeId}</Label>
              <span className="text-right text-lg font-bold">{totalCheltuit} RON</span>
            </div>
          </Badge>
        </>
      </div>
    );
  }, [isLoadingSumar, totalDisponibil, totalCheltuit]);
};
