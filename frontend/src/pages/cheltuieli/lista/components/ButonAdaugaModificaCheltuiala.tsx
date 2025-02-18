import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import React, { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FormularAdaugaModificaCheltuiala } from './FormularAdaugaModificaCheltuiala.tsx';
import { Cheltuiala } from '@/fake-api/fakePaymentApi.ts';
import { FaEdit } from 'react-icons/fa';

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
              <IoMdAddCircleOutline /> Adaugǎ
            </>
          ) : (
            <>
              <FaEdit /> Modificǎ
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{!cheltuiala ? 'Adaugǎ cheltuialǎ' : 'Modificǎ cheltuialǎ'} </DialogTitle>
        </DialogHeader>
        <FormularAdaugaModificaCheltuiala
          close={() => setOpen(false)}
          cheltuiala={cheltuiala}
        />
      </DialogContent>
    </Dialog>
  );
}; 