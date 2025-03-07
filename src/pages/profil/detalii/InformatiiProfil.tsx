import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { useGetAvatarPicture } from '@/hooks/useGetAvatarPicture.tsx';
import { FaFireFlameCurved } from 'react-icons/fa6';

export const InformatiiProfil: React.FC = () => {
  const { data: poza, isFetching, isLoading } = useGetAvatarPicture({ img: 'avatar/sad_coffee_bean.webp' });
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
        <div> aici vor fi acle informatii pretioase</div>
      </CardContent>
    </Card>
  );
};
