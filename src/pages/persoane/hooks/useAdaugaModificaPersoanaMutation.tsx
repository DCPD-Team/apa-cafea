import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { FakeApiResponse } from '@/fake-api/core/fakeApi.ts';
import { FakePersonApi, Person } from '@/fake-api/fakePaymentApi.ts';
import { AdaugaModificaPersoana } from '@/pages/persoane/lista/components/FormularAdaugaModificaPersoana.tsx';

export const useAdaugaModificaPersoanaMutation = ({ persoana }: { persoana?: Person }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<FakeApiResponse, FakeApiResponse, AdaugaModificaPersoana>({
    mutationFn: (data) => {
      if (!persoana) {
        return FakePersonApi.add({ ...data, dataInscriere: new Date().toISOString() });
      } else {
        return FakePersonApi.update(persoana.id, { ...data, dataInscriere: persoana.dataInscriere });
      }
    },
    onSuccess: (response) => {
      //toast + close
      queryClient.invalidateQueries({
        queryKey: ['persoane'],
      });

      close();
      toast({
        variant: 'default',
        title: 'Persoana a fost adaugata!',
        description: response.message,
      });
    },
  });
};
