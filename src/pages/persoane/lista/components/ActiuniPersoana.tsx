import React from 'react';
import { Person } from '@/types/types.ts';
import { Button } from '@/components/ui/button.tsx';
import { FaInfo, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { ButonAdaugaModificaPersoana } from '@/pages/persoane/lista/components/ButonAdaugaModificaPersoana.tsx';
import { Loader2 } from 'lucide-react';
import { useStergePersoanaMutation } from '@/pages/persoane/hooks/useStergePersoanaMutation.tsx';
import { useAuth } from '@/hooks/useAuth.tsx';

type Props = {
  persoana: Person;
  areButonDetalii?: boolean;
};

export const ActiuniPersoana: React.FC<Props> = ({ persoana, areButonDetalii = true }) => {
  const { isPending, mutate: sterge } = useStergePersoanaMutation({ shouldRedirect: !areButonDetalii });
  const { isAdmin, isModerator } = useAuth();

  return (
    <div className="flex gap-1">
      {areButonDetalii && (
        <Button asChild={true}>
          <NavLink to={`/persoana/${persoana.id}`}>
            <FaInfo />
          </NavLink>
        </Button>
      )}

      {(isAdmin || isModerator) && <ButonAdaugaModificaPersoana persoana={persoana} />}

      {isAdmin && (
        <Button
          variant="destructive"
          onClick={() => sterge(persoana)}
          disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : <FaTrash />}
        </Button>
      )}
    </div>
  );
};
