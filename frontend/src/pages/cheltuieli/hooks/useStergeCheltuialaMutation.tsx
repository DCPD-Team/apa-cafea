import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useStergeCheltuialaMutation = ({ shouldRedirect = true } = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      console.log('Delete cheltuiala:', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cheltuieli'] });
      
      if (shouldRedirect) {
        navigate('/cheltuieli');
      }
    },
  });
}; 