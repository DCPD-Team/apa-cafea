import React from 'react';
import { Cheltuiala } from '@/types/types.ts';
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
import { Textarea } from '@/components/ui/textarea.tsx';
import { useFormAdaugaModificaCheltuiala } from '@/pages/cheltuieli/lista/hooks/useFormAdaugaModificaCheltuiala.tsx';
import { useAdaugaModificaCheltuialaMutation } from '@/pages/cheltuieli/hooks/useAdaugaModificaCheltuialaMutation.tsx';
import { useGetExpenseTypes } from '@/pages/persoane/hooks/useGetExpenseTypes.tsx';
import { useGetYearsOfPayments } from '@/pages/persoane/hooks/useGetYearsOfPayments.tsx';

type Props = {
  close: () => void;
  cheltuiala?: Cheltuiala;
};

export type AdaugaModificaCheltuiala = Omit<Cheltuiala, 'id' | 'created_at' | 'updated_at'>;

export const FormularAdaugaModificaCheltuiala: React.FC<Props> = (props) => {
  const { close, cheltuiala } = props;
  const form = useFormAdaugaModificaCheltuiala({ defaultValues: cheltuiala });
  const { mutate, isPending } = useAdaugaModificaCheltuialaMutation({ cheltuiala, close });
  const { data: expenses } = useGetExpenseTypes();

  const { data: yearsData } = useGetYearsOfPayments();
  const yearsArray: string[] = (yearsData ?? []) as string[];

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
          name="sum"
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
          name="expense_type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pentru</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează pentru ce plătești" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pentru</SelectLabel>
                      {expenses?.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.id}>
                          {item.id}
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
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>An</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează anul pentru care plătești" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>An</SelectLabel>
                      {yearsArray.map((value) => (
                        <SelectItem
                          key={value}
                          value={value.toString()}>
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
          name="description"
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
