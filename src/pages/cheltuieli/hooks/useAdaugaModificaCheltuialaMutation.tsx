import { Cheltuiala } from '@/types/types.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { AdaugaModificaCheltuiala } from '@/pages/cheltuieli/lista/components/FormularAdaugaModificaCheltuiala.tsx';
import { supabaseClient } from '@/supabase/supabase.ts';
import { PostgrestError } from '@supabase/supabase-js';

export const useAdaugaModificaCheltuialaMutation = ({
  cheltuiala,
  close,
}: {
  cheltuiala?: Cheltuiala;
  close: () => void;
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<void, PostgrestError | null, AdaugaModificaCheltuiala>({
    mutationFn: async (data) => {
      const paylod = !cheltuiala ? { ...data } : { ...data, id: cheltuiala.id };
      console.log('payload frte', paylod);

      const { error: e } = await supabaseClient.from('expenses').upsert(paylod);

      if (e) {
        throw e;
      }
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Eroare!',
        description: cheltuiala ? 'Cheltuiala nu a putut fi modificatǎ!' : 'Cheltuiala nu a putut fi adǎugatǎ!',
      });
    },
    onSuccess: () => {
      //toast + close
      queryClient.invalidateQueries({
        queryKey: ['cheltuieli'],
      });
      queryClient.invalidateQueries({
        queryKey: ['luni', cheltuiala?.year, cheltuiala?.expense_type_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['expenses', cheltuiala?.year, cheltuiala?.expense_type_id],
      });

      close();
      toast({
        variant: 'default',
        title: cheltuiala ? 'Cheltuiala a fost modificatǎ!' : 'Cheltuiala a fost adǎugatǎ!',
      });
    },
  });
};
