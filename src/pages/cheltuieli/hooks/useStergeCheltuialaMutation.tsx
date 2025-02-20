import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { supabaseClient } from '@/supabase/supabase.ts';
import { PostgrestError } from '@supabase/supabase-js';

export const useStergeCheltuialaMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<void, PostgrestError | null, string>({
    mutationFn: async (id) => {
      const { error } = await supabaseClient.from('expenses').delete().eq('id', id);

      if (error) {
        throw error;
      }
    },
    onError: (response) => {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: response?.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cheltuieli'],
      });
      toast({
        variant: 'default',
        title: 'Success!',
      });
    },
  });
};
