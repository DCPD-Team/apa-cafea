import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
        <DialogDescription className="text-justify text-xs">
          Adauga sau modifica selectand suma pe care ai cheltuit-o, tipul de cheltuiala, anul, precum si completand o
          descriere sumara a acesteia, astfel incat actiunea sa fie justificabila.
        </DialogDescription>
        <FormularAdaugaModificaCheltuiala
          close={() => setOpen(false)}
          cheltuiala={cheltuiala}
        />
      </DialogContent>
    </Dialog>
  );
};
