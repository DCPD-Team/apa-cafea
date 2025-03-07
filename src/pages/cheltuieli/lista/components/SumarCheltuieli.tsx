import React, { useMemo } from 'react';
import { useGetSumarCheltuieli } from '@/pages/cheltuieli/hooks/useGetSumarCheltuieli.tsx';
import { FiltreCheltuialaType } from '@/pages/cheltuieli/lista/ListaCheltuieli.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx';

type Props = {
  filtre: FiltreCheltuialaType;
};

export const SumarCheltuieli: React.FC<Props> = ({ filtre }) => {
  const { totalCheltuit, totalDisponibil } = useGetSumarCheltuieli(filtre);

  return useMemo(() => {
    return (
      <div className="grid grid-cols-2 gap-3">
        <>
          <Tooltip>
            <TooltipTrigger>
              <Badge className={'p-2'}>
                <div className={'flex flex-col'}>
                  <Label>Total disponibil {filtre.expenseTypeId}</Label>
                  <p className="text-right text-lg font-bold">{totalDisponibil} RON</p>
                </div>
              </Badge>
            </TooltipTrigger>
            <TooltipContent
              className={'p-2'}
              style={{ width: 'var(--radix-tooltip-trigger-width)' }}>
              <div>Daca e pe minus, mai fa niste plati</div>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Badge className={'p-2'}>
                <div className={'flex flex-col'}>
                  <Label>Total cheltuit {filtre.expenseTypeId}</Label>
                  <p className="text-right text-lg font-bold">{totalCheltuit} RON</p>
                </div>
              </Badge>
            </TooltipTrigger>
            <TooltipContent
              className={'p-2'}
              style={{ width: 'var(--radix-tooltip-trigger-width)' }}>
              <div>Aici e fara numar</div>
            </TooltipContent>
          </Tooltip>
        </>
      </div>
    );
  }, [totalDisponibil, totalCheltuit]);
};
