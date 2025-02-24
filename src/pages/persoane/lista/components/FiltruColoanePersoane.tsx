import React, { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { PersonFilter } from '@/pages/persoane/lista/ListaPersoane.tsx';
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

type Props = {
  currentFilter: PersonFilter;
  setFilter: (filters: PersonFilter) => void;
};

type PersonFilterForm = Omit<PersonFilter, 'water' | 'coffee'> & {
  participaApa?: string;
  participaCafea?: string;
};

export const FiltruColoanePersoane: React.FC<Props> = ({ currentFilter, setFilter }) => {
  const [open, setOpen] = useState(false);
  const [openApa, setOpenApa] = useState(false);
  const [openCafea, setOpenCafea] = useState(false);
  const [keyApa, setKeyApa] = React.useState(+new Date());
  const [keyCafea, setKeyCafea] = React.useState(+new Date());

  const form = useForm<PersonFilterForm>({
    mode: 'onChange',
    defaultValues: {
      last_name: currentFilter.last_name ?? '',
      first_name: currentFilter.first_name ?? '',
      participaApa: currentFilter.water === true ? 'true' : currentFilter.water === false ? 'false' : '',
      participaCafea: currentFilter.coffee === true ? 'true' : currentFilter.coffee === false ? 'false' : '',
    },
  });

  const onSubmit = (data: PersonFilterForm) => {
    setFilter({
      ...data,
      water: data.participaApa === 'true' ? true : data.participaApa === 'false' ? false : undefined,
      coffee: data.participaCafea === 'true' ? true : data.participaCafea === 'false' ? false : undefined,
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

            <FormField
              control={form.control}
              name="participaApa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apǎ</FormLabel>
                  <FormControl>
                    <Select
                      key={keyApa}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={undefined}
                      open={openApa}
                      onOpenChange={(o) => setOpenApa(o)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Participa apǎ?" />
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
                            form.setValue('participaApa', '');
                            setKeyApa(+new Date());
                            setOpenApa(false);
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
              name="participaCafea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cafea</FormLabel>
                  <FormControl>
                    <Select
                      key={keyCafea}
                      onValueChange={field.onChange}
                      defaultValue={undefined}
                      value={field.value}
                      open={openCafea}
                      onOpenChange={(o) => setOpenCafea(o)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Participa cafea?" />
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
                            form.setValue('participaCafea', '');
                            setKeyCafea(+new Date());
                            setOpenCafea(false);
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
