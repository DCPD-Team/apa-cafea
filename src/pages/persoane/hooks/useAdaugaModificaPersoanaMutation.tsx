import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { Person } from '@/types/types.ts';
import { AdaugaModificaPersoana } from '@/pages/persoane/lista/components/FormularAdaugaModificaPersoana.tsx';
import { PostgrestError } from '@supabase/supabase-js';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useAdaugaModificaPersoanaMutation = ({ persoana, close }: { persoana?: Person; close: () => void }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<void, PostgrestError | null, AdaugaModificaPersoana>({
    mutationFn: async (data) => {
      const payload = !persoana ? { ...data } : { ...data, id: persoana?.id };
      const { error } = await supabaseClient.from('persons').upsert(payload);

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['persoane'],
      });

      close();
      toast({
        variant: 'default',
        title: persoana ? 'Persoana a fost modificatǎ!' : 'Persoana a fost adǎugatǎ!',
      });
    },
    onError: (response) => {
      toast({
        variant: 'destructive',
        title: 'Eroare',
        description: 'Persoana nu a putut fi adǎugatǎ!',
      });
    },
  });
};
