import { FakePaymentApi, Payment } from '@/fake-api/fakePaymentApi.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { FakeApiResponse } from '@/fake-api/core/fakeApi.ts';
import { AdaugaModificaPlata } from '@/pages/persoane/detalii/plati/components/FormularAdaugaModificaPlata.tsx';

export const useAdaugaModificaPlataMutation = ({
  plata,
  userId,
  close,
}: {
  plata?: Payment;
  userId?: string;
  close: () => void;
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<FakeApiResponse, FakeApiResponse, AdaugaModificaPlata>({
    mutationFn: (data) => {
      if (!plata) {
        return FakePaymentApi.add({ ...data, data: new Date().toISOString(), userId: userId });
      } else {
        const { id, ...restPlata } = plata;
        return FakePaymentApi.update(plata.id, { ...restPlata, ...data });
      }
    },
    onSuccess: (response) => {
      //toast + close
      queryClient.invalidateQueries({
        queryKey: ['platiPersoana', userId],
      });

      close();
      toast({
        variant: 'default',
        title: 'Plata a fost adaugata!',
        description: response.message,
      });
    },
  });
};
