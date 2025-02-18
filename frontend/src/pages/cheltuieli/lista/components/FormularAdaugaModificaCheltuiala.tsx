import React from 'react';
import { Cheltuiala } from '@/fake-api/fakePaymentApi.ts';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  close: () => void;
  cheltuiala?: Cheltuiala;
};

const schema = z.object({
  descriere: z.string().min(1, 'Descrierea este obligatorie'),
  suma: z.number().min(0, 'Suma trebuie să fie pozitivă'),
  persoana: z.string().min(1, 'Persoana este obligatorie'),
  data: z.string().min(1, 'Data este obligatorie'),
});

type FormValues = z.infer<typeof schema>;

export const FormularAdaugaModificaCheltuiala: React.FC<Props> = ({ close, cheltuiala }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: cheltuiala
      ? {
          descriere: cheltuiala.descriere,
          suma: cheltuiala.suma,
          persoana: cheltuiala.persoana,
          data: cheltuiala.data.slice(0, 10), // Format YYYY-MM-DD
        }
      : {
          descriere: '',
          suma: 0,
          persoana: '',
          data: new Date().toISOString().slice(0, 10),
        },
  });

  const isPending = false; // We'll add mutation hook later

  const onSubmit = (data: FormValues) => {
    console.log('Submit:', data);
    close();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <FormField
          control={form.control}
          name="descriere"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descriere</FormLabel>
              <FormControl>
                <Input
                  placeholder="Cumpărături..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="suma"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sumă (RON)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="persoana"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Persoană</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ion Popescu..."
                  {...field}
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
          {!cheltuiala ? 'Adaugă' : 'Modifică'}
        </Button>
      </form>
    </Form>
  );
}; 