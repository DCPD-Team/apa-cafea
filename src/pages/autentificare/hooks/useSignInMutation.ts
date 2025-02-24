import { useToast } from '@/hooks/use-toast.ts';
import { useMutation } from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import { supabaseClient } from '@/supabase/supabase.ts';
import { LoginForm } from '@/pages/autentificare/Authentification.tsx';

export const useSignInMutation = () => {
  const { toast } = useToast();

  return useMutation<void, PostgrestError | null, LoginForm>({
    mutationFn: async (data) => {
      const { error } = await supabaseClient.auth.signInWithPassword({ email: data.email, password: data.password });

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