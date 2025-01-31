import {useQuery} from "@tanstack/react-query";
import {ApaSauCafea, FakePaymentApi} from "@/fake-api/fakePaymentApi.ts";

export const useGetListaPlatiPersoanaFilteredQuery = ({an, pentru}: { an: number, pentru: ApaSauCafea }) => {
    return useQuery({
        queryKey: ['plati'],
        queryFn: () => {
            return FakePaymentApi.getAll();
        },
        select: (data) => data.filter((plata) => plata.pentru === pentru && new Date(plata.data).getFullYear() === an),
    });
};