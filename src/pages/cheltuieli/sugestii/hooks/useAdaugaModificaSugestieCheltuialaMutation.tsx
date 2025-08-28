import { SugestieCheltuiala } from '@/types/types.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { PostgrestError } from '@supabase/supabase-js';
import { AdaugaModificaSugestieCheltuiala } from '@/pages/cheltuieli/sugestii/components/FormularAdaugaModificaSugestieCheltuiala.tsx';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useAdaugaModificaSugestieCheltuialaMutation = ({
  sugestie,
  close,
}: {
  sugestie?: SugestieCheltuiala;
  close: () => void;
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<void, PostgrestError | null, AdaugaModificaSugestieCheltuiala>({
    mutationFn: async (data) => {
      const payload = !sugestie ? { ...data } : { ...sugestie, ...data };
      const { error: e } = await supabaseClient.from('expense_suggestions').upsert(payload);
      if (e) {
        throw e;
      }
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Eroare!',
        description: sugestie ? 'Sugestia nu a putut fi modificatǎ!' : 'Sugestia nu a putut fi adǎugatǎ!',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sugestie-cheltuiala'],
      });
      close();
      toast({
        variant: 'default',
        title: sugestie ? 'Sugestia a fost modificatǎ!' : 'Sugestia a fost adǎugatǎ!',
      });
    },
  });
};
