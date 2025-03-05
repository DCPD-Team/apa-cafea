import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdaugaModificaPretLunar } from '@/pages/admin/components/preturi_lunare/components/FormularAdaugaModificaPretLunar.tsx';
import { MonthlyPrices } from '@/types/types.ts';

const formSchema = z.object({
  price_value: z.number().optional(),
  month_id: z.string().optional(),
  expense_type_id: z.string().optional(),
  year: z.string().optional(),
});

export const useFormAdaugaModificaPretLunar = ({ defaultValues }: { defaultValues?: AdaugaModificaPretLunar }) => {
  return useForm<Omit<MonthlyPrices, 'id'>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues,
  });
};
