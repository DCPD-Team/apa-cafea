import { cn } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { Input } from '@/components/ui/input.tsx';
import { FaGithub } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import React from 'react';
import { AuthTypes } from '@/pages/autentificare/Login.tsx';
import { useAuthenticateMutation } from '@/pages/autentificare/hooks/useAuthenticateMutation.tsx';
import { useOAuthMutation } from '@/pages/autentificare/hooks/useOAuthMutation.tsx';

export type LoginForm = {
  email: string;
  password: string;
};

type Props = {
  type: AuthTypes;
  setType: (type: AuthTypes) => void;
};

export const AuthenticationForm: React.FC<Props> = ({ type, setType }) => {
  const { mutate } = useAuthenticateMutation({ type });
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
    <div className={cn('flex flex-col gap-6')}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              className="h-[500px] p-6 pb-10 md:p-8"
              onSubmit={form.handleSubmit((data: LoginForm) => {
                mutate(data);
              })}>
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Spor la cafeluțǎ!</h1>
                <p className="text-balance text-muted-foreground">
                  {type === 'SIGN IN' ? 'Bine ai venit în comunitatea ' : 'Alǎturǎ-te comunitǎții '}
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
                  {type === 'SIGN IN' ? 'Autentificare' : 'Înregistrare'}
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
              <div className="mt-5 text-center text-sm">
                {type === 'SIGN IN' ? 'Nu ai cont încǎ?' : 'Ai cont deja?'}
                <Button
                  variant={'link'}
                  type={'button'}
                  onClick={() => setType(type === 'SIGN IN' ? 'SIGN UP' : 'SIGN IN')}
                  className="p-1 underline">
                  {type === 'SIGN IN' ? 'Înregistreazǎ-te' : 'Autentificǎ-te'}
                </Button>
              </div>
            </form>
          </Form>

          <div className="relative hidden bg-muted md:block">
            <img
              src="https://esquirescoffee.co.uk/wp-content/uploads/2020/02/tabitha-turner-KWZ-rg9o76A-unsplash.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
