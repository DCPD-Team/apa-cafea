import { Cheltuiala } from '@/types/types.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { AdaugaModificaCheltuiala } from '@/pages/cheltuieli/lista/components/FormularAdaugaModificaCheltuiala.tsx';
import { supabaseClient } from '@/App.tsx';
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

      const { error: e } = await supabaseClient.from('expenses').upsert(paylod);

      if (e) {
        throw e;
      }
    },
    onError: (response) => {
      toast({
        variant: 'default',
        title: 'Eroare! Nu a fost adaugata cheltuiala',
        description: response?.message
      });
    },
    onSuccess: () => {
      //toast + close
      queryClient.invalidateQueries({
        queryKey: ['cheltuieli'],
      });

      close();
      toast({
        variant: 'default',
        title: 'Cheltuiala a fost adaugata!',
      });
    },
  });
};
