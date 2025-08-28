import React, { useState } from 'react';
import { SugestieCheltuiala } from '@/types/types.ts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { FormularValideazaSugestieCheltuiala } from '@/pages/cheltuieli/sugestii/components/FormularValideazaSugestieCheltuiala.tsx';
import { FaCheckCircle } from 'react-icons/fa';
import { FaCircleXmark } from 'react-icons/fa6';

type Props = {
  sugestie?: SugestieCheltuiala;
};

export const ButonValideazaSugestieCheltuiala: React.FC<Props> = ({ sugestie }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button variant="default">
          {sugestie?.admin_decision === false ? (
            <>
              <FaCheckCircle />
            </>
          ) : (
            <>
              <FaCircleXmark />
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{'Aprobă sugestie'} </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-justify text-xs"> Pentru admin sa decida</DialogDescription>

        <FormularValideazaSugestieCheltuiala
          close={() => setOpen(false)}
          sugestie={sugestie}
        />
      </DialogContent>
    </Dialog>
  );
};
