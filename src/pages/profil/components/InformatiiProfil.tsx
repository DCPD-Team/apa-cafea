import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { useGetAvatarPicture } from '@/hooks/useGetAvatarPicture.tsx';
import { FaFireFlameCurved } from 'react-icons/fa6';
import { AvatarUpload } from '@/pages/profil/components/AvatarUpload.tsx';

export const InformatiiProfil: React.FC = () => {
  const { data: poza, isFetching, isLoading } = useGetAvatarPicture();
  console.log('poza', poza);

  if (isFetching || isLoading) {
    return <FaFireFlameCurved />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informatii Profil</CardTitle>
      </CardHeader>
      <CardContent>
        <div> Aici vor fi acele informatii pretioase</div>
        <div className="flex justify-between gap-3">
          <div>Vita bela</div>
          <AvatarUpload />
        </div>
      </CardContent>
    </Card>
  );
};
