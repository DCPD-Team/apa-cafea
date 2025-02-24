import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useForm } from 'react-hook-form';
import { CheltuialaFilter } from '@/pages/cheltuieli/lista/ListaCheltuieli.tsx';
import { IoFilterOutline } from 'react-icons/io5';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';

type Props = {
  currentFilter: CheltuialaFilter;
  setFilter: (filters: CheltuialaFilter) => void;
};

type CheltuialaFilterForm = {
  sumaDeLa?: number;
  sumaPanaLa?: number;
  dataStart?: string;
  dataEnd?: string;
};

export const FiltruColoaneCheltuieli: React.FC<Props> = ({ currentFilter, setFilter }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<CheltuialaFilterForm>({
    mode: 'onChange',
    defaultValues: {
      sumaDeLa: currentFilter.sum?.[0] ?? ('' as unknown as undefined),
      sumaPanaLa: currentFilter.sum?.[1] ?? ('' as unknown as undefined),
      dataStart: currentFilter.created_at?.[0] ?? ('' as unknown as undefined),
      dataEnd: currentFilter.created_at?.[1] ?? ('' as unknown as undefined),
    },
  });

  const onSubmit = (data: CheltuialaFilterForm) => {
    setFilter({
      sum: [data.sumaDeLa, data.sumaPanaLa],
      created_at: [data.dataStart, data.dataEnd],
    });
    setOpen(false);
  };

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
              name="sumaDeLa"
              defaultValue={undefined}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sumǎ de la:</FormLabel>
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
                  <FormLabel>Sumǎ pânǎ la:</FormLabel>
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

            <FormField
              control={form.control}
              name="dataStart"
              defaultValue={undefined}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Datǎ de la:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dataEnd"
              defaultValue={undefined}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Datǎ pânǎ la:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
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
