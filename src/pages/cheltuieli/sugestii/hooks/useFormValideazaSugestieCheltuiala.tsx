import { z } from 'zod';
import { ValideazaSugestieCheltuiala } from '@/pages/cheltuieli/sugestii/components/FormularValideazaSugestieCheltuiala.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  admin_decision: z.boolean().optional(),
  admin_decision_justification: z.string().optional(),
});

export const useFormValideazaSugestieCheltuiala = ({
  defaultValues,
}: {
  defaultValues?: ValideazaSugestieCheltuiala;
}) => {
  return useForm<ValideazaSugestieCheltuiala>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues,
  });
};
