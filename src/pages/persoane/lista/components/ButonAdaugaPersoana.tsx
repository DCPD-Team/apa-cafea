import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';

export const ButonAdaugaPersoana: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <IoMdAddCircleOutline /> Adauga
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adauga persoana</DialogTitle>
        </DialogHeader>
        <div>Continut</div>
      </DialogContent>
    </Dialog>
  );
};
