import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetAvatarPicture = ({ img }: { img: string }) => {
  return useQuery({
    queryKey: ['avatar'],
    queryFn: async () => {
      return supabaseClient.storage.from('pictures').getPublicUrl(img).data.publicUrl;
    },
  });
};
