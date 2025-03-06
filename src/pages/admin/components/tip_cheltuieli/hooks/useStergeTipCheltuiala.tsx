import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { supabaseClient } from '@/supabase/supabase.ts';
import { ExpenseType } from '@/types/types.ts';
import { PostgrestError } from '@supabase/supabase-js';

export const useStergeTipCheltuiala = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<void, PostgrestError | null, ExpenseType>({
    mutationFn: async (data) => {
      const { error } = await supabaseClient.from('expense_type').delete().eq('id', data.id);

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
      toast({
        variant: 'default',
        title: 'Tipul de cheltuiala a fost şters!',
      });
      queryClient.invalidateQueries({
        queryKey: ['expenseTypes'],
      });
    },
  });
};
