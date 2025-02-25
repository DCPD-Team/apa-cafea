import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const formVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <motion.div
              className={cn('relative h-[500px] p-6 pb-10 md:p-8', !showSignIn && 'md:order-2')}
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <AnimatePresence mode="wait">
                {showSignIn ? (
                  <motion.div
                    key="signin"
                    variants={formVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.2 }}>
                    <SignInForm />
                    <div className="mt-5 text-center text-sm">
                      Nu ai cont încă?{' '}
                      <Button
                        variant="link"
                        type="button"
                        onClick={() => setShowSignIn(false)}
                        className="p-1 underline">
                        Înregistrează-te
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    variants={formVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.2 }}>
                    <SignUpForm />
                    <div className="mt-5 text-center text-sm">
                      Ai cont deja?{' '}
                      <Button
                        variant="link"
                        type="button"
                        onClick={() => setShowSignIn(true)}
                        className="p-1 underline">
                        Autentifică-te
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="relative hidden bg-muted md:block"
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <img
                src="https://esquirescoffee.co.uk/wp-content/uploads/2020/02/tabitha-turner-KWZ-rg9o76A-unsplash.jpg"
                alt="Coffee Background"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
