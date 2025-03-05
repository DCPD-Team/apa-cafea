import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdaugaModificaContributie } from '@/pages/persoane/detalii/contributii/components/FormularAdaugaModificaContributie.tsx';

const formSchema = z.object({
  payment: z.number().min(0, 'Suma trebuie să fie mai mare ca 0'),
  expense_type_id: z.string(),
});

export const useFormAdaugaModificaContributie = ({ defaultValues }: { defaultValues?: AdaugaModificaContributie }) => {
  return useForm<AdaugaModificaContributie>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues,
  });
};
