import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdaugaModificaCheltuiala } from '@/pages/cheltuieli/lista/components/FormularAdaugaModificaCheltuiala.tsx';

const formSchema = z.object({
  sum: z.number().min(0, 'Suma trebuie să fie mai mare ca 0'),
  year: z.string(),
  expense_type_id: z.enum(['apa', 'cafea']),
  description: z.string().min(1, 'Descierea este obligatorie'),
});

export const useFormAdaugaModificaCheltuiala = ({ defaultValues }: { defaultValues?: AdaugaModificaCheltuiala }) => {
  return useForm<AdaugaModificaCheltuiala>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues,
  });
};
