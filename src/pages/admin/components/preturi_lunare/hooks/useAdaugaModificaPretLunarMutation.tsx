import { MonthlyPrices } from '@/types/types.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import { supabaseClient } from '@/supabase/supabase.ts';
import { toast } from '@/hooks/use-toast.ts';
import { AdaugaModificaPretLunar } from '@/pages/admin/components/preturi_lunare/components/FormularAdaugaModificaPretLunar.tsx';

export const useAdaugaModificaPretLunarMutation = ({
  pretLunar,
  close,
}: {
  month_id?: string;
  expense_type_id?: string;
  year?: string;
  pretLunar?: MonthlyPrices;
  close: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation<void, PostgrestError | null, AdaugaModificaPretLunar>({
    mutationFn: async (data) => {
      const payload = !pretLunar
        ? {
            ...data,
          }
        : {
            ...pretLunar,
            ...data,
          };
      const { error } = await supabaseClient.from('monthly_prices').upsert(payload);

      if (error) {
        throw error;
      }
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'default',
        title: 'Error!',
        description: pretLunar ? 'Prețul nu a putut fi modificat' : 'Prețul nu a putut fi adăugat',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['monthlyPrices'],
      });
      close();
      toast({
        variant: 'default',
        title: pretLunar ? 'Prețul a fost modificat!' : 'Prețul a fost adăugat!',
      });
    },
  });
};
