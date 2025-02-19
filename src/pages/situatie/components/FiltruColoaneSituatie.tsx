import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useForm } from 'react-hook-form';
import { IoFilterOutline } from 'react-icons/io5';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { SituatieFilter } from '@/pages/situatie/components/TabelSituatie.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';

type Props = {
  currentFilter: SituatieFilter;
  setFilter: (filters: SituatieFilter) => void;
};

type SituatieFilterForm = Omit<SituatieFilter, 'laZi'> & {
  laZi?: string;
};

export const FiltruColoaneSituatie: React.FC<Props> = ({ currentFilter, setFilter }) => {
  const [open, setOpen] = useState(false);
  const [openLaZi, setOpenLaZi] = useState(false);
  const [key, setKey] = React.useState(+new Date());

  const form = useForm<SituatieFilterForm>({
    mode: 'onChange',
    defaultValues: {
      fullName: currentFilter.fullName ?? '',
      laZi: currentFilter.laZi === true ? 'true' : currentFilter.laZi === false ? 'false' : '',
    },
  });

  const onSubmit = (data: SituatieFilterForm) => {
    setFilter({
      fullName: data.fullName,
      laZi: data.laZi === 'true' ? true : data.laZi === 'false' ? false : undefined,
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
              name="fullName"
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
              name="laZi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Este la zi?</FormLabel>
                  <FormControl>
                    <Select
                      key={key}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={undefined}
                      open={openLaZi}
                      onOpenChange={(o) => setOpenLaZi(o)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Da / Nu ?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={'true'}>Da</SelectItem>
                          <SelectItem value={'false'}>Nu</SelectItem>
                        </SelectGroup>
                        <SelectSeparator />
                        <Button
                          type="button"
                          className="w-full px-2"
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            form.setValue('laZi', '');
                            setKey(+new Date());
                            setOpenLaZi(false);
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
