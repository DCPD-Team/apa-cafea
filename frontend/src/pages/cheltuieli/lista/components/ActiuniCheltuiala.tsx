import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import { FaInfo, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { ButonAdaugaModificaCheltuiala } from './ButonAdaugaModificaCheltuiala.tsx';
import { Loader2 } from 'lucide-react';
import { Cheltuiala } from '@/fake-api/fakePaymentApi.ts';
import { useStergeCheltuialaMutation } from '@/pages/cheltuieli/hooks/useStergeCheltuialaMutation.tsx';

type Props = {
  cheltuiala: Cheltuiala;
  areButonDetalii?: boolean;
};

export const ActiuniCheltuiala: React.FC<Props> = ({ cheltuiala, areButonDetalii = true }) => {
  const { isPending, mutate: sterge } = useStergeCheltuialaMutation({ shouldRedirect: !areButonDetalii });

  return (
    <div className="flex gap-1">
      {areButonDetalii && (
        <Button asChild={true}>
          <NavLink to={`/cheltuieli/${cheltuiala.id}`}>
            <FaInfo /> Detalii
          </NavLink>
        </Button>
      )}

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