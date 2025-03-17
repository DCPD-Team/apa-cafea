import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Replace with your UI button component
import { Input } from '@/components/ui/input';
import { useUploadAvatarPicture } from '@/hooks/useUploadAvatarPicture.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'; // Replace with your UI input component

export const AvatarUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const uploadAvatar = useUploadAvatarPicture();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    uploadAvatar.mutate(
      { file: selectedFile },
      {
        onSuccess: (filePath) => {
          alert(`Avatar uploaded successfully! Path: ${filePath}`);
        },
        onError: (error) => {
          alert(`Upload failed: ${error.message}`);
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schimbă avatarul</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="rounded border p-2"
          />
          <Button
            onClick={handleUpload}
            disabled={uploadAvatar.isPending}
            className="rounded bg-blue-500 p-2 text-white">
            {uploadAvatar.isPending ? 'Uploading...' : 'Upload Avatar'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
