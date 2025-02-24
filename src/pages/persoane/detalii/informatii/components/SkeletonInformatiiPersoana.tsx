import React from 'react';
import { CardContent, CardFooter } from '@/components/ui/card.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

export const SkeletonInformatiiPersoana: React.FC = () => {
  return (
    <>
      <CardContent className="grid grid-cols-4 gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">Nume</span>
          <span className="text-xl font-bold">
            <Skeleton className={'h-10 w-20'} />
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">Prenume</span>
          <span className="text-xl font-bold">
            <Skeleton className={'h-10 w-20'} />
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">Participa apa</span>
          <span className="text-xl font-bold">
            <Skeleton className={'h-10 w-20'} />
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">Participa cafea</span>
          <span className="text-xl font-bold">
            <Skeleton className={'h-10 w-20'} />
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-1">
          <Skeleton className={'h-10 w-28'} />
          <Skeleton className={'h-10 w-28'} />
        </div>
      </CardFooter>
    </>
  );
};
