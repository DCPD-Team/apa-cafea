import React from 'react';
import { InformatiiProfil } from '@/pages/profil/components/InformatiiProfil.tsx';
import { Streaks } from '@/pages/profil/components/Streaks.tsx';
import { AvatarUpload } from '@/pages/profil/components/AvatarUpload.tsx';

export const ProfilPagina: React.FC = () => {
  return (
    <>
      <div className="grid w-full grid-flow-col grid-cols-3 justify-between gap-3">
        <InformatiiProfil />
        <AvatarUpload />
      </div>
      <Streaks />
    </>
  );
};
