import React from 'react';
import { Payment } from '@/types/types.ts';
import { Button } from '@/components/ui/button.tsx';
import { FaTrash } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import { useStergePlataPersoanaMutation } from '@/pages/persoane/hooks/useStergePlataPersoanaMutation.tsx';
import { ButonAdaugaModificaPlata } from '@/pages/persoane/detalii/plati/components/ButonAdaugaModificaPlata.tsx';
import { useAuth } from '@/hooks/useAuth.tsx';

type Props = {
  payment: Payment;
};

export const ActiuniPlatiPersoana: React.FC<Props> = ({ payment }) => {
  const { isPending, mutate } = useStergePlataPersoanaMutation({ userId: payment.person_id });
  const { user } = useAuth();
  return (
    <div className="flex gap-1">
      {user?.appRole?.includes('moderator') ? (
        <>
          <ButonAdaugaModificaPlata plata={payment} />
          <Button
            variant="destructive"
            onClick={() => mutate(payment.id)}
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
