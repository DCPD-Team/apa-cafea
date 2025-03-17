import { useGetResourceFromBucketFolder } from '@/hooks/useGetResourceFromBucketFolder.tsx';

export const useGetPodiumPictures = () => {
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
  return { first, second, third };
};
