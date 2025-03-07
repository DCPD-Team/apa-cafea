import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabaseClient } from '@/supabase/supabase.ts';

export const useUploadAvatarPicture = () => {
  const queryClient = useQueryClient();
  // upload->aceeasi tranzactie{iti ceva in ui asculti pentru succes dupa care-> face update pe tabela users cu path}.

  return useMutation({
    mutationFn: async ({ file, userId }: { file: File; userId: string }) => {
      if (!file) throw new Error('No file provided');

      const filePath = `avatar/${userId}/${file.name}`;

      const { error: uploadError } = await supabaseClient.storage
        .from('pictures') // The bucket name
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error('Failed to upload image');
      }

      const { error: updateError } = await supabaseClient
        .from('users')
        .update({ picture_path: filePath }) // Store only the path
        .eq('id', userId);

      if (updateError) {
        console.error('User update error:', updateError);
        throw new Error('Failed to update user with avatar URL');
      }

      queryClient.invalidateQueries({ queryKey: ['user', userId] });

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
