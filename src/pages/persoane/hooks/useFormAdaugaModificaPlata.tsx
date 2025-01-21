import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdaugaModificaPlata } from '@/pages/persoane/detalii/plati/components/FormularAdaugaModificaPlata.tsx';

const formSchema = z.object({
  suma: z.number().min(0, 'Suma trebuie să fie mai mare ca 0'),
  pentru: z.enum(['apa', 'cafea']),
});

export const useFormAdaugaModificaPlata = ({ defaultValues }: { defaultValues?: AdaugaModificaPlata }) => {
  return useForm<AdaugaModificaPlata>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues,
  });
};
