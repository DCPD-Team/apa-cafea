import React, { PropsWithChildren } from 'react';
import { useAuth } from '@/hooks/useAuth.tsx';
import { toast } from '@/hooks/use-toast.ts';
import BrokenEspresso from '@/components/BrokenEspresso.tsx';

export const CustomRouteGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const { isModerator, isAdmin } = useAuth();
  if (!(isModerator || isAdmin)) {
    toast({
      variant: 'destructive',
      title: 'Nu ai acces la resursa solicitata!',
    });
    return <BrokenEspresso />;
  }

  return (isModerator || isAdmin) && <>{children}</>;
};
