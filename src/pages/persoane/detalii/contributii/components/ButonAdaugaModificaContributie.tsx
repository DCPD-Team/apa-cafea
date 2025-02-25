import React, { useState } from 'react';
import { Contribution } from '@/types/types.ts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import {
  FormularAdaugaModificaContributie,
} from '@/pages/persoane/detalii/contributii/components/FormularAdaugaModificaContributie.tsx';

type Props = {
  contributie?: Contribution;
};

export const ButonAdaugaModificaContributie: React.FC<Props> = ({ contributie }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button variant="default">
          {!contributie ? (
            <>
              <IoMdAddCircleOutline /> Adauga
            </>
          ) : (
            <>
              <FaEdit /> Modifica
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{!contributie ? 'Adauga contributie' : 'Modifica contributie'} </DialogTitle>
        </DialogHeader>
        <FormularAdaugaModificaContributie
          close={() => setOpen(false)}
          contributie={contributie}
        />
      </DialogContent>
    </Dialog>
  );
};
