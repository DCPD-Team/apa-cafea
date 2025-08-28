import React, { useState } from 'react';
import { SugestieCheltuiala } from '@/types/types.ts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import { FormularAdaugaModificaSugestieCheltuiala } from '@/pages/cheltuieli/sugestii/components/FormularAdaugaModificaSugestieCheltuiala.tsx';

type Props = {
  sugestie?: SugestieCheltuiala;
};

export const ButonAdaugaModificaSugestieCheltuiala: React.FC<Props> = ({ sugestie }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button variant="default">
          {!sugestie ? (
            <>
              <IoMdAddCircleOutline /> Adaugă
            </>
          ) : (
            <FaEdit />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> {!sugestie ? 'Adaugă sugestie' : 'Modifică sugestie'}</DialogTitle>
        </DialogHeader>
        <FormularAdaugaModificaSugestieCheltuiala
          close={() => setOpen(false)}
          sugestie={sugestie}
        />
      </DialogContent>
    </Dialog>
  );
};
