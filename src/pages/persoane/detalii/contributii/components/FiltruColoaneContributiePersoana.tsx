import React, { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { IoFilterOutline } from 'react-icons/io5';
import { Input } from '@/components/ui/input.tsx';
import { ContributiiPersoanaFilter } from '@/pages/persoane/detalii/contributii/ListaContributiiPersoana.tsx';
import { useGetExpenseTypes } from '@/pages/persoane/hooks/useGetExpenseTypes.tsx';

type Props = {
  currentFilter: ContributiiPersoanaFilter;
  setFilter: (filters: ContributiiPersoanaFilter) => void;
};

export type ContributiePersoanaFilterForm = {
  expense_type_id?: string;
  sumaDeLa?: number;
  sumaPanaLa?: number;
};

export const FiltruColoaneContributiePersoana: React.FC<Props> = ({ currentFilter, setFilter }) => {
  const { data: expenseTypes } = useGetExpenseTypes();

  const [open, setOpen] = useState(false);
  const [openPentru, setOpenPentru] = useState(false);
  const [keyPentru, setKeyPentru] = React.useState(+new Date());

  const form = useForm<ContributiePersoanaFilterForm>({
    mode: 'onChange',
    defaultValues: {
      expense_type_id: currentFilter.expense_type_id ?? ('' as unknown as undefined),
      sumaDeLa: currentFilter.payment?.[0] ?? ('' as unknown as undefined),
      sumaPanaLa: currentFilter.payment?.[1] ?? ('' as unknown as undefined),
    },
  });

  const onSubmit = (data: ContributiePersoanaFilterForm) => {
    setFilter({
      expense_type_id: data.expense_type_id,
      payment: [data.sumaDeLa, data.sumaPanaLa],
    });
    setOpen(false);
  };

  if (!expenseTypes) return null;

  return (
    <Popover
      open={open}
      onOpenChange={(o) => setOpen(o)}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <IoFilterOutline />
          Filtre
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8">
            <FormField
              control={form.control}
              name="expense_type_id"
              defaultValue={undefined}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pentru</FormLabel>
                  <FormControl>
                    <Select
                      key={keyPentru}
                      onValueChange={field.onChange}
                      value={field.value}
                      open={openPentru}
                      onOpenChange={(o) => setOpenPentru(o)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selectează categoria de cheltuială" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {expenseTypes.map((value) => (
                            <SelectItem
                              key={value.id}
                              value={value.id}>
                              {value.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <SelectSeparator />
                        <Button
                          type="button"
                          className="w-full px-2"
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            form.setValue('expense_type_id', '' as unknown as undefined);
                            setKeyPentru(+new Date());
                            setOpenPentru(false);
                          }}>
                          Clear
                        </Button>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sumaDeLa"
              defaultValue={undefined}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suma de la:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="0 lei..."
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
              name="sumaPanaLa"
              defaultValue={undefined}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suma pânǎ la:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="100 lei..."
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

            <div className={'flex items-center gap-2'}>
              <Button
                type="submit"
                disabled={!form.formState.isValid}>
                Filtreazǎ
              </Button>
              <Button
                type={'button'}
                variant={'destructive'}
                onClick={() => {
                  setFilter({});
                  form.reset();
                  setOpen(false);
                }}>
                Reseteazǎ
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
