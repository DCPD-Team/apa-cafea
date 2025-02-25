import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useSignInMutation } from '@/pages/autentificare/hooks/useSignInMutation.ts';
import { LoginForm } from '@/pages/autentificare/Authentification.tsx';
import { useOAuthMutation } from '@/pages/autentificare/hooks/useOAuthMutation.tsx';
import { FaGithub } from 'react-icons/fa';

export const SignInForm: React.FC = () => {
  const { mutate } = useSignInMutation();
  const { mutate: oauthMutate } = useOAuthMutation();

  const formSchema = z.object({
    email: z.string().min(0, 'Adresa email este obligatorie'),
    password: z.string().min(3, 'Parola este obligatorie'),
  });
  const form = useForm<LoginForm>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: LoginForm) => {
          mutate(data);
        })}>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Spor la cafeluțǎ!</h1>
          <p className="text-balance text-muted-foreground">
            {'Bine ai venit în comunitatea '}
            <span className={'italic'}>Apǎ şi Cafea ☕</span>
          </p>
        </div>
        <div className={'mt-5 flex flex-col gap-4'}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="test@yahoo.com..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parolǎ</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={'password'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className={'mt-10 flex flex-col gap-3'}>
          <Button
            type="submit"
            className="w-full">
            {'Autentificare'}
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">sau continuǎ cu</span>
          </div>
          <Button
            onClick={() => oauthMutate()}
            type="button"
            variant="outline"
            className="w-full">
            <FaGithub />
            <span>GitHub</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};