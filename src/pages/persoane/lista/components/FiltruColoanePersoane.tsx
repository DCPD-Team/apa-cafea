import React, { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { PersonFilter } from '@/pages/persoane/lista/ListaPersoane.tsx';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { IoFilterOutline } from 'react-icons/io5';

type Props = {
  currentFilter: PersonFilter;
  setFilter: (filters: PersonFilter) => void;
};

export const FiltruColoanePersoane: React.FC<Props> = ({ currentFilter, setFilter }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<PersonFilter>({
    mode: 'onChange',
    defaultValues: {
      last_name: currentFilter.last_name ?? '',
      first_name: currentFilter.first_name ?? '',
    },
  });

  const onSubmit = (data: PersonFilter) => {
    setFilter({
      ...data,
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
              name="last_name"
              defaultValue={''}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nume</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Nume"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="first_name"
              defaultValue={''}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prenume</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Prenume"
                      {...field}
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
