import React from 'react';
import { Cheltuiala } from '@/fake-api/fakePaymentApi.ts';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { apaCafeaEnum } from '@/pages/persoane/detalii/plati/components/FormularAdaugaModificaPlata.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { useFormAdaugaModificaCheltuiala } from '@/pages/cheltuieli/lista/hooks/useFormAdaugaModificaCheltuiala.tsx';
import { useAdaugaModificaCheltuialaMutation } from '@/pages/cheltuieli/hooks/useAdaugaModificaCheltuialaMutation.tsx';

type Props = {
  close: () => void;
  cheltuiala?: Cheltuiala;
};

export type AdaugaModificaCheltuiala = Omit<Cheltuiala, 'id' | 'data'>;

export const FormularAdaugaModificaCheltuiala: React.FC<Props> = (props) => {
  const { close, cheltuiala } = props;
  const form = useFormAdaugaModificaCheltuiala({ defaultValues: cheltuiala });
  const { mutate, isPending } = useAdaugaModificaCheltuialaMutation({ cheltuiala, close });

  const onSubmit = (data: AdaugaModificaCheltuiala) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <FormField
          control={form.control}
          name="suma"
          defaultValue={0}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Suma</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="1000 lei..."
                  type="number"
                  onChange={(event) => {
                    field.onChange(parseInt(event.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pentru"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pentru</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selectează pentru ce plătești" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pentru</SelectLabel>
                      {Object.entries(apaCafeaEnum).map(([key, value]) => (
                        <SelectItem
                          key={key}
                          value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descriere"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descriere</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descriere..."
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
          {!cheltuiala ? 'Adauga' : 'Modifica'}
        </Button>
      </form>
    </Form>
  );
};
