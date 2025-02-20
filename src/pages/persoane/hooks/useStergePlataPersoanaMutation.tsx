import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { supabaseClient } from '@/App.tsx';
import { PostgrestError } from '@supabase/supabase-js';

export const useStergePlataPersoanaMutation = ({ userId }: { userId?: string }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<void, PostgrestError | null, string>({
    mutationFn: async (id) => {
      const { error } = await supabaseClient.from('payments').delete().eq('id', id);

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
        queryKey: ['platiPersoana', userId],
      });
      toast({
        variant: 'default',
        title: 'Success!',
      });
    },
  });
};
