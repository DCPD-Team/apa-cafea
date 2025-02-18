import React from 'react';
import { Person } from '@/fake-api/fakePaymentApi.ts';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Loader2 } from 'lucide-react';
import { useAdaugaModificaPersoanaMutation } from '@/pages/persoane/hooks/useAdaugaModificaPersoanaMutation.tsx';
import { useFormAdaugaModificaPersoana } from '@/pages/persoane/lista/hooks/useFormAdaugaModificaPersoana.tsx';

type Props = {
  close: () => void;
  persoana?: Person;
};

export type AdaugaModificaPersoana = Omit<Person, 'id' | 'created_at' | 'updated_at'>;

export const FormularAdaugaModificaPersoana: React.FC<Props> = (props) => {
  const { close, persoana } = props;
  const form = useFormAdaugaModificaPersoana({ defaultValues: persoana });
  const { mutate, isPending } = useAdaugaModificaPersoanaMutation({ persoana, close });

  const onSubmit = (data: AdaugaModificaPersoana) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <FormField
          control={form.control}
          name="last_name"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nume</FormLabel>
              <FormControl>
                <Input
                  placeholder="Popescu..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="first_name"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prenume</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ion..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="water"
          defaultValue={false}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    {...field}
                    checked={field.value}
                    value={undefined}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel> Participa apa</FormLabel>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coffee"
          defaultValue={false}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    {...field}
                    checked={field.value}
                    value={undefined}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel> Participa cafea</FormLabel>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!form.formState.isValid || isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {!persoana ? 'Adauga' : 'Modifica'}
        </Button>
      </form>
    </Form>
  );
};
