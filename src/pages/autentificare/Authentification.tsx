import React, { useState } from 'react';
import { SignUpForm } from '@/pages/autentificare/components/signUpForm.tsx';
import { SignInForm } from '@/pages/autentificare/components/signInForm.tsx';
import { cn } from '@/lib/utils.ts';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';

export type LoginForm = {
  email: string;
  password: string;
};

export const Authentification: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn('flex flex-col gap-6')}>
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="h-[500px] p-6 pb-10 md:p-8">
                {showSignIn ? (
                  <>
                    <SignInForm />
                    <div className="mt-5 text-center text-sm">
                      {'Nu ai cont încǎ?'}
                      <Button
                        variant={'link'}
                        type={'button'}
                        onClick={() => setShowSignIn(false)}
                        className="p-1 underline">
                        {'Înregistreazǎ-te'}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <SignUpForm />
                    <div className="mt-5 text-center text-sm">
                      {'Ai cont deja?'}
                      <Button
                        variant={'link'}
                        type={'button'}
                        onClick={() => setShowSignIn(true)}
                        className="p-1 underline">
                        {'Autentificǎ-te'}
                      </Button>
                    </div>
                  </>
                )}
              </div>
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

      </div>
    </div>
  );
};
