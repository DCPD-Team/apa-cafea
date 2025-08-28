import React from 'react';
import { SugestieCheltuiala } from '@/types/types.ts';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form.tsx';
import { useFormAdaugaModificaSugestieCheltuiala } from '@/pages/cheltuieli/sugestii/hooks/useFormAdaugaModificaSugestieCheltuiala.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useAdaugaModificaSugestieCheltuialaMutation } from '@/pages/cheltuieli/sugestii/hooks/useAdaugaModificaSugestieCheltuialaMutation.tsx';
import { Loader2 } from 'lucide-react';

type Props = {
  close: () => void;
  sugestie?: SugestieCheltuiala;
};

export type AdaugaModificaSugestieCheltuiala = Omit<
  SugestieCheltuiala,
  'id' | 'created_at' | 'updated_at' | 'admin_decision' | 'admin_decision_justification'
>;

export const FormularAdaugaModificaSugestieCheltuiala: React.FC<Props> = (props) => {
  const { close, sugestie } = props;
  const form = useFormAdaugaModificaSugestieCheltuiala({ defaultValues: sugestie });
  const { mutate, isPending } = useAdaugaModificaSugestieCheltuialaMutation({ sugestie: sugestie, close: close });
  const onSubmit = (data: AdaugaModificaSugestieCheltuiala) => {
    mutate(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <FormField
          control={form.control}
          name="expense_proposal"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Propunere</FormLabel>
              <FormControl>
                <Input
                  placeholder="Vrem pizza..."
                  {...field}
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="justification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Justificare propunere</FormLabel>
              <FormControl>
                <Input
                  placeholder="Pentru ca e buna..."
                  {...field}
                  onChange={field.onChange}
                  value={field.value ?? ''}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link_to_resource"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link sugestie</FormLabel>
              <FormControl>
                <Input
                  placeholder="Daca ai recomandare, drop the link..."
                  {...field}
                  onChange={field.onChange}
                  value={field.value ?? ''}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!form.formState.isValid || isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {sugestie?.id ? 'Modifică' : 'Adaugă'}
        </Button>
      </form>
    </Form>
  );
};
