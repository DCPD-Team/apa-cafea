import { AdaugaModificaSugestieCheltuiala } from '@/pages/cheltuieli/sugestii/components/FormularAdaugaModificaSugestieCheltuiala.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  expense_proposal: z.string().min(1, 'Propunerea este obligatorie'),
  justification: z.string().optional(),
  link_to_resource: z.string().optional(),
});

export const useFormAdaugaModificaSugestieCheltuiala = ({
  defaultValues,
}: {
  defaultValues?: AdaugaModificaSugestieCheltuiala;
}) => {
  return useForm<AdaugaModificaSugestieCheltuiala>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues,
  });
};
