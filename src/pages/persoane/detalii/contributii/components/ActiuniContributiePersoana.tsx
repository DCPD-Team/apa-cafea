import React from 'react';
import { Contribution } from '@/types/types.ts';
import { Button } from '@/components/ui/button.tsx';
import { FaTrash } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import { ButonAdaugaModificaPlata } from '@/pages/persoane/detalii/plati/components/ButonAdaugaModificaPlata.tsx';
import { useAuth } from '@/hooks/useAuth.tsx';
import { useStergeContributiePersoanaMutation } from '@/pages/persoane/detalii/contributii/hooks/useStergeContributiePersoanaMutation.tsx';
import { ButonAdaugaModificaContributie } from '@/pages/persoane/detalii/contributii/components/ButonAdaugaModificaContributie.tsx';

type Props = {
  contributie: Contribution;
};

export const ActiuniContributiePersoana: React.FC<Props> = ({ contributie }) => {
  const { isPending, mutate } = useStergeContributiePersoanaMutation({ id: contributie.id });
  const { user } = useAuth();
  return (
    <div className="flex gap-1">
      {user?.appRole?.includes('moderator') ? (
        <>
          <ButonAdaugaModificaContributie contributie={contributie} />
          <Button
            variant="destructive"
            onClick={() => mutate(contributie.id)}
            disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : <FaTrash />}
            Sterge
          </Button>
        </>
      ) : (
        '-'
      )}
    </div>
  );
};
