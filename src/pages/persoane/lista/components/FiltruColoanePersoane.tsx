import React, { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { PersonFilter } from '@/pages/persoane/lista/ListaPersoane.tsx';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';

type Props = {
  currentFilter: PersonFilter;
  setFilter: (filters: PersonFilter) => void;
};

export const FiltruColoanePersoane: React.FC<Props> = ({ currentFilter, setFilter }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<PersonFilter>({
    mode: 'onChange',
    defaultValues: currentFilter,
  });

  const onSubmit = (data: PersonFilter) => {
    setFilter(data);
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(o) => setOpen(o)}>
      <PopoverTrigger asChild>
        <Button variant="outline">Filtru</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8">
            <FormField
              control={form.control}
              name="nume"
              defaultValue={''}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nume</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nume"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prenume"
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

            <FormField
              control={form.control}
              name="participaApa"
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
              name="participaCafea"
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
              disabled={!form.formState.isValid}>
              Filtreazǎ
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
