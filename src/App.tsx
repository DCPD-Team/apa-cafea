import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/AppRouter.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/toaster.tsx';
import { ToastProvider } from '@/components/ui/toast.tsx';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../database.types.ts';

// TODO: env
export const supabaseClient = createClient<Database>(
  'https://kmopmydrlvvnuamwgvlq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb3BteWRybHZ2bnVhbXdndmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3ODQ0MDUsImV4cCI6MjA1NTM2MDQwNX0.v0AO1k-29Xim-C5n6rQdyuQ9t_6AicDi2f2LhpnNIMI'
);

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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastProvider duration={3000}></ToastProvider>
      <Toaster />
    </QueryClientProvider>
  );
};
