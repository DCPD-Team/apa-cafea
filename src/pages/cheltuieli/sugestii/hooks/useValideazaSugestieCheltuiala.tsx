import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast.ts';
import { supabaseClient } from '@/supabase/supabase.ts';
import { SugestieCheltuiala } from '@/types/types.ts';
import { ValideazaSugestieCheltuiala } from '@/pages/cheltuieli/sugestii/components/FormularValideazaSugestieCheltuiala.tsx';

export const useValideazaSugestieCheltuiala = ({
  sugestie,
  close,
}: {
  sugestie?: SugestieCheltuiala;
  close: () => void;
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<void, PostgrestError | null, ValideazaSugestieCheltuiala>({
    mutationFn: async (data) => {
      const { error } = await supabaseClient
        .from('expense_suggestions')
        .update({
          admin_decision: data.admin_decision,
          admin_decision_justification: data.admin_decision_justification,
        })
        .eq('id', sugestie?.id);

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
        queryKey: ['sugestie-cheltuiala'],
      });
      close();
      toast({
        variant: 'default',
        title: 'Success!',
      });
    },
  });
};
