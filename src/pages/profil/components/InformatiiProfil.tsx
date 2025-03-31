import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { useGetAvatarPicture } from '@/hooks/useGetAvatarPicture.tsx';
import { FaFireFlameCurved } from 'react-icons/fa6';

export const InformatiiProfil: React.FC = () => {
  const { data: poza, isFetching, isLoading } = useGetAvatarPicture();
  console.log('poza', poza);

  if (isFetching || isLoading) {
    return <FaFireFlameCurved />;
  }

  return (
    <Card className="col-span-2 flex flex-col">
      <CardHeader>
        <CardTitle>Informatii Profil</CardTitle>
      </CardHeader>
      <CardContent>
        <div> Aici vor fi acele informatii pretioase</div>
      </CardContent>
    </Card>
  );
};
