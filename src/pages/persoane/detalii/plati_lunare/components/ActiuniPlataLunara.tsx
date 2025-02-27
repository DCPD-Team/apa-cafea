import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { FaEdit } from 'react-icons/fa';
import { MonthlyPayments } from '@/types/types.ts';
import { FormularModificaPlataLunaraPersoana } from '@/pages/persoane/detalii/plati_lunare/components/FormularModificaPlataLunaraPersoana.tsx';

type Props = {
  statusLuna: MonthlyPayments;
  expenseTypeId: string;
};

export const ActiuniPlataLunara: React.FC<Props> = ({ statusLuna, expenseTypeId }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button variant="default">
          <FaEdit /> Modifica
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{'Modifica status lunar persoana'} </DialogTitle>
        </DialogHeader>
        <FormularModificaPlataLunaraPersoana
          close={() => setOpen(false)}
          statusLunar={statusLuna}
          expenseTypeId={expenseTypeId}
        />
      </DialogContent>
    </Dialog>
  );
};
