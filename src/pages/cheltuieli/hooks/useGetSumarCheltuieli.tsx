import {ApaSauCafea, Cheltuiala, FakeCheltuialaApi, FakePaymentApi} from '@/fake-api/fakePaymentApi.ts';
import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {TotalPlati} from "@/pages/cheltuieli/lista/components/SumarCheltuieli.tsx";

export const useGetSumarCheltuieli = ({an, pentru}: { an: number; pentru: ApaSauCafea }) => {
    const {data: platiApi} = useQuery({
        queryKey: ['plati'],
        queryFn: () => {
            return FakePaymentApi.getAll();
        },
    });

    const plati = useMemo(() => {
        if (!platiApi) {
            return [];
        }
        return platiApi.filter((plata) => new Date(plata.data).getFullYear() === an && plata.pentru === pentru);
    }, [platiApi, an, pentru]);

    const {data: cheltuieliApi} = useQuery({
        queryKey: ['cheltuieli'],
        queryFn: () => {
            return FakeCheltuialaApi.getAll();
        },
    });

    const cheltuieli = useMemo(() => {
        if (!cheltuieliApi) {
            return [] as Cheltuiala[];
        }
        return cheltuieliApi.filter(
            (cheltuiala) => new Date(cheltuiala.data).getFullYear() === an && cheltuiala.pentru === pentru
        );
    }, [cheltuieliApi, an, pentru]);

    // return useMemo(() => {
    //   const totalPlati = plati.reduce((acc, curr) => (acc += curr.suma), 0);
    //   const totalCheltuieli = cheltuieli.reduce((acc, curr) => (acc += curr.suma), 0);
    //   const totalDisponibil = totalPlati - totalCheltuieli;
    //   return {
    //     total: totalPlati,
    //     totalDisponibil: totalDisponibil,
    //     totalCheltuit: totalCheltuieli,
    //   };
    // }, [cheltuieli, plati, an, pentru]);

    return useMemo(() => {

        if (!cheltuieli) {
            return []
        }

        const totalExpensesApa = cheltuieli?.filter((cheltuiala) => cheltuiala.pentru === 'apa')
            .reduce((acc, expense) => acc + expense.suma, 0);
        const totalExpensesCafea = cheltuieli?.filter((cheltuiala) => cheltuiala.pentru === 'cafea')
            .reduce((acc, expense) => acc + expense.suma, 0);


        const totals = plati.reduce<TotalPlati>(
            (acc, plata) => {
                if (plata.pentru === 'apa') acc.totalSumaApa += plata.suma;
                if (plata.pentru === 'cafea') acc.totalSumaCafea += plata.suma;


                return acc;
            },
            {totalSumaApa: 0, totalSumaCafea: 0}
        )
        return {
            ...totals,
            totalSumaApa: totals.totalSumaApa - totalExpensesApa,
            totalSumaCafea: totals.totalSumaCafea - totalExpensesCafea,
        }
    }, [cheltuieli, plati, an, pentru]);

};
