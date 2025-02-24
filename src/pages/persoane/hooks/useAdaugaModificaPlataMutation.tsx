import { Payment } from '@/types/types.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { AdaugaModificaPlata } from '@/pages/persoane/detalii/plati/components/FormularAdaugaModificaPlata.tsx';
import { PostgrestError } from '@supabase/supabase-js';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useAdaugaModificaPlataMutation = ({
  plata,
  userId,
  close,
}: {
  plata?: Payment;
  userId: string;
  close: () => void;
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<void, PostgrestError | null, AdaugaModificaPlata>({
    mutationFn: async (data) => {
      const payload = !plata ? { ...data, person_id: userId } : { ...data, person_id: userId, id: plata?.id };

      const { error } = await supabaseClient.from('payments').upsert(payload);

      if (error) {
        throw error;
      }
    },
    onError: (response) => {
      toast({
        variant: 'default',
        title: 'Error!',
        description: response?.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['platiPersoana', userId],
      });

      close();
      toast({
        variant: 'default',
        title: 'Plata a fost adaugata!',
      });
    },
  });
};
