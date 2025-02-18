import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdaugaModificaCheltuiala } from '@/pages/cheltuieli/lista/components/FormularAdaugaModificaCheltuiala.tsx';

const formSchema = z.object({
  suma: z.number().min(0, 'Suma trebuie să fie mai mare ca 0'),
  pentru: z.enum(['apa', 'cafea']),
  descriere: z.string().min(1, 'Descierea este obligatorie'),
});

export const useFormAdaugaModificaCheltuiala = ({ defaultValues }: { defaultValues?: AdaugaModificaCheltuiala }) => {
  return useForm<AdaugaModificaCheltuiala>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues,
  });
};
