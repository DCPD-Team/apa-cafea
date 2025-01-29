import React from 'react';
import {useGetSumarCheltuieli} from '@/pages/cheltuieli/hooks/useGetSumarCheltuieli.tsx';
import {FiltreCheltuialaType} from '@/pages/cheltuieli/lista/components/TabelCheltuieli.tsx';
import {CardContent} from "@/components/ui/card.tsx";

type Props = {
    filtre: FiltreCheltuialaType;
};

export type TotalPlati = {
    totalSumaApa: number,
    totalSumaCafea: number,
}


export const SumarCheltuieli: React.FC<Props> = ({filtre}) => {
    const {totalSumaApa, totalSumaCafea,} = useGetSumarCheltuieli(filtre);

    return (

        <CardContent className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Total disponibil apa</span>
                <span className="text-xl font-bold">{totalSumaApa} RON</span>
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Total disponibil cafea</span>
                <span className="text-xl font-bold">{totalSumaCafea} RON</span>
            </div>
        </CardContent>



        // <div className="flex gap-2">
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
