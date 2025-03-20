import React, { useEffect, useMemo } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useFormModificaPlataLunaraPersoana } from '@/pages/persoane/detalii/plati_lunare/hooks/useFormModificaPlataLunaraPersoana.tsx';
import { useModificaPlataLunaraPersoanaMutation } from '@/pages/persoane/detalii/plati_lunare/hooks/useModificaPlataLunaraPersoanaMutation.tsx';
import { MonthlyPayments } from '@/types/types.ts';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { useGetRemainingBalancePersoana } from '@/pages/persoane/detalii/informatii/hooks/useGetRemainingBalancePersoana.tsx';
import { useGetMonthlyPrice } from '@/pages/persoane/detalii/plati_lunare/hooks/useGetMonthlyPrice.tsx';

type Props = {
  close: () => void;
  statusLunar: MonthlyPayments;
  targetYear: number;
  expenseTypeId: string;
};

export type ModificaPlataLunara = {
  active: boolean;
  paid: boolean;
};

export const FormularModificaPlataLunaraPersoana: React.FC<Props> = ({
  statusLunar,
  expenseTypeId,
  targetYear,
  close,
}) => {
  const { id: userId } = useParams();
  const form = useFormModificaPlataLunaraPersoana({
    defaultValues: { paid: !!statusLunar.paid, active: !!statusLunar.active },
  });
  const { mutate, isPending } = useModificaPlataLunaraPersoanaMutation({
    plataLunara: statusLunar,
    personId: userId ?? '',
    targetYear,
    expenseTypeId,
    close,
  });
  const { data: balance } = useGetRemainingBalancePersoana({ personId: userId ?? '' });
  const { data: monthPrice } = useGetMonthlyPrice({
    monthId: statusLunar.month_id,
    year: targetYear,
    expenseTypeId: expenseTypeId,
  });

  const onSubmit = (data: ModificaPlataLunara) => {
    mutate(data);
  };

  const active = form.watch('active');

  const canPay = useMemo(() => {
    if (!active) return false;
    if (statusLunar.paid) return true;
    return !!(
      balance &&
      monthPrice &&
      balance.find((x) => x.expense_type_id === expenseTypeId)?.remaining_balance >= monthPrice.price_value
    );
  }, [monthPrice, balance, active, statusLunar.paid]);

  useEffect(() => {
    if (!active) form.setValue('paid', false, { shouldValidate: true });
  }, [active]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8">
        <FormField
          control={form.control}
          name="active"
          defaultValue={undefined}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activ/Inactiv </FormLabel>
              <FormControl>
                <Checkbox
                  {...field}
                  checked={field.value}
                  value={undefined}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {canPay ? (
          <FormField
            control={form.control}
            name="paid"
            defaultValue={undefined}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Achitat/Neachitat </FormLabel>
                <FormControl>
                  <Checkbox
                    {...field}
                    checked={field.value}
                    value={undefined}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <span className={'text-sm text-destructive'}>Nu poți efectua această plată.</span>
        )}

        <Button
          type="submit"
          disabled={!form.formState.isValid || isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {!statusLunar.id ? 'Adaugă' : 'Modifică'}
        </Button>
      </form>
    </Form>
  );
};
