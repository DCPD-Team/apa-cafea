import React from 'react';
import { ApaSauCafea, Contribution } from '@/types/types.ts';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
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
import { useParams } from 'react-router-dom';
import { useFormAdaugaModificaContributie } from '@/pages/persoane/detalii/contributii/hooks/useFormAdaugaModificaContributie.tsx';
import { useAdaugaModificaContributieMutation } from '@/pages/persoane/detalii/contributii/hooks/useAdaugaModificaContributieMutation.tsx';

type Props = {
  close: () => void;
  contributie?: Contribution;
};

export type AdaugaModificaContributie = Omit<Contribution, 'id' | 'created_at' | 'person_id'>;

export const apaCafeaEnum: Record<ApaSauCafea, string> = {
  apa: 'Apa',
  cafea: 'Cafea',
};

export const FormularAdaugaModificaContributie: React.FC<Props> = ({ contributie, close }) => {
  const { id: userId } = useParams();
  const form = useFormAdaugaModificaContributie({ defaultValues: contributie });
  const { mutate, isPending } = useAdaugaModificaContributieMutation({
    contributie: contributie,
    personId: userId ?? '',
    close,
  });

  const onSubmit = (data: AdaugaModificaContributie) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <FormField
          control={form.control}
          name="payment"
          defaultValue={undefined}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Suma</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="1000 lei..."
                  type="number"
                  onChange={(event) => {
                    field.onChange(event.target.value ? parseInt(event.target.value) : undefined);
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
                      {Object.entries(apaCafeaEnum).map(([key, value]) => (
                        <SelectItem
                          key={key}
                          value={key}>
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

        <Button
          type="submit"
          disabled={!form.formState.isValid || isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {!contributie ? 'Adauga' : 'Modifica'}
        </Button>
      </form>
    </Form>
  );
};
