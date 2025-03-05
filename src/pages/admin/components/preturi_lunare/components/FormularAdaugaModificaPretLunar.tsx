import React from 'react';
import { MonthlyPrices } from '@/types/types.ts';
import { useFormAdaugaModificaPretLunar } from '@/pages/admin/components/preturi_lunare/hooks/useFormAdaugaModificaPretLunar.tsx';
import { useAdaugaModificaPretLunarMutation } from '@/pages/admin/components/preturi_lunare/hooks/useAdaugaModificaPretLunarMutation.tsx';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Loader2 } from 'lucide-react';
import { useGetExpenseTypes } from '@/pages/persoane/hooks/useGetExpenseTypes.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { useGetYearsOfPayments } from '@/pages/persoane/hooks/useGetYearsOfPayments.tsx';
import { useGetMonths } from '@/hooks/useGetMonths.tsx';

type Props = {
  close: () => void;
  monthlyPrice?: MonthlyPrices;
  // year: number;
  // expenseTypeId: string;
};

export type AdaugaModificaPretLunar = Pick<MonthlyPrices, 'price_value'>;

export const FormularAdaugaModificaPretLunar: React.FC<Props> = ({ close, monthlyPrice }) => {
  const { data: expenses } = useGetExpenseTypes();
  const { data: yearsData } = useGetYearsOfPayments();
  const yearsArray: string[] = (yearsData ?? []) as string[];
  const { data: months } = useGetMonths();

  const form = useFormAdaugaModificaPretLunar({
    defaultValues: { price_value: monthlyPrice?.price_value ? monthlyPrice.price_value : null },
  });

  const { mutate, isPending } = useAdaugaModificaPretLunarMutation({ pretLunar: monthlyPrice, close: close });

  const onSubmit = (data: AdaugaModificaPretLunar) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <FormField
          control={form.control}
          name="price_value"
          defaultValue={undefined}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Introdu valoarea pretului</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={'...40 RON'}
                  type="number"
                  onChange={(event) => {
                    field.onChange(parseInt(event.target.value));
                  }}
                  value={field.value?.toString()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!monthlyPrice && (
          <>
            <FormField
              control={form.control}
              name="month_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>An</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selectează luna" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Luna</SelectLabel>
                          {months?.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id}>
                              {item.name}
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
                        <SelectValue placeholder="Selectează anul" />
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
              name="expense_type_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pentru</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selectează tipul de cheltuiala" />
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
          </>
        )}
        <Button
          type="submit"
          disabled={!form.formState.isValid || isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {!monthlyPrice?.id ? 'Adauga' : 'Modifica'}
        </Button>
      </form>
    </Form>
  );
};
