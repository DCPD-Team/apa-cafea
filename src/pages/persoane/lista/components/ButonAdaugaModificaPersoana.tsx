import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React, { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FormularAdaugaModificaPersoana } from '@/pages/persoane/lista/components/FormularAdaugaModificaPersoana.tsx';
import { Person } from '@/types/types.ts';
import { FaEdit } from 'react-icons/fa';

type Props = {
  persoana?: Person;
};

export const ButonAdaugaModificaPersoana: React.FC<Props> = ({ persoana }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button variant="default">
          {!persoana ? (
            <>
              <IoMdAddCircleOutline /> Adaugă
            </>
          ) : (
            <FaEdit />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{!persoana ? 'Adaugă persoană' : 'Modifică persoană'} </DialogTitle>
        </DialogHeader>
        <FormularAdaugaModificaPersoana
          close={() => setOpen(false)}
          persoana={persoana}
        />
      </DialogContent>
    </Dialog>
  );
};
