import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useGetAvatarPicture = () => {
  // return useQuery({
  //   queryKey: ['avatar'],
  //   queryFn: async () => {
  //     return supabaseClient.storage.from('pictures').getPublicUrl(img).data.publicUrl;
  //   },
  // });

  return useQuery({
    queryKey: ['avatar'],
    queryFn: async () => {
      // Step 1: Get the avatar image path from auth.users (via RPC)
      const { data: avatarPath, error: avatarError } = await supabaseClient.rpc('get_user_avatar');

      if (avatarError) {
        console.error('Error fetching avatar path:', avatarError);
        throw new Error('Failed to retrieve avatar path.');
      }

      if (!avatarPath) return null;

      const { data } = supabaseClient.storage.from('pictures').getPublicUrl(avatarPath);

      if (!data.publicUrl) {
        throw new Error('Failed to retrieve avatar file from storage.');
      }

      return data.publicUrl;
    },
  });
};
