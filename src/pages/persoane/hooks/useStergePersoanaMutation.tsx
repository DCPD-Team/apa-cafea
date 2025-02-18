import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '@/App.tsx';
import { PostgrestError } from '@supabase/supabase-js';

export const useStergePersoanaMutation = ({ shouldRedirect }: { shouldRedirect?: boolean }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const redirect = useNavigate();

  return useMutation<void, PostgrestError | null, string>({
    mutationFn: async (id) => {
      const { error } = await supabaseClient.from('persons').delete().eq('id', id);

      if (error) {
        throw error;
      }
    },
    onError: (response) => {
      //toast
      toast({
        variant: 'default',
        title: 'Error!',
        // description: response.message,
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
