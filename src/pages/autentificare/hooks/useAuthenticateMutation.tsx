import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast.ts';
import { PostgrestError } from '@supabase/supabase-js';
import { supabaseClient } from '@/supabase/supabase.ts';
import { LoginForm } from '@/pages/autentificare/components/authentication-form.tsx';
import { AuthTypes } from '@/pages/autentificare/Login.tsx';

export const useAuthenticateMutation = ({ type }: { type: AuthTypes }) => {
  const { toast } = useToast();

  return useMutation<void, PostgrestError | null, LoginForm>({
    mutationFn: async (data) => {
      const { error } = await (type === 'SIGN IN'
        ? supabaseClient.auth.signInWithPassword({ email: data.email, password: data.password })
        : supabaseClient.auth.signUp({
            email: data.email,
            password: data.password,
          }));

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
