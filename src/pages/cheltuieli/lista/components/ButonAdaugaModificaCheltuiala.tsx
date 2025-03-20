import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React, { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Cheltuiala } from '@/types/types.ts';
import { FaEdit } from 'react-icons/fa';
import { FormularAdaugaModificaCheltuiala } from '@/pages/cheltuieli/lista/components/FormularAdaugaModificaCheltuiala.tsx';

type Props = {
  cheltuiala?: Cheltuiala;
};

export const ButonAdaugaModificaCheltuiala: React.FC<Props> = ({ cheltuiala }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button variant="default">
          {!cheltuiala ? (
            <>
              <IoMdAddCircleOutline /> Adaugă
            </>
          ) : (
            <>
              <FaEdit />
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{!cheltuiala ? 'Adaugă cheltuială' : 'Modifică cheltuială'} </DialogTitle>
        </DialogHeader>
        <FormularAdaugaModificaCheltuiala
          close={() => setOpen(false)}
          cheltuiala={cheltuiala}
        />
      </DialogContent>
    </Dialog>
  );
};
