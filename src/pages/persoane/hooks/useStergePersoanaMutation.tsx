import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '@/App.tsx';
import { PostgrestError } from '@supabase/supabase-js';
import { Person } from '@/fake-api/fakePaymentApi.ts';

export const useStergePersoanaMutation = ({ shouldRedirect }: { shouldRedirect?: boolean }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const redirect = useNavigate();

  return useMutation<void, PostgrestError | null, Person>({
    mutationFn: async (data) => {
      // const { error } = await supabaseClient.from('persons').delete().eq('id', id);
      const { error } = await supabaseClient
        .from('persons')
        .update({ inactivation_date: new Date().toDateString() })
        .eq('id', data.id);

      if (error) {
        throw error;
      }
    },
    onError: (response) => {
      toast({
        variant: 'default',
        title: 'Error!',
        description: response?.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['persoane'],
      });
      if (shouldRedirect) {
        redirect('/persoana');
      }
    },
  });
};
