import React, { PropsWithChildren } from 'react';
import { useAuth } from '@/hooks/useAuth.tsx';
import { toast } from '@/hooks/use-toast.ts';
import { Navigate } from 'react-router-dom';

export const CustomRouteGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  console.log(user);

  if (!user?.appRole?.includes('moderator')) {
    toast({
      variant: 'destructive',
      title: 'Nu ai acces la resursa solicitata!',
    });
    return <Navigate to={'/leaderboard'} />; //TODO va fi pg misto de la edi
  }

  return user?.appRole?.includes('moderator') && <>{children}</>;
};
