import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { FakeApiResponse } from '@/fake-api/core/fakeApi.ts';
import { FakeCheltuialaApi } from '@/fake-api/fakePaymentApi.ts';

export const useStergeCheltuialaMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<FakeApiResponse, FakeApiResponse, string>({
    mutationFn: (id) => {
      return FakeCheltuialaApi.delete(id);
    },
    onError: (response) => {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: response.message,
      });
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ['cheltuieli'],
      });
      toast({
        variant: 'default',
        title: 'Success!',
        description: response.message,
      });
    },
  });
};
