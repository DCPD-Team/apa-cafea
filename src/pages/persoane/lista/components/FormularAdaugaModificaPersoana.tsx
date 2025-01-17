import React from 'react';
import { useForm } from 'react-hook-form';
import { FakePersonApi, Person } from '@/fake-api/fakePaymentApi.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FakeApiResponse } from '@/fake-api/core/fakeApi.ts';
import { useToast } from '@/hooks/use-toast.ts';
import { Loader2 } from 'lucide-react';

type Props = {
  close: () => void;
  persoana?: Person;
};

type AdaugaModificaPersoana = Omit<Person, 'id' | 'dataInscriere'>;

const formSchema = z.object({
  nume: z.string().min(2, 'Numele trebuie sa aiba minim 2 caractere').max(50),
  prenume: z.string().min(2).max(50),
  participaApa: z.boolean(),
  participaCafea: z.boolean(),
});

export const FormularAdaugaModificaPersoana: React.FC<Props> = (props) => {
  const { close, persoana } = props;
  const form = useForm<AdaugaModificaPersoana>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: persoana,
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation<FakeApiResponse, FakeApiResponse, AdaugaModificaPersoana>({
    mutationFn: (data) => {
      if (!persoana) {
        return FakePersonApi.add({ ...data, dataInscriere: new Date().toISOString() });
      } else {
        return FakePersonApi.update(persoana.id, { ...data, dataInscriere: persoana.dataInscriere });
      }
    },
    onSuccess: (response) => {
      //toast + close
      queryClient.invalidateQueries({
        queryKey: ['persoane'],
      });

      close();
      toast({
        variant: 'default',
        title: 'Persoana a fost adaugata!',
        description: response.message,
      });
    },
  });

  const onSubmit = (data: AdaugaModificaPersoana) => {
    mutate(data);
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
                  placeholder="Popescu..."
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
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prenume</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ion..."
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
          disabled={!form.formState.isValid || isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {!persoana ? 'Adauga' : 'Modifica'}
        </Button>
      </form>
    </Form>
  );
};
