import React, { FC, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/AppRouter.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/toaster.tsx';
import { ToastProvider } from '@/components/ui/toast.tsx';
import { Authentification } from '@/pages/autentificare/Authentification.tsx';
import { useAuth } from '@/hooks/useAuth';
import CoffeeSplash from './components/CoffeeSplash';

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
  const { session, isLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isLoading || showSplash ? <CoffeeSplash /> : <>{session ? <RouterProvider router={router} /> : <Authentification />}</>}
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastProvider duration={3000}>
        <Toaster />
      </ToastProvider>
    </QueryClientProvider>
  );
};
