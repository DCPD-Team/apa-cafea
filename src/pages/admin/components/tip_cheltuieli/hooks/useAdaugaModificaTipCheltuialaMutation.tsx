import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import { supabaseClient } from '@/supabase/supabase.ts';
import { ExpenseType } from '@/types/types.ts';
import { toast } from '@/hooks/use-toast.ts';

export const useAdaugaModificaTipCheltuialaMutation = ({
  tipCheltuiala,
  close,
}: {
  tipCheltuiala?: ExpenseType;
  close: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<void, PostgrestError | null, Omit<ExpenseType, 'id' | 'active'>>({
    mutationFn: async (data) => {
      const payload = !tipCheltuiala
        ? {
            ...data,
            id: data?.name?.toLowerCase(),
          }
        : {
            ...tipCheltuiala,
            ...data,
          };
      const { error } = await supabaseClient.from('expense_type').upsert(payload);

      if (error) {
        throw error;
      }
    },
    onError: () => {
      toast({
        variant: 'default',
        title: 'Error!',
        description: tipCheltuiala
          ? 'Tipul de cheltuială nu a putut fi modificatǎ'
          : 'Tipul de cheltuială nu a putut fi adaugată',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenseTypes'],
      });
      queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
      close();
      toast({
        variant: 'default',
        title: tipCheltuiala ? 'Tipul de cheltuială a fost modificatǎ!' : 'Tipul de cheltuială a fost adaugatǎ!',
      });
    },
  });
};
