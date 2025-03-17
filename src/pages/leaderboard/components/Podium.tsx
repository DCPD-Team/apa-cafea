import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import PodiumCarousel, { PodiumEntry } from '@/pages/leaderboard/components/PodiumCarousel.tsx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { PodiumChart } from '@/pages/leaderboard/components/PodiumChart.tsx';
import { useGetPodiumPictures } from '@/pages/leaderboard/hooks/useGetPodiumPictures.tsx';

export type LocPodiumType = {
  nume: string;
  valoare: number;
};

export type PodiumType = {
  locul1: LocPodiumType;
  locul2: LocPodiumType;
  locul3: LocPodiumType;
};

type Props = {
  titlu: string;
} & PodiumType;

export const Podium: React.FC<Props> = ({ titlu, locul1, locul2, locul3 }) => {
  const { first, third, second } = useGetPodiumPictures();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const podiumData: PodiumEntry[] = [
    { ...locul1, imageUrl: first?.publicUrl },
    { ...locul2, imageUrl: second?.publicUrl },
    { ...locul3, imageUrl: third?.publicUrl },
  ];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % podiumData.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + podiumData.length) % podiumData.length);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{titlu}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <PodiumChart
            locul1={locul1}
            locul2={locul2}
            locul3={locul3}
          />
          {isExpanded && (
            <PodiumCarousel
              podiumData={podiumData}
              activeIndex={activeIndex}
              onNext={handleNext}
              onPrev={handlePrev}
              onClose={() => setIsExpanded(false)}
            />
          )}
        </CardContent>
        <CardFooter>
          <Button
            variant={'secondary'}
            className="bg-red rounded-full p-2 shadow-md hover:bg-gray-300"
            onClick={() => setIsExpanded(!isExpanded)}>
            {!isExpanded ? <ChevronDown className="h-6 w-6" /> : <ChevronUp className="h-6 w-6" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
