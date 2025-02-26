import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { PostgrestError } from '@supabase/supabase-js';
import { supabaseClient } from '@/supabase/supabase.ts';
import { ModificaPlataLunara } from '@/pages/persoane/detalii/plati_lunare/components/FormularModificaPlataLunaraPersoana.tsx';
import { MonthlyPayments } from '@/types/types.ts';

export const useModificaPlataLunaraPersoanaMutation = ({
  plataLunara,
  personId,
  whatForId,
  close,
}: {
  plataLunara: MonthlyPayments;
  personId: string;
  whatForId: string;
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
            expense_type_id: whatForId,
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['luni'],
      });

      close();
      toast({
        variant: 'default',
        title: 'Situatia lunara a fost modificatǎ!',
      });
    },
  });
};
