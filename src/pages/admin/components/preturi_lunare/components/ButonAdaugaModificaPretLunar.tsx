import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import { MonthlyPrices } from '@/types/types.ts';
import { FormularAdaugaModificaPretLunar } from '@/pages/admin/components/preturi_lunare/components/FormularAdaugaModificaPretLunar.tsx';

type Props = {
  monthlyPrice?: MonthlyPrices;
};

export const ButonAdaugaModificaPretLunar: React.FC<Props> = ({ monthlyPrice }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button variant="default">
          {!monthlyPrice ? (
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
          <DialogTitle>{!monthlyPrice ? 'Adaugă tip cheltuială' : 'Modifică tip cheltuială'} </DialogTitle>
        </DialogHeader>
        <FormularAdaugaModificaPretLunar
          close={() => setOpen(false)}
          monthlyPrice={monthlyPrice}
        />
      </DialogContent>
    </Dialog>
  );
};
