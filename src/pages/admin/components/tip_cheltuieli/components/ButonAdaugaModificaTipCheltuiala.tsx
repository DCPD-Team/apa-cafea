import React, { useState } from 'react';
import { ExpenseType } from '@/types/types.ts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import { FormularAdaugaModificaTipCheltuiala } from '@/pages/admin/components/tip_cheltuieli/components/FormularAdaugaModificaTipCheltuiala.tsx';

type Props = {
  expenseType?: ExpenseType;
};
export const ButonAdaugaModificaTipCheltuiala: React.FC<Props> = ({ expenseType }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button variant="default">
          {!expenseType ? (
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
          <DialogTitle>{!expenseType ? 'Adauga tip cheltuiala' : 'Modifica tip cheltuiala'} </DialogTitle>
        </DialogHeader>
        <FormularAdaugaModificaTipCheltuiala
          close={() => setOpen(false)}
          tipCheltuiala={expenseType}
        />
      </DialogContent>
    </Dialog>
  );
};
