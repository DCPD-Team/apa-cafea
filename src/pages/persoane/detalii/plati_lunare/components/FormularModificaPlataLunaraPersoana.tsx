import React, { useEffect } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useFormModificaPlataLunaraPersoana } from '@/pages/persoane/detalii/plati_lunare/hooks/useFormModificaPlataLunaraPersoana.tsx';
import { useModificaPlataLunaraPersoanaMutation } from '@/pages/persoane/detalii/plati_lunare/hooks/useModificaPlataLunaraPersoanaMutation.tsx';
import { MonthlyPayments } from '@/types/types.ts';
import { Checkbox } from '@/components/ui/checkbox.tsx';

type Props = {
  close: () => void;
  statusLunar: MonthlyPayments;
  whatForId: string;
};

export type ModificaPlataLunara = {
  active: boolean;
  paid: boolean;
};

export const FormularModificaPlataLunaraPersoana: React.FC<Props> = ({ statusLunar, whatForId, close }) => {
  const { id: userId } = useParams();
  const form = useFormModificaPlataLunaraPersoana({
    defaultValues: { paid: !!statusLunar.paid, active: !!statusLunar.active },
  });
  const { mutate, isPending } = useModificaPlataLunaraPersoanaMutation({
    plataLunara: statusLunar,
    personId: userId ?? '',
    whatForId,
    close,
  });

  const onSubmit = (data: ModificaPlataLunara) => {
    mutate(data);
  };

  const active = form.watch('active');

  useEffect(() => {
    if (!active) form.setValue('paid', false, { shouldValidate: true });
  }, [active]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <FormField
          control={form.control}
          name="active"
          defaultValue={undefined}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activ/Inactiv</FormLabel>
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

        {active && (
          <FormField
            control={form.control}
            name="paid"
            defaultValue={undefined}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Achitat/Neachitat</FormLabel>
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
        )}

        <Button
          type="submit"
          disabled={!form.formState.isValid || isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {!statusLunar.id ? 'Adauga' : 'Modifica'}
        </Button>
      </form>
    </Form>
  );
};
