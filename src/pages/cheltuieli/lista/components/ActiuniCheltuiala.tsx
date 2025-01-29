import React from 'react';
import { Cheltuiala } from '@/fake-api/fakePaymentApi.ts';
import { Button } from '@/components/ui/button.tsx';
import { FaTrash } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import { useStergeCheltuialaMutation } from '@/pages/cheltuieli/hooks/useStergeCheltuialaMutation.tsx';
import { ButonAdaugaModificaCheltuiala } from '@/pages/cheltuieli/lista/components/ButonAdaugaModificaCheltuiala.tsx';

type Props = {
  cheltuiala: Cheltuiala;
};

export const ActiuniCheltuiala: React.FC<Props> = ({ cheltuiala }) => {
  const { isPending, mutate: sterge } = useStergeCheltuialaMutation();

  return (
    <div className="flex gap-1">
      <ButonAdaugaModificaCheltuiala cheltuiala={cheltuiala} />

      <Button
        variant="destructive"
        onClick={() => sterge(cheltuiala.id)}
        disabled={isPending}>
        {isPending ? <Loader2 className="animate-spin" /> : <FaTrash />}
        Sterge
      </Button>
    </div>
  );
};
