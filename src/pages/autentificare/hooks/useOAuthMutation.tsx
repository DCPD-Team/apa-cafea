import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { PostgrestError } from '@supabase/supabase-js';
import { supabaseClient } from '@/supabase/supabase.ts';

// @ts-ignore
const redirectTo = import.meta.env.VITE_SUPABASE_REDIRECT_URL;

export const useOAuthMutation = () => {
  const { toast } = useToast();

  return useMutation<void, PostgrestError | null, void>({
    mutationFn: async () => {
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo },
      });

      if (error) {
        throw error;
      }
    },
    onError: (response) => {
      toast({
        variant: 'destructive',
        title: 'Eroare!',
        description: response?.message,
      });
    },
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Te-ai autentificat cu succes!',
      });
    },
  });
};
