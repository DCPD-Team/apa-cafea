import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { Person } from '@/fake-api/fakePaymentApi.ts';
import { AdaugaModificaPersoana } from '@/pages/persoane/lista/components/FormularAdaugaModificaPersoana.tsx';
import { supabaseClient } from '@/App.tsx';
import { PostgrestError } from '@supabase/supabase-js';

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
        title: 'Persoana a fost adaugata!',
      });
    },
  });
};
