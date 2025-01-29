import { Cheltuiala, FakeCheltuialaApi } from '@/fake-api/fakePaymentApi.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { FakeApiResponse } from '@/fake-api/core/fakeApi.ts';
import { AdaugaModificaCheltuiala } from '@/pages/cheltuieli/lista/components/FormularAdaugaModificaCheltuiala.tsx';

export const useAdaugaModificaCheltuialaMutation = ({
  cheltuiala,
  close,
}: {
  cheltuiala?: Cheltuiala;
  close: () => void;
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<FakeApiResponse, FakeApiResponse, AdaugaModificaCheltuiala>({
    mutationFn: (data) => {
      if (!cheltuiala) {
        return FakeCheltuialaApi.add({ ...data, data: new Date().toISOString() });
      } else {
        const { id, ...restCheltuiala } = cheltuiala;
        return FakeCheltuialaApi.update(cheltuiala.id, { ...restCheltuiala, ...data });
      }
    },
    onSuccess: (response) => {
      //toast + close
      queryClient.invalidateQueries({
        queryKey: ['cheltuieli'],
      });

      close();
      toast({
        variant: 'default',
        title: 'Cheltuiala a fost adaugata!',
        description: response.message,
      });
    },
  });
};
