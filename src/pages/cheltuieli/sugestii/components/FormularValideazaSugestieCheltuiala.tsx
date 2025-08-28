import React from 'react';
import { SugestieCheltuiala } from '@/types/types.ts';
import { useFormValideazaSugestieCheltuiala } from '@/pages/cheltuieli/sugestii/hooks/useFormValideazaSugestieCheltuiala.tsx';
import { useValideazaSugestieCheltuiala } from '@/pages/cheltuieli/sugestii/hooks/useValideazaSugestieCheltuiala.tsx';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox.tsx';

type Props = {
  close: () => void;
  sugestie?: SugestieCheltuiala;
};

export type ValideazaSugestieCheltuiala = {
  admin_decision: boolean;
  admin_decision_justification: string;
};

export const FormularValideazaSugestieCheltuiala: React.FC<Props> = (props) => {
  const { close, sugestie } = props;
  const form = useFormValideazaSugestieCheltuiala({
    defaultValues: {
      admin_decision: !!sugestie?.admin_decision,
      admin_decision_justification: sugestie?.admin_decision_justification
        ? sugestie?.admin_decision_justification
        : '',
    },
  });
  const { mutate, isPending } = useValideazaSugestieCheltuiala({ sugestie, close });
  const onSubmit = (data: ValideazaSugestieCheltuiala) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <FormField
          control={form.control}
          name="admin_decision"
          defaultValue={false}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aprobă/Dezaprobă </FormLabel>
              <FormControl>
                <Checkbox
                  {...field}
                  checked={field.value}
                  value={undefined}
                  onCheckedChange={field.onChange}
                  className="aria-hidden:false"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="admin_decision_justification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Justificare decizie</FormLabel>
              <FormControl>
                <Input
                  placeholder="Pentru ca asa vreau eu..."
                  {...field}
                  onChange={field.onChange}
                  value={field.value ? field.value : ''}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!form.formState.isValid || isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {'Aprobă'}
        </Button>
      </form>
    </Form>
  );
};
