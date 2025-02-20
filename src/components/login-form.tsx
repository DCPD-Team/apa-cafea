import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaGithub } from 'react-icons/fa';
import { supabaseClient } from '@/App.tsx';
import { SignInWithOAuthCredentials, SignInWithPasswordCredentials } from '@supabase/supabase-js';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const signInWithEmail = (data: SignInWithPasswordCredentials) => supabaseClient.auth.signInWithPassword(data);
  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Spor la cafeluta!</h1>
                <p className="text-balance text-muted-foreground">Login to Apa si Cafea</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                />
              </div>
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
                  supabaseClient.auth.signInWithOAuth({} as SignInWithOAuthCredentials);
                }}
                type="button"
                variant="outline"
                className="w-full">
                <FaGithub />
                <span>Login with GitHub</span>
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <a
                  href="#"
                  className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
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
}
