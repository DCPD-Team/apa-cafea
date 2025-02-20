import React, { useState } from 'react';
import { Payment } from '@/types/types.ts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import { FormularAdaugaModificaPlata } from '@/pages/persoane/detalii/plati/components/FormularAdaugaModificaPlata.tsx';

type Props = {
  plata?: Payment;
};

export const ButonAdaugaModificaPlata: React.FC<Props> = ({ plata }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button variant="default">
          {!plata ? (
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
          <DialogTitle>{!plata ? 'Adauga plata' : 'Modifica plata'} </DialogTitle>
        </DialogHeader>
        <FormularAdaugaModificaPlata
          close={() => setOpen(false)}
          plata={plata}
        />
      </DialogContent>
    </Dialog>
  );
};
