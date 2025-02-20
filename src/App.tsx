import React, { FC, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/AppRouter.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/toaster.tsx';
import { ToastProvider } from '@/components/ui/toast.tsx';
import { Session } from '@supabase/supabase-js';
import { supabaseClient } from './supabase/supabase.ts';
import { Login } from '@/pages/autentificare/Login.tsx';
import { jwtDecode, JwtPayload } from 'jwt-decode';

type JwtCustomPayload = JwtPayload & { user_role?: string[] };
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

export const App: FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Login />;
  }
  const a = supabaseClient.auth.onAuthStateChange(async (event, session) => {
    if (session) {
      const jwt = jwtDecode<JwtCustomPayload>(session.access_token);
      const userRole = jwt.user_role;
      console.log(jwt);
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastProvider duration={3000}></ToastProvider>
      <Toaster />
    </QueryClientProvider>
  );
};
