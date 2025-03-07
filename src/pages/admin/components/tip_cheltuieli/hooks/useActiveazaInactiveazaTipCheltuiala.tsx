import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { supabaseClient } from '@/supabase/supabase.ts';
import { ExpenseType } from '@/types/types.ts';
import { PostgrestError } from '@supabase/supabase-js';

export const useActiveazaInactiveazaTipCheltuiala = ({ tipCheltuiala }: { tipCheltuiala: ExpenseType }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<void, PostgrestError | null, ExpenseType>({
    mutationFn: async (data) => {
      const { error } = await supabaseClient.from('expense_type').update({ active: !data.active }).eq('id', data.id);

      if (error) {
        throw error;
      }
    },
    onError: (response) => {
      toast({
        variant: 'default',
        title: tipCheltuiala.active
          ? 'Tipul de cheltuiala nu a putut fi inactivat!'
          : 'Tipul de cheltuiala nu a putut fi activat!',
        description: response?.message,
      });
    },
    onSuccess: () => {
      toast({
        variant: 'default',
        title: tipCheltuiala.active ? 'Tipul de cheltuiala a fost inactivat!' : 'Tipul de cheltuiala a fost activat!',
      });
      queryClient.invalidateQueries({
        queryKey: ['expenseTypes'],
      });
    },
  });
};
