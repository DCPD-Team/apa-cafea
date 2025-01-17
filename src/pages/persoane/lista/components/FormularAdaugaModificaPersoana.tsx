import React from 'react';
import { useForm } from 'react-hook-form';
import { Person } from '@/fake-api/fakePaymentApi.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type Props = {};

type AdaugaModificaPersoana = Omit<Person, 'id' | 'dataInscriere'>;

const formSchema = z.object({
  nume: z.string().min(2, 'Numele trebuie sa aiba minim 2 caractere').max(50),
  prenume: z.string().min(2).max(50),
  participaApa: z.boolean(),
  participaCafea: z.boolean(),
});

export const FormularAdaugaModificaPersoana: React.FC<Props> = (props) => {
  const { getValues, setValue, formState, trigger, register, control } = useForm<AdaugaModificaPersoana>({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(formSchema),
  });

  return <div></div>;
};
