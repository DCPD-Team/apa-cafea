import React from 'react';
import { useForm } from 'react-hook-form';
import { FakePersonApi, Person } from '@/fake-api/fakePaymentApi.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FakeApiResponse } from '@/fake-api/core/fakeApi.ts';
import { MdDownloading } from 'react-icons/md';
import { Loader2 } from 'lucide-react';

type Props = {
  close: () => void;
};

type AdaugaModificaPersoana = Omit<Person, 'id' | 'dataInscriere'>;

const formSchema = z.object({
  nume: z.string().min(2, 'Numele trebuie sa aiba minim 2 caractere').max(50),
  prenume: z.string().min(2).max(50),
  participaApa: z.boolean(),
  participaCafea: z.boolean(),
});

export const FormularAdaugaModificaPersoana: React.FC<Props> = ({ close }) => {
  const form = useForm<AdaugaModificaPersoana>({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(formSchema),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<FakeApiResponse, FakeApiResponse, AdaugaModificaPersoana>({
    mutationFn: (persoana) => {
      return FakePersonApi.add({ ...persoana, dataInscriere: new Date().toISOString() });
    },
    onSuccess: (response) => {
      //toast + close
      close();
      queryClient.invalidateQueries({
        queryKey: ['persoane'],
      });
    },
  });

  const onSubmit = (date: AdaugaModificaPersoana) => {
    mutate(date);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <FormField
          control={form.control}
          name="nume"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nume</FormLabel>
              <FormControl>
                <Input
                  placeholder="Popescu.."
                  {...field}
                />
              </FormControl>
              <FormDescription>Hint</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prenume"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prenume</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ion.."
                  {...field}
                />
              </FormControl>
              <FormDescription>Hint</FormDescription>
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
              <div className={'flex items-center gap-2'}>
                <FormControl>
                  <Checkbox
                    {...field}
                    value={undefined}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Participa apa</FormLabel>
              </div>
              <FormDescription>Hint</FormDescription>
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
              <div className={'flex items-center gap-2'}>
                <FormControl>
                  <Checkbox
                    {...field}
                    value={undefined}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Participa cafea</FormLabel>
              </div>
              <FormDescription>Hint</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending || !form.formState.isValid}>
          {isPending && <Loader2 className="animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};
