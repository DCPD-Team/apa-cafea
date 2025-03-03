import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { PostgrestError } from '@supabase/supabase-js';
import { supabaseClient } from '@/supabase/supabase.ts';
import { ModificaPlataLunara } from '@/pages/persoane/detalii/plati_lunare/components/FormularModificaPlataLunaraPersoana.tsx';
import { MonthlyPayments } from '@/types/types.ts';

export const useModificaPlataLunaraPersoanaMutation = ({
  plataLunara,
  personId,
  expenseTypeId,
  targetYear,
  close,
}: {
  plataLunara: MonthlyPayments;
  personId: string;
  expenseTypeId: string;
  targetYear: number;
  close: () => void;
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<void, PostgrestError | null, ModificaPlataLunara>({
    mutationFn: async (data) => {
      const payload = plataLunara.id
        ? {
            ...plataLunara,
            ...data,
          }
        : {
            ...data,
            month_id: plataLunara.month_id,
            person_id: personId,
            expense_type_id: expenseTypeId,
            target_year: targetYear,
          };

      const { error } = await supabaseClient.from('monthly_payments').upsert(payload);

      if (error) {
        throw error;
      }
    },
    onError: () => {
      toast({
        variant: 'default',
        title: 'Error!',
        description: 'Situatia lunară nu a putut fi modificatǎ',
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['luni'],
      });
      queryClient.invalidateQueries({
        queryKey: ['balance', personId],
      });

      close();
      toast({
        variant: 'default',
        title: 'Situatia lunara a fost modificatǎ!',
      });
    },
  });
};
