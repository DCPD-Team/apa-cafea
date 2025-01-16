import React from 'react';
import { FakePersonApi, Person } from '@/fake-api/fakePaymentApi.ts';
import { Button } from '@/components/ui/button.tsx';
import { FaEdit, FaInfo, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FakeApiResponse } from '@/fake-api/core/fakeApi.ts';

type Props = {
  persoana: Person;
};

export const ActiuniPersoana: React.FC<Props> = ({ persoana }) => {
  const queryClient = useQueryClient();

  const { mutate: sterge, isPending } = useMutation<FakeApiResponse, FakeApiResponse, string>({
    mutationFn: (id) => {
      return FakePersonApi.delete(id);
    },
    onError: (response) => {
      //toast
    },
    onSuccess: (response) => {
      //toast + close
      queryClient.invalidateQueries({
        queryKey: ['persoane'],
      });
    },
  });

  return (
    <div className="flex gap-1">
      <Button asChild={true}>
        <NavLink to={`/persoana/${persoana.id}`}>
          <FaInfo /> Detalii
        </NavLink>
      </Button>
      <Button variant="outline">
        <FaEdit /> Edit
      </Button>
      <Button
        variant="destructive"
        onClick={() => sterge(persoana.id)}>
        <FaTrash /> Sterge
      </Button>
    </div>
  );
};
