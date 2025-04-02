import { useGetResourceFromBucketFolder } from '@/hooks/useGetResourceFromBucketFolder.tsx';
import { PodiumPicturesType } from '@/pages/leaderboard/components/Podium.tsx';

export const useGetPodiumPictures = ({ podiumType }: { podiumType: PodiumPicturesType }) => {
  const { data: first } = useGetResourceFromBucketFolder({
    bucketName: 'pictures',
    folderName: 'coffee_beans',
    path: 'first_place_coffee_bean.webp',
  });
  const { data: second } = useGetResourceFromBucketFolder({
    bucketName: 'pictures',
    folderName: 'coffee_beans',
    path: 'second_place_coffee_bean.webp',
  });
  const { data: third } = useGetResourceFromBucketFolder({
    bucketName: 'pictures',
    folderName: 'coffee_beans',
    path: 'third_place_coffee_bean.webp',
  });

  const { data: first_worst } = useGetResourceFromBucketFolder({
    bucketName: 'pictures',
    folderName: 'coffee_beans',
    path: 'destroyed_coffee_bean.webp',
  });
  const { data: second_worst } = useGetResourceFromBucketFolder({
    bucketName: 'pictures',
    folderName: 'coffee_beans',
    path: 'steaming_floor_coffee_bean.webp',
  });
  const { data: third_worst } = useGetResourceFromBucketFolder({
    bucketName: 'pictures',
    folderName: 'coffee_beans',
    path: 'sad_floor_coffee_bean.webp',
  });

  if (podiumType === 'winner') return { first, second, third };
  return { first: first_worst, second: second_worst, third: third_worst };
};
