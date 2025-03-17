import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

type Props = {
  bucketName: string;
  folderName: string;
  path: string;
};

export const useGetResourceFromBucketFolder = (props: Props) => {
  const { bucketName, folderName, path } = props;
  return useQuery({
    queryKey: ['bucket', bucketName, folderName, path],
    queryFn: async () => {
      // const { data, error } = await supabaseClient.rpc('get_resource', {
      //   bucket_name: bucketName,
      //   folder: folderName,
      //   file_name: path,
      // });
      const { data } = await supabaseClient.storage.from(bucketName).getPublicUrl(folderName + '/' + path);
      return data; // This should return the full URL
    },
    enabled: !!bucketName && !!folderName && !!path, // Only fetch if all params are provided
  });
};
