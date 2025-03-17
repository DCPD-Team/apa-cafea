import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.tsx';

export const ProfilRedirect: React.FC = () => {
  const { user } = useAuth();

  return useMemo(() => {
    if (!user) return null;
    return (
      <Navigate
        to={`/profil/${user?.id}`}
        replace={true}
      />
    );
  }, [user]);
};
