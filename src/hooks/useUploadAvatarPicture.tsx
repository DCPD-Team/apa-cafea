import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useUploadAvatarPicture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      if (!file) throw new Error('No file provided');

      const uniqueFileName = `${Date.now()}-${file.name}`;
      const filePath = `avatar/${uniqueFileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabaseClient.storage
        .from('pictures')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error('Failed to upload image');
      }

      // Call the RPC function to update avatar_image in auth.users
      const { error: rpcError } = await supabaseClient.rpc('update_avatar', {
        new_avatar_path: filePath,
      });

      if (rpcError) {
        console.error('RPC update error:', rpcError);

        // Optional: Delete uploaded file if DB update fails
        await supabaseClient.storage.from('pictures').remove([filePath]);

        throw new Error('Failed to update user avatar');
      }

      // Invalidate cache to trigger UI update
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['avatar'] });

      return filePath;
    },
    onSuccess: (filePath) => {
      console.log('Avatar uploaded successfully:', filePath);
    },
    onError: (error) => {
      console.error('Upload failed:', error);
    },
  });
};
