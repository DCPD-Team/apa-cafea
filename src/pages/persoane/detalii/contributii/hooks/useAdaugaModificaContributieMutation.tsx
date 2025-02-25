import { Contribution } from '@/types/types.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { PostgrestError } from '@supabase/supabase-js';
import { supabaseClient } from '@/supabase/supabase.ts';
import { AdaugaModificaContributie } from '@/pages/persoane/detalii/contributii/components/FormularAdaugaModificaContributie.tsx';

export const useAdaugaModificaContributieMutation = ({
  contributie,
  personId,
  close,
}: {
  contributie?: Contribution;
  personId: string;
  close: () => void;
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<void, PostgrestError | null, AdaugaModificaContributie>({
    mutationFn: async (data) => {
      const payload = !contributie
        ? { ...data, person_id: personId }
        : {
            ...data,
            person_id: personId,
            id: contributie?.id,
          };

      const { error } = await supabaseClient.from('wallet_payments').upsert(payload);

      if (error) {
        throw error;
      }
    },
    onError: () => {
      toast({
        variant: 'default',
        title: 'Error!',
        description: contributie ? 'Contributia nu a putut fi modificatǎ' : 'Contributia nu a putut fi adaugatǎ',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['contributiiPersoana', personId],
      });

      close();
      toast({
        variant: 'default',
        title: contributie ? 'Contributia a fost modificatǎ!' : 'Contributia a fost adǎugatǎ!',
      });
    },
  });
};
