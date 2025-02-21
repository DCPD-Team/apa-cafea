import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FaGithub } from 'react-icons/fa';
import { supabaseClient } from '@/supabase/supabase.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import React from 'react';

type LoginForm = {
  username: string;
  password: string;
};

// @ts-ignore
const redirectTo = import.meta.env.VITE_SUPABASE_REDIRECT_URL;

export const LoginForm: React.FC = () => {
  const formSchema = z.object({
    username: z.string().min(0, 'Adresa email este obligatorie'),
    password: z.string().min(3, 'Parola este obligatorie'),
  });
  const form = useForm<LoginForm>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (data: LoginForm) => {
    console.log(data);
    supabaseClient.auth.signInWithPassword({ email: data.username, password: data.password });
  };

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              className="h-[500px] p-6 pb-10 md:p-8"
              onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Spor la cafeluta!</h1>
                <p className="text-balance text-muted-foreground">Login to Apa si Cafea</p>
              </div>
              <div className={'mt-5 flex flex-col gap-4'}>
                <FormField
                  control={form.control}
                  name="username"
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
                      <FormLabel>Parola</FormLabel>
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
                  Login
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
                <Button
                  onClick={() => {
                    // @ts-ignore
                    supabaseClient.auth.signInWithOAuth({
                      provider: 'github',
                      options: { redirectTo: redirectTo },
                    });
                  }}
                  type="button"
                  variant="outline"
                  className="w-full">
                  <FaGithub />
                  <span>Login with GitHub</span>
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
