import React from 'react';
import { InformatiiProfil } from '@/pages/profil/components/InformatiiProfil.tsx';
import { Streaks } from '@/pages/profil/components/Streaks.tsx';

export const ProfilPagina: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <InformatiiProfil />
      <Streaks />
    </div>
  );
};
