import { ExpenseType } from '@/types/types.ts';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().optional(),
});

export const useFormAdaugaModificaTipCheltuiala = ({ defaultValues }: { defaultValues?: Omit<ExpenseType, 'id'> }) => {
  return useForm<Omit<ExpenseType, 'id'>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues,
  });
};
