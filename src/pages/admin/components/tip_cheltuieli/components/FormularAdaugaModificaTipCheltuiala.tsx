import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Loader2 } from 'lucide-react';
import { useAdaugaModificaTipCheltuialaMutation } from '@/pages/admin/components/tip_cheltuieli/hooks/useAdaugaModificaTipCheltuialaMutation.tsx';
import { ExpenseType } from '@/types/types.ts';
import { useFormAdaugaModificaTipCheltuiala } from '@/pages/admin/components/tip_cheltuieli/hooks/useFormAdaugaModificaTipCheltuiala.tsx';
import { Input } from '@/components/ui/input.tsx';

export const FormularAdaugaModificaTipCheltuiala: React.FC<{ tipCheltuiala?: ExpenseType; close: () => void }> = ({
  tipCheltuiala,
  close,
}: {
  tipCheltuiala?: ExpenseType;
  close: () => void;
}) => {
  const form = useFormAdaugaModificaTipCheltuiala({
    defaultValues: { name: tipCheltuiala ? tipCheltuiala.name : '' },
  });

  const { mutate, isPending } = useAdaugaModificaTipCheltuialaMutation({ tipCheltuiala: tipCheltuiala, close: close });

  const onSubmit = (data: Omit<ExpenseType, 'id' | 'active'>) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Denumire cheltuială</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={field.onChange}
                  value={field.value ? field.value : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!form.formState.isValid || isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {!tipCheltuiala?.id ? 'Adaugă' : 'Modifică'}
        </Button>
      </form>
    </Form>
  );
};
