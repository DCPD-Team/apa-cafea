import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ModificaPlataLunara } from '@/pages/persoane/detalii/plati_lunare/components/FormularModificaPlataLunaraPersoana.tsx';

const formSchema = z
  .object({
    paid: z.boolean().optional(),
    active: z.boolean().optional(),
  })
  .refine((data) => {
    return !(data.active === false && data.paid === true);
  });

export const useFormModificaPlataLunaraPersoana = ({ defaultValues }: { defaultValues?: ModificaPlataLunara }) => {
  return useForm<ModificaPlataLunara>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues,
  });
};
