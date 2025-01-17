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
import { FormularAdaugaModificaPersoana } from '@/pages/persoane/lista/components/FormularAdaugaModificaPersoana.tsx';

export const ButonAdaugaPersoana: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(oo) => setOpen(oo)}>
      <DialogTrigger asChild>
        <Button variant="default">
          <IoMdAddCircleOutline /> Adauga
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adaugǎ persoana</DialogTitle>
        </DialogHeader>
        <FormularAdaugaModificaPersoana close={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
