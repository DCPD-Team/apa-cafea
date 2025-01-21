import React from 'react';
import { ApaSauCafea, Payment } from '@/fake-api/fakePaymentApi.ts';
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
import { useFormAdaugaModificaPlata } from '@/pages/persoane/hooks/useFormAdaugaModificaPlata.tsx';
import { useAdaugaModificaPlataMutation } from '@/pages/persoane/hooks/useAdaugaModificaPlataMutation.tsx';
import { useParams } from 'react-router-dom';

type Props = {
  close: () => void;
  plata?: Payment;
};

export type AdaugaModificaPlata = Omit<Payment, 'id' | 'data' | 'userId'>;

export const apaCafeaEnum: Record<ApaSauCafea, string> = {
  apa: 'Apa',
  cafea: 'Cafea',
};

export const FormularAdaugaModificaPlata: React.FC<Props> = ({ plata, close }) => {
  const { id: userId } = useParams();
  const form = useFormAdaugaModificaPlata({ defaultValues: plata });
  const { mutate, isPending } = useAdaugaModificaPlataMutation({ plata, userId, close });

  const onSubmit = (data: AdaugaModificaPlata) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <FormField
          control={form.control}
          name="suma"
          defaultValue={0}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Suma</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="1000 lei..."
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
          name="pentru"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pentru</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
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
          {!plata ? 'Adauga' : 'Modifica'}
        </Button>
      </form>
    </Form>
  );
};
