import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { useNavigate } from 'react-router-dom';
import { FakeApiResponse } from '@/fake-api/core/fakeApi.ts';
import { FakePersonApi } from '@/fake-api/fakePaymentApi.ts';

export const useStergePersoanaMutation = ({ shouldRedirect }: { shouldRedirect?: boolean }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const redirect = useNavigate();

  return useMutation<FakeApiResponse, FakeApiResponse, string>({
    mutationFn: (id) => {
      return FakePersonApi.delete(id);
    },
    onError: (response) => {
      //toast
      toast({
        variant: 'default',
        title: 'Error!',
        description: response.message,
      });
    },
    onSuccess: (response) => {
      //toast + close
      queryClient.invalidateQueries({
        queryKey: ['persoane'],
      });
      if (shouldRedirect) {
        redirect('/persoana');
      }
    },
  });
};
