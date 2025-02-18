import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdaugaModificaPersoana } from '@/pages/persoane/lista/components/FormularAdaugaModificaPersoana.tsx';
import { z } from 'zod';

const formSchema = z.object({
  last_name: z.string().min(2, 'Numele trebuie sa aiba minim 2 caractere').max(50),
  first_name: z.string().min(2).max(50),
  water: z.boolean(),
  coffee: z.boolean(),
});

export const useFormAdaugaModificaPersoana = ({ defaultValues }: { defaultValues?: AdaugaModificaPersoana }) => {
  return useForm<AdaugaModificaPersoana>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues,
  });
};
