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

  return useMutation<void, PostgrestError | null, Omit<ExpenseType, 'id'>>({
    mutationFn: async (data) => {
      const payload = !tipCheltuiala
        ? {
            ...data,
            id: data?.name?.toLowerCase(),
            // id: tipCheltuiala?.id,
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
          ? 'Tipul de cheltuiala nu a putut fi modificatǎ'
          : 'Tipul de cheltuiala nu a putut fi adaugata',
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
        title: tipCheltuiala ? 'Tipul de cheltuiala a fost modificatǎ!' : 'Tipul de cheltuiala a fost adaugatǎ!',
      });
    },
  });
};
