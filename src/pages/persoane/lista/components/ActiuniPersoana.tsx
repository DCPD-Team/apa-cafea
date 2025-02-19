import React from 'react';
import { Person } from '@/fake-api/fakePaymentApi.ts';
import { Button } from '@/components/ui/button.tsx';
import { FaInfo, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { ButonAdaugaModificaPersoana } from '@/pages/persoane/lista/components/ButonAdaugaModificaPersoana.tsx';
import { Loader2 } from 'lucide-react';
import { useStergePersoanaMutation } from '@/pages/persoane/hooks/useStergePersoanaMutation.tsx';

type Props = {
  persoana: Person;
  areButonDetalii?: boolean;
};

export const ActiuniPersoana: React.FC<Props> = ({ persoana, areButonDetalii = true }) => {
  const { isPending, mutate: sterge } = useStergePersoanaMutation({ shouldRedirect: !areButonDetalii });

  return (
    <div className="flex gap-1">
      {areButonDetalii && (
        <Button asChild={true}>
          <NavLink to={`/persoana/${persoana.id}`}>
            <FaInfo /> Detalii
          </NavLink>
        </Button>
      )}

      <ButonAdaugaModificaPersoana persoana={persoana} />

      <Button
        variant="destructive"
        onClick={() => sterge(persoana)}
        disabled={isPending}>
        {isPending ? <Loader2 className="animate-spin" /> : <FaTrash />}
        Sterge
      </Button>
    </div>
  );
};
