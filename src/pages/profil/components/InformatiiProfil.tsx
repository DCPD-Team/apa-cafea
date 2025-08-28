import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { useGetAvatarPicture } from '@/hooks/useGetAvatarPicture.tsx';

export const InformatiiProfil: React.FC = () => {
  const { data: poza, isFetching, isLoading } = useGetAvatarPicture();

  if (isFetching || isLoading || !poza) {
    return (
      <Card className="col-span-2 flex flex-col">
        <CardHeader className="fade-in fade-out" />
        <CardContent />
      </Card>
    );
  }

  return (
    <Card className="col-span-2 flex flex-col">
      <CardHeader>
        <CardTitle>Profilul meu</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <div>
            <img
              src={poza}
              alt="User Avatar"
              className="h-100 w-100 rounded-xl border-2 border-gray-400 object-cover shadow-sm"
            />
          </div>
          <div> Aici vor fi acele informatii pretioase</div>
        </div>
      </CardContent>
    </Card>
  );
};
